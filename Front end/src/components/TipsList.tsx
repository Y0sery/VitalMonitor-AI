/**
 * TipsList.tsx
 * 
 * Role: Health Tips Display Component
 * Responsibilities:
 * - Displays a curated list of health tips and articles.
 * - Provides a "Read More" interaction to view full details.
 * - Supports a "View All" action to navigate to the full articles page.
 * - Uses a responsive grid layout for optimal viewing on different devices.
 */

import React from 'react';
import { Button } from './Button';

interface Tip {
    id: string;
    title: string;
    content: string;
    image: string;
    category: string;
    readTime: string;
}

interface TipsListProps {
    tips: Tip[];
    onReadMore: (tip: Tip) => void;
    onViewAll: () => void;
}

export const TipsList: React.FC<TipsListProps> = ({ tips, onReadMore, onViewAll }) => {
    return (
        <section id="tips" className="py-24 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header with View All Button */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div>
                        <div className="text-[#0EA5E9] font-bold tracking-wide uppercase text-sm mb-2">Health Insights</div>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-[#0F172A]">
                            Latest Health Tips
                        </h2>
                        <p className="mt-4 text-lg text-[#64748B] max-w-2xl">
                            Expert advice and insights to help you maintain a healthy heart and lifestyle.
                        </p>
                    </div>
                    <Button
                        variant="outline"
                        className="hidden md:flex rounded-xl border-gray-200 hover:border-[#0EA5E9] hover:text-[#0EA5E9]"
                        onClick={onViewAll}
                    >
                        View More Tips
                    </Button>
                </div>

                {/* Tips Grid */}
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {tips.map((tip) => (
                        <div
                            key={tip.id}
                            className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full hover:-translate-y-1"
                        >
                            {/* Tip Image & Category Badge */}
                            <div className="relative h-48 overflow-hidden">
                                <div className="absolute top-4 left-4 z-10">
                                    <span className="px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-xs font-bold text-[#0F172A] shadow-sm">
                                        {tip.category}
                                    </span>
                                </div>
                                <img
                                    src={tip.image}
                                    alt={tip.title}
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                />
                            </div>

                            {/* Tip Content */}
                            <div className="p-6 flex-1 flex flex-col">
                                <div className="flex items-center gap-2 text-xs text-[#64748B] mb-3">
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    <span>{tip.readTime} read</span>
                                </div>
                                <h3 className="text-xl font-bold text-[#0F172A] mb-3 group-hover:text-[#0EA5E9] transition-colors line-clamp-2">
                                    {tip.title}
                                </h3>
                                <p className="text-[#64748B] text-sm mb-6 line-clamp-3 flex-1">
                                    {tip.content}
                                </p>
                                <button
                                    className="flex items-center gap-2 text-[#0EA5E9] font-semibold text-sm group/btn"
                                    onClick={() => onReadMore(tip)}
                                >
                                    Read Article
                                    <svg className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Mobile View All Button */}
                <div className="mt-12 text-center md:hidden">
                    <Button
                        variant="outline"
                        className="w-full rounded-xl border-gray-200 hover:border-[#0EA5E9] hover:text-[#0EA5E9]"
                        onClick={onViewAll}
                    >
                        View More Tips
                    </Button>
                </div>
            </div>
        </section>
    );
};
