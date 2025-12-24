/**
 * BookingModal.tsx
 * 
 * Role: Appointment Booking Interface
 * Responsibilities:
 * - Provides a user interface for selecting appointment dates and times.
 * - Displays the selected doctor's basic information.
 * - Handles the confirmation of the booking.
 * - Uses the reusable Modal component for presentation.
 */

import React, { useState } from 'react';
import { Button } from './Button';
import { Modal } from './Modal';

interface BookingModalProps {
    isOpen: boolean;
    onClose: () => void;
    doctor: {
        name: string;
        image: string;
        specialty: string;
    } | null;
    onConfirm: (date: string, time: string) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, doctor, onConfirm }) => {
    // State for selected date and time slots
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);

    // Generate mock dates for the next 7 days for demonstration
    const dates = Array.from({ length: 7 }, (_, i) => {
        const d = new Date();
        d.setDate(d.getDate() + i);
        return {
            day: d.toLocaleDateString('en-US', { weekday: 'short' }),
            date: d.getDate(),
            fullDate: d.toISOString().split('T')[0]
        };
    });

    // Mock time slots
    const times = [
        '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
        '11:00 AM', '11:30 AM', '02:00 PM', '02:30 PM',
        '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM'
    ];

    // Handle the confirmation action
    const handleConfirm = () => {
        if (selectedDate && selectedTime) {
            onConfirm(selectedDate, selectedTime);
            onClose();
        }
    };

    if (!doctor) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="">
            <div className="pt-0">
                {/* Doctor Header Info */}
                <div className="flex items-center gap-4 mb-6">
                    <img
                        src={doctor.image}
                        alt={doctor.name}
                        className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-sm"
                    />
                    <div>
                        <div className="text-xs text-gray-500 font-medium">Booking Appointment with</div>
                        <h3 className="text-lg font-bold text-[#0F172A]">{doctor.name}</h3>
                    </div>
                </div>

                {/* Date Selection Carousel */}
                <div className="mb-6">
                    <h4 className="text-sm font-bold text-gray-700 mb-3">Select a day</h4>
                    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                        {dates.map((item) => (
                            <button
                                key={item.fullDate}
                                onClick={() => setSelectedDate(item.fullDate)}
                                className={`flex flex-col items-center justify-center min-w-[4rem] h-16 rounded-2xl transition-all ${selectedDate === item.fullDate
                                    ? 'bg-[#0EA5E9] text-white shadow-md shadow-sky-500/20'
                                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                                    }`}
                            >
                                <span className={`text-[10px] font-medium mb-0.5 ${selectedDate === item.fullDate ? 'text-sky-100' : 'text-gray-500'}`}>
                                    {item.day}
                                </span>
                                <span className="text-lg font-bold leading-none">
                                    {item.date}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Time Selection Grid */}
                <div className="mb-8">
                    <h4 className="text-sm font-bold text-gray-700 mb-3">Select a time</h4>
                    <div className="flex flex-wrap gap-3">
                        {times.map((time) => (
                            <button
                                key={time}
                                onClick={() => setSelectedTime(time)}
                                className={`py-2 px-4 rounded-full text-xs font-bold transition-all ${selectedTime === time
                                    ? 'bg-[#0EA5E9] text-white shadow-md shadow-sky-500/20'
                                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                                    } ${time === '10:30 AM' ? 'opacity-50 cursor-not-allowed bg-gray-100 text-gray-400' : ''}`}
                            >
                                {time}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 mt-2">
                    <Button
                        variant="outline"
                        className="flex-1 rounded-xl h-11 border-none bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold"
                        onClick={onClose}
                    >
                        Cancel
                    </Button>
                    <Button
                        className="flex-1 rounded-xl h-11 bg-[#0EA5E9] text-white hover:bg-[#0284C7] shadow-lg shadow-sky-500/20 font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={handleConfirm}
                        disabled={!selectedDate || !selectedTime}
                    >
                        Confirm Booking
                    </Button>
                </div>
            </div>
        </Modal>
    );
};
