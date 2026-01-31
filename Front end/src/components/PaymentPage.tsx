import React, { useState } from 'react';
import { Button } from './Button';

interface PaymentPageProps {
    bookingDetails: any;
    onPaymentSuccess: () => void;
    onBack: () => void;
}

export const PaymentPage: React.FC<PaymentPageProps> = ({ bookingDetails, onPaymentSuccess, onBack }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvc, setCvc] = useState('');

    // Format card number with spaces
    const formatCardNumber = (value: string) => {
        const cleaned = value.replace(/\s/g, '');
        const formatted = cleaned.match(/.{1,4}/g)?.join(' ') || cleaned;
        return formatted;
    };

    // Format expiry date
    const formatExpiryDate = (value: string) => {
        const cleaned = value.replace(/\D/g, '');
        if (cleaned.length >= 2) {
            return cleaned.slice(0, 2) + '/' + cleaned.slice(2, 4);
        }
        return cleaned;
    };

    const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\s/g, '');
        if (value.length <= 16) {
            setCardNumber(formatCardNumber(value));
        }
    };

    const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, '');
        if (value.length <= 4) {
            setExpiryDate(formatExpiryDate(value));
        }
    };

    const handleCvcChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, '');
        if (value.length <= 3) {
            setCvc(value);
        }
    };

    const handlePay = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        
        // Simulate payment processing
        setTimeout(() => {
            setIsLoading(false);
            onPaymentSuccess();
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#F8FAFC] via-white to-blue-50/30 pt-24 pb-12 px-4">
            <div className="max-w-6xl mx-auto">
                
                {/* Back Button */}
                <button 
                    onClick={onBack} 
                    className="text-gray-600 hover:text-[#0EA5E9] flex items-center gap-2 mb-8 transition-colors group"
                >
                    <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to Doctors
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* Order Summary Section */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100">
                            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                <svg className="w-6 h-6 text-[#0EA5E9]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                                Order Summary
                            </h3>
                            
                            {/* Doctor Info */}
                            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
                                <div className="relative">
                                    <img 
                                        src={bookingDetails?.doctor?.image} 
                                        alt="Doctor" 
                                        className="w-20 h-20 rounded-2xl object-cover shadow-md"
                                    />
                                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white flex items-center justify-center">
                                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-bold text-gray-900">{bookingDetails?.doctor?.name}</h4>
                                    <p className="text-sm text-gray-500">{bookingDetails?.doctor?.specialty}</p>
                                    <div className="flex items-center gap-1 mt-1">
                                        <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                        </svg>
                                        <span className="text-sm font-medium text-gray-700">{bookingDetails?.doctor?.rating}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Booking Details */}
                            <div className="space-y-4 mb-6">
                                <div className="flex items-center gap-3 text-sm">
                                    <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                                        <svg className="w-5 h-5 text-[#0EA5E9]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-xs text-gray-500 uppercase tracking-wide">Date</p>
                                        <p className="font-semibold text-gray-900">{bookingDetails?.date}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 text-sm">
                                    <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center">
                                        <svg className="w-5 h-5 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-xs text-gray-500 uppercase tracking-wide">Time</p>
                                        <p className="font-semibold text-gray-900">{bookingDetails?.time}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 text-sm">
                                    <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center">
                                        <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-xs text-gray-500 uppercase tracking-wide">Type</p>
                                        <p className="font-semibold text-gray-900 capitalize">{bookingDetails?.type}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Price Breakdown */}
                            <div className="space-y-3 pt-6 border-t border-gray-100">
                                <div className="flex justify-between text-sm text-gray-600">
                                    <span>Consultation Fee</span>
                                    <span className="font-medium">$120.00</span>
                                </div>
                                <div className="flex justify-between text-sm text-gray-600">
                                    <span>Service Fee</span>
                                    <span className="font-medium">$20.00</span>
                                </div>
                                <div className="flex justify-between text-sm text-gray-600">
                                    <span>Tax (VAT)</span>
                                    <span className="font-medium">$10.00</span>
                                </div>
                                <div className="pt-3 border-t border-gray-200 flex justify-between items-center">
                                    <span className="text-lg font-bold text-gray-900">Total</span>
                                    <span className="text-2xl font-bold text-[#0EA5E9]">$150.00</span>
                                </div>
                            </div>
                        </div>

                        {/* Security Badge */}
                        <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-2xl border border-green-100">
                            <div className="flex items-start gap-3">
                                <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900 text-sm mb-1">Secure Payment</h4>
                                    <p className="text-xs text-gray-600 leading-relaxed">Your payment information is encrypted and secure. We never store your card details.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Payment Form Section */}
                    <div className="lg:col-span-2">
                        <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-gray-100">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-12 h-12 bg-gradient-to-br from-[#0EA5E9] to-blue-600 rounded-2xl flex items-center justify-center">
                                    <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                    </svg>
                                </div>
                                <div>
                                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Payment Details</h2>
                                    <p className="text-sm text-gray-500 mt-0.5">Complete your booking securely</p>
                                </div>
                            </div>
                            
                            <form onSubmit={handlePay} className="space-y-6">
                                {/* Card Holder Name */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Card Holder Name</label>
                                    <input 
                                        type="text" 
                                        placeholder="John Doe" 
                                        className="w-full px-5 py-4 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-[#0EA5E9]/30 focus:border-[#0EA5E9] outline-none transition-all text-gray-900 placeholder-gray-400" 
                                        required 
                                    />
                                </div>

                                {/* Card Number */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Card Number</label>
                                    <div className="relative">
                                        <input 
                                            type="text" 
                                            placeholder="0000 0000 0000 0000" 
                                            value={cardNumber}
                                            onChange={handleCardNumberChange}
                                            className="w-full px-5 py-4 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-[#0EA5E9]/30 focus:border-[#0EA5E9] outline-none transition-all text-gray-900 placeholder-gray-400 pr-24" 
                                            required 
                                        />
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-2">
                                            <div className="w-10 h-7 bg-gradient-to-br from-blue-600 to-blue-800 rounded flex items-center justify-center">
                                                <span className="text-white text-xs font-bold">VISA</span>
                                            </div>
                                            <div className="w-10 h-7 bg-gradient-to-br from-red-600 to-orange-600 rounded flex items-center justify-center">
                                                <div className="flex gap-0.5">
                                                    <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                                                    <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Expiry & CVC */}
                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Expiry Date</label>
                                        <input 
                                            type="text" 
                                            placeholder="MM/YY" 
                                            value={expiryDate}
                                            onChange={handleExpiryChange}
                                            className="w-full px-5 py-4 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-[#0EA5E9]/30 focus:border-[#0EA5E9] outline-none transition-all text-gray-900 placeholder-gray-400" 
                                            required 
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">CVC</label>
                                        <input 
                                            type="text" 
                                            placeholder="123" 
                                            value={cvc}
                                            onChange={handleCvcChange}
                                            className="w-full px-5 py-4 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-[#0EA5E9]/30 focus:border-[#0EA5E9] outline-none transition-all text-gray-900 placeholder-gray-400" 
                                            required 
                                        />
                                    </div>
                                </div>

                                {/* Billing Address */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Billing Address</label>
                                    <input 
                                        type="text" 
                                        placeholder="123 Main Street, City, Country" 
                                        className="w-full px-5 py-4 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-[#0EA5E9]/30 focus:border-[#0EA5E9] outline-none transition-all text-gray-900 placeholder-gray-400" 
                                        required 
                                    />
                                </div>

                                {/* Terms Checkbox */}
                                <div className="flex items-start gap-3 bg-blue-50/50 p-4 rounded-xl border border-blue-100">
                                    <input 
                                        type="checkbox" 
                                        id="terms" 
                                        required 
                                        className="mt-1 w-4 h-4 rounded border-gray-300 text-[#0EA5E9] focus:ring-[#0EA5E9]"
                                    />
                                    <label htmlFor="terms" className="text-sm text-gray-700 leading-relaxed">
                                        I agree to the <span className="text-[#0EA5E9] font-medium">Terms & Conditions</span> and <span className="text-[#0EA5E9] font-medium">Privacy Policy</span>. I understand that this booking is subject to doctor availability.
                                    </label>
                                </div>

                                {/* Submit Button */}
                                <Button 
                                    type="submit" 
                                    disabled={isLoading}
                                    className="w-full py-5 rounded-xl bg-gradient-to-r from-[#0EA5E9] to-blue-600 text-white hover:from-[#0284C7] hover:to-blue-700 shadow-lg hover:shadow-xl transition-all text-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                                >
                                    {isLoading ? (
                                        <>
                                            <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Processing Payment...
                                        </>
                                    ) : (
                                        <>
                                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                            </svg>
                                            Pay $150.00
                                        </>
                                    )}
                                </Button>

                                {/* Security Note */}
                                <div className="flex items-center justify-center gap-2 text-xs text-gray-500 mt-4">
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                    <span>256-bit SSL Encrypted Payment</span>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};