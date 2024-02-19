import { self } from '@/http/api';
import { useAuth } from '@/store/use-auth';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

const getUser = async () => {
  const { data } = await self();
  return data;
};

const Root = () => {
  const { setUser } = useAuth();

  const { data, isLoading } = useQuery({
    queryKey: ['self'],
    queryFn: getUser,
    retry: (failurCount: number, error) => {
      if (error instanceof AxiosError && error.status === 401) {
        return false;
      }

      return failurCount > 3;
    },
  });

  useEffect(() => {
    if (data) {
      setUser(data);
    }
  }, [data, setUser]);

  if (isLoading) return 'Loading...';

  return <Outlet />;
};

export default Root;
