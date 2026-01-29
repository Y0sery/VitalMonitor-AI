import React, { useState, useEffect, useRef } from 'react';
import { Button } from './Button';

interface AuthCardProps {
    initialMode?: 'login' | 'signup';
    onLoginSuccess?: (role: 'patient' | 'doctor') => void;
}

export const AuthCard: React.FC<AuthCardProps> = ({
    initialMode = 'login',
    onLoginSuccess,
}) => {
    const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
    const [isLoading, setIsLoading] = useState(false);

    // Form Data
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [role, setRole] = useState<'patient' | 'doctor'>('patient');

    // DOB Data
    const [dobDay, setDobDay] = useState('');
    const [dobMonth, setDobMonth] = useState('');
    const [dobYear, setDobYear] = useState('');
    const [age, setAge] = useState('');

    const [errors, setErrors] = useState<Record<string, string>>({});

    const dayRef = useRef<HTMLInputElement>(null);
    const monthRef = useRef<HTMLInputElement>(null);
    const yearRef = useRef<HTMLInputElement>(null);

    // دالة حساب العمر
    useEffect(() => {
        if (dobDay && dobMonth && dobYear.length === 4) {
            const day = parseInt(dobDay);
            const month = parseInt(dobMonth);
            const year = parseInt(dobYear);
            const today = new Date();
            
            let calculatedAge = today.getFullYear() - year;
            const m = today.getMonth() - (month - 1);
            if (m < 0 || (m === 0 && today.getDate() < day)) {
                calculatedAge--;
            }

            if (calculatedAge >= 0 && calculatedAge <= 120) {
                setAge(calculatedAge.toString());
                if(errors.dob) setErrors(prev => { const n = {...prev}; delete n.dob; return n; });
            } else {
                setAge('');
            }
        } else {
            setAge('');
        }
    }, [dobDay, dobMonth, dobYear]);

    // دالة التحكم في إدخال التاريخ
    const handleDobChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'day' | 'month' | 'year') => {
        const val = e.target.value.replace(/\D/g, '');

        if (field === 'day') {
            if (parseInt(val) > 31) return;
            setDobDay(val);
            if (val.length === 2) monthRef.current?.focus();
        }
        if (field === 'month') {
            if (parseInt(val) > 12) return;
            setDobMonth(val);
            if (val.length === 2) yearRef.current?.focus();
        }
        if (field === 'year') {
            const currentYear = new Date().getFullYear();
            if (val.length === 4 && parseInt(val) > currentYear) return;
            setDobYear(val);
        }
    };
