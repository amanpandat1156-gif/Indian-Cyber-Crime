import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'emergency' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      leftIcon,
      rightIcon,
      className = '',
      disabled,
      ...props
    },
    ref
  ) => {
    const baseClasses =
      'inline-flex items-center justify-center font-medium rounded-subtle transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none';

    const variantClasses = {
      primary:
        'bg-ncrp-navy text-white hover:bg-ncrp-darkNavy active:bg-[#071826] focus-visible:ring-ncrp-navy shadow-sm',
      secondary:
        'bg-white text-ncrp-navy border border-ncrp-border hover:bg-[#F3F2EE] hover:border-[#CCD3D6] active:bg-[#EAE8E2] focus-visible:ring-ncrp-navy shadow-card',
      emergency:
        'bg-ncrp-red text-white hover:bg-[#992E2E] active:bg-[#802525] focus-visible:ring-ncrp-red shadow-sm font-semibold',
      ghost:
        'text-ncrp-text hover:bg-[#EAECEE]/60 active:bg-[#DDE2E4] focus-visible:ring-ncrp-navy',
      link:
        'text-ncrp-navy hover:text-ncrp-darkNavy underline-offset-4 hover:underline p-0 h-auto font-medium',
    };

    const sizeClasses = {
      sm: 'text-xs px-3 py-1.5 gap-1.5',
      md: 'text-sm px-4 py-2.5 gap-2',
      lg: 'text-base px-6 py-3.5 gap-2.5',
    };

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={`
          ${baseClasses}
          ${variant !== 'link' ? sizeClasses[size] : ''}
          ${variantClasses[variant]}
          ${fullWidth ? 'w-full' : ''}
          ${className}
        `}
        {...props}
      >
        {leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>}
        <span>{children}</span>
        {rightIcon && <span className="inline-flex shrink-0">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';
