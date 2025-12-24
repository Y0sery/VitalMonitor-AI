/**
 * Toast.tsx
 * 
 * Role: Notification Toast Component
 * Responsibilities:
 * - Displays temporary messages (success, error, info) to the user.
 * - Automatically dismisses itself after a specified duration.
 * - Provides visual feedback with icons and colors.
 */

import React, { useEffect } from 'react';

export type ToastType = 'success' | 'error' | 'info';

interface ToastProps {
    message: string;
    type: ToastType;
    isVisible: boolean;
    onClose: () => void;
    // Duration in ms before auto-close (default 3000)
    duration?: number;
}

export const Toast: React.FC<ToastProps> = ({
    message,
    type,
    isVisible,
    onClose,
    duration = 3000,
}) => {
    // Effect to handle auto-dismissal
    useEffect(() => {
        if (isVisible && duration > 0) {
            const timer = setTimeout(() => {
                onClose();
            }, duration);
            return () => clearTimeout(timer);
        }
    }, [isVisible, duration, onClose]);

    if (!isVisible) return null;

    // Style configurations based on type
    const styles = {
        success: 'bg-[#2E8B57] text-white',
        error: 'bg-[#E05A4D] text-white',
        info: 'bg-[#0B67A6] text-white',
    };

    // Icon configurations based on type
    const icons = {
        success: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
        ),
        error: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
        ),
        info: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
    };

    return (
        <div
            className={`fixed bottom-4 right-4 z-50 flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg transition-all transform translate-y-0 opacity-100 ${styles[type]}`}
            role="alert"
            aria-live={type === 'error' ? 'assertive' : 'polite'}
        >
            <span className="flex-shrink-0">{icons[type]}</span>
            <p className="font-medium text-sm">{message}</p>
            <button
                onClick={onClose}
                className="ml-2 p-1 hover:bg-white/20 rounded-full transition-colors"
                aria-label="Close notification"
            >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
    );
};
