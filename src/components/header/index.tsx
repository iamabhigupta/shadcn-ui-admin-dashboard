import { LogOutIcon } from 'lucide-react';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useLogout } from '@/hooks/use-logout';
import { MobileSidebar } from './mobile-sidebar';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/store/use-auth';
import { Text } from '../typography';

export const Header = () => {
  const { user } = useAuth();
  const { logoutMutate } = useLogout();

  return (
    <header className="p-5 flex justify-between items-center">
      <MobileSidebar />
      <Badge className="bg-primary/10 text-primary hover:bg-primary/10">
        {user?.role === 'admin' ? 'You are an admin 🍕' : user?.tenant?.name}
      </Badge>
      <div className="flex items-center gap-x-2">
        <Text variant="p" className="font-semibold">
          Howdy, {user?.firstName} 😀
        </Text>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="cursor-pointer">
              {/* <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" /> */}
              <AvatarFallback>Ab</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="p-0" align="end">
            <DropdownMenuItem
              onClick={() => logoutMutate()}
              className="cursor-pointer"
            >
              <LogOutIcon className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};
