import { Breadcrumb } from '@/components/ui/breadcrumb';
import { columns } from '@/pages/restaurants/columns';
import { DataTable } from '@/pages/restaurants/data-table';
import { getRestaurants } from '@/http/api';
import { useAuth } from '@/store/use-auth';
import { useQuery } from '@tanstack/react-query';
import { Navigate } from 'react-router-dom';

const Restaurants = () => {
  const breadcrumbItems = [
    { title: 'Dashboard', link: '/' },
    { title: 'Restaurants' },
  ];

  const {
    data: restaurants,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['restaurants'],
    queryFn: () => {
      return getRestaurants().then((res) => res.data);
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
      {restaurants && (
        <div className="">
          <DataTable columns={columns} data={restaurants} />
        </div>
      )}
    </div>
  );
};

export default Restaurants;
