import { Bell, LogOutIcon } from 'lucide-react';

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
import { Button } from '../ui/button';

export const Header = () => {
  const { user } = useAuth();
  const { logoutMutate } = useLogout();

  return (
    <header className="p-5 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <MobileSidebar />
        <Badge className="bg-primary/10 text-primary hover:bg-primary/10">
          {user?.role === 'admin' ? 'You are an admin 🍕' : user?.tenant?.name}
        </Badge>
      </div>
      <div className="flex items-center gap-x-2">
        <Text variant="p" className="hidden lg:block font-semibold">
          Howdy, {user?.firstName} 😀
        </Text>
        <div className="relative">
          <Button variant="ghost" size="icon">
            <Bell className="h-4 w-4" />
          </Button>
          <span className="w-1.5 h-1.5 rounded-full bg-primary absolute top-2 right-2"></span>
        </div>
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
