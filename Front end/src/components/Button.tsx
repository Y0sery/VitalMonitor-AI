/**
 * Button.tsx
 * 
 * Role: Reusable Button Component
 * Responsibilities:
 * - Provides a consistent button style across the application.
 * - Supports multiple variants (primary, secondary, outline, ghost).
 * - Handles loading states with a spinner.
 * - Supports optional left and right icons.
 */

import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  // Visual style variant
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  // Size of the button
  size?: 'sm' | 'md' | 'lg';
  // If true, shows a loading spinner and disables the button
  isLoading?: boolean;
  // Icon to display before the text
  leftIcon?: React.ReactNode;
  // Icon to display after the text
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  className = '',
  disabled,
  ...props
}) => {
  // Base styles applied to all buttons
  const baseStyles = 'inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  // Style definitions for each variant
  const variants = {
    primary: 'bg-[#0B67A6] text-white hover:bg-[#095285] focus:ring-[#0B67A6]',
    secondary: 'bg-[#4ABDAC] text-white hover:bg-[#3b968b] focus:ring-[#4ABDAC]',
    outline: 'border-2 border-[#0B67A6] text-[#0B67A6] hover:bg-[#F7FAFC] focus:ring-[#0B67A6]',
    ghost: 'text-[#0B67A6] hover:bg-[#F7FAFC] focus:ring-[#0B67A6]',
  };

  // Size definitions
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {/* Loading Spinner */}
      {isLoading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {/* Left Icon */}
      {!isLoading && leftIcon && <span className="mr-2">{leftIcon}</span>}

      {/* Button Text */}
      {children}

      {/* Right Icon */}
      {!isLoading && rightIcon && <span className="ml-2">{rightIcon}</span>}
    </button>
  );
};
