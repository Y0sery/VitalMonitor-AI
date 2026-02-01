/**
 * DoctorProfilePage.tsx
 * Complete Doctor Profile with Schedule Management
 */

import React, { useState } from 'react';
import { Button } from './Button';

interface Appointment {
    id: string;
    time: string;
    patientName: string;
    type: string;
    status: 'confirmed' | 'pending' | 'completed' | 'cancelled';
}

interface ScheduleDay {
    day: string;
    enabled: boolean;
    startTime: string;
    endTime: string;
}

interface DoctorProfilePageProps {
    onNavigate: (page: string) => void;
    onLogout: () => void;
}

export const DoctorProfilePage: React.FC<DoctorProfilePageProps> = ({ onNavigate, onLogout }) => {
    const [activeTab, setActiveTab] = useState<'overview' | 'schedule' | 'appointments' | 'earnings'>('overview');
    const [isEditingSchedule, setIsEditingSchedule] = useState(false);
    const [toastMessage, setToastMessage] = useState<string | null>(null);

    // Doctor Info
    const [doctorInfo, setDoctorInfo] = useState({
        name: 'Dr. Sarah Smith',
        specialty: 'Cardiologist',
        image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300&h=300',
        bio: 'Specializes in preventative cardiology and advanced heart failure management. Dedicated to providing comprehensive care with a focus on lifestyle modifications.',
        rating: 4.9,
        totalPatients: 1247,
        experience: '15 years'
    });

    // Schedule State
    const [schedule, setSchedule] = useState<ScheduleDay[]>([
        { day: 'Monday', enabled: true, startTime: '09:00', endTime: '17:00' },
        { day: 'Tuesday', enabled: true, startTime: '09:00', endTime: '17:00' },
        { day: 'Wednesday', enabled: false, startTime: '09:00', endTime: '17:00' },
        { day: 'Thursday', enabled: true, startTime: '09:00', endTime: '17:00' },
        { day: 'Friday', enabled: true, startTime: '09:00', endTime: '14:00' },
        { day: 'Saturday', enabled: false, startTime: '09:00', endTime: '17:00' },
        { day: 'Sunday', enabled: false, startTime: '09:00', endTime: '17:00' }
    ]);

    // Today's Appointments
    const [appointments, setAppointments] = useState<Appointment[]>([
        { id: '1', time: '10:00 AM', patientName: 'Alice Brown', type: 'Check-up', status: 'confirmed' },
        { id: '2', time: '11:30 AM', patientName: 'Robert Taylor', type: 'Consultation', status: 'confirmed' },
        { id: '3', time: '02:00 PM', patientName: 'David Miller', type: 'Follow-up', status: 'pending' },
        { id: '4', time: '03:30 PM', patientName: 'Emma Wilson', type: 'Check-up', status: 'confirmed' },
        { id: '5', time: '04:30 PM', patientName: 'James Anderson', type: 'Consultation', status: 'pending' }
    ]);

    const showToast = (message: string) => {
        setToastMessage(message);
        setTimeout(() => setToastMessage(null), 3000);
    };

    const handleToggleDay = (index: number) => {
        const updated = [...schedule];
        updated[index].enabled = !updated[index].enabled;
        setSchedule(updated);
    };

    const handleUpdateTime = (index: number, field: 'startTime' | 'endTime', value: string) => {
        const updated = [...schedule];
        updated[index][field] = value;
        setSchedule(updated);
    };

    const handleSaveSchedule = () => {
        setIsEditingSchedule(false);
        showToast('Schedule updated successfully!');
    };

    const handleUpdateAppointmentStatus = (appointmentId: string, status: Appointment['status']) => {
        setAppointments(appointments.map(apt => 
            apt.id === appointmentId ? { ...apt, status } : apt
        ));
        showToast(`Appointment ${status}`);
    };

    // Stats
    const stats = {
        todayAppointments: appointments.length,
        completedToday: appointments.filter(a => a.status === 'completed').length,
        pendingAppointments: appointments.filter(a => a.status === 'pending').length,
        monthlyEarnings: '$12,450',
        totalRevenue: '$156,890'
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 pt-20 pb-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <button
                        onClick={() => onNavigate('home')}
                        className="flex items-center gap-2 text-gray-600 hover:text-[#0EA5E9] transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        <span className="font-semibold">Back to Home</span>
                    </button>
                    <button
                        onClick={onLogout}
                        className="flex items-center gap-2 px-5 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-xl transition-all shadow-md font-semibold"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Logout
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Sidebar - Doctor Info */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* Profile Card */}
                        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
                            <div className="text-center mb-6">
                                <img
                                    src={doctorInfo.image}
                                    alt={doctorInfo.name}
                                    className="w-32 h-32 rounded-3xl object-cover mx-auto mb-4 ring-4 ring-blue-100 shadow-xl"
                                />
                                <h2 className="text-2xl font-bold text-gray-900 mb-1">{doctorInfo.name}</h2>
                                <p className="text-[#0EA5E9] font-semibold text-lg mb-3">{doctorInfo.specialty}</p>
                                <div className="flex items-center justify-center gap-2 mb-4">
                                    <div className="flex items-center gap-1 bg-gradient-to-r from-yellow-400 to-orange-400 px-4 py-2 rounded-xl shadow-md">
                                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                        <span className="text-lg font-bold text-white">{doctorInfo.rating}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div className="bg-blue-50 rounded-2xl p-4 text-center">
                                    <p className="text-3xl font-bold text-[#0EA5E9] mb-1">{doctorInfo.totalPatients}</p>
                                    <p className="text-xs text-gray-600 font-medium">Total Patients</p>
                                </div>
                                <div className="bg-purple-50 rounded-2xl p-4 text-center">
                                    <p className="text-3xl font-bold text-purple-600 mb-1">{doctorInfo.experience}</p>
                                    <p className="text-xs text-gray-600 font-medium">Experience</p>
                                </div>
                            </div>

                            {/* Biography */}
                            <div>
                                <h3 className="text-lg font-bold text-gray-900 mb-3">Biography</h3>
                                <p className="text-sm text-gray-600 leading-relaxed">{doctorInfo.bio}</p>
                            </div>
                        </div>

                        {/* Availability Card */}
                        <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-bold text-gray-900">Availability</h3>
                                <button
                                    onClick={() => setIsEditingSchedule(!isEditingSchedule)}
                                    className="text-[#0EA5E9] hover:text-[#0284C7] font-semibold text-sm transition-colors"
                                >
                                    {isEditingSchedule ? 'Cancel' : 'Edit'}
                                </button>
                            </div>

                            <div className="space-y-2">
                                {schedule.map((day, index) => (
                                    <div key={day.day} className={`flex items-center justify-between p-3 rounded-xl transition-all ${
                                        day.enabled ? 'bg-green-50 border-2 border-green-200' : 'bg-gray-50 border-2 border-gray-200'
                                    }`}>
                                        <div className="flex items-center gap-3">
                                            {isEditingSchedule && (
                                                <button
                                                    onClick={() => handleToggleDay(index)}
                                                    className={`w-6 h-6 rounded-lg flex items-center justify-center transition-all ${
                                                        day.enabled ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-500'
                                                    }`}
                                                >
                                                    {day.enabled && (
                                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                        </svg>
                                                    )}
                                                </button>
                                            )}
                                            <p className={`font-semibold text-sm ${day.enabled ? 'text-gray-900' : 'text-gray-400'}`}>
                                                {day.day}
                                            </p>
                                        </div>
                                        {day.enabled ? (
                                            isEditingSchedule ? (
                                                <div className="flex items-center gap-2">
                                                    <input
                                                        type="time"
                                                        value={day.startTime}
                                                        onChange={(e) => handleUpdateTime(index, 'startTime', e.target.value)}
                                                        className="px-2 py-1 text-xs border-2 border-gray-200 rounded-lg focus:border-[#0EA5E9] outline-none"
                                                    />
                                                    <span className="text-gray-400">-</span>
                                                    <input
                                                        type="time"
                                                        value={day.endTime}
                                                        onChange={(e) => handleUpdateTime(index, 'endTime', e.target.value)}
                                                        className="px-2 py-1 text-xs border-2 border-gray-200 rounded-lg focus:border-[#0EA5E9] outline-none"
                                                    />
                                                </div>
                                            ) : (
                                                <p className="text-sm text-gray-600 font-medium">
                                                    {day.startTime} - {day.endTime}
                                                </p>
                                            )
                                        ) : (
                                            <p className="text-sm text-red-500 font-bold">OFF</p>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {isEditingSchedule && (
                                <Button
                                    onClick={handleSaveSchedule}
                                    className="w-full mt-4 bg-gradient-to-r from-[#0EA5E9] to-[#0284C7] text-white py-3 rounded-xl font-bold shadow-lg"
                                >
                                    Save Schedule
                                </Button>
                            )}
                        </div>
                    </div>

                    {/* Right Content - Main Area */}
                    <div className="lg:col-span-2">
                        {/* Tabs */}
                        <div className="bg-white rounded-3xl shadow-xl mb-6 p-2 flex gap-2">
                            {[
                                { id: 'overview', label: 'Overview', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
                                { id: 'appointments', label: 'Appointments', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
                                { id: 'earnings', label: 'Earnings', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' }
                            ].map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id as any)}
                                    className={`flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-2xl font-bold transition-all ${
                                        activeTab === tab.id
                                            ? 'bg-gradient-to-r from-[#0EA5E9] to-[#0284C7] text-white shadow-lg'
                                            : 'text-gray-600 hover:bg-gray-50'
                                    }`}
                                >
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={tab.icon} />
                                    </svg>
                                    <span>{tab.label}</span>
                                </button>
                            ))}
                        </div>

                        {/* Overview Tab */}
                        {activeTab === 'overview' && (
                            <div className="space-y-6">
                                {/* Stats Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {[
                                        { label: "Today's Appointments", value: stats.todayAppointments, color: 'blue', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
                                        { label: 'Pending', value: stats.pendingAppointments, color: 'yellow', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
                                        { label: 'Monthly Earnings', value: stats.monthlyEarnings, color: 'green', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' }
                                    ].map((stat, idx) => (
                                        <div key={idx} className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100">
                                            <div className={`w-14 h-14 bg-gradient-to-br from-${stat.color}-400 to-${stat.color}-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg`}>
                                                <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={stat.icon} />
                                                </svg>
                                            </div>
                                            <h3 className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</h3>
                                            <p className="text-sm text-gray-600 font-medium">{stat.label}</p>
                                        </div>
                                    ))}
                                </div>

                                {/* Today's Appointments */}
                                <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                                        <svg className="w-7 h-7 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        Today's Appointments
                                    </h3>

                                    <div className="space-y-4">
                                        {appointments.map(apt => (
                                            <div key={apt.id} className="flex items-center justify-between p-5 bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl hover:shadow-md transition-all border-2 border-gray-100">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl flex items-center justify-center text-white font-bold text-sm shadow-lg">
                                                        {apt.time.split(' ')[0]}
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-gray-900 text-lg">{apt.patientName}</p>
                                                        <p className="text-sm text-gray-600">{apt.type}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <select
                                                        value={apt.status}
                                                        onChange={(e) => handleUpdateAppointmentStatus(apt.id, e.target.value as any)}
                                                        className={`px-4 py-2 rounded-xl text-sm font-bold border-0 outline-none cursor-pointer shadow-md ${
                                                            apt.status === 'confirmed' ? 'bg-green-500 text-white' :
                                                            apt.status === 'pending' ? 'bg-yellow-400 text-gray-900' :
                                                            apt.status === 'completed' ? 'bg-blue-500 text-white' :
                                                            'bg-red-500 text-white'
                                                        }`}
                                                    >
                                                        <option value="pending">Pending</option>
                                                        <option value="confirmed">Confirmed</option>
                                                        <option value="completed">Completed</option>
                                                        <option value="cancelled">Cancelled</option>
                                                    </select>
                                                    <button className="px-4 py-2 bg-[#0EA5E9] hover:bg-[#0284C7] text-white rounded-xl font-semibold shadow-md transition-all">
                                                        View Info
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <button className="w-full mt-6 py-4 border-3 border-dashed border-gray-300 rounded-2xl text-gray-500 hover:border-[#0EA5E9] hover:text-[#0EA5E9] transition-all font-bold">
                                        View Full Calendar
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Appointments Tab */}
                        {activeTab === 'appointments' && (
                            <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
                                <h3 className="text-2xl font-bold text-gray-900 mb-6">All Appointments</h3>
                                <div className="space-y-4">
                                    {appointments.map(apt => (
                                        <div key={apt.id} className="flex items-center justify-between p-5 bg-gray-50 rounded-2xl hover:bg-blue-50 transition-all">
                                            <div>
                                                <p className="font-bold text-gray-900">{apt.patientName}</p>
                                                <p className="text-sm text-gray-600">{apt.time} • {apt.type}</p>
                                            </div>
                                            <span className={`px-4 py-2 rounded-xl text-xs font-bold ${
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
                        )}

                        {/* Earnings Tab */}
                        {activeTab === 'earnings' && (
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-3xl p-8 shadow-xl text-white">
                                        <p className="text-sm font-semibold opacity-90 mb-2">Monthly Earnings</p>
                                        <h3 className="text-5xl font-bold mb-4">{stats.monthlyEarnings}</h3>
                                        <p className="text-sm opacity-80">Based on {stats.todayAppointments} appointments</p>
                                    </div>
                                    <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-3xl p-8 shadow-xl text-white">
                                        <p className="text-sm font-semibold opacity-90 mb-2">Total Revenue</p>
                                        <h3 className="text-5xl font-bold mb-4">{stats.totalRevenue}</h3>
                                        <p className="text-sm opacity-80">All time earnings</p>
                                    </div>
                                </div>

                                <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Earnings Chart</h3>
                                    <div className="h-64 flex items-end justify-around gap-2">
                                        {[65, 85, 75, 95, 70, 90, 80].map((height, idx) => (
                                            <div key={idx} className="flex-1 flex flex-col items-center">
                                                <div 
                                                    className="w-full bg-gradient-to-t from-green-500 to-emerald-400 rounded-t-2xl transition-all hover:opacity-80"
                                                    style={{ height: `${height}%` }}
                                                ></div>
                                                <p className="text-xs text-gray-500 mt-2 font-semibold">Week {idx + 1}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
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