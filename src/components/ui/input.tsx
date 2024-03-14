import * as React from 'react';
import { cn } from '@/lib/utils';

interface InputProps {
  size?: 'lg' | 'default';
}

type InputHTMLProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>;

type CombinedProps = InputProps & InputHTMLProps;

const Input = React.forwardRef<HTMLInputElement, CombinedProps>(
  ({ className, type, size = 'default', ...props }, ref) => {
    const sizeClasses = {
      default: 'h-9',
      lg: 'h-10',
    };

    return (
      <input
        type={type}
        className={cn(
          'flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 focus-visible:ring-1 focus-visible:ring-offset-0 focus-visible:border-primary transition-all',
          sizeClasses[size],
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export { Input };

// import * as React from 'react';

// import { cn } from '@/lib/utils';

// export interface InputProps
//   extends React.InputHTMLAttributes<HTMLInputElement> {}

// const Input = React.forwardRef<HTMLInputElement, InputProps>(
//   ({ className, type, ...props }, ref) => {
//     return (
//       <input
//         type={type}
//         className={cn(
//           'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 focus-visible:ring-1 focus-visible:ring-offset-0 focus-visible:border-primary transition-all',
//           className
//         )}
//         ref={ref}
//         {...props}
//       />
//     );
//   }
// );
// Input.displayName = 'Input';

// export { Input };
