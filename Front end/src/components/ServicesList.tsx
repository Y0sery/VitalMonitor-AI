/**
 * ServicesList.tsx
 * 
 * Role: Services Overview Section
 * Responsibilities:
 * - Displays the core services offered by the platform (Disease Detection, Severity Assessment, Consultation).
 * - Provides entry points for users to access these services via "Try Now" buttons.
 * - Uses visual icons and descriptions to explain each service's value proposition.
 */

import React from 'react';
import { Button } from './Button';

interface Service {
    id: string;
    title: string;
    description: string;
    icon: React.ReactNode;
    color: string;
}

interface ServicesListProps {
    onTryService: (serviceId: string) => void;
}

export const ServicesList: React.FC<ServicesListProps> = ({ onTryService }) => {
    // Definition of available services
    const services: Service[] = [
        {
            id: 'model1',
            title: 'Disease Detection',
            description: 'Advanced AI analysis to detect potential heart disease risks early using your clinical data.',
            icon: (
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
            ),
            color: 'from-rose-500 to-pink-500'
        },
        {
            id: 'model2',
            title: 'Severity Assessment',
            description: 'Detailed severity classification (Early, Moderate, Critical) to guide your treatment path.',
            icon: (
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
            ),
            color: 'from-sky-500 to-cyan-500'
        },
        {
            id: 'consultation',
            title: 'Expert Consultation',
            description: 'Connect with top cardiologists for personalized advice and treatment plans.',
            icon: (
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
            ),
            color: 'from-emerald-500 to-teal-500'
        },
    ];

    return (
        <section id="services" className="py-24 bg-[#F8FAFC]">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <div className="inline-block px-4 py-1.5 rounded-full bg-sky-100 text-sky-700 font-semibold text-sm mb-4 tracking-wide">
                        OUR EXPERTISE
                    </div>
                    <h2 className="text-3xl font-extrabold text-[#0F172A] sm:text-4xl mb-4">
                        Comprehensive Heart Care Services
                    </h2>
                    <p className="text-lg text-[#64748B]">
                        We combine cutting-edge technology with medical expertise to provide holistic cardiac care solutions.
                    </p>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {services.map((service) => (
                        <div
                            key={service.id}
                            className="group bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-1 flex flex-col h-full"
                        >
                            {/* Service Icon */}
                            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6 shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                                {service.icon}
                            </div>
                            {/* Service Title */}
                            <h3 className="text-xl font-bold text-[#0F172A] mb-3 group-hover:text-[#0EA5E9] transition-colors">
                                {service.title}
                            </h3>
                            {/* Service Description */}
                            <p className="text-[#64748B] leading-relaxed mb-8 flex-1">
                                {service.description}
                            </p>
                            {/* Action Button */}
                            <Button
                                className="w-full rounded-xl bg-[#0F172A] hover:bg-[#1E293B] text-white"
                                onClick={() => onTryService(service.id)}
                            >
                                Try Now
                            </Button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
