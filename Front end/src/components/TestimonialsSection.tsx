/**
 * TestimonialsSection.tsx
 * 
 * Role: Patient Testimonials Display
 * Responsibilities:
 * - Showcases positive feedback from patients to build trust.
 * - Displays patient details (name, role, image) and their rating.
 * - Uses a grid layout to present multiple testimonials effectively.
 */

import React from 'react';

interface Testimonial {
    id: string;
    name: string;
    role: string;
    image: string;
    content: string;
    rating: number;
}

// Mock Data for Testimonials
const testimonials: Testimonial[] = [
    {
        id: '1',
        name: 'Emily Thompson',
        role: 'Patient',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150&h=150',
        content: "The care I received was exceptional. Dr. Smith took the time to explain everything clearly and made me feel completely at ease during my treatment.",
        rating: 5
    },
    {
        id: '2',
        name: 'David Wilson',
        role: 'Patient',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150&h=150',
        content: "I can't thank the team enough. The facility is state-of-the-art, and the staff is incredibly professional and kind. Highly recommended!",
        rating: 5
    },
    {
        id: '3',
        name: 'Maria Rodriguez',
        role: 'Patient',
        image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150&h=150',
        content: "Booking an appointment was seamless, and the follow-up care has been fantastic. It's rare to find such dedicated medical professionals.",
        rating: 4
    }
];

export const TestimonialsSection: React.FC = () => {
    return (
        <section className="py-24 bg-[#F8FAFC]">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <div className="text-[#0EA5E9] font-bold tracking-wide uppercase text-sm mb-2">Testimonials</div>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-[#0F172A] mb-4">
                        What Our Patients Say
                    </h2>
                    <p className="text-lg text-[#64748B]">
                        Read about the experiences of our patients and their journey to better heart health.
                    </p>
                </div>

                {/* Testimonials Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial) => (
                        <div
                            key={testimonial.id}
                            className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                        >
                            {/* User Info */}
                            <div className="flex items-center gap-4 mb-6">
                                <img
                                    src={testimonial.image}
                                    alt={testimonial.name}
                                    className="w-14 h-14 rounded-full object-cover border-2 border-gray-50"
                                />
                                <div>
                                    <h4 className="font-bold text-[#0F172A]">{testimonial.name}</h4>
                                    <p className="text-sm text-[#64748B]">{testimonial.role}</p>
                                </div>
                            </div>

                            {/* Rating Stars */}
                            <div className="flex gap-1 mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <svg
                                        key={i}
                                        className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-200'}`}
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>

                            {/* Review Content */}
                            <p className="text-gray-600 leading-relaxed italic">
                                "{testimonial.content}"
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
