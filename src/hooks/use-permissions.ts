import { User } from '@/store/use-auth';

export const usePermissions = () => {
  const allowedRoles = ['admin', 'manager'];

  const _hasPermissions = (user: User | null) => {
    if (user) {
      return allowedRoles.includes(user.role);
    }
    return false;
  };

  return {
    isAllowed: _hasPermissions,
  };
};
