import { logout } from '@/http/api';
import { useAuth } from '@/store/use-auth';
import { useMutation } from '@tanstack/react-query';

export const useLogout = () => {
  const { logout: logoutFromStore } = useAuth();

  const { mutate: logoutMutate } = useMutation({
    mutationKey: ['logout'],
    mutationFn: logout,
    onSuccess: async () => {
      logoutFromStore();
      return;
    },
  });

  return {
    logoutMutate,
  };
};
