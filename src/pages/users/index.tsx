import CustomBreadcrumb from '@/components/ui/breadcrumb';
import { getUsers } from '@/http/api';
import { User } from '@/types';
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

  console.log(users);

  return (
    <div>
      <CustomBreadcrumb items={breadcrumbItems} />
      {isLoading && <div>Loading...</div>}
      {isError && <div>{error.message}</div>}
      {users && (
        <div>
          <ul>
            {users.map((user: User) => (
              <li key={user.id}>{user.email}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Users;
