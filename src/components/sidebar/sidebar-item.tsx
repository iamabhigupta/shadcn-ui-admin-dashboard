import { LucideIcon } from 'lucide-react';
import { NavLink } from 'react-router-dom';

import { cn } from '@/lib/utils';

interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  href: string;
}

export const SidebarItem = ({ icon: Icon, label, href }: SidebarItemProps) => {
  return (
    <>
      <NavLink
        to={href}
        className={({ isActive }) =>
          cn(
            'rounded-md text-sm font-medium transition-colors hover:bg-accent h-10 px-4 py-2',
            isActive && 'bg-primary/10 hover:bg-primary/10 text-primary'
          )
        }
      >
        <div className="flex items-center gap-x-2">
          <Icon size={20} />
          {label}
        </div>
      </NavLink>
    </>
  );
};
