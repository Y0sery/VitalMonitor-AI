/**
 * Header.tsx
 * 
 * Role: Global Navigation Bar
 * Responsibilities:
 * - Displays the application logo and main navigation links.
 * - Handles navigation between different sections/pages.
 * - Manages user authentication UI (Login/Signup buttons vs Profile).
 * - Adapts layout for mobile devices (hamburger menu).
 * - Changes appearance on scroll (transparent vs white background).
 */

import React, { useState, useEffect } from 'react';
import { Button } from './Button';

interface HeaderProps {
    // Function to handle navigation requests
    onNavigate: (sectionId?: string) => void;
    // Current active page to highlight links or determine behavior
    currentPage: 'home' | 'services' | 'doctors' | 'articles' | 'about' | 'auth' | 'profile';
    // User login status
    isLoggedIn?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate, currentPage, isLoggedIn = false }) => {
    // State to track if the page has been scrolled (for styling changes)
    const [scrolled, setScrolled] = useState(false);
    // State to toggle the mobile navigation menu
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Effect to add/remove scroll event listener
    useEffect(() => {
        const handleScroll = () => {
            // Change header style after scrolling 20px
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        // Cleanup listener on unmount
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Handles clicks on navigation items
    const handleNavClick = (id: string) => {
        if (id === 'about') {
            onNavigate('about');
        } else if (currentPage === 'home') {
            // If on home page, scroll to the section
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            } else if (id === 'home') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        } else {
            // If on another page, navigate to the target page
            onNavigate(id === 'home' ? undefined : id);
        }
        // Close mobile menu after selection
        setIsMenuOpen(false);
    };

    return (
        <header
            className={`fixed top-0 z-50 w-full transition-all duration-300 py-4 ${scrolled
                ? 'bg-white/80 backdrop-blur-md shadow-sm' // Scrolled style
                : 'bg-transparent' // Initial style
                }`}
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">
                    {/* Logo Section */}
                    <div className="flex-shrink-0 flex items-center cursor-pointer gap-2" onClick={() => handleNavClick('home')}>
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0EA5E9] to-[#06B6D4] flex items-center justify-center text-white shadow-lg shadow-sky-500/30">
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                        </div>
                        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#0F172A] to-[#334155]">Refresh Your Heart</span>
                    </div>

                    {/* Desktop Navigation Links (Hidden on mobile) */}
                    <nav className="hidden md:flex items-center space-x-8">
                        {['Services', 'Tips', 'Doctors', 'About'].map((item) => (
                            <button
                                key={item}
                                onClick={() => handleNavClick(item.toLowerCase())}
                                className="text-sm font-medium text-gray-600 hover:text-[#0EA5E9] transition-colors relative group"
                            >
                                {item}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#0EA5E9] transition-all group-hover:w-full"></span>
                            </button>
                        ))}
                    </nav>

                    {/* CTA Buttons (Login/Signup or Profile) */}
                    <div className="hidden md:flex items-center gap-3">
                        {isLoggedIn ? (
                            // Show Profile button if logged in
                            <button
                                className="flex items-center gap-2 pl-2 pr-4 py-1.5 rounded-full bg-white border border-gray-200 hover:border-[#0EA5E9] transition-all shadow-sm group"
                                onClick={() => onNavigate('profile')}
                            >
                                <img
                                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100&h=100"
                                    alt="Profile"
                                    className="w-8 h-8 rounded-full object-cover border border-gray-100"
                                />
                                <span className="text-sm font-semibold text-gray-700 group-hover:text-[#0EA5E9]">My Profile</span>
                            </button>
                        ) : (
                            // Show Login/Signup buttons if not logged in
                            <>
                                <button
                                    className="text-sm font-semibold text-gray-600 hover:text-[#0F172A] transition-colors"
                                    onClick={() => onNavigate('login')}
                                >
                                    Log In
                                </button>
                                <Button
                                    size="sm"
                                    className="rounded-full bg-[#0F172A] text-white hover:bg-[#1E293B] shadow-lg hover:shadow-xl transition-all hover:scale-105"
                                    onClick={() => onNavigate('signup')}
                                >
                                    Sign Up
                                </Button>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Toggle Button */}
                    <div className="md:hidden">
                        <button
                            className="p-2 rounded-lg text-gray-600 hover:bg-gray-100"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            {isMenuOpen ? (
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation Menu (Dropdown) */}
            {isMenuOpen && (
                <div className="md:hidden bg-white/95 backdrop-blur-xl border-b border-gray-100 absolute w-full">
                    <div className="px-4 pt-2 pb-6 space-y-2">
                        {['Home', 'Services', 'Tips', 'Doctors', 'About'].map((item) => (
                            <button
                                key={item}
                                onClick={() => handleNavClick(item === 'Home' ? 'home' : item.toLowerCase())}
                                className="block px-3 py-3 rounded-xl text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 w-full text-left transition-colors"
                            >
                                {item}
                            </button>
                        ))}
                        <div className="pt-4 border-t border-gray-100 mt-2">
                            {isLoggedIn ? (
                                <Button className="w-full rounded-xl" onClick={() => onNavigate('profile')}>
                                    My Profile
                                </Button>
                            ) : (
                                <div className="flex flex-col gap-3">
                                    <Button variant="outline" className="w-full rounded-xl" onClick={() => onNavigate('login')}>
                                        Log In
                                    </Button>
                                    <Button className="w-full rounded-xl" onClick={() => onNavigate('signup')}>
                                        Sign Up
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};
