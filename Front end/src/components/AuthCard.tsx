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
    const [phone, setPhone] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [role, setRole] = useState<'patient' | 'doctor'>('patient');

    // DOB
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

    /* -------------------- DATE VALIDATION -------------------- */
    useEffect(() => {
        if (dobDay && dobMonth && dobYear.length === 4) {
            const day = Number(dobDay);
            const month = Number(dobMonth);
            const year = Number(dobYear);

            const birthDate = new Date(year, month - 1, day);

            const isValidDate =
                birthDate.getDate() === day &&
                birthDate.getMonth() === month - 1 &&
                birthDate.getFullYear() === year;

            if (!isValidDate) {
                setAge('');
                return;
            }

            const today = new Date();
            let calculatedAge = today.getFullYear() - year;
            const m = today.getMonth() - (month - 1);

            if (m < 0 || (m === 0 && today.getDate() < day)) {
                calculatedAge--;
            }

            if (calculatedAge > 0 && calculatedAge < 120) {
                setAge(calculatedAge.toString());
            } else {
                setAge('');
            }
        }
    }, [dobDay, dobMonth, dobYear]);

    const handleDobChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        field: 'day' | 'month' | 'year'
    ) => {
        const value = e.target.value.replace(/\D/g, '');

        if (field === 'day') {
            setDobDay(value);
            if (value.length === 2) monthRef.current?.focus();
        }
        if (field === 'month') {
            setDobMonth(value);
            if (value.length === 2) yearRef.current?.focus();
        }
        if (field === 'year') {
            setDobYear(value);
        }
    };

    /* -------------------- LOGIN VALIDATION -------------------- */
    const validateLogin = () => {
        const newErrors: Record<string, string> = {};

        if (!email.trim()) {
            newErrors.email = 'Email or phone is required';
        } else if (
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) &&
            !/^\+?\d{10,15}$/.test(email)
        ) {
            newErrors.email = 'Enter a valid email or phone number';
        }

        if (!password) {
            newErrors.password = 'Password is required';
        } else if (password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    /* -------------------- SUBMIT -------------------- */
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (mode === 'login') {
            if (!validateLogin()) return;
        }

        setIsLoading(true);

        setTimeout(() => {
            setIsLoading(false);
            onLoginSuccess?.(role);
        }, 1500);
    };

    /* -------------------- UI -------------------- */
    return (
        <div className="w-full max-w-[380px] bg-white rounded-3xl shadow-xl animate-fade-in overflow-hidden">
            {/* Tabs */}
            <div className="flex border-b">
                {['login', 'signup'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setMode(tab as any)}
                        className={`flex-1 py-4 text-sm font-semibold transition-all
                        ${mode === tab
                                ? 'text-primary border-b-2 border-primary'
                                : 'text-gray-400 hover:text-gray-600'
                            }`}
                    >
                        {tab === 'login' ? 'Log In' : 'Sign Up'}
                    </button>
                ))}
            </div>

            <form onSubmit={handleSubmit} className="p-8 flex flex-col gap-5">
                {/* Role */}
                <div className="bg-gray-100 p-1 rounded-xl flex">
                    {['patient', 'doctor'].map((r) => (
                        <button
                            key={r}
                            type="button"
                            onClick={() => setRole(r as any)}
                            className={`flex-1 py-2 rounded-lg text-xs font-semibold transition
                            ${role === r ? 'bg-white shadow text-gray-900' : 'text-gray-500'
                                }`}
                        >
                            {r}
                        </button>
                    ))}
                </div>

                {/* LOGIN */}
                {mode === 'login' && (
                    <>
                        {/* Email */}
                        <div>
                            <input
                                className={`w-full px-4 py-3 rounded-xl border bg-gray-50
                                ${errors.email ? 'border-red-500' : 'border-gray-200'}
                                focus:ring-2 focus:ring-primary/20`}
                                placeholder="Email or phone"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    setErrors((p) => ({ ...p, email: '' }));
                                }}
                            />
                            {errors.email && (
                                <p className="text-xs text-red-500 mt-1 animate-shake">
                                    {errors.email}
                                </p>
                            )}
                        </div>

                        {/* Password */}
                        <div>
                            <input
                                type="password"
                                className={`w-full px-4 py-3 rounded-xl border bg-gray-50
                                ${errors.password ? 'border-red-500' : 'border-gray-200'}
                                focus:ring-2 focus:ring-primary/20`}
                                placeholder="Password"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    setErrors((p) => ({ ...p, password: '' }));
                                }}
                            />
                            {errors.password && (
                                <p className="text-xs text-red-500 mt-1 animate-shake">
                                    {errors.password}
                                </p>
                            )}
                        </div>
                    </>
                )}

                {/* SIGN UP */}
                {mode === 'signup' && (
                    <>
                        <div className="grid grid-cols-2 gap-3">
                            <input
                                placeholder="First name"
                                className="input"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                            <input
                                placeholder="Last name"
                                className="input"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </div>

                        <input
                            placeholder="Email"
                            className="input"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <input
                            placeholder="Phone"
                            className="input"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />

                        <div className="grid grid-cols-4 gap-2">
                            <input
                                ref={dayRef}
                                placeholder="DD"
                                maxLength={2}
                                className="input text-center"
                                value={dobDay}
                                onChange={(e) => handleDobChange(e, 'day')}
                            />
                            <input
                                ref={monthRef}
                                placeholder="MM"
                                maxLength={2}
                                className="input text-center"
                                value={dobMonth}
                                onChange={(e) => handleDobChange(e, 'month')}
                            />
                            <input
                                ref={yearRef}
                                placeholder="YYYY"
                                maxLength={4}
                                className="input text-center"
                                value={dobYear}
                                onChange={(e) => handleDobChange(e, 'year')}
                            />
                            <input
                                placeholder="Age"
                                className="input text-center"
                                value={age}
                                readOnly
                            />
                        </div>
                    </>
                )}

                <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 rounded-xl bg-gray-900 text-white hover:scale-[1.02] transition"
                >
                    {isLoading ? 'Processing...' : mode === 'login' ? 'Log In' : 'Sign Up'}
                </Button>
            </form>
        </div>
    );
};

