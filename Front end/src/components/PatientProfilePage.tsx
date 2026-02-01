/**
 * PatientProfilePage.tsx
 * Complete Patient Profile with Medical Data & Prediction History
 */

import React, { useState } from 'react';
import { Button } from './Button';

interface Appointment {
    id: string;
    doctorName: string;
    date: string;
    time: string;
    status: 'upcoming' | 'past' | 'cancelled';
}

interface PredictionRecord {
    id: string;
    date: string;
    result: 'Not Detected' | 'Risk Detected';
    confidence: number;
}

interface PatientProfilePageProps {
    onNavigate: (page: string) => void;
    onLogout: () => void;
}

export const PatientProfilePage: React.FC<PatientProfilePageProps> = ({ onNavigate, onLogout }) => {
    const [activeTab, setActiveTab] = useState<'overview' | 'medical' | 'appointments' | 'history'>('overview');
    const [isEditingProfile, setIsEditingProfile] = useState(false);
    const [isEditingMedical, setIsEditingMedical] = useState(false);
    const [toastMessage, setToastMessage] = useState<string | null>(null);

    // Patient Info
    const [patientInfo, setPatientInfo] = useState({
        name: 'Alex Johnson',
        email: 'alex.johnson@example.com',
        phone: '+1 (555) 123-4567',
        dateOfBirth: '1980-05-15',
        age: 45,
        gender: 'Male',
        location: 'New York, USA',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=300&h=300'
    });

    // Medical Data
    const [medicalData, setMedicalData] = useState({
        age: 45,
        sex: 'Male',
        cp: 'Typical Angina',
        trestbps: 130,
        chol: 245,
        fbs: 'No',
        restecg: 'Normal',
        thalach: 150,
        exang: 'No',
        oldpeak: 1.2,
        slope: 'Flat',
        ca: 0,
        thal: 'Normal'
    });

    // Health Status
    const healthStatus = {
        status: 'Stable',
        message: 'Based on your last prediction, your heart health metrics are looking good.',
        color: 'green'
    };

    // Appointments
    const [appointments, setAppointments] = useState<Appointment[]>([
        { id: '1', doctorName: 'Dr. Sarah Smith', date: 'Dec 15, 2023', time: '10:00 AM', status: 'upcoming' },
        { id: '2', doctorName: 'Dr. Michael Chen', date: 'Nov 01, 2023', time: '02:30 PM', status: 'past' }
    ]);

    // Prediction History
    const [predictionHistory, setPredictionHistory] = useState<PredictionRecord[]>([
        { id: '1', date: '2023-11-10', result: 'Not Detected', confidence: 92 },
        { id: '2', date: '2023-08-15', result: 'Risk Detected', confidence: 78 },
        { id: '3', date: '2023-05-01', result: 'Not Detected', confidence: 88 }
    ]);

    const showToast = (message: string) => {
        setToastMessage(message);
        setTimeout(() => setToastMessage(null), 3000);
    };

    const handleUpdateProfile = () => {
        setIsEditingProfile(false);
        showToast('Profile updated successfully!');
    };

    const handleUpdateMedical = () => {
        setIsEditingMedical(false);
        showToast('Medical data updated successfully!');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 pt-20 pb-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <button
                        onClick={() => onNavigate('home')}
                        className="flex items-center gap-2 text-gray-600 hover:text-[#0EA5E9] transition-colors group"
                    >
                        <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        <span className="font-semibold">Back to Home</span>
                    </button>
                </div>

                {/* Profile Header Card */}
                <div className="bg-white rounded-3xl shadow-2xl mb-8 overflow-hidden border border-gray-100">
                    <div className="bg-gradient-to-r from-[#0EA5E9] to-purple-600 h-32"></div>
                    <div className="px-8 pb-8 -mt-16">
                        <div className="flex flex-col md:flex-row items-center md:items-end gap-6">
                            {/* Profile Image */}
                            <div className="relative">
                                <img
                                    src={patientInfo.image}
                                    alt={patientInfo.name}
                                    className="w-32 h-32 rounded-3xl object-cover ring-8 ring-white shadow-2xl"
                                />
                                <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-green-500 rounded-full border-4 border-white shadow-lg"></div>
                            </div>

                            {/* Profile Info */}
                            <div className="flex-1 text-center md:text-left">
                                <h1 className="text-4xl font-bold text-gray-900 mb-2">{patientInfo.name}</h1>
                                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-4">
                                    <span className="px-4 py-1.5 bg-green-100 text-green-700 rounded-full text-sm font-bold flex items-center gap-2">
                                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                                        ACTIVE
                                    </span>
                                    <span className="text-gray-600 flex items-center gap-2">
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        </svg>
                                        {patientInfo.location}
                                    </span>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setIsEditingProfile(!isEditingProfile)}
                                    className="p-3 bg-gray-100 hover:bg-gray-200 rounded-2xl transition-all shadow-md"
                                    title="Edit Profile"
                                >
                                    <svg className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                </button>
                                <Button
                                    onClick={() => setIsEditingMedical(!isEditingMedical)}
                                    className="bg-gradient-to-r from-[#0EA5E9] to-[#0284C7] text-white px-6 py-3 rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all"
                                >
                                    Update Medical Info
                                </Button>
                                <Button
                                    onClick={onLogout}
                                    variant="outline"
                                    className="px-6 py-3 rounded-2xl font-bold border-2 border-gray-200 hover:border-red-500 hover:text-red-500 transition-all"
                                >
                                    Logout
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Sidebar */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* Personal Info Card */}
                        <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-bold text-gray-900">Personal Info</h3>
                                {isEditingProfile && (
                                    <button
                                        onClick={handleUpdateProfile}
                                        className="text-[#0EA5E9] hover:text-[#0284C7] font-semibold text-sm"
                                    >
                                        Save
                                    </button>
                                )}
                            </div>

                            <div className="space-y-4">
                                {[
                                    { label: 'Email', value: patientInfo.email, icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
                                    { label: 'Phone', value: patientInfo.phone, icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z' },
                                    { label: 'Date of Birth', value: patientInfo.dateOfBirth, icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
                                    { label: 'Age', value: `${patientInfo.age} years`, icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
                                    { label: 'Gender', value: patientInfo.gender, icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' }
                                ].map((item, idx) => (
                                    <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                                        <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                            <svg className="w-5 h-5 text-[#0EA5E9]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                                            </svg>
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-xs text-gray-500 font-medium">{item.label}</p>
                                            {isEditingProfile ? (
                                                <input
                                                    type="text"
                                                    value={item.value}
                                                    className="w-full text-sm font-semibold text-gray-900 bg-white border-2 border-gray-200 rounded-lg px-2 py-1 mt-1"
                                                />
                                            ) : (
                                                <p className="text-sm font-semibold text-gray-900">{item.value}</p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Health Status Card */}
                        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl shadow-xl p-6 border-2 border-green-200">
                            <div className="flex items-start gap-4 mb-4">
                                <div className="w-14 h-14 bg-green-500 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                                    <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                    </svg>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold text-gray-900 mb-1">Health Status: {healthStatus.status}</h3>
                                    <p className="text-sm text-gray-600 leading-relaxed">{healthStatus.message}</p>
                                </div>
                            </div>
                        </div>

                        {/* Appointments Summary */}
                        <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Appointments</h3>
                            <div className="space-y-3">
                                {appointments.map(apt => (
                                    <div key={apt.id} className={`p-4 rounded-2xl border-2 ${
                                        apt.status === 'upcoming' ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-200'
                                    }`}>
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                                                apt.status === 'upcoming' ? 'bg-blue-500' : 'bg-gray-400'
                                            }`}>
                                                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                            </div>
                                            <div className="flex-1">
                                                <p className="font-bold text-gray-900">{apt.doctorName}</p>
                                                <p className="text-xs text-gray-600">{apt.date} • {apt.time}</p>
                                            </div>
                                        </div>
                                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                                            apt.status === 'upcoming' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'
                                        }`}>
                                            {apt.status === 'upcoming' ? 'Upcoming' : 'Past'}
                                        </span>
                                    </div>
                                ))}
                                <button className="w-full py-3 border-3 border-dashed border-gray-300 rounded-2xl text-gray-500 hover:border-[#0EA5E9] hover:text-[#0EA5E9] transition-all font-bold">
                                    + Book New Consultation
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Medical Data Card */}
                        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-2xl font-bold text-gray-900">Your Medical Data</h3>
                                <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full font-medium">
                                    Used for Prediction
                                </span>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                                {[
                                    { label: 'AGE', value: medicalData.age },
                                    { label: 'SEX', value: medicalData.sex },
                                    { label: 'CP', value: medicalData.cp },
                                    { label: 'TRESTBPS', value: `${medicalData.trestbps} mm Hg` },
                                    { label: 'CHOL', value: `${medicalData.chol} mg/dL` },
                                    { label: 'FBS', value: medicalData.fbs },
                                    { label: 'RESTECG', value: medicalData.restecg },
                                    { label: 'THALACH', value: `${medicalData.thalach} bpm` },
                                    { label: 'EXANG', value: medicalData.exang },
                                    { label: 'OLDPEAK', value: medicalData.oldpeak },
                                    { label: 'SLOPE', value: medicalData.slope },
                                    { label: 'CA', value: medicalData.ca },
                                    { label: 'THAL', value: medicalData.thal }
                                ].map((item, idx) => (
                                    <div key={idx} className="p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl border-2 border-blue-100">
                                        <p className="text-xs font-bold text-gray-500 mb-1 uppercase tracking-wide">{item.label}</p>
                                        {isEditingMedical ? (
                                            <input
                                                type="text"
                                                defaultValue={item.value}
                                                className="w-full text-lg font-bold text-gray-900 bg-white border-2 border-gray-200 rounded-lg px-2 py-1"
                                            />
                                        ) : (
                                            <p className="text-lg font-bold text-gray-900">{item.value}</p>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {isEditingMedical ? (
                                <div className="flex gap-3">
                                    <Button
                                        onClick={() => setIsEditingMedical(false)}
                                        variant="outline"
                                        className="flex-1 py-3 rounded-xl font-bold border-2"
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        onClick={handleUpdateMedical}
                                        className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#0EA5E9] to-[#0284C7] text-white font-bold shadow-lg"
                                    >
                                        Save Changes
                                    </Button>
                                </div>
                            ) : (
                                <Button
                                    onClick={() => setIsEditingMedical(true)}
                                    className="w-full py-4 rounded-2xl bg-gradient-to-r from-gray-900 to-gray-800 text-white font-bold shadow-xl hover:shadow-2xl transition-all"
                                >
                                    Update & Recalculate
                                </Button>
                            )}
                        </div>

                        {/* Prediction History Card */}
                        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
                            <h3 className="text-2xl font-bold text-gray-900 mb-6">Prediction History</h3>

                            <div className="overflow-hidden">
                                <table className="w-full">
                                    <thead className="bg-gradient-to-r from-gray-50 to-blue-50 border-b-2 border-gray-200">
                                        <tr>
                                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">DATE</th>
                                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">RESULT</th>
                                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">CONFIDENCE</th>
                                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">ACTION</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {predictionHistory.map(record => (
                                            <tr key={record.id} className="hover:bg-blue-50 transition-colors">
                                                <td className="px-6 py-4 text-sm font-semibold text-gray-900">{record.date}</td>
                                                <td className="px-6 py-4">
                                                    <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold ${
                                                        record.result === 'Not Detected' 
                                                            ? 'bg-green-100 text-green-700' 
                                                            : 'bg-red-100 text-red-700'
                                                    }`}>
                                                        <span className={`w-2 h-2 rounded-full ${
                                                            record.result === 'Not Detected' ? 'bg-green-500' : 'bg-red-500'
                                                        }`}></span>
                                                        {record.result}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                                                            <div 
                                                                className={`h-full rounded-full ${
                                                                    record.confidence >= 85 ? 'bg-green-500' : 
                                                                    record.confidence >= 70 ? 'bg-yellow-500' : 
                                                                    'bg-red-500'
                                                                }`}
                                                                style={{ width: `${record.confidence}%` }}
                                                            ></div>
                                                        </div>
                                                        <span className="text-sm font-bold text-gray-900">{record.confidence}%</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <button className="text-[#0EA5E9] hover:text-[#0284C7] font-bold text-sm transition-colors">
                                                        View Details
                                                    </button>
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

            {/* Toast Notification */}
            {toastMessage && (
                <div className="fixed bottom-8 right-8 bg-gradient-to-r from-gray-900 to-gray-800 text-white px-6 py-4 rounded-2xl shadow-2xl animate-fade-in z-50 flex items-center gap-3">
                    <svg className="w-6 h-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="font-semibold">{toastMessage}</span>
                </div>
            )}
        </div>
    );
};