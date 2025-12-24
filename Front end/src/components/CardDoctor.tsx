/**
 * CardDoctor.tsx
 * 
 * Role: Doctor Display Card (Grid Format)
 * Responsibilities:
 * - Displays doctor information in a vertical card layout.
 * - Shows doctor's image, name, specialty, rating, availability, and country.
 * - Provides interactive buttons to view the doctor's profile or book an appointment.
 * - Features hover effects for better user engagement.
 */

import React from 'react';
import { Button } from './Button';

interface Doctor {
    id: string;
    name: string;
    specialty: string;
    image: string;
    rating: number;
    availability: string;
    country: string;
}

interface CardDoctorProps {
    doctor: Doctor;
    // Callback to initiate the booking process
    onBook: (doctor: Doctor) => void;
    // Callback to navigate to the doctor's detailed profile
    onViewProfile: (doctor: Doctor) => void;
}

export const CardDoctor: React.FC<CardDoctorProps> = ({ doctor, onBook, onViewProfile }) => {
    const isAvailable = doctor.availability === 'Available';

    return (
        <div
            className="group relative bg-white rounded-3xl p-4 transition-all duration-300 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] border border-gray-100 hover:border-[#0EA5E9] h-full flex flex-col hover:-translate-y-2"
        >
            {/* Image Container with Overlay Effects */}
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl mb-4">
                {/* Gradient Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                {/* Rating Badge (Top Right) */}
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm z-20">
                    <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                    <span className="text-xs font-bold text-[#0F172A]">{doctor.rating}</span>
                </div>
                {/* Availability Badge (Top Left) */}
                <div className="absolute top-3 left-3">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold shadow-sm ${isAvailable ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-600'}`}>
                        {doctor.availability}
                    </span>
                </div>
            </div>

            {/* Content Section */}
            <div className="px-2 flex-1 flex flex-col">
                <div className="mb-1 text-[#0EA5E9] text-xs font-bold uppercase tracking-wider">{doctor.specialty}</div>
                <h3 className="text-xl font-bold text-[#0F172A] mb-2 group-hover:text-[#0EA5E9] transition-colors line-clamp-1">{doctor.name}</h3>

                <div className="flex items-center gap-4 text-sm text-[#64748B] mb-6">
                    <div className="flex items-center gap-1.5">
                        <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                        <span className="line-clamp-1">{doctor.country}</span>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-auto flex gap-3">
                    <Button
                        variant="outline"
                        className="flex-1 rounded-xl border-gray-200 hover:border-[#0EA5E9] hover:text-[#0EA5E9]"
                        onClick={() => onViewProfile(doctor)}
                    >
                        Profile
                    </Button>
                    <Button
                        className="flex-1 rounded-xl bg-[#0EA5E9] text-white hover:bg-[#0284C7] shadow-lg shadow-sky-500/20"
                        disabled={!isAvailable}
                        onClick={() => onBook(doctor)}
                    >
                        Book
                    </Button>
                </div>
            </div>
        </div>
    );
};
