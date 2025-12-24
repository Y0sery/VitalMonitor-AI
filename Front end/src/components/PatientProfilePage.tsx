/**
 * PatientProfilePage.tsx
 * 
 * Role: Patient Dashboard/Profile Page
 * Responsibilities:
 * - Displays the patient's personal information and health status.
 * - Shows medical data used for AI predictions.
 * - Lists prediction history with results and confidence scores.
 * - Manages upcoming and past appointments.
 * - Provides personalized health tips based on status.
 * - Allows editing of personal information via a modal.
 */

import React from 'react';
import { Button } from './Button';

interface PatientProfilePageProps {
    onNavigate: (sectionId?: string) => void;
    onLogout: () => void;
}

export const PatientProfilePage: React.FC<PatientProfilePageProps> = ({ onNavigate, onLogout }) => {
    // Mock Patient Data
    const patient = {
        name: "Alex Johnson",
        email: "alex.johnson@example.com",
        phone: "+1 (555) 123-4567",
        dob: "1980-05-15",
        age: 45,
        gender: "Male",
        location: "New York, USA",
        status: "Active",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200&h=200"
    };

    // Mock Medical Data (Inputs for AI Model)
    const medicalData = {
        age: 45,
        sex: 'Male',
        cp: 'Typical Angina',
        trestbps: '130 mm Hg',
        chol: '245 mg/dL',
        fbs: 'No',
        restecg: 'Normal',
        thalach: '150 bpm',
        exang: 'No',
        oldpeak: '1.2',
        slope: 'Flat',
        ca: '0',
        thal: 'Normal'
    };

    // Mock Prediction History
    const history = [
        { date: '2023-11-10', result: 'Not Detected', confidence: 92, status: 'normal' },
        { date: '2023-08-15', result: 'Risk Detected', confidence: 78, status: 'risk' },
        { date: '2023-05-01', result: 'Not Detected', confidence: 88, status: 'normal' },
    ];

    // Mock Appointments List
    const appointments = [
        { id: 1, doctor: 'Dr. Sarah Smith', date: 'Dec 15, 2023', time: '10:00 AM', type: 'Upcoming' },
        { id: 2, doctor: 'Dr. Michael Chen', date: 'Nov 01, 2023', time: '02:30 PM', type: 'Past' },
    ];

    // State for Edit Profile Modal
    const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
    const [patientData, setPatientData] = React.useState(patient);

    // Handle saving profile changes
    const handleSaveProfile = (e: React.FormEvent) => {
        e.preventDefault();
        setIsEditModalOpen(false);
        // In a real app, we would send this data to the backend
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] pt-24 pb-12 font-sans text-[#0F172A]">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">

                {/* 1. Header Section: Avatar, Name, and Quick Actions */}
                <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 mb-8 flex flex-col md:flex-row items-center gap-8 animate-fade-in">
                    <div className="relative">
                        <img
                            src={patientData.avatar}
                            alt={patientData.name}
                            className="w-32 h-32 rounded-full object-cover border-4 border-sky-50 shadow-md"
                        />
                        {/* Status Indicator */}
                        <div className="absolute bottom-2 right-2 w-5 h-5 bg-green-500 rounded-full border-2 border-white" title="Active"></div>
                    </div>
                    <div className="flex-1 text-center md:text-left">
                        <h1 className="text-3xl font-bold text-[#0F172A] mb-2">{patientData.name}</h1>
                        <div className="flex items-center justify-center md:justify-start gap-3 text-gray-500 mb-4">
                            <span className="px-3 py-1 rounded-full bg-green-50 text-green-700 text-xs font-semibold uppercase tracking-wide">
                                {patientData.status}
                            </span>
                            <span className="text-sm">{patientData.location}</span>
                        </div>
                        <div className="flex flex-wrap justify-center md:justify-start gap-3">
                            <Button
                                className="bg-[#0EA5E9] text-white hover:bg-[#0284C7] shadow-lg shadow-sky-500/20"
                                onClick={() => onNavigate('services')}
                            >
                                Update Medical Info
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
                    <button
                        className="p-2 text-gray-400 hover:text-[#0EA5E9] transition-colors"
                        title="Edit Profile"
                        onClick={() => setIsEditModalOpen(true)}
                    >
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Left Column: Personal Info & Appointments */}
                    <div className="lg:col-span-1 space-y-8">
                        {/* 2. Personal Information Card */}
                        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-bold text-[#0F172A]">Personal Info</h2>
                                <button
                                    className="text-sm text-[#0EA5E9] font-medium hover:underline"
                                    onClick={() => setIsEditModalOpen(true)}
                                >
                                    Edit
                                </button>
                            </div>
                            <div className="space-y-4">
                                <InfoRow label="Email" value={patientData.email} />
                                <InfoRow label="Phone" value={patientData.phone} />
                                <InfoRow label="Date of Birth" value={patientData.dob} />
                                <InfoRow label="Age" value={`${patientData.age} years`} />
                                <InfoRow label="Gender" value={patientData.gender} />
                            </div>
                        </div>

                        {/* 5. Appointments Section */}
                        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                            <h2 className="text-xl font-bold text-[#0F172A] mb-6">Appointments</h2>
                            <div className="space-y-4 mb-6">
                                {appointments.map(apt => (
                                    <div key={apt.id} className="flex items-start gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${apt.type === 'Upcoming' ? 'bg-sky-100 text-[#0EA5E9]' : 'bg-gray-100 text-gray-500'}`}>
                                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <div className="font-semibold text-[#0F172A]">{apt.doctor}</div>
                                            <div className="text-sm text-gray-500">{apt.date} • {apt.time}</div>
                                            <span className={`text-xs font-medium px-2 py-0.5 rounded-full mt-1 inline-block ${apt.type === 'Upcoming' ? 'bg-sky-50 text-[#0EA5E9]' : 'bg-gray-100 text-gray-500'}`}>
                                                {apt.type}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <Button
                                variant="outline"
                                className="w-full border-dashed border-gray-300 text-gray-500 hover:border-[#0EA5E9] hover:text-[#0EA5E9]"
                                onClick={() => onNavigate('doctors')}
                            >
                                + Book New Consultation
                            </Button>
                        </div>
                    </div>

                    {/* Right Column: Health Status, Medical Data & History */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* 6. Personalized Tips Section */}
                        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-3xl p-6 border border-emerald-100 relative overflow-hidden">
                            <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
                                <div>
                                    <h3 className="text-lg font-bold text-emerald-800 mb-1">Health Status: Stable</h3>
                                    <p className="text-emerald-700/80 text-sm">Based on your last prediction, your heart health metrics are looking good.</p>
                                </div>
                                <div className="p-3 bg-white/50 rounded-full backdrop-blur-sm">
                                    <svg className="w-6 h-6 text-emerald-600 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* 3. Medical Model Inputs */}
                        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                                <h2 className="text-xl font-bold text-[#0F172A]">Your Medical Data</h2>
                                <span className="text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded">Used for Prediction</span>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-y-6 gap-x-4 mb-8">
                                {Object.entries(medicalData).map(([key, value]) => (
                                    <div key={key} className="flex flex-col">
                                        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">{key}</span>
                                        <span className="text-[#0F172A] font-medium">{value}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="flex justify-end">
                                <Button
                                    className="bg-[#0F172A] text-white hover:bg-[#1E293B]"
                                    onClick={() => onNavigate('services')}
                                >
                                    Update & Recalculate
                                </Button>
                            </div>
                        </div>

                        {/* 4. Prediction History */}
                        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                            <h2 className="text-xl font-bold text-[#0F172A] mb-6">Prediction History</h2>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="border-b border-gray-100 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                                            <th className="pb-3 pl-2">Date</th>
                                            <th className="pb-3">Result</th>
                                            <th className="pb-3">Confidence</th>
                                            <th className="pb-3 text-right pr-2">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {history.map((item, index) => (
                                            <tr key={index} className="group hover:bg-gray-50/50 transition-colors">
                                                <td className="py-4 pl-2 text-sm text-gray-600">{item.date}</td>
                                                <td className="py-4">
                                                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${item.status === 'risk'
                                                        ? 'bg-red-50 text-red-700'
                                                        : 'bg-emerald-50 text-emerald-700'
                                                        }`}>
                                                        <span className={`w-1.5 h-1.5 rounded-full ${item.status === 'risk' ? 'bg-red-500' : 'bg-emerald-500'}`}></span>
                                                        {item.result}
                                                    </span>
                                                </td>
                                                <td className="py-4 text-sm text-gray-600">{item.confidence}%</td>
                                                <td className="py-4 text-right pr-2">
                                                    <button className="text-sm text-[#0EA5E9] font-medium hover:text-[#0284C7]">View Details</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
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
                            <h3 className="text-xl font-bold text-[#0F172A]">Edit Personal Info</h3>
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
                                    value={patientData.name}
                                    onChange={(e) => setPatientData({ ...patientData, name: e.target.value })}
                                    className="w-full px-4 py-2 rounded-xl bg-gray-50 border border-gray-200 focus:border-[#0EA5E9] focus:ring-2 focus:ring-[#0EA5E9]/20 outline-none"
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-700">Email</label>
                                <input
                                    type="email"
                                    value={patientData.email}
                                    onChange={(e) => setPatientData({ ...patientData, email: e.target.value })}
                                    className="w-full px-4 py-2 rounded-xl bg-gray-50 border border-gray-200 focus:border-[#0EA5E9] focus:ring-2 focus:ring-[#0EA5E9]/20 outline-none"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-gray-700">Phone</label>
                                    <input
                                        type="text"
                                        value={patientData.phone}
                                        onChange={(e) => setPatientData({ ...patientData, phone: e.target.value })}
                                        className="w-full px-4 py-2 rounded-xl bg-gray-50 border border-gray-200 focus:border-[#0EA5E9] focus:ring-2 focus:ring-[#0EA5E9]/20 outline-none"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-gray-700">Location</label>
                                    <input
                                        type="text"
                                        value={patientData.location}
                                        onChange={(e) => setPatientData({ ...patientData, location: e.target.value })}
                                        className="w-full px-4 py-2 rounded-xl bg-gray-50 border border-gray-200 focus:border-[#0EA5E9] focus:ring-2 focus:ring-[#0EA5E9]/20 outline-none"
                                    />
                                </div>
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
