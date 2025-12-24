/**
 * DoctorCardWide.tsx
 * 
 * Role: Doctor Display Card (Wide Format)
 * Responsibilities:
 * - Displays doctor information in a horizontal layout suitable for lists.
 * - Shows doctor's avatar, name, specialty, rating, availability, and description.
 * - Provides action buttons for booking consultations and appointments.
 * - Used primarily in the DoctorsPage for the main listing.
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
    description?: string;
}

interface DoctorCardWideProps {
    doctor: Doctor;
    // Callback for booking an appointment (in-person)
    onBookAppointment: (doctor: Doctor) => void;
    // Callback for booking a consultation (remote/video)
    onBookConsultation: (doctor: Doctor) => void;
}

export const DoctorCardWide: React.FC<DoctorCardWideProps> = ({ doctor, onBookAppointment, onBookConsultation }) => {
    const isAvailable = doctor.availability === 'Available';

    return (
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 flex flex-col md:flex-row gap-6 items-start md:items-center">
            {/* Avatar Section with Status Indicator */}
            <div className="relative flex-shrink-0">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-gray-50 shadow-inner">
                    <img
                        src={doctor.image}
                        alt={doctor.name}
                        className="w-full h-full object-cover"
                    />
                </div>
                {/* Availability Dot */}
                <div className={`absolute bottom-1 right-1 w-5 h-5 rounded-full border-2 border-white ${isAvailable ? 'bg-emerald-500' : 'bg-gray-400'}`}></div>
            </div>

            {/* Content Section */}
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-xl font-bold text-[#0F172A] truncate">{doctor.name}</h3>
                    {/* Rating Badge */}
                    <div className="flex items-center gap-1 bg-yellow-50 px-2 py-0.5 rounded-full">
                        <svg className="w-3.5 h-3.5 text-yellow-400 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                        <span className="text-xs font-bold text-yellow-700">{doctor.rating}</span>
                    </div>
                </div>
                <div className="text-[#0EA5E9] font-medium mb-2">{doctor.specialty}</div>
                <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">
                    {doctor.description || `Specializes in ${doctor.specialty.toLowerCase()} with a focus on patient-centered care and advanced treatment methodologies.`}
                </p>
                {/* Metadata: Availability & Country */}
                <div className="flex items-center gap-2 text-xs font-medium">
                    <span className={`px-2 py-1 rounded-full ${isAvailable ? 'bg-emerald-50 text-emerald-600' : 'bg-gray-100 text-gray-500'}`}>
                        {isAvailable ? 'Available Today' : 'Not Available'}
                    </span>
                    <span className="text-gray-300">•</span>
                    <span className="text-gray-500">{doctor.country}</span>
                </div>
            </div>

            {/* Actions Section */}
            <div className="flex flex-row md:flex-col gap-3 w-full md:w-auto mt-2 md:mt-0">
                <Button
                    variant="outline"
                    className="flex-1 md:w-40 rounded-xl border-sky-100 text-sky-600 hover:bg-sky-50 hover:border-sky-200"
                    onClick={() => onBookConsultation(doctor)}
                >
                    Book Consultation
                </Button>
                <Button
                    className="flex-1 md:w-40 rounded-xl bg-[#0EA5E9] text-white hover:bg-[#0284C7] shadow-lg shadow-sky-500/20"
                    onClick={() => onBookAppointment(doctor)}
                >
                    Book Appointment
                </Button>
            </div>
        </div>
    );
};
