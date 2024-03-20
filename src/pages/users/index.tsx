import { Breadcrumb } from '@/components/ui/breadcrumb';
import { columns } from '@/pages/users/columns';
import { DataTable } from '@/pages/users/data-table';
import { getUsers } from '@/http/api';
import { useAuth } from '@/store/use-auth';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { Navigate } from 'react-router-dom';
import { PER_PAGE } from '@/constants';
import { useState } from 'react';
import { Loader, Loader2 } from 'lucide-react';

const Users = () => {
  const [queryParams, setQueryParams] = useState({
    perPage: PER_PAGE,
    currentPage: 1,
  });

  const breadcrumbItems = [
    { title: 'Dashboard', link: '/' },
    { title: 'Users' },
  ];

  const {
    data: users,
    isFetching,
    isError,
    error,
  } = useQuery({
    queryKey: ['users', queryParams],
    queryFn: () => {
      const queryString = new URLSearchParams(
        queryParams as unknown as Record<string, string>
      ).toString();
      return getUsers(queryString).then((res) => res.data);
    },
    placeholderData: keepPreviousData,
  });

  const { user } = useAuth();

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
      />
    </div>
  );
};

export default Users;
