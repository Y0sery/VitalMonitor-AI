/**
 * DoctorProfileModal.tsx
 * 
 * Role: Detailed Doctor Information Modal
 * Responsibilities:
 * - Displays comprehensive information about a specific doctor in a modal window.
 * - Shows doctor's avatar, name, specialty, rating, location, and biography.
 * - Provides a "Book Appointment" action that triggers the booking flow.
 * - Used when a user clicks "View Profile" on a doctor card.
 */

import React from 'react';
import { Button } from './Button';
import { Modal } from './Modal';

interface DoctorProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
    doctor: {
        name: string;
        image: string;
        specialty: string;
        rating: number;
        availability: string;
        country: string;
        description?: string;
    } | null;
    // Callback to initiate booking from within the profile modal
    onBook: (doctor: any) => void;
}

export const DoctorProfileModal: React.FC<DoctorProfileModalProps> = ({ isOpen, onClose, doctor, onBook }) => {
    if (!doctor) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="">
            <div className="pt-0">
                {/* Header Section: Avatar and Basic Info */}
                <div className="flex flex-col items-center mb-6">
                    <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg mb-4">
                        <img
                            src={doctor.image}
                            alt={doctor.name}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <h3 className="text-2xl font-bold text-[#0F172A] text-center">{doctor.name}</h3>
                    <div className="text-[#0EA5E9] font-medium text-center">{doctor.specialty}</div>
                </div>

                {/* Key Statistics: Rating and Location */}
                <div className="flex justify-center gap-6 mb-8 border-b border-gray-100 pb-6">
                    <div className="text-center">
                        <div className="flex items-center justify-center gap-1 text-yellow-500 font-bold text-lg">
                            <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                            {doctor.rating}
                        </div>
                        <div className="text-xs text-gray-400 font-medium uppercase tracking-wide">Rating</div>
                    </div>
                    <div className="w-px bg-gray-100"></div>
                    <div className="text-center">
                        <div className="flex items-center justify-center gap-1 text-gray-700 font-bold text-lg">
                            <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                            {doctor.country}
                        </div>
                        <div className="text-xs text-gray-400 font-medium uppercase tracking-wide">Location</div>
                    </div>
                </div>

                {/* Biography Section */}
                <div className="mb-8">
                    <h4 className="text-sm font-bold text-[#0F172A] mb-2">About Doctor</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                        {doctor.description || `Dr. ${doctor.name.split(' ').pop()} is a highly skilled ${doctor.specialty.toLowerCase()} dedicated to providing top-quality patient care. With years of experience in the field, they specialize in advanced treatments and compassionate care.`}
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                    <Button
                        variant="outline"
                        className="flex-1 rounded-xl h-12 border-gray-200 bg-gray-50 hover:bg-gray-100 text-gray-700 font-bold"
                        onClick={onClose}
                    >
                        Close
                    </Button>
                    <Button
                        className="flex-1 rounded-xl h-12 bg-[#0EA5E9] text-white hover:bg-[#0284C7] shadow-lg shadow-sky-500/20 font-bold"
                        onClick={() => {
                            onClose();
                            onBook(doctor);
                        }}
                    >
                        Book Appointment
                    </Button>
                </div>
            </div>
        </Modal>
    );
};
