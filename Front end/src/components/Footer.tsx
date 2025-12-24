/**
 * Footer.tsx
 * 
 * Role: Page Footer
 * Responsibilities:
 * - Displays static links, contact information, and copyright.
 * - Provides social media links.
 * - Acts as the bottom anchor of the application layout.
 */

import React from 'react';

export const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-900 text-white pt-20 pb-10 relative overflow-hidden">
            {/* Background Gradients for visual appeal */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
                <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-600 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-20%] left-[-10%] w-[50%] h-[50%] bg-purple-600 rounded-full blur-[120px]" />
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand Section: Logo and Description */}
                    <div className="col-span-1 lg:col-span-1">
                        <div className="flex items-center mb-6 gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                            </div>
                            <span className="text-2xl font-bold tracking-tight">Refresh Your Heart</span>
                        </div>
                        <p className="text-gray-400 text-base leading-relaxed mb-6">
                            Advanced AI-driven heart disease detection and expert consultation platform. Your heart health is our priority.
                        </p>
                        {/* Social Media Links */}
                        <div className="flex space-x-4">
                            {['Facebook', 'Twitter', 'Instagram', 'LinkedIn'].map((social) => (
                                <a key={social} href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white transition-all duration-300">
                                    <span className="sr-only">{social}</span>
                                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" /></svg>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links Column */}
                    <div>
                        <h3 className="text-lg font-bold mb-6 text-white">Quick Links</h3>
                        <ul className="space-y-4">
                            {['Home', 'Services', 'Health Tips', 'Find a Doctor'].map((link) => (
                                <li key={link}>
                                    <button className="text-gray-400 hover:text-blue-400 transition-colors flex items-center gap-2 group">
                                        <span className="w-1.5 h-1.5 rounded-full bg-gray-600 group-hover:bg-blue-400 transition-colors"></span>
                                        {link}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services Column */}
                    <div>
                        <h3 className="text-lg font-bold mb-6 text-white">Our Services</h3>
                        <ul className="space-y-4">
                            {['Heart Disease Detection', 'Severity Assessment', 'Cardiologist Consultation', 'Health Monitoring'].map((link) => (
                                <li key={link}>
                                    <button className="text-gray-400 hover:text-blue-400 transition-colors flex items-center gap-2 group">
                                        <span className="w-1.5 h-1.5 rounded-full bg-gray-600 group-hover:bg-blue-400 transition-colors"></span>
                                        {link}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Information Column */}
                    <div>
                        <h3 className="text-lg font-bold mb-6 text-white">Contact Us</h3>
                        <ul className="space-y-4 text-gray-400">
                            <li className="flex items-start gap-3">
                                <svg className="h-6 w-6 text-blue-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <span>support@refreshyourheart.com</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <svg className="h-6 w-6 text-blue-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                <span>+1 (555) 123-4567</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <svg className="h-6 w-6 text-blue-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span>123 Medical Center Dr, NY</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Copyright Section */}
                <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-500 text-sm">&copy; {new Date().getFullYear()} Refresh Your Heart. All rights reserved.</p>
                    <div className="flex space-x-6 text-sm text-gray-500">
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                        <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};
