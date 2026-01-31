/**
 * AdminDashboard.tsx
 * 
 * Role: Complete Admin Control Panel
 * Features:
 * - Manage Doctors (Add, Edit, Delete, Availability)
 * - Manage Services & Pricing
 * - Manage Appointments & Schedule
 * - Analytics & Statistics
 * - Settings & Configuration
 */

import React, { useState } from 'react';
import { Button } from './Button';

interface AdminDashboardProps {
    onNavigate: (page: string) => void;
    onLogout: () => void;
}

// Mock Data
const initialDoctors = [
    {
        id: '1',
        name: 'Dr. Sarah Smith',
        specialty: 'Cardiologist',
        image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300&h=300',
        rating: 4.9,
        availability: 'Available',
        country: 'USA',
        hourlyRate: 150,
        workingHours: { start: '09:00', end: '18:00' },
        workingDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
    },
    {
        id: '2',
        name: 'Dr. Michael Chen',
        specialty: 'Cardiac Surgeon',
        image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=300&h=300',
        rating: 4.8,
        availability: 'Busy',
        country: 'Canada',
        hourlyRate: 200,
        workingHours: { start: '10:00', end: '19:00' },
        workingDays: ['Mon', 'Wed', 'Fri', 'Sat']
    }
];

const initialServices = [
    { id: '1', name: 'Online Consultation', price: 120, duration: '30 min', enabled: true },
    { id: '2', name: 'In-Person Appointment', price: 150, duration: '45 min', enabled: true },
    { id: '3', name: 'Emergency Consultation', price: 250, duration: '60 min', enabled: true },
    { id: '4', name: 'Follow-up Visit', price: 80, duration: '20 min', enabled: true }
];

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onNavigate, onLogout }) => {
    const [activeTab, setActiveTab] = useState<'overview' | 'doctors' | 'services' | 'appointments' | 'settings'>('overview');
    const [doctors, setDoctors] = useState(initialDoctors);
    const [services, setServices] = useState(initialServices);
    const [selectedDoctor, setSelectedDoctor] = useState<any>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    // Stats
    const stats = {
        totalDoctors: doctors.length,
        availableDoctors: doctors.filter(d => d.availability === 'Available').length,
        totalAppointments: 145,
        todayAppointments: 12,
        monthlyRevenue: '$45,230',
        activeServices: services.filter(s => s.enabled).length
    };

    const handleEditDoctor = (doctor: any) => {
        setSelectedDoctor(doctor);
        setIsEditModalOpen(true);
    };

    const handleDeleteDoctor = (doctorId: string) => {
        if (confirm('Are you sure you want to delete this doctor?')) {
            setDoctors(doctors.filter(d => d.id !== doctorId));
        }
    };

    const toggleDoctorAvailability = (doctorId: string) => {
        setDoctors(doctors.map(d => 
            d.id === doctorId 
                ? { ...d, availability: d.availability === 'Available' ? 'Busy' : 'Available' }
                : d
        ));
    };

    const toggleServiceStatus = (serviceId: string) => {
        setServices(services.map(s => 
            s.id === serviceId 
                ? { ...s, enabled: !s.enabled }
                : s
        ));
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Top Navigation Bar */}
            <nav className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
                <div className="px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-[#0EA5E9] to-blue-600 rounded-xl flex items-center justify-center">
                                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                    </svg>
                                </div>
                                <div>
                                    <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
                                    <p className="text-xs text-gray-500">VitalMonitor AI Control Panel</p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="flex items-center gap-4">
                            <button className="relative p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-xl transition-colors">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                </svg>
                                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                            </button>
                            <button 
                                onClick={onLogout}
                                className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition-colors"
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
                {/* Sidebar */}
                <aside className="w-64 bg-white border-r border-gray-200 min-h-[calc(100vh-73px)] sticky top-[73px]">
                    <nav className="p-4 space-y-1">
                        <button
                            onClick={() => setActiveTab('overview')}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                                activeTab === 'overview' 
                                    ? 'bg-blue-50 text-[#0EA5E9]' 
                                    : 'text-gray-600 hover:bg-gray-50'
                            }`}
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                            <span className="font-medium">Overview</span>
                        </button>

                        <button
                            onClick={() => setActiveTab('doctors')}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                                activeTab === 'doctors' 
                                    ? 'bg-blue-50 text-[#0EA5E9]' 
                                    : 'text-gray-600 hover:bg-gray-50'
                            }`}
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            <span className="font-medium">Doctors</span>
                        </button>

                        <button
                            onClick={() => setActiveTab('services')}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                                activeTab === 'services' 
                                    ? 'bg-blue-50 text-[#0EA5E9]' 
                                    : 'text-gray-600 hover:bg-gray-50'
                            }`}
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            <span className="font-medium">Services & Pricing</span>
                        </button>

                        <button
                            onClick={() => setActiveTab('appointments')}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                                activeTab === 'appointments' 
                                    ? 'bg-blue-50 text-[#0EA5E9]' 
                                    : 'text-gray-600 hover:bg-gray-50'
                            }`}
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span className="font-medium">Appointments</span>
                        </button>

                        <button
                            onClick={() => setActiveTab('settings')}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                                activeTab === 'settings' 
                                    ? 'bg-blue-50 text-[#0EA5E9]' 
                                    : 'text-gray-600 hover:bg-gray-50'
                            }`}
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span className="font-medium">Settings</span>
                        </button>
                    </nav>
                </aside>

                {/* Main Content */}
                <main className="flex-1 p-8">
                    {/* Overview Tab */}
                    {activeTab === 'overview' && (
                        <div className="space-y-6">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">Dashboard Overview</h2>
                                <p className="text-gray-600">Welcome back! Here's what's happening today.</p>
                            </div>

                            {/* Stats Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                                            <svg className="w-6 h-6 text-[#0EA5E9]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                            </svg>
                                        </div>
                                        <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">+12%</span>
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900">{stats.totalDoctors}</h3>
                                    <p className="text-sm text-gray-600">Total Doctors</p>
                                    <p className="text-xs text-gray-500 mt-2">{stats.availableDoctors} available now</p>
                                </div>

                                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center">
                                            <svg className="w-6 h-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">+8%</span>
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900">{stats.totalAppointments}</h3>
                                    <p className="text-sm text-gray-600">Total Appointments</p>
                                    <p className="text-xs text-gray-500 mt-2">{stats.todayAppointments} scheduled today</p>
                                </div>

                                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
                                            <svg className="w-6 h-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                        <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">+24%</span>
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900">{stats.monthlyRevenue}</h3>
                                    <p className="text-sm text-gray-600">Monthly Revenue</p>
                                    <p className="text-xs text-gray-500 mt-2">Last 30 days</p>
                                </div>
                            </div>

                            {/* Quick Actions */}
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <button className="p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors text-center">
                                        <svg className="w-8 h-8 text-[#0EA5E9] mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                        </svg>
                                        <p className="text-sm font-medium text-gray-700">Add Doctor</p>
                                    </button>
                                    <button className="p-4 bg-purple-50 hover:bg-purple-100 rounded-xl transition-colors text-center">
                                        <svg className="w-8 h-8 text-purple-500 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        <p className="text-sm font-medium text-gray-700">New Appointment</p>
                                    </button>
                                    <button className="p-4 bg-green-50 hover:bg-green-100 rounded-xl transition-colors text-center">
                                        <svg className="w-8 h-8 text-green-500 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                        <p className="text-sm font-medium text-gray-700">View Reports</p>
                                    </button>
                                    <button className="p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition-colors text-center">
                                        <svg className="w-8 h-8 text-orange-500 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        <p className="text-sm font-medium text-gray-700">Settings</p>
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Doctors Management Tab */}
                    {activeTab === 'doctors' && (
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Manage Doctors</h2>
                                    <p className="text-gray-600">Add, edit, or remove doctors and manage their availability.</p>
                                </div>
                                <Button className="bg-[#0EA5E9] hover:bg-[#0284C7] text-white px-6 py-3 rounded-xl flex items-center gap-2">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                    Add New Doctor
                                </Button>
                            </div>

                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead className="bg-gray-50 border-b border-gray-200">
                                            <tr>
                                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Doctor</th>
                                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Specialty</th>
                                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Location</th>
                                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Rate/Hour</th>
                                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Working Hours</th>
                                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200">
                                            {doctors.map((doctor) => (
                                                <tr key={doctor.id} className="hover:bg-gray-50 transition-colors">
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-3">
                                                            <img src={doctor.image} alt={doctor.name} className="w-10 h-10 rounded-xl object-cover" />
                                                            <div>
                                                                <p className="font-semibold text-gray-900">{doctor.name}</p>
                                                                <p className="text-xs text-gray-500">⭐ {doctor.rating}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-gray-600">{doctor.specialty}</td>
                                                    <td className="px-6 py-4 text-sm text-gray-600">{doctor.country}</td>
                                                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">${doctor.hourlyRate}</td>
                                                    <td className="px-6 py-4">
                                                        <div className="text-sm text-gray-600">
                                                            <p>{doctor.workingHours.start} - {doctor.workingHours.end}</p>
                                                            <p className="text-xs text-gray-500">{doctor.workingDays.join(', ')}</p>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <button
                                                            onClick={() => toggleDoctorAvailability(doctor.id)}
                                                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                                                                doctor.availability === 'Available'
                                                                    ? 'bg-green-100 text-green-700'
                                                                    : 'bg-red-100 text-red-700'
                                                            }`}
                                                        >
                                                            {doctor.availability}
                                                        </button>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-2">
                                                            <button 
                                                                onClick={() => handleEditDoctor(doctor)}
                                                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                            >
                                                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                                </svg>
                                                            </button>
                                                            <button 
                                                                onClick={() => handleDeleteDoctor(doctor.id)}
                                                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                            >
                                                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
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

                    {/* Services & Pricing Tab */}
                    {activeTab === 'services' && (
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Services & Pricing</h2>
                                    <p className="text-gray-600">Manage your service offerings and pricing structure.</p>
                                </div>
                                <Button className="bg-[#0EA5E9] hover:bg-[#0284C7] text-white px-6 py-3 rounded-xl flex items-center gap-2">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                    Add New Service
                                </Button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {services.map((service) => (
                                    <div key={service.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="flex-1">
                                                <h3 className="text-lg font-bold text-gray-900 mb-1">{service.name}</h3>
                                                <p className="text-sm text-gray-600">Duration: {service.duration}</p>
                                            </div>
                                            <button
                                                onClick={() => toggleServiceStatus(service.id)}
                                                className={`px-3 py-1 rounded-full text-xs font-medium ${
                                                    service.enabled
                                                        ? 'bg-green-100 text-green-700'
                                                        : 'bg-gray-100 text-gray-700'
                                                }`}
                                            >
                                                {service.enabled ? 'Active' : 'Inactive'}
                                            </button>
                                        </div>
                                        
                                        <div className="mb-6">
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
                                            <div className="relative">
                                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">$</span>
                                                <input 
                                                    type="number" 
                                                    value={service.price}
                                                    className="w-full pl-8 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#0EA5E9]/20 focus:border-[#0EA5E9] outline-none transition-all"
                                                />
                                            </div>
                                        </div>

                                        <div className="flex gap-3">
                                            <Button variant="outline" className="flex-1 py-2 rounded-xl text-sm">
                                                Edit
                                            </Button>
                                            <Button className="flex-1 py-2 rounded-xl text-sm bg-[#0EA5E9] hover:bg-[#0284C7] text-white">
                                                Save Changes
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Appointments Tab */}
                    {activeTab === 'appointments' && (
                        <div className="space-y-6">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">Appointments Management</h2>
                                <p className="text-gray-600">View and manage all appointments.</p>
                            </div>

                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center py-12">
                                <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <h3 className="text-lg font-medium text-gray-900 mb-2">Appointments Calendar</h3>
                                <p className="text-gray-500">Full calendar view coming soon...</p>
                            </div>
                        </div>
                    )}

                    {/* Settings Tab */}
                    {activeTab === 'settings' && (
                        <div className="space-y-6">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">System Settings</h2>
                                <p className="text-gray-600">Configure system-wide settings and preferences.</p>
                            </div>

                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                <h3 className="text-lg font-bold text-gray-900 mb-6">General Settings</h3>
                                
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Platform Name</label>
                                        <input 
                                            type="text" 
                                            defaultValue="VitalMonitor AI"
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#0EA5E9]/20 focus:border-[#0EA5E9] outline-none transition-all"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Support Email</label>
                                        <input 
                                            type="email" 
                                            defaultValue="support@vitalmonitor.ai"
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#0EA5E9]/20 focus:border-[#0EA5E9] outline-none transition-all"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Default Consultation Duration</label>
                                        <select className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#0EA5E9]/20 focus:border-[#0EA5E9] outline-none transition-all">
                                            <option>30 minutes</option>
                                            <option>45 minutes</option>
                                            <option selected>60 minutes</option>
                                        </select>
                                    </div>

                                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                                        <div>
                                            <h4 className="font-semibold text-gray-900">Email Notifications</h4>
                                            <p className="text-sm text-gray-600">Send email confirmations to patients</p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" className="sr-only peer" defaultChecked />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0EA5E9]"></div>
                                        </label>
                                    </div>

                                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                                        <div>
                                            <h4 className="font-semibold text-gray-900">SMS Reminders</h4>
                                            <p className="text-sm text-gray-600">Send SMS reminders 24h before appointment</p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" className="sr-only peer" />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0EA5E9]"></div>
                                        </label>
                                    </div>

                                    <Button className="w-full py-3 rounded-xl bg-[#0EA5E9] hover:bg-[#0284C7] text-white font-semibold">
                                        Save Settings
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};