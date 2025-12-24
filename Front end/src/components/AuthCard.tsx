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

  const [role, setRole] = useState<'patient' | 'doctor'>('patient');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');

  const [dobDay, setDobDay] = useState('');
  const [dobMonth, setDobMonth] = useState('');
  const [dobYear, setDobYear] = useState('');
  const [age, setAge] = useState<number | null>(null);

  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    dob?: string;
  }>({});

  const dayRef = useRef<HTMLInputElement>(null);
  const monthRef = useRef<HTMLInputElement>(null);
  const yearRef = useRef<HTMLInputElement>(null);

  /* ---------------- LOGIN VALIDATION ---------------- */
  const validateLogin = () => {
    const newErrors: typeof errors = {};

    if (!email.trim()) {
      newErrors.email = 'Email or phone is required';
    } else if (
      !email.includes('@') &&
      !/^\+?\d{8,15}$/.test(email)
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

  /* ---------------- DOB LOGIC ---------------- */
  useEffect(() => {
    if (
      dobDay.length === 2 &&
      dobMonth.length === 2 &&
      dobYear.length === 4
    ) {
      const birthDate = new Date(
        Number(dobYear),
        Number(dobMonth) - 1,
        Number(dobDay)
      );

      const today = new Date();
      let calculatedAge = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();

      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        calculatedAge--;
      }

      if (calculatedAge < 13 || calculatedAge > 120) {
        setErrors((p) => ({ ...p, dob: 'Age must be between 13 and 120' }));
        setAge(null);
      } else {
        setErrors((p) => ({ ...p, dob: undefined }));
        setAge(calculatedAge);
      }
    }
  }, [dobDay, dobMonth, dobYear]);

  const handleDobChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: 'day' | 'month' | 'year'
  ) => {
    const val = e.target.value.replace(/\D/g, '');

    if (field === 'day') {
      if (Number(val) > 31) return;
      setDobDay(val);
      if (val.length === 2) monthRef.current?.focus();
    }

    if (field === 'month') {
      if (Number(val) > 12) return;
      setDobMonth(val);
      if (val.length === 2) yearRef.current?.focus();
    }

    if (field === 'year') {
      if (Number(val) > new Date().getFullYear()) return;
      setDobYear(val);
    }
  };

  /* ---------------- SUBMIT ---------------- */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'login' && !validateLogin()) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess?.(role);
    }, 1200);
  };

  return (
    <div className="w-full max-w-[400px] bg-white rounded-3xl shadow-2xl overflow-hidden animate-[fadeIn_0.4s_ease]">
      {/* Tabs */}
      <div className="flex border-b border-gray-100">
        {['login', 'signup'].map((t) => (
          <button
            key={t}
            className={`flex-1 py-4 text-sm font-bold transition-all ${
              mode === t
                ? 'text-[#0EA5E9] border-b-2 border-[#0EA5E9]'
                : 'text-gray-400 hover:text-gray-600'
            }`}
            onClick={() => setMode(t as any)}
          >
            {t === 'login' ? 'Log In' : 'Sign Up'}
          </button>
        ))}
      </div>

      <form
        onSubmit={handleSubmit}
        className="p-8 space-y-5 animate-[slideUp_0.35s_ease]"
      >
        {/* Role */}
        <div className="flex bg-gray-100 p-1 rounded-xl">
          {['patient', 'doctor'].map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRole(r as any)}
              className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
                role === r
                  ? 'bg-white shadow text-[#0F172A]'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {r}
            </button>
          ))}
        </div>

        {/* LOGIN */}
        {mode === 'login' && (
          <div className="space-y-4 animate-[fadeIn_0.25s_ease]">
            <div>
              <input
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:border-[#0EA5E9] focus:ring-2 focus:ring-[#0EA5E9]/20 outline-none transition-all"
                placeholder="Email or phone"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && (
                <p className="text-xs text-red-500 mt-1 animate-[shake_0.25s]">
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <input
                type="password"
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:border-[#0EA5E9] focus:ring-2 focus:ring-[#0EA5E9]/20 outline-none transition-all"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && (
                <p className="text-xs text-red-500 mt-1 animate-[shake_0.25s]">
                  {errors.password}
                </p>
              )}
            </div>
          </div>
        )}

        {/* SIGNUP */}
        {mode === 'signup' && (
          <div className="space-y-4 animate-[fadeIn_0.25s_ease]">
            <div className="grid grid-cols-2 gap-3">
              <input className="input" placeholder="First name" />
              <input className="input" placeholder="Last name" />
            </div>

            <input className="input" placeholder="Email" />
            <input className="input" placeholder="Phone" />

            <div>
              <div className="flex gap-2">
                <input
                  ref={dayRef}
                  placeholder="DD"
                  maxLength={2}
                  className="w-full px-3 py-2.5 rounded-xl bg-gray-50 border border-gray-100 text-center"
                  value={dobDay}
                  onChange={(e) => handleDobChange(e, 'day')}
                />
                <input
                  ref={monthRef}
                  placeholder="MM"
                  maxLength={2}
                  className="w-full px-3 py-2.5 rounded-xl bg-gray-50 border border-gray-100 text-center"
                  value={dobMonth}
                  onChange={(e) => handleDobChange(e, 'month')}
                />
                <input
                  ref={yearRef}
                  placeholder="YYYY"
                  maxLength={4}
                  className="w-full px-3 py-2.5 rounded-xl bg-gray-50 border border-gray-100 text-center"
                  value={dobYear}
                  onChange={(e) => handleDobChange(e, 'year')}
                />
              </div>

              <input
                readOnly
                value={age ?? ''}
                placeholder="Age"
                className="mt-3 w-full px-3 py-2.5 rounded-xl bg-gray-100 border text-center cursor-not-allowed"
              />

              {errors.dob && (
                <p className="text-xs text-red-500 mt-1 animate-[shake_0.25s]">
                  {errors.dob}
                </p>
              )}
            </div>
          </div>
        )}

        <Button
          disabled={isLoading}
          className="w-full py-3.5 rounded-xl bg-[#0F172A] text-white hover:bg-[#1E293B] transition-all hover:scale-[1.02]"
        >
          {isLoading ? 'Processing...' : mode === 'login' ? 'Log In' : 'Sign Up'}
        </Button>
      </form>
    </div>
  );
};