const validate = () => {
        const newErrors: Record<string, string> = {};
        
        // 1. تحقق الإيميل
        if (!email.trim()) newErrors.email = 'Email required';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = 'Invalid email';

        // 2. تحقق الباسورد (التعديل هنا: الشرط بقى عام لكل الحالات)
        if (!password) {
            newErrors.password = 'Password required';
        } else if (password.length < 8) {
            // دلوقتي هيطلع إيرور حتى لو في صفحة اللوجين
            newErrors.password = 'Password must be at least 8 chars';
        }

        // 3. تحققات خاصة بالـ Sign Up فقط (الاسم، التليفون، تأكيد الباسورد)
        if (mode === 'signup') {
            if (!firstName.trim()) newErrors.firstName = 'First Name required';
            if (!lastName.trim()) newErrors.lastName = 'Last Name required';
            
            if (!phone.trim()) newErrors.phone = 'Phone required';
            else if (phone.length < 10) newErrors.phone = 'Invalid phone number';
            
            if (!age || !dobDay || !dobMonth || !dobYear) newErrors.dob = 'Valid Birth Date required';
            
            // التأكد من التطابق (ده بس في الساين أب طبعاً)
            if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // دالة الإرسال (Submit)
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault(); // منع إعادة تحميل الصفحة
        
        const isValid = validate(); // تشغيل التحقق
        
        if (!isValid) {
            // لو البيانات غلط، وقف هنا وماتكملش
            console.log("Validation Failed");
            return; 
        }

        // لو البيانات صح، كمل
        setIsLoading(true);
        console.log("Form Submitted Successfully:", { email, password, role });
        
        setTimeout(() => {
            setIsLoading(false);
            if (onLoginSuccess) {
                onLoginSuccess(role);
            }
        }, 1500);
    };

    const clearError = (field: string) => {
        if (errors[field]) setErrors(prev => { const n = { ...prev }; delete n[field]; return n; });
    };

    return (
        <div className="w-full max-w-[380px] bg-white rounded-3xl shadow-xl overflow-hidden animate-fade-in">
            {/* Tabs */}
            <div className="flex border-b">
                {['login', 'signup'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => { setMode(tab as any); setErrors({}); }}
                        className={`flex-1 py-4 text-sm font-semibold transition-all ${mode === tab ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-400'}`}
                    >
                        {tab === 'login' ? 'Log In' : 'Sign Up'}
                    </button>
                ))}
            </div>

            <form onSubmit={handleSubmit} className="p-8 flex flex-col gap-4">
                {/* Role Toggle */}
                <div className="bg-gray-100 p-1 rounded-xl flex mb-2">
                    {['patient', 'doctor'].map((r) => (
                        <button
                            key={r}
                            type="button"
                            onClick={() => setRole(r as any)}
                            className={`flex-1 py-2 rounded-lg text-xs font-semibold capitalize transition-all ${role === r ? 'bg-white shadow text-gray-900' : 'text-gray-500'}`}
                        >
                            {r}
                        </button>
                    ))}
                </div>

                {mode === 'signup' && (
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <input className={`w-full px-4 py-3 rounded-xl border bg-gray-50 outline-none text-sm ${errors.firstName ? 'border-red-500' : 'border-gray-200'}`} placeholder="First Name" value={firstName} onChange={(e) => {setFirstName(e.target.value); clearError('firstName')}} />
                            {errors.firstName && <p className="text-[10px] text-red-500 mt-1">{errors.firstName}</p>}
                        </div>
                        <div>
                            <input className={`w-full px-4 py-3 rounded-xl border bg-gray-50 outline-none text-sm ${errors.lastName ? 'border-red-500' : 'border-gray-200'}`} placeholder="Last Name" value={lastName} onChange={(e) => {setLastName(e.target.value); clearError('lastName')}} />
                             {errors.lastName && <p className="text-[10px] text-red-500 mt-1">{errors.lastName}</p>}
                        </div>
                    </div>
                )}

                <div>
                    <input className={`w-full px-4 py-3 rounded-xl border bg-gray-50 outline-none text-sm ${errors.email ? 'border-red-500' : 'border-gray-200'}`} placeholder="Email" value={email} onChange={(e) => {setEmail(e.target.value); clearError('email')}} />
                    {errors.email && <p className="text-[10px] text-red-500 mt-1 ml-1">{errors.email}</p>}
                </div>

                {mode === 'signup' && (
                    <>
                        <div>
                            <input className={`w-full px-4 py-3 rounded-xl border bg-gray-50 outline-none text-sm ${errors.phone ? 'border-red-500' : 'border-gray-200'}`} placeholder="Phone" value={phone} onChange={(e) => {setPhone(e.target.value); clearError('phone')}} />
                            {errors.phone && <p className="text-[10px] text-red-500 mt-1 ml-1">{errors.phone}</p>}
                        </div>

                        <div>
                            <div className="grid grid-cols-4 gap-2">
                                <input ref={dayRef} className={`w-full px-2 py-3 rounded-xl border bg-gray-50 text-center outline-none text-sm ${errors.dob ? 'border-red-500' : 'border-gray-200'}`} placeholder="DD" maxLength={2} value={dobDay} onChange={(e) => handleDobChange(e, 'day')} />
                                <input ref={monthRef} className={`w-full px-2 py-3 rounded-xl border bg-gray-50 text-center outline-none text-sm ${errors.dob ? 'border-red-500' : 'border-gray-200'}`} placeholder="MM" maxLength={2} value={dobMonth} onChange={(e) => handleDobChange(e, 'month')} />
                                <input ref={yearRef} className={`w-full px-2 py-3 rounded-xl border bg-gray-50 text-center outline-none text-sm ${errors.dob ? 'border-red-500' : 'border-gray-200'}`} placeholder="YYYY" maxLength={4} value={dobYear} onChange={(e) => handleDobChange(e, 'year')} />
                                <input className="w-full px-2 py-3 rounded-xl border bg-gray-100 text-center outline-none text-gray-500 text-sm" placeholder="Age" value={age} readOnly />
                            </div>
                            {errors.dob && <p className="text-[10px] text-red-500 mt-1 ml-1">{errors.dob}</p>}
                        </div>
                    </>
                )}

                <div>
                    <input type="password" className={`w-full px-4 py-3 rounded-xl border bg-gray-50 outline-none text-sm ${errors.password ? 'border-red-500' : 'border-gray-200'}`} placeholder="Password" value={password} onChange={(e) => {setPassword(e.target.value); clearError('password')}} />
                    {errors.password && <p className="text-[10px] text-red-500 mt-1 ml-1">{errors.password}</p>}
                </div>

                {mode === 'signup' && (
                    <div>
                        <input type="password" className={`w-full px-4 py-3 rounded-xl border bg-gray-50 outline-none text-sm ${errors.confirmPassword ? 'border-red-500' : 'border-gray-200'}`} placeholder="Confirm Password" value={confirmPassword} onChange={(e) => {setConfirmPassword(e.target.value); clearError('confirmPassword')}} />
                        {errors.confirmPassword && <p className="text-[10px] text-red-500 mt-1 ml-1">{errors.confirmPassword}</p>}
                    </div>
                )}

                <Button type="submit" disabled={isLoading} className="w-full py-3 mt-2 rounded-xl bg-gray-900 text-white hover:scale-[1.02] transition shadow-lg">
                    {isLoading ? 'Processing...' : mode === 'login' ? 'Log In' : 'Create Account'}
                </Button>
            </form>
        </div>
    );
};