import { LucideIcon } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const backgroundVariants = cva('rounded-xl flex items-center justify-center', {
  variants: {
    variant: {
      default: 'bg-primary/10',
      success: 'bg-green-500/20',
      info: 'bg-cyan-500/20',
      warning: 'bg-amber-500/20',
    },
    size: {
      default: 'p-2',
      lg: 'p-2',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

const iconVariants = cva('', {
  variants: {
    variant: {
      default: 'text-primary',
      success: 'text-green-700',
      info: 'text-cyan-700',
      warning: 'text-amber-700',
    },
    size: {
      default: 'h-4 w-4',
      lg: 'h-8 w-8',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

type BackgroundVariantsProps = VariantProps<typeof backgroundVariants>;
type IconVariantsProps = VariantProps<typeof iconVariants>;

interface IconBadgeProps extends BackgroundVariantsProps, IconVariantsProps {
  icon: LucideIcon;
}

export const IconBadge = ({ icon: Icon, variant, size }: IconBadgeProps) => {
  return (
    <div className={cn(backgroundVariants({ variant, size }))}>
      <Icon className={cn(iconVariants({ variant, size }))} />
    </div>
  );
};
