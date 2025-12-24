/**
 * DoctorProfilePage.tsx
 * 
 * Role: Doctor Dashboard/Profile Page
 * Responsibilities:
 * - Displays the doctor's personal and professional information.
 * - Shows key performance statistics (patients, consultations, rating).
 * - Manages availability schedule.
 * - Handles incoming consultation requests.
 * - Lists upcoming and past appointments.
 * - Allows editing of profile information via a modal.
 */

import React, { useState } from 'react';
import { Button } from './Button';

interface DoctorProfilePageProps {
    onNavigate: (sectionId?: string) => void;
    onLogout: () => void;
}

export const DoctorProfilePage: React.FC<DoctorProfilePageProps> = ({ onNavigate, onLogout }) => {
    // Mock Data for Doctor Profile
    const doctor = {
        name: "Dr. Sarah Smith",
        specialty: "Cardiologist",
        rating: 4.9,
        reviews: 124,
        email: "dr.sarah@refreshheart.com",
        phone: "+1 (555) 987-6543",
        experience: "15 Years",
        license: "MED-2023-8892",
        hospital: "Central Heart Institute",
        bio: "Specializes in preventative cardiology and advanced heart failure management. Dedicated to providing comprehensive care with a focus on lifestyle modifications.",
        avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300&h=300"
    };

    // Mock Statistics
    const stats = [
        { label: 'Patients this Month', value: '142', trend: '+12%', color: 'bg-blue-50 text-blue-600' },
        { label: 'Total Consultations', value: '1,284', trend: '+5%', color: 'bg-indigo-50 text-indigo-600' },
        { label: 'Average Rating', value: '4.9', trend: 'Top 5%', color: 'bg-amber-50 text-amber-600' },
    ];

    // Mock Schedule Data
    const schedule = [
        { day: 'Monday', hours: '09:00 AM - 05:00 PM', status: 'Available' },
        { day: 'Tuesday', hours: '09:00 AM - 05:00 PM', status: 'Available' },
        { day: 'Wednesday', hours: 'OFF', status: 'Off' },
        { day: 'Thursday', hours: '09:00 AM - 05:00 PM', status: 'Available' },
        { day: 'Friday', hours: '09:00 AM - 02:00 PM', status: 'Available' },
    ];

    // Mock Consultation Requests
    const requests = [
        { id: 1, patient: 'John Doe', reason: 'Chest pain after exercise', time: '10 mins ago' },
        { id: 2, patient: 'Emma Wilson', reason: 'Routine check-up follow up', time: '1 hour ago' },
    ];

    // Mock Appointments List
    const appointments = [
        { id: 1, patient: 'Alice Brown', time: '10:00 AM', type: 'Check-up', status: 'Confirmed' },
        { id: 2, patient: 'Robert Taylor', time: '11:30 AM', type: 'Consultation', status: 'Confirmed' },
        { id: 3, patient: 'David Miller', time: '02:00 PM', type: 'Follow-up', status: 'Pending' },
    ];

    // State for Edit Profile Modal
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [doctorData, setDoctorData] = useState(doctor);

    // Handle saving profile changes
    const handleSaveProfile = (e: React.FormEvent) => {
        e.preventDefault();
        setIsEditModalOpen(false);
        // In a real app, we would send this data to the backend
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] pt-24 pb-12 font-sans text-[#0F172A]">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">

                {/* 1. Header Section: Avatar, Name, and Quick Actions */}
                <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 mb-8 flex flex-col md:flex-row items-center gap-8 animate-fade-in">
                    <div className="relative">
                        <img
                            src={doctorData.avatar}
                            alt={doctorData.name}
                            className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                        />
                        {/* Online Status Indicator */}
                        <div className="absolute bottom-2 right-2 w-5 h-5 bg-green-500 rounded-full border-2 border-white" title="Online"></div>
                    </div>
                    <div className="flex-1 text-center md:text-left">
                        <h1 className="text-3xl font-bold text-[#0F172A] mb-1">{doctorData.name}</h1>
                        <p className="text-[#0EA5E9] font-medium text-lg mb-2">{doctorData.specialty}</p>
                        {/* Rating Stars */}
                        <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
                            <div className="flex text-amber-400">
                                {[...Array(5)].map((_, i) => (
                                    <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>
                            <span className="text-gray-500 text-sm">({doctorData.reviews} reviews)</span>
                        </div>
                        <div className="flex flex-wrap justify-center md:justify-start gap-3">
                            <Button
                                variant="outline"
                                className="border-gray-200 hover:border-[#0F172A] hover:text-[#0F172A]"
                                onClick={() => setIsEditModalOpen(true)}
                            >
                                Edit Profile
                            </Button>
                            <Button
                                variant="outline"
                                className="border-gray-200 hover:border-red-200 hover:text-red-500 hover:bg-red-50"
                                onClick={onLogout}
                            >
                                Logout
                            </Button>
                        </div>
                    </div>
                </div>

                {/* 2. Analytics Cards: Key Performance Indicators */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {stats.map((stat, idx) => (
                        <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500 font-medium mb-1">{stat.label}</p>
                                <h3 className="text-2xl font-bold text-[#0F172A]">{stat.value}</h3>
                            </div>
                            <div className={`px-3 py-1 rounded-full text-xs font-bold ${stat.color}`}>
                                {stat.trend}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Left Column: Info & Schedule */}
                    <div className="lg:col-span-1 space-y-8">

                        {/* 3. Professional Information Card */}
                        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                            <h2 className="text-xl font-bold text-[#0F172A] mb-6">Professional Info</h2>
                            <div className="space-y-4">
                                <InfoRow label="Experience" value={doctorData.experience} />
                                <InfoRow label="License No." value={doctorData.license} />
                                <InfoRow label="Hospital" value={doctorData.hospital} />
                                <InfoRow label="Email" value={doctorData.email} />
                                <InfoRow label="Phone" value={doctorData.phone} />
                            </div>
                            <div className="mt-6 pt-6 border-t border-gray-50">
                                <h3 className="text-sm font-semibold text-gray-900 mb-2">Biography</h3>
                                <p className="text-sm text-gray-500 leading-relaxed">{doctorData.bio}</p>
                            </div>
                        </div>

                        {/* 4. Availability Schedule Card */}
                        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-bold text-[#0F172A]">Availability</h2>
                                <button className="text-sm text-[#0EA5E9] font-medium hover:underline">Edit</button>
                            </div>
                            <div className="space-y-3">
                                {schedule.map((slot, idx) => (
                                    <div key={idx} className="flex justify-between items-center text-sm">
                                        <span className="font-medium text-gray-700 w-24">{slot.day}</span>
                                        <span className={`flex-1 text-right ${slot.status === 'Off' ? 'text-red-400' : 'text-gray-500'}`}>
                                            {slot.hours}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>

                    {/* Right Column: Requests & Appointments */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* 5. Patient Consultation Requests */}
                        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-bold text-[#0F172A]">Consultation Requests</h2>
                                <span className="bg-amber-100 text-amber-700 px-2.5 py-0.5 rounded-full text-xs font-bold">2 New</span>
                            </div>
                            <div className="space-y-4">
                                {requests.map((req) => (
                                    <div key={req.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-gray-50 rounded-xl gap-4">
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="font-bold text-[#0F172A]">{req.patient}</span>
                                                <span className="text-xs text-gray-400">• {req.time}</span>
                                            </div>
                                            <p className="text-sm text-gray-600">{req.reason}</p>
                                        </div>
                                        <div className="flex gap-2 w-full sm:w-auto">
                                            <button className="flex-1 sm:flex-none px-4 py-2 bg-white border border-gray-200 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-50 hover:text-red-500 transition-colors">
                                                Reject
                                            </button>
                                            <button className="flex-1 sm:flex-none px-4 py-2 bg-[#0F172A] text-white rounded-lg text-sm font-medium hover:bg-[#1E293B] transition-colors shadow-lg shadow-gray-900/10">
                                                Approve
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* 6. Today's Appointments List */}
                        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                            <h2 className="text-xl font-bold text-[#0F172A] mb-6">Today's Appointments</h2>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="border-b border-gray-100 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                                            <th className="pb-3 pl-2">Time</th>
                                            <th className="pb-3">Patient</th>
                                            <th className="pb-3">Type</th>
                                            <th className="pb-3">Status</th>
                                            <th className="pb-3 text-right pr-2">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {appointments.map((apt) => (
                                            <tr key={apt.id} className="group hover:bg-gray-50/50 transition-colors">
                                                <td className="py-4 pl-2 text-sm font-medium text-[#0F172A]">{apt.time}</td>
                                                <td className="py-4 text-sm text-gray-600">{apt.patient}</td>
                                                <td className="py-4 text-sm text-gray-500">{apt.type}</td>
                                                <td className="py-4">
                                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${apt.status === 'Confirmed' ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-100 text-gray-600'
                                                        }`}>
                                                        {apt.status}
                                                    </span>
                                                </td>
                                                <td className="py-4 text-right pr-2">
                                                    <button className="text-sm text-[#0EA5E9] font-medium hover:text-[#0284C7]">View Medical Info</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="mt-6 text-center">
                                <Button variant="outline" className="w-full border-dashed border-gray-300 text-gray-500 hover:border-[#0F172A] hover:text-[#0F172A]">
                                    View Full Calendar
                                </Button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* Edit Profile Modal Overlay */}
            {isEditModalOpen && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-fade-in">
                    <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                            <h3 className="text-xl font-bold text-[#0F172A]">Edit Profile</h3>
                            <button
                                onClick={() => setIsEditModalOpen(false)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <form onSubmit={handleSaveProfile} className="p-6 space-y-4">
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-700">Full Name</label>
                                <input
                                    type="text"
                                    value={doctorData.name}
                                    onChange={(e) => setDoctorData({ ...doctorData, name: e.target.value })}
                                    className="w-full px-4 py-2 rounded-xl bg-gray-50 border border-gray-200 focus:border-[#0EA5E9] focus:ring-2 focus:ring-[#0EA5E9]/20 outline-none"
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-700">Specialty</label>
                                <input
                                    type="text"
                                    value={doctorData.specialty}
                                    onChange={(e) => setDoctorData({ ...doctorData, specialty: e.target.value })}
                                    className="w-full px-4 py-2 rounded-xl bg-gray-50 border border-gray-200 focus:border-[#0EA5E9] focus:ring-2 focus:ring-[#0EA5E9]/20 outline-none"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-gray-700">Phone</label>
                                    <input
                                        type="text"
                                        value={doctorData.phone}
                                        onChange={(e) => setDoctorData({ ...doctorData, phone: e.target.value })}
                                        className="w-full px-4 py-2 rounded-xl bg-gray-50 border border-gray-200 focus:border-[#0EA5E9] focus:ring-2 focus:ring-[#0EA5E9]/20 outline-none"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-gray-700">Experience</label>
                                    <input
                                        type="text"
                                        value={doctorData.experience}
                                        onChange={(e) => setDoctorData({ ...doctorData, experience: e.target.value })}
                                        className="w-full px-4 py-2 rounded-xl bg-gray-50 border border-gray-200 focus:border-[#0EA5E9] focus:ring-2 focus:ring-[#0EA5E9]/20 outline-none"
                                    />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-700">Bio</label>
                                <textarea
                                    rows={4}
                                    value={doctorData.bio}
                                    onChange={(e) => setDoctorData({ ...doctorData, bio: e.target.value })}
                                    className="w-full px-4 py-2 rounded-xl bg-gray-50 border border-gray-200 focus:border-[#0EA5E9] focus:ring-2 focus:ring-[#0EA5E9]/20 outline-none resize-none"
                                />
                            </div>
                            <div className="pt-4 flex gap-3 justify-end">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => setIsEditModalOpen(false)}
                                >
                                    Cancel
                                </Button>
                                <Button type="submit">
                                    Save Changes
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

// Helper Component for Info Rows
const InfoRow = ({ label, value }: { label: string, value: string }) => (
    <div className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
        <span className="text-sm text-gray-500">{label}</span>
        <span className="text-sm font-medium text-[#0F172A] text-right">{value}</span>
    </div>
);
