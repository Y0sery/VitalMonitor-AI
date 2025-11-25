import React, { useState } from 'react';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    role: "Patient",
    password: "",
    confirmPassword: ""
  });
  
  const [error, setError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    if (error) setError(""); 
  };

  const getPasswordStrength = (pass) => {
    let score = 0;
    if (!pass) return { score: 0, label: "None", color: "bg-gray-700", width: "0%" };
    
    if (pass.length > 7) score++;             
    if (/[A-Z]/.test(pass)) score++;          
    if (/[0-9]/.test(pass)) score++;          
    if (/[^A-Za-z0-9]/.test(pass)) score++;   

    switch (score) {
      case 0: 
      case 1: 
        return { score, label: "Weak", color: "bg-red-500", width: "25%" };
      case 2: 
      case 3: 
        return { score, label: "Medium", color: "bg-orange-500", width: "50%" };
      case 4: 
        return { score, label: "Strong", color: "bg-green-500", width: "100%" };
      default: 
        return { score: 0, label: "None", color: "bg-gray-700", width: "0%" };
    }
  };

  const strength = getPasswordStrength(formData.password);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.fullName || !formData.email || !formData.password) {
      setError("Please fill in all required fields.");
      return;
    }

    if (strength.score < 2) {
      setError("Password is too weak! It must be at least 8 characters and include numbers/symbols.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
        <div className="bg-gray-800 p-8 rounded-xl shadow-2xl w-full max-w-md border border-gray-700 text-center animate-pulse-once">
          <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-500/20 mb-6">
            <svg className="h-10 w-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">Welcome, {formData.fullName}!</h2>
          <p className="text-gray-400 mb-6">Your account has been created successfully.</p>
          <button onClick={() => window.location.reload()} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition">
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      <div className="bg-gray-800 p-8 rounded-xl shadow-2xl w-full max-w-md border border-gray-700">
        
        <div className="text-center mb-8">
          <div className="flex justify-center items-center space-x-2 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <h2 className="text-xl font-bold text-white">AI Patient Monitoring</h2>
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">Create Your Account</h3>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          
          {error && (
            <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-2 rounded text-sm text-center">
              {error}
            </div>
          )}

          {/* 1. Full Name */}
          <div>
            <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="fullName">Full Name</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
              <input 
                id="fullName" 
                type="text" 
                placeholder="Enter your full name" 
                value={formData.fullName}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:border-blue-500 transition duration-200" 
              />
            </div>
          </div>

          {/* 2. Email Address */}
          <div>
            <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="email">Email Address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                   <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                   <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </div>
              <input 
                id="email" 
                type="email" 
                placeholder="name@example.com" 
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:border-blue-500 transition duration-200" 
              />
            </div>
          </div>

          {/* 3. Role Selection */}
          <div>
            <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="role">I am a...</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
              <select 
                id="role" 
                value={formData.role}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-gray-400 focus:outline-none focus:border-blue-500 transition duration-200 appearance-none"
              >
                <option value="Doctor">Doctor</option>
                <option value="Patient">Patient</option>
                <option value="Caregiver">Caregiver</option>
              </select>
               <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>

          {/* 4. Password */}
          <div>
            <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="password">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                 <svg className="h-5 w-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                 </svg>
              </div>
              <input 
                id="password" 
                type={showPassword ? "text" : "password"} 
                placeholder="Create a password" 
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-10 pr-12 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:border-blue-500 transition duration-200" 
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? (
                  <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                ) : (
                  <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                )}
              </div>
            </div>
            
            {/* Strength Bar */}
            <div className="mt-3">
               <div className="flex justify-between mb-1">
                 <span className={`text-xs font-medium transition-colors duration-300 ${strength.label === "Weak" ? "text-red-500" : strength.label === "Medium" ? "text-orange-500" : strength.label === "Strong" ? "text-green-500" : "text-gray-500"}`}>
                   Strength: {strength.label}
                 </span>
               </div>
               <div className="w-full bg-gray-700 rounded-full h-1.5 overflow-hidden">
                <div className={`h-1.5 rounded-full transition-all duration-500 ${strength.color}`} style={{ width: strength.width }}></div>
              </div>
              <p className="text-gray-500 text-xs mt-1">Min. 8 chars, 1 uppercase, 1 number, 1 symbol.</p>
            </div>
          </div>

          {/* 5. Confirm Password */}
          <div>
            <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="confirmPassword">Confirm Password</label>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                </div>
                <input 
                id="confirmPassword" 
                type="password" 
                placeholder="Confirm your password" 
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`w-full pl-10 pr-4 py-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:border-blue-500 transition duration-200 border ${
                    formData.confirmPassword && formData.password !== formData.confirmPassword ? "border-red-500" : "border-gray-600"
                }`} 
                />
            </div>
            {/* check password */}
             {formData.confirmPassword && formData.password !== formData.confirmPassword && (
               <p className="text-red-500 text-xs mt-1 ml-1">Passwords do not match.</p>
            )}
          </div>

          <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-300 shadow-md">
            Sign Up
          </button>
        </form>

        <p className="mt-6 text-center text-gray-400 text-sm">
          Already have an account? <a href="#" className="text-blue-500 font-bold hover:underline">Log In</a>
        </p>
      </div>
    </div>
  );
};

export default Register;