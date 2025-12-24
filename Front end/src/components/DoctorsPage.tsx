/**
 * DoctorsPage.tsx
 * 
 * Role: Doctor Search and Booking Page
 * Responsibilities:
 * - Displays a list of available doctors.
 * - Provides search and filtering capabilities (by name, specialty, etc.).
 * - Handles the flow for booking appointments or consultations.
 * - Integrates with the BookingModal for the booking process.
 */

import React, { useState } from 'react';
import { Button } from './Button';
import { DoctorCardWide } from './DoctorCardWide';
import { BookingModal } from './BookingModal';

interface DoctorsPageProps {
    onNavigateHome: () => void;
}

// Mock Data (Expanded for the page)
const doctors = [
    {
        id: '1',
        name: 'Dr. Sarah Smith',
        specialty: 'Cardiologist',
        image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300&h=300',
        rating: 4.9,
        availability: 'Available',
        country: 'USA',
        description: 'Specializes in preventative cardiology and advanced heart failure management with over 15 years of experience.'
    },
    {
        id: '2',
        name: 'Dr. Michael Chen',
        specialty: 'Cardiac Surgeon',
        image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=300&h=300',
        rating: 4.8,
        availability: 'Busy',
        country: 'Canada',
        description: 'Expert in minimally invasive cardiac surgery and complex valve repairs. Pioneered several new surgical techniques.'
    },
    {
        id: '3',
        name: 'Dr. Emily Davis',
        specialty: 'Pediatric Cardiologist',
        image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=300&h=300',
        rating: 4.9,
        availability: 'Available',
        country: 'UK',
        description: 'Dedicated to treating congenital heart defects in children. Known for her compassionate approach with families.'
    },
    {
        id: '4',
        name: 'Dr. James Wilson',
        specialty: 'Interventional Cardiologist',
        image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=300&h=300',
        rating: 4.7,
        availability: 'Available',
        country: 'Australia',
        description: 'Focuses on catheter-based treatments for structural heart diseases. Active researcher in new stent technologies.'
    },
    {
        id: '5',
        name: 'Dr. Linda Martinez',
        specialty: 'Electrophysiologist',
        image: 'https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&q=80&w=300&h=300',
        rating: 4.8,
        availability: 'Available',
        country: 'Spain',
        description: 'Specialist in heart rhythm disorders. Uses advanced mapping systems to treat complex arrhythmias.'
    }
];

export const DoctorsPage: React.FC<DoctorsPageProps> = ({ onNavigateHome }) => {
    // State for search and filtering
    const [searchTerm, setSearchTerm] = useState('');
    // State for the currently selected doctor for booking
    const [selectedDoctor, setSelectedDoctor] = useState<any>(null);
    // State to control booking modal visibility
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
    // State to track booking type (consultation vs appointment)
    const [bookingType, setBookingType] = useState<'consultation' | 'appointment'>('appointment');

    // Open modal for appointment booking
    const handleBookAppointment = (doctor: any) => {
        setSelectedDoctor(doctor);
        setBookingType('appointment');
        setIsBookingModalOpen(true);
    };

    // Open modal for consultation booking
    const handleBookConsultation = (doctor: any) => {
        setSelectedDoctor(doctor);
        setBookingType('consultation');
        setIsBookingModalOpen(true);
    };

    // Handle booking confirmation from the modal
    const handleConfirmBooking = (date: string, time: string) => {
        console.log(`Booked ${bookingType} with ${selectedDoctor.name} on ${date} at ${time}`);
        // Here you would typically make an API call
        alert(`${bookingType === 'consultation' ? 'Consultation' : 'Appointment'} booked successfully!`);
    };

    // Filter doctors based on search term (name or specialty)
    const filteredDoctors = doctors.filter(doctor =>
        doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-[#F8FAFC] pt-20 pb-12">
            {/* Header Section */}
            <div className="bg-white border-b border-gray-100 pb-8 pt-8">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                        <div>
                            <button
                                onClick={onNavigateHome}
                                className="text-sm text-gray-500 hover:text-[#0EA5E9] flex items-center gap-1 mb-2 transition-colors"
                            >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                Back to Home
                            </button>
                            <h1 className="text-3xl font-extrabold text-[#0F172A]">Our Expert Doctors</h1>
                            <p className="text-gray-500 mt-2">Find and book appointments with our world-class cardiologists.</p>
                        </div>
                        <div className="flex gap-3">
                            {/* Buttons removed as requested */}
                        </div>
                    </div>

                    {/* Search and Filters Bar */}
                    <div className="flex flex-col md:flex-row gap-4 bg-gray-50 p-2 rounded-2xl border border-gray-100">
                        <div className="flex-1 relative">
                            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <input
                                type="text"
                                placeholder="Search by name or specialty..."
                                className="w-full pl-12 pr-4 py-3 rounded-xl border-none bg-white shadow-sm focus:ring-2 focus:ring-[#0EA5E9]/20 text-gray-700 placeholder-gray-400"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        {/* Filter Dropdowns (Visual only for now) */}
                        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
                            <select className="px-4 py-3 rounded-xl border-none bg-white shadow-sm text-gray-600 font-medium focus:ring-2 focus:ring-[#0EA5E9]/20 cursor-pointer min-w-[140px]">
                                <option>Availability</option>
                                <option>Available Today</option>
                                <option>Next 3 Days</option>
                            </select>
                            <select className="px-4 py-3 rounded-xl border-none bg-white shadow-sm text-gray-600 font-medium focus:ring-2 focus:ring-[#0EA5E9]/20 cursor-pointer min-w-[140px]">
                                <option>Location</option>
                                <option>USA</option>
                                <option>UK</option>
                                <option>Canada</option>
                            </select>
                            <select className="px-4 py-3 rounded-xl border-none bg-white shadow-sm text-gray-600 font-medium focus:ring-2 focus:ring-[#0EA5E9]/20 cursor-pointer min-w-[140px]">
                                <option>Language</option>
                                <option>English</option>
                                <option>Spanish</option>
                                <option>French</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {/* Doctor List Grid */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 gap-6 max-w-5xl mx-auto">
                    {filteredDoctors.map((doctor) => (
                        <DoctorCardWide
                            key={doctor.id}
                            doctor={doctor}
                            onBookAppointment={handleBookAppointment}
                            onBookConsultation={handleBookConsultation}
                        />
                    ))}
                    {/* Empty State */}
                    {filteredDoctors.length === 0 && (
                        <div className="text-center py-12">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                                <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-medium text-gray-900">No doctors found</h3>
                            <p className="text-gray-500 mt-1">Try adjusting your search or filters.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Booking Modal */}
            <BookingModal
                isOpen={isBookingModalOpen}
                onClose={() => setIsBookingModalOpen(false)}
                doctor={selectedDoctor}
                onConfirm={handleConfirmBooking}
            />
        </div>
    );
};
