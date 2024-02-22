import CustomBreadcrumb from '@/components/ui/breadcrumb';
import { columns } from '@/components/users/columns';
import { DataTable } from '@/components/users/data-table';
import { getUsers } from '@/http/api';
import { useQuery } from '@tanstack/react-query';

const Users = () => {
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
    queryKey: ['users'],
    queryFn: () => {
      return getUsers().then((res) => res.data);
    },
  });

  return (
    <div className="">
      <CustomBreadcrumb items={breadcrumbItems} />
      {isLoading && <div>Loading...</div>}
      {isError && <div>{error.message}</div>}
      {users && (
        <div className="">
          <DataTable columns={columns} data={users} />
        </div>
      )}
    </div>
  );
};

export default Users;
