import CustomBreadcrumb from '@/components/ui/breadcrumb';

const Users = () => {
  const breadcrumbItems = [
    { title: 'Dashboard', link: '/' },
    { title: 'Users' },
  ];

  return (
    <div>
      <CustomBreadcrumb items={breadcrumbItems} />
      Users
    </div>
  );
};

export default Users;
