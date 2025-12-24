/**
 * AuthPage.tsx
 * 
 * Role: Authentication Page Layout
 * Responsibilities:
 * - Serves as the container page for the Authentication Card (Login/Signup).
 * - Provides a visually appealing background with gradients and blur effects.
 * - Handles navigation back to the Home page.
 * - Passes authentication success callbacks to the AuthCard.
 */

import React from 'react';
import { AuthCard } from './AuthCard';

interface AuthPageProps {
    initialMode?: 'login' | 'signup';
    onNavigateHome: () => void;
    onLoginSuccess?: (role: 'patient' | 'doctor') => void;
}

export const AuthPage: React.FC<AuthPageProps> = ({ initialMode = 'login', onNavigateHome, onLoginSuccess }) => {
    return (
        <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-4 relative">
            {/* 1. Background Elements: Decorative gradients */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-[20%] -right-[10%] w-[70%] h-[70%] rounded-full bg-gradient-to-br from-sky-100/40 to-blue-100/40 blur-3xl" />
                <div className="absolute -bottom-[20%] -left-[10%] w-[70%] h-[70%] rounded-full bg-gradient-to-tr from-emerald-100/40 to-teal-100/40 blur-3xl" />
            </div>

            {/* 2. Back Button: Navigate to Home */}
            <button
                onClick={onNavigateHome}
                className="absolute top-8 left-4 md:left-8 text-sm text-gray-500 hover:text-[#0EA5E9] flex items-center gap-2 transition-colors z-20"
            >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Home
            </button>

            {/* 3. Card Container: Centered AuthCard */}
            <div className="w-full flex justify-center z-10 py-8">
                <AuthCard initialMode={initialMode} onLoginSuccess={onLoginSuccess} />
            </div>
        </div>
    );
};
