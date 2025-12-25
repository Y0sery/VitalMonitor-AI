import React, { useState, useEffect, useRef } from 'react';
import { Button } from './Button';

interface AuthCardProps {
    initialMode?: 'login' | 'signup';
    onClose?: () => void;
    onLoginSuccess?: (role: 'patient' | 'doctor') => void;
}

export const AuthCard: React.FC<AuthCardProps> = ({
    initialMode = 'login',
    onLoginSuccess,
}) => {
    const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
    const [isLoading, setIsLoading] = useState(false);

    // Form state
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [role, setRole] = useState<'patient' | 'doctor'>('patient');

    // DOB & Age
    const [dobDay, setDobDay] = useState('');
    const [dobMonth, setDobMonth] = useState('');
    const [dobYear, setDobYear] = useState('');
    const [age, setAge] = useState('');

    // Errors
    const [errors, setErrors] = useState<Record<string, string>>({});

    // Refs
    const dayRef = useRef<HTMLInputElement>(null);
    const monthRef = useRef<HTMLInputElement>(null);
    const yearRef = useRef<HTMLInputElement>(null);

    /* -------------------- DATE LOGIC & VALIDATION -------------------- */
    useEffect(() => {
        // حساب السن فقط لو التاريخ مكتوب بالكامل
        if (dobDay && dobMonth && dobYear.length === 4) {
            const day = parseInt(dobDay);
            const month = parseInt(dobMonth);
            const year = parseInt(dobYear);

            const birthDate = new Date(year, month - 1, day);
            const today = new Date();

            // 1. التأكد إن التاريخ حقيقي (مثلاً مش 31 فبراير)
            const isValidDate =
                birthDate.getDate() === day &&
                birthDate.getMonth() === month - 1 &&
                birthDate.getFullYear() === year &&
                birthDate <= today; // ميكونش تاريخ في المستقبل

            if (!isValidDate) {
                setAge('');
                return;
            }

            // 2. حساب السن
            let calculatedAge = today.getFullYear() - year;
            const m = today.getMonth() - (month - 1);
            if (m < 0 || (m === 0 && today.getDate() < day)) {
                calculatedAge--;
            }

            // 3. التأكد إن السن منطقي (مش بالسالب ومش فوق 120 سنة)
            if (calculatedAge >= 0 && calculatedAge <= 120) {
                setAge(calculatedAge.toString());
                // لو فيه خطأ ظاهر يخص التاريخ نشيله
                setErrors(prev => {
                    const newErrors = { ...prev };
                    delete newErrors.dob;
                    return newErrors;
                });
            } else {
                setAge(''); // سن غير منطقي
            }
        } else {
            setAge('');
        }
    }, [dobDay, dobMonth, dobYear]);

    const handleDobChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        field: 'day' | 'month' | 'year'
    ) => {
        const val = e.target.value.replace(/\D/g, ''); // منع الحروف
        
        // 1. منطق اليوم (مكس 31)
        if (field === 'day') {
            if (parseInt(val) > 31) return; // ممنوع كتابة رقم أكبر من 31
            setDobDay(val);
            if (val.length === 2) monthRef.current?.focus();
        }
        
        // 2. منطق الشهر (مكس 12)
        if (field === 'month') {
            if (parseInt(val) > 12) return; // ممنوع كتابة رقم أكبر من 12
            setDobMonth(val);
            if (val.length === 2) yearRef.current?.focus();
        }
        
        // 3. منطق السنة (ممنوع أكبر من السنة الحالية)
        if (field === 'year') {
            const currentYear = new Date().getFullYear();
            if (val.length === 4 && parseInt(val) > currentYear) return; // ممنوع تاريخ مستقبلي
            setDobYear(val);
        }
    };

    /* -------------------- VALIDATION ON SUBMIT -------------------- */
    const validateLogin = () => {
        const newErrors: Record<string, string> = {};
        if (!email.trim()) newErrors.email = 'Email required';
        if (!password) newErrors.password = 'Password required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateSignup = () => {
        const newErrors: Record<string, string> = {};
        
        if (!firstName.trim()) newErrors.firstName = 'Required';
        if (!lastName.trim()) newErrors.lastName = 'Required';
        
        if (!email.trim()) newErrors.email = 'Required';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = 'Invalid email';
        
        if (!phone.trim()) newErrors.phone = 'Required';
        else if (phone.length < 10) newErrors.phone = 'Invalid phone';

        // التأكد من إن السن اتحسب صح
        if (!age) newErrors.dob = 'Invalid Date';

        if (!password) newErrors.password = 'Required';
        else if (password.length < 8) newErrors.password = 'Min 8 chars';

        if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords mismatch';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    /* -------------------- SUBMIT -------------------- */
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const isValid = mode === 'login' ? validateLogin() : validateSignup();
        
        if (!isValid) return;

        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            console.log("Success:", { mode, email, password, age });
            onLoginSuccess?.(role);
        }, 1500);
    };

    const clearError = (f: string) => {
        if (errors[f]) setErrors(prev => { const n = { ...prev }; delete n[f]; return n; });
    };

    return (
        <div className="w-full max-w-[380px] bg-white rounded-3xl shadow-xl animate-fade-in overflow-hidden">
            {/* Tabs */}
            <div className="flex border-b">
                {['login', 'signup'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => { setMode(tab as any); setErrors({}); }}
                        className={`flex-1 py-4 text-sm font-semibold transition-all ${mode === tab ? 'text-primary border-b-2 border-primary' : 'text-gray-400 hover:text-gray-600'}`}
                    >
                        {tab === 'login' ? 'Log In' : 'Sign Up'}
                    </button>
                ))}
            </div>

            <form onSubmit={handleSubmit} className="p-8 flex flex-col gap-4">
                {/* Role Switcher */}
                <div className="bg-gray-100 p-1 rounded-xl flex mb-2">
                    {['patient', 'doctor'].map((r) => (
                        <button
                            key={r}
                            type="button"
                            onClick={() => setRole(r as any)}
                            className={`flex-1 py-2 rounded-lg text-xs font-semibold transition capitalize ${role === r ? 'bg-white shadow text-gray-900' : 'text-gray-500'}`}
                        >
                            {r}
                        </button>
                    ))}
                </div>

                {/* Login Inputs */}
                {mode === 'login' && (
                    <>
                        <div>
                            <input 
                                className={`w-full px-4 py-3 rounded-xl border bg-gray-50 outline-none focus:ring-2 focus:ring-primary/20 ${errors.email ? 'border-red-500' : 'border-gray-200'}`}
                                placeholder="Email"
                                value={email}
                                onChange={(e) => { setEmail(e.target.value); clearError('email'); }}
                            />
                            {errors.email && <p className="text-xs text-red-500 mt-1 ml-1">{errors.email}</p>}
                        </div>
                        <div>
                            <input 
                                type="password"
                                className={`w-full px-4 py-3 rounded-xl border bg-gray-50 outline-none focus:ring-2 focus:ring-primary/20 ${errors.password ? 'border-red-500' : 'border-gray-200'}`}
                                placeholder="Password"
                                value={password}
                                onChange={(e) => { setPassword(e.target.value); clearError('password'); }}
                            />
                            {errors.password && <p className="text-xs text-red-500 mt-1 ml-1">{errors.password}</p>}
                        </div>
                    </>
                )}

                {/* Signup Inputs */}
                {mode === 'signup' && (
                    <>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <input className={`w-full px-4 py-3 rounded-xl border bg-gray-50 outline-none ${errors.firstName ? 'border-red-500' : 'border-gray-200'}`} placeholder="First Name" value={firstName} onChange={(e) => {setFirstName(e.target.value); clearError('firstName')}} />
                                {errors.firstName && <p className="text-xs text-red-500 mt-1 ml-1">{errors.firstName}</p>}
                            </div>
                            <div>
                                <input className={`w-full px-4 py-3 rounded-xl border bg-gray-50 outline-none ${errors.lastName ? 'border-red-500' : 'border-gray-200'}`} placeholder="Last Name" value={lastName} onChange={(e) => {setLastName(e.target.value); clearError('lastName')}} />
                                {errors.lastName && <p className="text-xs text-red-500 mt-1 ml-1">{errors.lastName}</p>}
                            </div>
                        </div>

                        <input className={`w-full px-4 py-3 rounded-xl border bg-gray-50 outline-none ${errors.email ? 'border-red-500' : 'border-gray-200'}`} placeholder="Email" value={email} onChange={(e) => {setEmail(e.target.value); clearError('email')}} />
                        {errors.email && <p className="text-xs text-red-500 mt-1 ml-1">{errors.email}</p>}

                        <input className={`w-full px-4 py-3 rounded-xl border bg-gray-50 outline-none ${errors.phone ? 'border-red-500' : 'border-gray-200'}`} placeholder="Phone" value={phone} onChange={(e) => {setPhone(e.target.value); clearError('phone')}} />
                        {errors.phone && <p className="text-xs text-red-500 mt-1 ml-1">{errors.phone}</p>}

                        {/* Date Inputs with Validation */}
                        <div>
                            <div className="grid grid-cols-4 gap-2">
                                <input ref={dayRef} placeholder="DD" maxLength={2} className={`w-full px-2 py-3 rounded-xl border bg-gray-50 text-center outline-none ${errors.dob ? 'border-red-500' : 'border-gray-200'}`} value={dobDay} onChange={(e) => handleDobChange(e, 'day')} />
                                <input ref={monthRef} placeholder="MM" maxLength={2} className={`w-full px-2 py-3 rounded-xl border bg-gray-50 text-center outline-none ${errors.dob ? 'border-red-500' : 'border-gray-200'}`} value={dobMonth} onChange={(e) => handleDobChange(e, 'month')} />
                                <input ref={yearRef} placeholder="YYYY" maxLength={4} className={`w-full px-2 py-3 rounded-xl border bg-gray-50 text-center outline-none ${errors.dob ? 'border-red-500' : 'border-gray-200'}`} value={dobYear} onChange={(e) => handleDobChange(e, 'year')} />
                                <input placeholder="Age" className="w-full px-2 py-3 rounded-xl border bg-gray-100 text-center outline-none text-gray-500" value={age} readOnly />
                            </div>
                            {errors.dob && <p className="text-xs text-red-500 mt-1 ml-1">{errors.dob}</p>}
                        </div>

                        {/* Passwords */}
                        <div className="space-y-3">
                            <div>
                                <input type="password" placeholder="Password (min 8)" className={`w-full px-4 py-3 rounded-xl border bg-gray-50 outline-none ${errors.password ? 'border-red-500' : 'border-gray-200'}`} value={password} onChange={(e) => {setPassword(e.target.value); clearError('password')}} />
                                {errors.password && <p className="text-xs text-red-500 mt-1 ml-1">{errors.password}</p>}
                            </div>
                            <div>
                                <input type="password" placeholder="Confirm Password" className={`w-full px-4 py-3 rounded-xl border bg-gray-50 outline-none ${errors.confirmPassword ? 'border-red-500' : 'border-gray-200'}`} value={confirmPassword} onChange={(e) => {setConfirmPassword(e.target.value); clearError('confirmPassword')}} />
                                {errors.confirmPassword && <p className="text-xs text-red-500 mt-1 ml-1">{errors.confirmPassword}</p>}
                            </div>
                        </div>
                    </>
                )}

                <Button type="submit" disabled={isLoading} className="w-full py-3 mt-2 rounded-xl bg-gray-900 text-white hover:scale-[1.02] transition shadow-lg">
                    {isLoading ? 'Processing...' : mode === 'login' ? 'Log In' : 'Create Account'}
                </Button>
            </form>
        </div>
    );
};