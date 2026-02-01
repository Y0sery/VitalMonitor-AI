/**
 * AdminDashboard.tsx
 * Complete Premium Admin Dashboard
 */

import React, { useState } from 'react';
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
    hourlyRate: number;
    workingHours: { start: string; end: string };
    workingDays: string[];
}

interface Service {
    id: string;
    name: string;
    price: number;
    duration: string;
    enabled: boolean;
    description: string;
}

interface Appointment {
    id: string;
    patientName: string;
    doctorName: string;
    date: string;
    time: string;
    type: 'consultation' | 'appointment';
    status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
}

interface AdminDashboardProps {
    onNavigate: (page: string) => void;
    onLogout: () => void;
    doctors: Doctor[];
    onUpdateDoctors: (doctors: Doctor[]) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ 
    onNavigate, 
    onLogout,
    doctors: initialDoctors,
    onUpdateDoctors
}) => {
    const [activeTab, setActiveTab] = useState<'overview' | 'doctors' | 'services' | 'appointments' | 'analytics'>('overview');
    const [doctors, setDoctors] = useState(initialDoctors);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [toastMessage, setToastMessage] = useState<string | null>(null);

    // Services State
    const [services, setServices] = useState<Service[]>([
        { id: '1', name: 'Online Consultation', price: 120, duration: '30 min', enabled: true, description: 'Video call with cardiologist' },
        { id: '2', name: 'In-Person Appointment', price: 150, duration: '45 min', enabled: true, description: 'Physical examination' },
        { id: '3', name: 'Emergency Consultation', price: 250, duration: '60 min', enabled: true, description: '24/7 urgent care' },
        { id: '4', name: 'Follow-up Visit', price: 80, duration: '20 min', enabled: true, description: 'Post-treatment checkup' },
        { id: '5', name: 'ECG Test', price: 100, duration: '30 min', enabled: true, description: 'Electrocardiogram test' },
        { id: '6', name: 'Heart Screening', price: 200, duration: '90 min', enabled: true, description: 'Comprehensive heart check' }
    ]);

    // Appointments State
    const [appointments, setAppointments] = useState<Appointment[]>([
        { id: '1', patientName: 'John Doe', doctorName: 'Dr. Sarah Smith', date: '2024-01-20', time: '10:00', type: 'consultation', status: 'confirmed' },
        { id: '2', patientName: 'Jane Smith', doctorName: 'Dr. Michael Chen', date: '2024-01-20', time: '11:30', type: 'appointment', status: 'pending' },
        { id: '3', patientName: 'Ahmed Ali', doctorName: 'Dr. Emily Davis', date: '2024-01-21', time: '09:00', type: 'consultation', status: 'confirmed' },
        { id: '4', patientName: 'Sarah Johnson', doctorName: 'Dr. James Wilson', date: '2024-01-21', time: '14:00', type: 'appointment', status: 'completed' },
        { id: '5', patientName: 'Michael Brown', doctorName: 'Dr. Sarah Smith', date: '2024-01-22', time: '10:30', type: 'consultation', status: 'pending' }
    ]);

    const [editingService, setEditingService] = useState<Service | null>(null);

    // New Doctor Form State
    const [newDoctor, setNewDoctor] = useState({
        name: '',
        specialty: '',
        country: '',
        hourlyRate: 150,
        image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=300&h=300'
    });

    const showToast = (message: string) => {
        setToastMessage(message);
        setTimeout(() => setToastMessage(null), 3000);
    };

    // Stats
    const stats = {
        totalDoctors: doctors.length,
        availableDoctors: doctors.filter(d => d.availability === 'Available').length,
        totalAppointments: appointments.length,
        todayAppointments: appointments.filter(a => a.date === new Date().toISOString().split('T')[0]).length,
        pendingAppointments: appointments.filter(a => a.status === 'pending').length,
        confirmedAppointments: appointments.filter(a => a.status === 'confirmed').length,
        monthlyRevenue: services.reduce((sum, s) => s.enabled ? sum + s.price * 10 : sum, 0),
        activeServices: services.filter(s => s.enabled).length,
        totalRevenue: '$' + (appointments.filter(a => a.status === 'completed').length * 150).toLocaleString()
    };

    // Doctor Management
    const handleAddDoctor = () => {
        if (!newDoctor.name || !newDoctor.specialty || !newDoctor.country) {
            showToast('Please fill all required fields');
            return;
        }

        const doctor: Doctor = {
            id: Date.now().toString(),
            name: newDoctor.name,
            specialty: newDoctor.specialty,
            image: newDoctor.image,
            rating: 4.5,
            availability: 'Available',
            country: newDoctor.country,
            description: `Expert in ${newDoctor.specialty}`,
            hourlyRate: newDoctor.hourlyRate,
            workingHours: { start: '09:00', end: '18:00' },
            workingDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
        };

        const updatedDoctors = [...doctors, doctor];
        setDoctors(updatedDoctors);
        onUpdateDoctors(updatedDoctors);
        setIsAddModalOpen(false);
        setNewDoctor({ name: '', specialty: '', country: '', hourlyRate: 150, image: newDoctor.image });
        showToast(`${doctor.name} added successfully!`);
    };

    const handleDeleteDoctor = (doctorId: string) => {
        if (confirm('Are you sure you want to delete this doctor?')) {
            const updatedDoctors = doctors.filter(d => d.id !== doctorId);
            setDoctors(updatedDoctors);
            onUpdateDoctors(updatedDoctors);
            showToast('Doctor deleted successfully');
        }
    };

    const toggleDoctorAvailability = (doctorId: string) => {
        const updatedDoctors = doctors.map(d => 
            d.id === doctorId 
                ? { ...d, availability: d.availability === 'Available' ? 'Busy' : 'Available' }
                : d
        );
        setDoctors(updatedDoctors);
        onUpdateDoctors(updatedDoctors);
        showToast('Availability updated');
    };

    // Service Management
    const toggleServiceStatus = (serviceId: string) => {
        setServices(services.map(s => 
            s.id === serviceId ? { ...s, enabled: !s.enabled } : s
        ));
        showToast('Service status updated');
    };

    const handleUpdateService = (serviceId: string, updates: Partial<Service>) => {
        setServices(services.map(s => 
            s.id === serviceId ? { ...s, ...updates } : s
        ));
        showToast('Service updated successfully');
    };

    // Appointment Management
    const handleUpdateAppointmentStatus = (appointmentId: string, status: Appointment['status']) => {
        setAppointments(appointments.map(a => 
            a.id === appointmentId ? { ...a, status } : a
        ));
        showToast(`Appointment ${status}`);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
            {/* Top Navigation Bar */}
            <nav className="bg-white/80 backdrop-blur-xl border-b border-gray-200 sticky top-0 z-40 shadow-lg">
                <div className="px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-gradient-to-br from-[#0EA5E9] to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                                    <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                    </svg>
                                </div>
                                <div>
                                    <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                                        Admin Dashboard
                                    </h1>
                                    <p className="text-xs text-gray-500 font-medium">Refresh Your Heart Control Panel</p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                            <button 
                                onClick={() => onNavigate('home')}
                                className="px-5 py-2.5 bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-700 rounded-xl transition-all text-sm font-semibold shadow-md hover:shadow-lg"
                            >
                                🌐 View Site
                            </button>
                            <button 
                                onClick={onLogout}
                                className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl transition-all shadow-md hover:shadow-lg font-semibold"
                            >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="flex">
                {/* Enhanced Sidebar */}
                <aside className="w-72 bg-white/80 backdrop-blur-xl border-r border-gray-200 min-h-[calc(100vh-73px)] sticky top-[73px] shadow-xl">
                    <nav className="p-4 space-y-2">
                        {[
                            { id: 'overview', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', label: 'Overview', badge: null },
                            { id: 'doctors', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z', label: 'Doctors', badge: doctors.length },
                            { id: 'services', icon: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', label: 'Services', badge: services.filter(s => s.enabled).length },
                            { id: 'appointments', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z', label: 'Appointments', badge: appointments.filter(a => a.status === 'pending').length },
                            { id: 'analytics', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', label: 'Analytics', badge: null }
                        ].map((item) => (
                            <button
                                key={item.id}
                                onClick={() => setActiveTab(item.id as any)}
                                className={`w-full flex items-center justify-between gap-3 px-4 py-3.5 rounded-xl transition-all font-medium ${
                                    activeTab === item.id 
                                        ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/50' 
                                        : 'text-gray-600 hover:bg-gray-100'
                                }`}
                            >
                                <div className="flex items-center gap-3">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                                    </svg>
                                    <span>{item.label}</span>
                                </div>
                                {item.badge !== null && (
                                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                                        activeTab === item.id 
                                            ? 'bg-white/20 text-white' 
                                            : 'bg-blue-100 text-blue-600'
                                    }`}>
                                        {item.badge}
                                    </span>
                                )}
                            </button>
                        ))}
                    </nav>
                </aside>

                {/* Main Content */}
                <main className="flex-1 p-8">
                    {/* Overview Tab */}
                    {activeTab === 'overview' && (
                        <div className="space-y-8">
                            <div>
                                <h2 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Overview</h2>
                                <p className="text-gray-600 text-lg">Welcome back! Here's what's happening today.</p>
                            </div>

                            {/* Enhanced Stats Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {[
                                    { label: 'Total Doctors', value: stats.totalDoctors, sublabel: `${stats.availableDoctors} available`, color: 'blue', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z', change: '+12%' },
                                    { label: 'Appointments', value: stats.totalAppointments, sublabel: `${stats.pendingAppointments} pending`, color: 'purple', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z', change: '+8%' },
                                    { label: 'Monthly Revenue', value: `$${(stats.monthlyRevenue).toLocaleString()}`, sublabel: 'Last 30 days', color: 'green', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z', change: '+24%' },
                                    { label: 'Active Services', value: stats.activeServices, sublabel: `of ${services.length} total`, color: 'orange', icon: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', change: '+5%' }
                                ].map((stat, idx) => (
                                    <div key={idx} className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100 hover:shadow-2xl transition-all">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className={`w-14 h-14 bg-gradient-to-br from-${stat.color}-400 to-${stat.color}-600 rounded-2xl flex items-center justify-center shadow-lg`}>
                                                <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={stat.icon} />
                                                </svg>
                                            </div>
                                            <span className="text-xs font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full">{stat.change}</span>
                                        </div>
                                        <h3 className="text-4xl font-bold text-gray-900 mb-1">{stat.value}</h3>
                                        <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                                        <p className="text-xs text-gray-500 mt-2">{stat.sublabel}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Recent Activity */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {/* Recent Appointments */}
                                <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100">
                                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                        <svg className="w-6 h-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        Recent Appointments
                                    </h3>
                                    <div className="space-y-3">
                                        {appointments.slice(0, 5).map(apt => (
                                            <div key={apt.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                                                <div>
                                                    <p className="font-semibold text-gray-900">{apt.patientName}</p>
                                                    <p className="text-xs text-gray-500">{apt.doctorName} • {apt.date} at {apt.time}</p>
                                                </div>
                                                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                                                    apt.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                                                    apt.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                                                    apt.status === 'completed' ? 'bg-blue-100 text-blue-700' :
                                                    'bg-red-100 text-red-700'
                                                }`}>
                                                    {apt.status}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Quick Actions */}
                                <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl p-6 shadow-xl text-white">
                                    <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
                                    <div className="grid grid-cols-2 gap-3">
                                        {[
                                            { label: 'Add Doctor', icon: 'M12 6v6m0 0v6m0-6h6m-6 0H6', action: () => setActiveTab('doctors') },
                                            { label: 'Manage Services', icon: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', action: () => setActiveTab('services') },
                                            { label: 'View Appointments', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z', action: () => setActiveTab('appointments') },
                                            { label: 'Analytics', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', action: () => setActiveTab('analytics') }
                                        ].map((action, idx) => (
                                            <button
                                                key={idx}
                                                onClick={action.action}
                                                className="p-4 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-2xl transition-all text-center"
                                            >
                                                <svg className="w-8 h-8 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={action.icon} />
                                                </svg>
                                                <p className="text-sm font-semibold">{action.label}</p>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Doctors Tab - (Keep existing code) */}
                    {activeTab === 'doctors' && (
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Manage Doctors</h2>
                                    <p className="text-gray-600">Add, edit, or remove doctors and manage their availability.</p>
                                </div>
                                <Button 
                                    onClick={() => setIsAddModalOpen(true)}
                                    className="bg-gradient-to-r from-[#0EA5E9] to-[#0284C7] hover:from-[#0284C7] hover:to-[#0369A1] text-white px-6 py-3 rounded-xl flex items-center gap-2 shadow-lg"
                                >
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                    Add New Doctor
                                </Button>
                            </div>

                            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead className="bg-gradient-to-r from-gray-50 to-blue-50 border-b-2 border-gray-200">
                                            <tr>
                                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Doctor</th>
                                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Specialty</th>
                                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Location</th>
                                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Rate/Hour</th>
                                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Status</th>
                                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200">
                                            {doctors.map((doctor) => (
                                                <tr key={doctor.id} className="hover:bg-blue-50/50 transition-colors">
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-3">
                                                            <img src={doctor.image} alt={doctor.name} className="w-12 h-12 rounded-xl object-cover ring-2 ring-gray-100" />
                                                            <div>
                                                                <p className="font-bold text-gray-900">{doctor.name}</p>
                                                                <p className="text-xs text-gray-500 flex items-center gap-1">
                                                                    <span className="text-yellow-500">⭐</span>
                                                                    {doctor.rating}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className="text-sm font-medium text-gray-700">{doctor.specialty}</span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className="text-sm text-gray-600">{doctor.country}</span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className="text-sm font-bold text-gray-900">${doctor.hourlyRate}</span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <button
                                                            onClick={() => toggleDoctorAvailability(doctor.id)}
                                                            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-md ${
                                                                doctor.availability === 'Available'
                                                                    ? 'bg-gradient-to-r from-green-400 to-green-500 text-white hover:from-green-500 hover:to-green-600'
                                                                    : 'bg-gradient-to-r from-red-400 to-red-500 text-white hover:from-red-500 hover:to-red-600'
                                                            }`}
                                                        >
                                                            {doctor.availability}
                                                        </button>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <button 
                                                            onClick={() => handleDeleteDoctor(doctor.id)}
                                                            className="p-2.5 text-red-600 hover:bg-red-50 rounded-xl transition-all"
                                                            title="Delete Doctor"
                                                        >
                                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                            </svg>
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Services Tab - NEW! */}
                    {activeTab === 'services' && (
                        <div className="space-y-6">
                            <div>
                                <h2 className="text-3xl font-bold text-gray-900 mb-2">Services & Pricing</h2>
                                <p className="text-gray-600">Manage your service offerings and pricing structure.</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {services.map((service) => (
                                    <div 
                                        key={service.id} 
                                        className={`bg-white rounded-3xl p-6 shadow-xl border-2 transition-all ${
                                            service.enabled ? 'border-green-200' : 'border-gray-200'
                                        }`}
                                    >
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="flex-1">
                                                <h3 className="text-xl font-bold text-gray-900 mb-1">{service.name}</h3>
                                                <p className="text-sm text-gray-600 mb-2">{service.description}</p>
                                                <p className="text-xs text-gray-500">Duration: {service.duration}</p>
                                            </div>
                                            <button
                                                onClick={() => toggleServiceStatus(service.id)}
                                                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-md ${
                                                    service.enabled
                                                        ? 'bg-gradient-to-r from-green-400 to-green-500 text-white'
                                                        : 'bg-gray-200 text-gray-600'
                                                }`}
                                            >
                                                {service.enabled ? '✓ Active' : '✗ Disabled'}
                                            </button>
                                        </div>
                                        
                                        <div className="mb-4">
                                            <label className="block text-sm font-bold text-gray-700 mb-2">Price (USD)</label>
                                            <div className="relative">
                                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold text-lg">$</span>
                                                <input 
                                                    type="number" 
                                                    value={service.price}
                                                    onChange={(e) => handleUpdateService(service.id, { price: parseInt(e.target.value) || 0 })}
                                                    className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:ring-2 focus:ring-[#0EA5E9]/20 focus:border-[#0EA5E9] outline-none transition-all text-lg font-bold"
                                                />
                                            </div>
                                        </div>

                                        <div className="flex gap-2">
                                            <Button 
                                                variant="outline" 
                                                className="flex-1 py-2.5 rounded-xl text-sm font-semibold border-2"
                                                onClick={() => setEditingService(service)}
                                            >
                                                Edit
                                            </Button>
                                            <Button 
                                                className="flex-1 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-[#0EA5E9] to-[#0284C7] text-white shadow-md"
                                                onClick={() => showToast(`${service.name} saved!`)}
                                            >
                                                Save
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Appointments Tab - NEW! */}
                    {activeTab === 'appointments' && (
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Appointments Management</h2>
                                    <p className="text-gray-600">View and manage all appointments.</p>
                                </div>
                                <div className="flex gap-2">
                                    {['All', 'Pending', 'Confirmed', 'Completed'].map(filter => (
                                        <button
                                            key={filter}
                                            className="px-4 py-2 bg-white border-2 border-gray-200 hover:border-[#0EA5E9] rounded-xl text-sm font-semibold transition-all"
                                        >
                                            {filter}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead className="bg-gradient-to-r from-gray-50 to-purple-50 border-b-2 border-gray-200">
                                            <tr>
                                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Patient</th>
                                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Doctor</th>
                                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Date & Time</th>
                                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Type</th>
                                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Status</th>
                                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200">
                                            {appointments.map((apt) => (
                                                <tr key={apt.id} className="hover:bg-purple-50/50 transition-colors">
                                                    <td className="px-6 py-4">
                                                        <p className="font-bold text-gray-900">{apt.patientName}</p>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <p className="text-sm font-medium text-gray-700">{apt.doctorName}</p>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <p className="text-sm text-gray-900 font-semibold">{apt.date}</p>
                                                        <p className="text-xs text-gray-500">{apt.time}</p>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-xl text-xs font-bold">
                                                            {apt.type}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <select
                                                            value={apt.status}
                                                            onChange={(e) => handleUpdateAppointmentStatus(apt.id, e.target.value as any)}
                                                            className={`px-4 py-2 rounded-xl text-xs font-bold border-0 outline-none cursor-pointer ${
                                                                apt.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                                                                apt.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                                                                apt.status === 'completed' ? 'bg-blue-100 text-blue-700' :
                                                                'bg-red-100 text-red-700'
                                                            }`}
                                                        >
                                                            <option value="pending">Pending</option>
                                                            <option value="confirmed">Confirmed</option>
                                                            <option value="completed">Completed</option>
                                                            <option value="cancelled">Cancelled</option>
                                                        </select>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex gap-2">
                                                            <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="View Details">
                                                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Analytics Tab - NEW! */}
                    {activeTab === 'analytics' && (
                        <div className="space-y-6">
                            <div>
                                <h2 className="text-3xl font-bold text-gray-900 mb-2">Analytics & Insights</h2>
                                <p className="text-gray-600">Track your platform's performance and growth.</p>
                            </div>

                            {/* Charts Placeholder */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                                    <h3 className="text-xl font-bold text-gray-900 mb-6">Appointments Over Time</h3>
                                    <div className="h-64 flex items-end justify-around gap-2">
                                        {[65, 85, 75, 95, 70, 90, 80].map((height, idx) => (
                                            <div key={idx} className="flex-1 flex flex-col items-center">
                                                <div 
                                                    className="w-full bg-gradient-to-t from-blue-500 to-purple-500 rounded-t-xl transition-all hover:opacity-80"
                                                    style={{ height: `${height}%` }}
                                                ></div>
                                                <p className="text-xs text-gray-500 mt-2">Day {idx + 1}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                                    <h3 className="text-xl font-bold text-gray-900 mb-6">Revenue Breakdown</h3>
                                    <div className="flex items-center justify-center h-64">
                                        <div className="relative w-48 h-48">
                                            <svg className="w-full h-full transform -rotate-90">
                                                <circle cx="96" cy="96" r="80" fill="none" stroke="#e5e7eb" strokeWidth="20"/>
                                                <circle cx="96" cy="96" r="80" fill="none" stroke="url(#gradient)" strokeWidth="20" strokeDasharray="502" strokeDashoffset="125" strokeLinecap="round"/>
                                                <defs>
                                                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                                        <stop offset="0%" stopColor="#0EA5E9"/>
                                                        <stop offset="100%" stopColor="#8B5CF6"/>
                                                    </linearGradient>
                                                </defs>
                                            </svg>
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <div className="text-center">
                                                    <p className="text-3xl font-bold text-gray-900">75%</p>
                                                    <p className="text-xs text-gray-500">Completed</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </main>
            </div>

            {/* Add Doctor Modal - (Keep existing code with enhancements from previous) */}
            {isAddModalOpen && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-2xl font-bold text-gray-900">Add New Doctor</h3>
                            <button 
                                onClick={() => setIsAddModalOpen(false)}
                                className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                            >
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="space-y-4">
                            {/* Image Selection */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Profile Image</label>
                                <div className="flex items-center gap-4 mb-3">
                                    <img 
                                        src={newDoctor.image} 
                                        alt="Preview" 
                                        className="w-24 h-24 rounded-2xl object-cover border-4 border-gray-200 shadow-md"
                                    />
                                    <div className="flex-1">
                                        <input
                                            type="text"
                                            value={newDoctor.image}
                                            onChange={(e) => setNewDoctor({...newDoctor, image: e.target.value})}
                                            className="w-full px-4 py-2 rounded-xl border-2 border-gray-200 focus:ring-2 focus:ring-[#0EA5E9]/20 focus:border-[#0EA5E9] outline-none transition-all text-sm"
                                            placeholder="Image URL"
                                        />
                                        <p className="text-xs text-gray-500 mt-1">Paste image URL</p>
                                    </div>
                                </div>
                                
                                <div className="grid grid-cols-4 gap-2">
                                    {[
                                        'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=300&h=300',
                                        'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300&h=300',
                                        'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=300&h=300',
                                        'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=300&h=300'
                                    ].map((url, idx) => (
                                        <button
                                            key={idx}
                                            type="button"
                                            onClick={() => setNewDoctor({...newDoctor, image: url})}
                                            className={`aspect-square rounded-xl overflow-hidden border-3 transition-all ${
                                                newDoctor.image === url 
                                                    ? 'border-[#0EA5E9] ring-4 ring-[#0EA5E9]/30 scale-105' 
                                                    : 'border-gray-200 hover:border-[#0EA5E9]'
                                            }`}
                                        >
                                            <img src={url} alt={`Option ${idx + 1}`} className="w-full h-full object-cover" />
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Doctor Name *</label>
                                <input
                                    type="text"
                                    value={newDoctor.name}
                                    onChange={(e) => setNewDoctor({...newDoctor, name: e.target.value})}
                                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:ring-2 focus:ring-[#0EA5E9]/20 focus:border-[#0EA5E9] outline-none transition-all font-medium"
                                    placeholder="Dr. John Smith"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Specialty *</label>
                                <select
                                    value={newDoctor.specialty}
                                    onChange={(e) => setNewDoctor({...newDoctor, specialty: e.target.value})}
                                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:ring-2 focus:ring-[#0EA5E9]/20 focus:border-[#0EA5E9] outline-none transition-all font-medium"
                                >
                                    <option value="">Select Specialty</option>
                                    <option value="Cardiologist">Cardiologist</option>
                                    <option value="Cardiac Surgeon">Cardiac Surgeon</option>
                                    <option value="Pediatric Cardiologist">Pediatric Cardiologist</option>
                                    <option value="Interventional Cardiologist">Interventional Cardiologist</option>
                                    <option value="Electrophysiologist">Electrophysiologist</option>
                                    <option value="Heart Failure Specialist">Heart Failure Specialist</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Country *</label>
                                <select
                                    value={newDoctor.country}
                                    onChange={(e) => setNewDoctor({...newDoctor, country: e.target.value})}
                                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:ring-2 focus:ring-[#0EA5E9]/20 focus:border-[#0EA5E9] outline-none transition-all font-medium"
                                >
                                    <option value="">Select Country</option>
                                    <option value="USA">🇺🇸 USA</option>
                                    <option value="Canada">🇨🇦 Canada</option>
                                    <option value="UK">🇬🇧 UK</option>
                                    <option value="Australia">🇦🇺 Australia</option>
                                    <option value="Germany">🇩🇪 Germany</option>
                                    <option value="France">🇫🇷 France</option>
                                    <option value="Egypt">🇪🇬 Egypt</option>
                                    <option value="UAE">🇦🇪 UAE</option>
                                    <option value="Saudi Arabia">🇸🇦 Saudi Arabia</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Hourly Rate ($)</label>
                                <input
                                    type="number"
                                    value={newDoctor.hourlyRate}
                                    onChange={(e) => setNewDoctor({...newDoctor, hourlyRate: parseInt(e.target.value) || 0})}
                                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:ring-2 focus:ring-[#0EA5E9]/20 focus:border-[#0EA5E9] outline-none transition-all font-bold text-lg"
                                    min="50"
                                    max="1000"
                                    step="10"
                                />
                                <div className="flex justify-between text-xs text-gray-500 mt-1">
                                    <span>Min: $50</span>
                                    <span>Max: $1000</span>
                                </div>
                            </div>

                            <div className="flex gap-3 pt-4">
                                <Button 
                                    variant="outline" 
                                    onClick={() => {
                                        setIsAddModalOpen(false);
                                        setNewDoctor({ name: '', specialty: '', country: '', hourlyRate: 150, image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=300&h=300' });
                                    }}
                                    className="flex-1 py-3 rounded-xl font-bold border-2"
                                >
                                    Cancel
                                </Button>
                                <Button 
                                    onClick={handleAddDoctor}
                                    className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#0EA5E9] to-[#0284C7] text-white font-bold shadow-lg"
                                >
                                    Add Doctor
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

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