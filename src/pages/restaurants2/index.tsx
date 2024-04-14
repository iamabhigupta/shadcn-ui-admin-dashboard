import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { debounce } from 'lodash';

import { Breadcrumb } from '@/components/ui/breadcrumb';
import { PER_PAGE } from '@/constants';
import { getRestaurants } from '@/http/api';
import { useAuth } from '@/store/use-auth';
import { columns } from './columns';
import { DataTable } from './data-table';

const breadcrumbItems = [{ title: 'Dashboard', link: '/' }, { title: 'Users' }];

const RestaurantsPage2 = () => {
  const [queryParams, setQueryParams] = useState({
    perPage: PER_PAGE,
    currentPage: 1,
    q: '',
  });

  const debouncedSearch = debounce((q: string) => {
    setQueryParams((prev) => {
      return { ...prev, q };
    });
    setQueryParams((prev) => ({ ...prev, currentPage: 1 }));
  }, 500);

  const {
    data: restaurants,
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
      return getRestaurants(queryString).then((res) => res.data);
    },
    placeholderData: keepPreviousData,
  });

  const { user } = useAuth();

  useEffect(() => {
    if (restaurants?.total < 5) {
      setQueryParams((prev) => {
        return { ...prev, currentPage: 1 };
      });
    }
  }, [restaurants]);

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
        data={restaurants ? restaurants?.data : []}
        total={restaurants?.total}
        setQueryParams={setQueryParams}
        queryParams={queryParams}
        debouncedSearch={debouncedSearch}
      />
    </div>
  );
};

export default RestaurantsPage2;
