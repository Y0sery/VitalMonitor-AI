/**
 * AdminLogin.tsx
 * 
 * Role: Dedicated Admin Login Page
 * Responsibilities:
 * - Separate login interface for administrators only
 * - More secure and isolated from patient/doctor auth
 */

import React, { useState } from 'react';
import { Button } from './Button';

interface AdminLoginProps {
    onLoginSuccess: () => void;
    onBackToHome: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess, onBackToHome }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        // Basic validation
        if (!email || !password) {
            setError('Please enter both email and password');
            return;
        }

        // Demo credentials (في الواقع، دي هتيجي من API)
        if (email === 'admin@hospital.com' && password === 'admin123') {
            setIsLoading(true);
            setTimeout(() => {
                setIsLoading(false);
                onLoginSuccess();
            }, 1000);
        } else {
            setError('Invalid admin credentials');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4 relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>

            {/* Back Button */}
            <button
    onClick={onBackToHome}
    className="absolute top-8 left-8 text-gray-300 hover:text-white flex items-center gap-2 transition-colors z-20 bg-gray-800/50 px-4 py-2 rounded-xl backdrop-blur-sm"
>
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
    </svg>
    <span className="text-sm font-medium">Back to Home</span>
</button>

            {/* Login Card */}
            <div className="w-full max-w-md relative z-10">
                <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-gray-100">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-gradient-to-br from-gray-900 to-gray-700 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">Admin Access</h1>
                        <p className="text-sm text-gray-600">Secure login for authorized personnel only</p>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
                            <svg className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p className="text-sm text-red-700">{error}</p>
                        </div>
                    )}

                    {/* Login Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Admin Email
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-gray-900/20 focus:border-gray-900 outline-none transition-all text-sm"
                                placeholder="admin@hospital.com"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-gray-900/20 focus:border-gray-900 outline-none transition-all text-sm"
                                placeholder="Enter your password"
                            />
                        </div>

                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-3.5 rounded-xl bg-gray-900 hover:bg-gray-800 text-white font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Authenticating...
                                </span>
                            ) : (
                                'Access Dashboard'
                            )}
                        </Button>
                    </form>

                    {/* Security Notice */}
                    <div className="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-100">
                        <div className="flex items-start gap-3">
                            <svg className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                            <div>
                                <p className="text-xs font-medium text-gray-700 mb-1">Secure Access</p>
                                <p className="text-xs text-gray-500">
                                    This area is restricted to authorized administrators. All access attempts are logged.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Demo Credentials (للتجربة فقط - امسحها في الإنتاج) */}
                    <div className="mt-6 p-3 bg-yellow-50 rounded-xl border border-yellow-200">
                        <p className="text-xs text-yellow-800 font-medium mb-1">🔐 Demo Credentials:</p>
                        <p className="text-xs text-yellow-700">Email: <code className="bg-yellow-100 px-1 rounded">admin@hospital.com</code></p>
                        <p className="text-xs text-yellow-700">Password: <code className="bg-yellow-100 px-1 rounded">admin123</code></p>
                    </div>
                </div>
            </div>
        </div>
    );
};