import React, { useEffect, useState } from 'react';
import { Button } from './Button';

interface PaymentSuccessPageProps {
    bookingDetails: any;
    onBackToHome: () => void;
}

export const PaymentSuccessPage: React.FC<PaymentSuccessPageProps> = ({ bookingDetails, onBackToHome }) => {
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        // Trigger animation after component mounts
        setTimeout(() => setAnimate(true), 100);
    }, []);

    const handleDownloadReceipt = () => {
        alert('Receipt download functionality would be implemented here.');
    };

    const handleAddToCalendar = () => {
        alert('Add to calendar functionality would be implemented here.');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 pt-20 pb-12 px-4">
            <div className="max-w-4xl mx-auto">
                
                {/* Success Animation */}
                <div className={`text-center mb-8 transition-all duration-700 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                    <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full mb-6 shadow-2xl animate-bounce-slow">
                        <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-3">Payment Successful!</h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Your appointment has been confirmed. We've sent a confirmation email with all the details.
                    </p>
                </div>

                {/* Booking Confirmation Card */}
                <div className={`bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden transition-all duration-700 delay-200 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                    
                    {/* Header with Booking ID */}
                    <div className="bg-gradient-to-r from-[#0EA5E9] to-blue-600 p-6 text-white">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-blue-100 text-sm mb-1">Booking ID</p>
                                <p className="text-2xl font-bold">{bookingDetails?.bookingId || 'BK123456'}</p>
                            </div>
                            <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center">
                                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Booking Details */}
                    <div className="p-8">
                        
                        {/* Doctor Information */}
                        <div className="flex items-start gap-6 mb-8 pb-8 border-b border-gray-100">
                            <img 
                                src={bookingDetails?.doctor?.image} 
                                alt="Doctor" 
                                className="w-24 h-24 rounded-2xl object-cover shadow-lg"
                            />
                            <div className="flex-1">
                                <h3 className="text-2xl font-bold text-gray-900 mb-1">{bookingDetails?.doctor?.name}</h3>
                                <p className="text-gray-600 mb-3">{bookingDetails?.doctor?.specialty}</p>
                                <div className="flex items-center gap-4 text-sm">
                                    <div className="flex items-center gap-1">
                                        <svg className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                        </svg>
                                        <span className="font-semibold text-gray-700">{bookingDetails?.doctor?.rating}</span>
                                    </div>
                                    <span className="text-gray-400">•</span>
                                    <span className="text-gray-600">{bookingDetails?.doctor?.country}</span>
                                </div>
                            </div>
                        </div>

                        {/* Appointment Details Grid */}
                        <div className="grid md:grid-cols-3 gap-6 mb-8">
                            <div className="bg-blue-50 p-5 rounded-2xl">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-10 h-10 bg-[#0EA5E9] rounded-xl flex items-center justify-center">
                                        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-xs text-blue-600 font-semibold uppercase tracking-wide">Date</p>
                                        <p className="text-sm font-bold text-gray-900">{bookingDetails?.date}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-purple-50 p-5 rounded-2xl">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-10 h-10 bg-purple-500 rounded-xl flex items-center justify-center">
                                        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-xs text-purple-600 font-semibold uppercase tracking-wide">Time</p>
                                        <p className="text-sm font-bold text-gray-900">{bookingDetails?.time}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-green-50 p-5 rounded-2xl">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center">
                                        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-xs text-green-600 font-semibold uppercase tracking-wide">Type</p>
                                        <p className="text-sm font-bold text-gray-900 capitalize">{bookingDetails?.type}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Payment Summary */}
                        <div className="bg-gray-50 p-6 rounded-2xl mb-6">
                            <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <svg className="w-5 h-5 text-[#0EA5E9]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                Payment Summary
                            </h4>
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm text-gray-600">
                                    <span>Consultation Fee</span>
                                    <span>$120.00</span>
                                </div>
                                <div className="flex justify-between text-sm text-gray-600">
                                    <span>Service Fee</span>
                                    <span>$20.00</span>
                                </div>
                                <div className="flex justify-between text-sm text-gray-600">
                                    <span>Tax (VAT)</span>
                                    <span>$10.00</span>
                                </div>
                                <div className="pt-3 border-t border-gray-300 flex justify-between">
                                    <span className="font-bold text-gray-900">Total Paid</span>
                                    <span className="text-xl font-bold text-[#0EA5E9]">$150.00</span>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button
                                onClick={handleDownloadReceipt}
                                variant="outline"
                                className="flex-1 py-3 rounded-xl border-2 border-gray-200 hover:border-[#0EA5E9] hover:bg-blue-50 transition-colors flex items-center justify-center gap-2"
                            >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                Download Receipt
                            </Button>
                            <Button
                                onClick={handleAddToCalendar}
                                variant="outline"
                                className="flex-1 py-3 rounded-xl border-2 border-gray-200 hover:border-[#0EA5E9] hover:bg-blue-50 transition-colors flex items-center justify-center gap-2"
                            >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                Add to Calendar
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Important Information */}
                <div className={`mt-8 bg-blue-50 border-l-4 border-[#0EA5E9] p-6 rounded-r-2xl transition-all duration-700 delay-300 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                    <div className="flex gap-4">
                        <div className="flex-shrink-0">
                            <svg className="w-6 h-6 text-[#0EA5E9]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-900 mb-2">Important Information</h4>
                            <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                                <li>A confirmation email has been sent to your registered email address</li>
                                <li>Please arrive 10 minutes before your scheduled appointment time</li>
                                <li>Bring any relevant medical records or test results</li>
                                <li>For any changes, contact us at least 24 hours in advance</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Back to Home Button */}
                <div className={`text-center mt-8 transition-all duration-700 delay-400 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                    <Button
                        onClick={onBackToHome}
                        className="px-10 py-4 rounded-xl bg-gradient-to-r from-[#0EA5E9] to-blue-600 text-white hover:from-[#0284C7] hover:to-blue-700 shadow-lg hover:shadow-xl transition-all text-lg font-bold"
                    >
                        Back to Home
                    </Button>
                </div>
            </div>
        </div>
    );
};