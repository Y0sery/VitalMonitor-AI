/**
 * Input.tsx
 * 
 * Role: Reusable Input Component
 * Responsibilities:
 * - Provides a consistent input field style.
 * - Handles labels, error messages, and helper text.
 * - Ensures accessibility with proper ARIA attributes.
 */

import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    // Label text displayed above the input
    label: string;
    // Error message displayed below the input (changes border color)
    error?: string;
    // Helper text displayed below the input (if no error)
    helperText?: string;
}

export const Input: React.FC<InputProps> = ({
    label,
    error,
    helperText,
    id,
    className = '',
    ...props
}) => {
    // Generate a unique ID if none is provided, for label association
    const inputId = id || label.toLowerCase().replace(/\s+/g, '-');

    return (
        <div className={`flex flex-col gap-1.5 ${className}`}>
            {/* Label with optional required asterisk */}
            <label
                htmlFor={inputId}
                className="text-sm font-medium text-[#0F1724]"
            >
                {label}
                {props.required && <span className="text-[#E05A4D] ml-1">*</span>}
            </label>

            {/* Input Field */}
            <input
                id={inputId}
                className={`
          px-3 py-2 rounded-lg border bg-white text-[#0F1724] placeholder-gray-400
          focus:outline-none focus:ring-2 focus:ring-offset-0 transition-all
          ${error
                        ? 'border-[#E05A4D] focus:ring-[#E05A4D]' // Error state styles
                        : 'border-gray-300 focus:border-[#0B67A6] focus:ring-[#0B67A6]/20' // Normal state styles
                    }
          disabled:bg-gray-100 disabled:cursor-not-allowed
        `}
                // Accessibility attributes
                aria-invalid={!!error}
                aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
                {...props}
            />

            {/* Error Message */}
            {error && (
                <span id={`${inputId}-error`} className="text-xs text-[#E05A4D]" role="alert">
                    {error}
                </span>
            )}

            {/* Helper Text (only shown if no error) */}
            {!error && helperText && (
                <span id={`${inputId}-helper`} className="text-xs text-gray-500">
                    {helperText}
                </span>
            )}
        </div>
    );
};
