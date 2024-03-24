import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { debounce } from 'lodash';

import { Breadcrumb } from '@/components/ui/breadcrumb';
import { PER_PAGE } from '@/constants';
import { getUsers } from '@/http/api';
import { columns } from '@/pages/users/columns';
import { DataTable } from '@/pages/users/data-table';
import { useAuth } from '@/store/use-auth';

const breadcrumbItems = [{ title: 'Dashboard', link: '/' }, { title: 'Users' }];

const Users = () => {
  const [queryParams, setQueryParams] = useState({
    perPage: PER_PAGE,
    currentPage: 1,
    role: '',
    q: '',
  });

  const debouncedSearch = debounce((q: string) => {
    setQueryParams((prev) => {
      return { ...prev, q };
    });
    setQueryParams((prev) => ({ ...prev, currentPage: 1 }));
  }, 500);

  const {
    data: users,
    isFetching,
    isError,
    error,
  } = useQuery({
    queryKey: ['users', queryParams],
    queryFn: () => {
      const filteredParams = Object.fromEntries(
        Object.entries(queryParams).filter((item) => !!item[1])
      );
      const queryString = new URLSearchParams(
        filteredParams as unknown as Record<string, string>
      ).toString();
      return getUsers(queryString).then((res) => res.data);
    },
    placeholderData: keepPreviousData,
  });

  const { user } = useAuth();

  useEffect(() => {
    if (users?.total < 5) {
      setQueryParams((prev) => {
        return { ...prev, currentPage: 1 };
      });
    }
  }, [users]);

  if (user?.role !== 'admin') {
    return <Navigate to="/" />;
  }

  return (
    <div className="">
      <div className="flex justify-between h-5">
        <Breadcrumb items={breadcrumbItems} />
        {isFetching && <Loader2 className="animate-spin text-primary" />}
        {isError && <span className="text-red-500">{error.message}</span>}
      </div>
      <DataTable
        columns={columns}
        data={users ? users?.data : []}
        total={users?.total}
        setQueryParams={setQueryParams}
        queryParams={queryParams}
        debouncedSearch={debouncedSearch}
      />
    </div>
  );
};

export default Users;
