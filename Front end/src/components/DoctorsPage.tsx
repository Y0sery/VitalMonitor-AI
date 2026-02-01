/**
 * DoctorsPage.tsx
 * Premium Design with Enhanced UI/UX
 */

import React, { useState, useMemo } from 'react';
import { Button } from './Button';

interface Doctor {
    id: string;
    name: string;
    specialty: string;
    image: string;
    rating: number;
    availability: string;
    country: string;
    description: string;
    hourlyRate?: number;
    workingHours?: { start: string; end: string };
    workingDays?: string[];
}

interface DoctorsPageProps {
    onNavigateHome: () => void;
    onBookingConfirm: (doctor: any, date: string, time: string, type: 'appointment' | 'consultation') => void;
    doctors: Doctor[];
}

export const DoctorsPage: React.FC<DoctorsPageProps> = ({ 
    onNavigateHome, 
    onBookingConfirm,
    doctors 
}) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [availabilityFilter, setAvailabilityFilter] = useState('all');
    const [locationFilter, setLocationFilter] = useState('all');
    const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

    const filteredDoctors = useMemo(() => {
        return doctors.filter(doctor => {
            const matchesSearch = 
                doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase());
            
            const matchesAvailability = 
                availabilityFilter === 'all' || 
                doctor.availability.toLowerCase() === availabilityFilter.toLowerCase();
            
            const matchesLocation = 
                locationFilter === 'all' || 
                doctor.country === locationFilter;

            return matchesSearch && matchesAvailability && matchesLocation;
        });
    }, [doctors, searchQuery, availabilityFilter, locationFilter]);

    const countries = useMemo(() => {
        return ['all', ...Array.from(new Set(doctors.map(d => d.country)))];
    }, [doctors]);

    const handleBookAppointment = (doctor: Doctor) => {
        setSelectedDoctor(doctor);
        setIsBookingModalOpen(true);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-50">
            {/* Enhanced Hero Section */}
            <div className="bg-gradient-to-r from-[#0EA5E9] to-[#0284C7] text-white pt-32 pb-16 relative overflow-hidden">
                {/* Decorative Elements */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
                    <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-300 rounded-full blur-3xl"></div>
                </div>

                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <button
                        onClick={onNavigateHome}
                        className="flex items-center gap-2 text-white/90 hover:text-white transition-colors mb-8 group"
                    >
                        <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        <span className="font-semibold">Back to Home</span>
                    </button>

                    <div className="max-w-3xl">
                        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
                            Our Expert Doctors
                        </h1>
                        <p className="text-xl text-white/90 mb-8 leading-relaxed">
                            Connect with world-class cardiologists dedicated to your heart health
                        </p>

                        {/* Enhanced Search Bar */}
                        <div className="bg-white rounded-2xl shadow-2xl p-2">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                                {/* Search Input */}
                                <div className="md:col-span-1 relative">
                                    <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                    <input
                                        type="text"
                                        placeholder="Search doctors..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full pl-12 pr-4 py-4 rounded-xl border-0 focus:ring-2 focus:ring-[#0EA5E9] outline-none transition-all text-gray-900 placeholder-gray-400"
                                    />
                                </div>

                                {/* Availability Filter */}
                                <select
                                    value={availabilityFilter}
                                    onChange={(e) => setAvailabilityFilter(e.target.value)}
                                    className="px-4 py-4 rounded-xl border-0 focus:ring-2 focus:ring-[#0EA5E9] outline-none transition-all text-gray-900 font-medium bg-white"
                                >
                                    <option value="all">All Availability</option>
                                    <option value="available">✅ Available</option>
                                    <option value="busy">🔴 Busy</option>
                                </select>

                                {/* Location Filter */}
                                <select
                                    value={locationFilter}
                                    onChange={(e) => setLocationFilter(e.target.value)}
                                    className="px-4 py-4 rounded-xl border-0 focus:ring-2 focus:ring-[#0EA5E9] outline-none transition-all text-gray-900 font-medium bg-white"
                                >
                                    {countries.map(country => (
                                        <option key={country} value={country}>
                                            {country === 'all' ? '🌍 All Locations' : `📍 ${country}`}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Results Count */}
                        <div className="mt-6 text-white/80 text-sm">
                            {filteredDoctors.length === doctors.length ? (
                                <span>✨ Showing all <strong className="text-white">{doctors.length}</strong> expert doctors</span>
                            ) : (
                                <span>🔍 Found <strong className="text-white">{filteredDoctors.length}</strong> of {doctors.length} doctors</span>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Doctors Grid */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-8 pb-20 relative z-20">
                {filteredDoctors.length > 0 ? (
                    <div className="grid grid-cols-1 gap-6">
                        {filteredDoctors.map((doctor) => (
                            <div 
                                key={doctor.id} 
                                className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl border border-gray-100 overflow-hidden transition-all duration-300 hover:-translate-y-1"
                            >
                                <div className="flex flex-col md:flex-row">
                                    {/* Doctor Image Section */}
                                    <div className="relative md:w-64 flex-shrink-0 bg-gradient-to-br from-blue-50 to-purple-50 p-8">
                                        <div className="relative">
                                            <img
                                                src={doctor.image}
                                                alt={doctor.name}
                                                className="w-40 h-40 mx-auto rounded-3xl object-cover shadow-xl ring-4 ring-white"
                                            />
                                            {/* Availability Badge */}
                                            <div className={`absolute -bottom-3 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full text-xs font-bold shadow-lg ${
                                                doctor.availability === 'Available' 
                                                    ? 'bg-green-500 text-white' 
                                                    : 'bg-gray-400 text-white'
                                            }`}>
                                                {doctor.availability === 'Available' ? '● Available' : '● Busy'}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Doctor Info Section */}
                                    <div className="flex-1 p-8">
                                        <div className="flex items-start justify-between mb-4">
                                            <div>
                                                <h3 className="text-3xl font-bold text-gray-900 mb-2 group-hover:text-[#0EA5E9] transition-colors">
                                                    {doctor.name}
                                                </h3>
                                                <p className="text-[#0EA5E9] font-bold text-lg flex items-center gap-2">
                                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    {doctor.specialty}
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-400 px-4 py-2 rounded-2xl shadow-md">
                                                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                                <span className="text-xl font-bold text-white">{doctor.rating}</span>
                                            </div>
                                        </div>

                                        <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                                            {doctor.description}
                                        </p>

                                        {/* Meta Info */}
                                        <div className="flex flex-wrap items-center gap-4 mb-6">
                                            <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-xl">
                                                <svg className="w-5 h-5 text-[#0EA5E9]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                                <span className="font-semibold text-gray-700">{doctor.country}</span>
                                            </div>
                                            
                                            {doctor.hourlyRate && (
                                                <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-xl">
                                                    <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    <span className="font-bold text-gray-900">${doctor.hourlyRate}</span>
                                                    <span className="text-gray-500 text-sm">/hour</span>
                                                </div>
                                            )}

                                            {doctor.workingDays && (
                                                <div className="flex items-center gap-2 bg-purple-50 px-4 py-2 rounded-xl">
                                                    <svg className="w-5 h-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                    <span className="text-sm font-medium text-gray-700">
                                                        {doctor.workingDays.slice(0, 3).join(', ')}
                                                        {doctor.workingDays.length > 3 && ` +${doctor.workingDays.length - 3}`}
                                                    </span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="flex flex-wrap gap-4">
                                            <button
                                                onClick={() => handleBookAppointment(doctor)}
                                                className="flex-1 min-w-[200px] bg-gradient-to-r from-[#0EA5E9] to-[#0284C7] hover:from-[#0284C7] hover:to-[#0369A1] text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
                                            >
                                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                                Book Consultation
                                            </button>
                                            <button
                                                onClick={() => handleBookAppointment(doctor)}
                                                className="flex-1 min-w-[200px] bg-white border-3 border-[#0EA5E9] text-[#0EA5E9] hover:bg-blue-50 px-8 py-4 rounded-2xl font-bold text-lg shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
                                            >
                                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                                </svg>
                                                Book Appointment
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    // Enhanced No Results State
                    <div className="bg-white rounded-3xl shadow-xl p-16 text-center">
                        <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-8">
                            <svg className="w-16 h-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <h3 className="text-3xl font-bold text-gray-900 mb-4">No Doctors Found</h3>
                        <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto">
                            We couldn't find any doctors matching your criteria. Try adjusting your filters or search terms.
                        </p>
                        <button
                            onClick={() => {
                                setSearchQuery('');
                                setAvailabilityFilter('all');
                                setLocationFilter('all');
                            }}
                            className="bg-gradient-to-r from-[#0EA5E9] to-[#0284C7] text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all hover:scale-105"
                        >
                            Clear All Filters
                        </button>
                    </div>
                )}
            </div>

            {/* Enhanced Booking Modal */}
            {isBookingModalOpen && selectedDoctor && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
                    <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden animate-scale-in">
                        {/* Modal Header */}
                        <div className="bg-gradient-to-r from-[#0EA5E9] to-[#0284C7] text-white p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-2xl font-bold mb-1">Book Appointment</h3>
                                    <p className="text-white/80">with {selectedDoctor.name}</p>
                                </div>
                                <button 
                                    onClick={() => setIsBookingModalOpen(false)}
                                    className="p-2 hover:bg-white/20 rounded-xl transition-colors"
                                >
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Modal Content */}
                        <div className="p-8">
                            <div className="flex items-center gap-4 mb-6 p-4 bg-blue-50 rounded-2xl">
                                <img src={selectedDoctor.image} alt={selectedDoctor.name} className="w-16 h-16 rounded-2xl object-cover" />
                                <div>
                                    <p className="font-bold text-gray-900">{selectedDoctor.name}</p>
                                    <p className="text-[#0EA5E9] text-sm">{selectedDoctor.specialty}</p>
                                </div>
                            </div>

                            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-200 p-6 rounded-2xl mb-6">
                                <div className="flex items-start gap-3">
                                    <svg className="w-6 h-6 text-yellow-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    <div>
                                        <p className="font-bold text-gray-900 mb-1">📅 Booking Calendar</p>
                                        <p className="text-sm text-gray-600">Select your preferred date and time in the next step</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <button 
                                    onClick={() => setIsBookingModalOpen(false)}
                                    className="flex-1 px-6 py-4 rounded-2xl border-2 border-gray-200 text-gray-700 font-bold hover:bg-gray-50 transition-all"
                                >
                                    Cancel
                                </button>
                                <button 
                                    onClick={() => {
                                        onBookingConfirm(selectedDoctor, '2024-01-20', '10:00', 'consultation');
                                        setIsBookingModalOpen(false);
                                    }}
                                    className="flex-1 px-6 py-4 rounded-2xl bg-gradient-to-r from-[#0EA5E9] to-[#0284C7] text-white font-bold shadow-lg hover:shadow-xl transition-all hover:scale-105"
                                >
                                    Continue
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* CSS Animations */}
            <style>{`
                @keyframes fade-in {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes scale-in {
                    from { transform: scale(0.95); opacity: 0; }
                    to { transform: scale(1); opacity: 1; }
                }
                .animate-fade-in {
                    animation: fade-in 0.2s ease-out;
                }
                .animate-scale-in {
                    animation: scale-in 0.3s ease-out;
                }
            `}</style>
        </div>
    );
};