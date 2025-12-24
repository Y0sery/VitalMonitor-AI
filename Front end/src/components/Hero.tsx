/**
 * Hero.tsx
 * 
 * Role: Landing Page Hero Section
 * Responsibilities:
 * - Serves as the first visual entry point for users.
 * - Displays the main value proposition and Call to Action (CTA) buttons.
 * - Features animated background elements and entrance animations for engagement.
 * - Displays key statistics to build trust.
 */

import React, { useEffect, useState } from 'react';
import { Button } from './Button';

export const Hero: React.FC = () => {
    // State to trigger entrance animations after mount
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Trigger animation shortly after component mounts
        setIsVisible(true);
    }, []);

    // Smooth scroll to specific sections on the page
    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section className="relative bg-[#F8FAFC] pt-24 pb-20 lg:pt-32 lg:pb-32 overflow-hidden">
            {/* Abstract Background Elements - Animated blobs for visual interest */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div
                    className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-[#0EA5E9] rounded-full blur-[120px] opacity-20 animate-pulse"
                />
                <div
                    className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#6366F1] rounded-full blur-[100px] opacity-20 animate-pulse delay-1000"
                />
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                    {/* Left Column: Text Content & CTAs */}
                    <div className={`flex-1 text-center lg:text-left transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                        <div>
                            {/* Badge */}
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 text-sky-700 text-sm font-semibold mb-6">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
                                </span>
                                AI-Powered Cardiology
                            </div>

                            {/* Main Headline */}
                            <h1 className="text-5xl tracking-tight font-extrabold text-[#0F172A] sm:text-6xl md:text-7xl leading-[1.1] mb-6">
                                <span className="block">Advanced Cardiac</span>
                                <span className="block">Care For Your</span>
                                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#0EA5E9] to-[#06B6D4]">Health!</span>
                            </h1>

                            {/* Subheadline */}
                            <p className="mt-4 text-xl text-[#64748B] max-w-2xl mx-auto lg:mx-0 mb-8 leading-relaxed">
                                Experience the future of heart health with our AI-driven diagnostics and expert consultation platform. Early detection saves lives.
                            </p>
                        </div>

                        {/* Action Buttons */}
                        <div
                            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                        >
                            <Button
                                size="lg"
                                className="rounded-full px-8 bg-[#0EA5E9] hover:bg-[#0284C7] shadow-lg shadow-sky-500/20 flex items-center gap-2 transition-all hover:scale-105"
                                onClick={() => scrollToSection('services')}
                            >
                                Try For Free
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                            </Button>
                            <Button
                                variant="outline"
                                size="lg"
                                className="rounded-full px-8 border-gray-200 text-[#0F172A] hover:border-[#0EA5E9] hover:text-[#0EA5E9] transition-all"
                                onClick={() => scrollToSection('doctors')}
                            >
                                Find a Doctor
                            </Button>
                        </div>

                        {/* Trust Indicators / Features */}
                        <div
                            className="mt-10 flex items-center justify-center lg:justify-start gap-6 text-sm text-gray-500"
                        >
                            <div className="flex items-center gap-2">
                                <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                <span>Free Consultation</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                <span>24/7 Support</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Stats Grid & Visuals */}
                    <div
                        className={`flex-1 w-full max-w-xl lg:max-w-none transition-all duration-1000 delay-300 transform ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}
                    >
                        <div className="relative">
                            {/* Decorative background shape */}
                            <div className="absolute inset-0 bg-gradient-to-r from-sky-200 to-indigo-200 rounded-[2rem] transform rotate-3 blur-lg opacity-50"></div>

                            {/* Glassmorphism Card Container */}
                            <div className="bg-white/60 backdrop-blur-xl rounded-[2rem] shadow-2xl shadow-sky-900/5 p-8 lg:p-12 border border-white/50 relative">
                                <div className="grid grid-cols-2 gap-8">
                                    {/* Stat Item 1 */}
                                    <div className="text-center p-4 rounded-2xl bg-white/50 hover:bg-white transition-colors">
                                        <div className="text-4xl font-extrabold text-[#0EA5E9] mb-2">98%</div>
                                        <div className="text-sm font-medium text-gray-500">Accuracy Rate</div>
                                    </div>
                                    {/* Stat Item 2 */}
                                    <div className="text-center p-4 rounded-2xl bg-white/50 hover:bg-white transition-colors">
                                        <div className="text-4xl font-extrabold text-[#6366F1] mb-2">10k+</div>
                                        <div className="text-sm font-medium text-gray-500">Patients Helped</div>
                                    </div>
                                    {/* Stat Item 3 */}
                                    <div className="text-center p-4 rounded-2xl bg-white/50 hover:bg-white transition-colors">
                                        <div className="text-4xl font-extrabold text-[#06B6D4] mb-2">50+</div>
                                        <div className="text-sm font-medium text-gray-500">Specialists</div>
                                    </div>
                                    {/* Stat Item 4 */}
                                    <div className="text-center p-4 rounded-2xl bg-white/50 hover:bg-white transition-colors">
                                        <div className="text-4xl font-extrabold text-[#10B981] mb-2">24/7</div>
                                        <div className="text-sm font-medium text-gray-500">Emergency Care</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
