/**
 * BookingModal.tsx
 * 
 * Role: Booking Modal Component with Real Date & Time Selection
 * Features:
 * - Shows real upcoming dates (starting from tomorrow)
 * - Displays available time slots
 * - Smooth animations
 * - Professional design
 */

import React, { useState, useEffect } from 'react';
import { Button } from './Button';

interface BookingModalProps {
    isOpen: boolean;
    onClose: () => void;
    doctor: any;
    onConfirm: (date: string, time: string) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, doctor, onConfirm }) => {
    const [selectedDate, setSelectedDate] = useState<string>('');
    const [selectedTime, setSelectedTime] = useState<string>('');
    const [availableDates, setAvailableDates] = useState<Array<{ date: Date; dayName: string; dayNum: string; monthName: string }>>([]);
    
    // Generate available dates (next 7 days starting from tomorrow)
    useEffect(() => {
        const dates = [];
        const today = new Date();
        
        for (let i = 1; i <= 7; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() + i);
            
            const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            
            dates.push({
                date: date,
                dayName: dayNames[date.getDay()],
                dayNum: date.getDate().toString(),
                monthName: monthNames[date.getMonth()]
            });
        }
        
        setAvailableDates(dates);
        
        // Auto-select first date
        if (dates.length > 0) {
            const firstDate = dates[0].date;
            setSelectedDate(formatDate(firstDate));
        }
    }, [isOpen]);
    
    // Available time slots (realistic consultation hours)
    const timeSlots = [
        '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
        '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM',
        '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM',
        '04:00 PM', '04:30 PM', '05:00 PM', '05:30 PM'
    ];
    
    const formatDate = (date: Date) => {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        
        return `${days[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
    };
    
    const handleDateClick = (date: Date) => {
        setSelectedDate(formatDate(date));
        setSelectedTime(''); // Reset time when date changes
    };
    
    const handleTimeClick = (time: string) => {
        setSelectedTime(time);
    };
    
    const handleConfirm = () => {
        if (selectedDate && selectedTime) {
            onConfirm(selectedDate, selectedTime);
            onClose();
        }
    };
    
    if (!isOpen) return null;
    
    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
            <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full max-h-[85vh] overflow-hidden animate-scale-in flex flex-col">
                
                {/* Header */}
                <div className="bg-gradient-to-r from-[#0EA5E9] to-blue-600 p-6 text-white">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-2xl font-bold">Book Appointment</h3>
                        <button 
                            onClick={onClose}
                            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    
                    {/* Doctor Info */}
                    {doctor && (
                        <div className="flex items-center gap-3">
                            <img 
                                src={doctor.image} 
                                alt={doctor.name}
                                className="w-14 h-14 rounded-xl object-cover border-2 border-white/30"
                            />
                            <div>
                                <h4 className="font-bold text-lg">{doctor.name}</h4>
                                <p className="text-blue-100 text-sm">{doctor.specialty}</p>
                            </div>
                        </div>
                    )}
                </div>
                
                {/* Content */}
                <div className="p-6 overflow-y-auto flex-1">
                    
                    {/* Select Date */}
                    <div className="mb-6">
                        <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                            <svg className="w-5 h-5 text-[#0EA5E9]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            Select a day
                        </h4>
                        
                        <div className="grid grid-cols-4 gap-3">
                            {availableDates.map((dateObj, index) => {
                                const isSelected = selectedDate === formatDate(dateObj.date);
                                return (
                                    <button
                                        key={index}
                                        onClick={() => handleDateClick(dateObj.date)}
                                        className={`p-3 rounded-xl text-center transition-all ${
                                            isSelected 
                                                ? 'bg-[#0EA5E9] text-white shadow-lg scale-105' 
                                                : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                                        }`}
                                    >
                                        <div className="text-xs mb-1 opacity-80">{dateObj.dayName}</div>
                                        <div className="text-2xl font-bold">{dateObj.dayNum}</div>
                                        <div className="text-xs opacity-80">{dateObj.monthName}</div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                    
                    {/* Select Time */}
                    <div className="mb-6">
                        <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                            <svg className="w-5 h-5 text-[#0EA5E9]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Select a time
                        </h4>
                        
                        <div className="grid grid-cols-3 gap-3 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                            {timeSlots.map((time, index) => {
                                const isSelected = selectedTime === time;
                                return (
                                    <button
                                        key={index}
                                        onClick={() => handleTimeClick(time)}
                                        className={`p-3 rounded-xl text-sm font-medium transition-all ${
                                            isSelected 
                                                ? 'bg-[#0EA5E9] text-white shadow-lg scale-105' 
                                                : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                                        }`}
                                    >
                                        {time}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                    
                    {/* Selected Info Summary */}
                    {selectedDate && selectedTime && (
                        <div className="bg-blue-50 border border-blue-100 p-4 rounded-2xl mb-6">
                            <div className="flex items-start gap-3">
                                <div className="w-10 h-10 bg-[#0EA5E9] rounded-xl flex items-center justify-center flex-shrink-0">
                                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                    </svg>
                                </div>
                                <div className="flex-1">
                                    <p className="text-xs text-blue-600 font-semibold uppercase tracking-wide mb-1">Your Booking</p>
                                    <p className="text-sm font-bold text-gray-900">{selectedDate}</p>
                                    <p className="text-sm text-gray-600 mt-1">{selectedTime}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                
                {/* Footer Actions */}
                <div className="p-6 bg-gray-50 border-t border-gray-100 flex gap-3 flex-shrink-0">
                    <Button
                        variant="outline"
                        onClick={onClose}
                        className="flex-1 py-3 rounded-xl border-2 hover:bg-gray-100"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleConfirm}
                        disabled={!selectedDate || !selectedTime}
                        className={`flex-1 py-3 rounded-xl font-bold transition-all ${
                            selectedDate && selectedTime
                                ? 'bg-gradient-to-r from-[#0EA5E9] to-blue-600 text-white hover:shadow-lg'
                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                    >
                        Confirm Booking
                    </Button>
                </div>
            </div>
            
            {/* Custom Scrollbar Styles */}
            <style>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: #f1f1f1;
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #0EA5E9;
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #0284C7;
                }
                
                @keyframes fade-in {
                    from {
                        opacity: 0;
                    }
                    to {
                        opacity: 1;
                    }
                }
                
                @keyframes scale-in {
                    from {
                        opacity: 0;
                        transform: scale(0.9);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1);
                    }
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