import { Breadcrumb } from '@/components/ui/breadcrumb';
import { columns } from '@/pages/users/columns';
import { DataTable } from '@/pages/users/data-table';
import { getUsers } from '@/http/api';
import { useAuth } from '@/store/use-auth';
import { useQuery } from '@tanstack/react-query';
import { Navigate } from 'react-router-dom';
import { PER_PAGE } from '@/constants';
import { useState } from 'react';

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
    isLoading,
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
  });

  const { user } = useAuth();

  if (user?.role !== 'admin') {
    return <Navigate to="/" />;
  }

  return (
    <div className="">
      <Breadcrumb items={breadcrumbItems} />
      {isLoading && <div>Loading...</div>}
      {isError && <div>{error.message}</div>}
      {users && (
        <div className="">
          <DataTable
            columns={columns}
            data={users?.data}
            total={users?.total}
            setQueryParams={setQueryParams}
            queryParams={queryParams}
          />
        </div>
      )}
    </div>
  );
};

export default Users;
