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

export const Header = () => {
  const { logoutMutate } = useLogout();

  return (
    <header className="p-6 flex justify-between items-center">
      <MobileSidebar />
      <h1>Dashboard</h1>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="cursor-pointer">
            {/* <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" /> */}
            <AvatarFallback className="bg-primary/10 text-primary">
              Ab
            </AvatarFallback>
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
    </header>
  );
};
