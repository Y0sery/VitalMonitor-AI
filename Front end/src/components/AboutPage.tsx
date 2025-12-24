/**
 * AboutPage.tsx
 * 
 * Role: About Us / Information Page
 * Responsibilities:
 * - Explains the mission and vision of the "Refresh Your Heart" platform.
 * - Details the two machine learning models used for heart disease detection and severity classification.
 * - Provides a clear explanation of the medical inputs required for predictions to educate users.
 * - Introduces the development team and their goals.
 */

import React from 'react';
import { Button } from './Button';

interface AboutPageProps {
    onNavigateHome: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigateHome }) => {
    return (
        <div className="min-h-screen bg-[#F8FAFC] pt-20 pb-12">
            {/* 1. Header Section: Introduction and Navigation */}
            <div className="bg-white border-b border-gray-100 pb-12 pt-8">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <button
                        onClick={onNavigateHome}
                        className="text-sm text-gray-500 hover:text-[#0EA5E9] flex items-center gap-1 mb-6 transition-colors"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Home
                    </button>
                    <div className="max-w-4xl">
                        <div className="text-[#0EA5E9] font-bold tracking-wide uppercase text-sm mb-2">Refresh Your Heart</div>
                        <h1 className="text-4xl md:text-5xl font-extrabold text-[#0F172A] mb-6">About Us</h1>
                        <p className="text-xl text-[#64748B] leading-relaxed">
                            Welcome to Refresh Your Heart, a platform designed to support patients by combining modern machine learning technology with medical guidance.
                            Our goal is to help users quickly understand their heart health, access helpful information, and easily connect with qualified doctors on our platform.
                        </p>
                        <p className="mt-4 text-gray-600">
                            This project was developed by a team of students from The Egyptian University as part of our graduation project, with the mission of making heart-disease awareness more accessible, reliable, and easy to use.
                        </p>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
                {/* 2. ML Services Section: Explaining the Models */}
                <section>
                    <div className="flex items-center gap-3 mb-8">
                        <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                        </div>
                        <h2 className="text-3xl font-bold text-[#0F172A]">Our Machine Learning Services</h2>
                    </div>
                    <p className="text-lg text-[#64748B] mb-8 max-w-3xl">
                        Refresh Your Heart provides two main services, powered by advanced ML models. Below is the patient-friendly explanation of each model.
                    </p>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Model 1: Detection */}
                        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 mb-6">
                                <span className="font-bold text-xl">1</span>
                            </div>
                            <h3 className="text-2xl font-bold text-[#0F172A] mb-4">Heart Disease Detection Model</h3>
                            <div className="space-y-4 text-gray-600">
                                <p><strong className="text-[#0F172A]">What it does:</strong> It analyzes your medical data and tells you whether you are likely to have heart disease or not.</p>
                                <div>
                                    <strong className="text-[#0F172A]">Output:</strong>
                                    <ul className="mt-2 space-y-2 pl-4">
                                        <li className="flex items-center gap-2">
                                            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                                            “No Heart Disease Detected”
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <span className="w-2 h-2 rounded-full bg-red-500"></span>
                                            “Heart Disease Detected”
                                        </li>
                                    </ul>
                                </div>
                                <div className="bg-amber-50 text-amber-800 p-4 rounded-xl text-sm border border-amber-100 mt-4">
                                    This model does NOT measure the degree or stage of heart disease. It is a simple risk-detection tool meant to help users take quick action if needed.
                                </div>
                            </div>
                        </div>

                        {/* Model 2: Severity Classification */}
                        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-purple-100 text-purple-600 mb-6">
                                <span className="font-bold text-xl">2</span>
                            </div>
                            <h3 className="text-2xl font-bold text-[#0F172A] mb-4">Severity Classification Model</h3>
                            <div className="space-y-4 text-gray-600">
                                <p className="text-sm text-gray-500 italic">(Used only if heart disease is detected in the first model.)</p>
                                <p><strong className="text-[#0F172A]">What it does:</strong> This model estimates the severity level of your heart condition based on your inputs.</p>
                                <div>
                                    <strong className="text-[#0F172A]">Output Levels:</strong>
                                    <div className="flex gap-2 mt-2">
                                        <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-sm font-medium">Mild</span>
                                        <span className="px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-sm font-medium">Moderate</span>
                                        <span className="px-3 py-1 rounded-full bg-red-100 text-red-700 text-sm font-medium">Severe</span>
                                    </div>
                                </div>
                                <p>This helps users understand how serious their condition might be and motivates them to seek professional consultation.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 3. Medical Inputs Section: Educational Table */}
                <section>
                    <div className="flex items-center gap-3 mb-8">
                        <div className="p-2 bg-emerald-100 rounded-lg text-emerald-600">
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                        </div>
                        <h2 className="text-3xl font-bold text-[#0F172A]">Why We Ask for These Medical Inputs</h2>
                    </div>
                    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-50 border-b border-gray-100">
                                        <th className="p-6 font-bold text-[#0F172A] w-1/3">Field</th>
                                        <th className="p-6 font-bold text-[#0F172A]">Explanation for the User</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {[
                                        { field: 'age', desc: 'Heart risks increase with age; this helps the models adjust predictions.' },
                                        { field: 'sex', desc: 'Males and females have different risk patterns for heart disease.' },
                                        { field: 'cp (Chest Pain Type)', desc: 'Different chest pain types give important clues about heart conditions.' },
                                        { field: 'trestbps (Resting Blood Pressure)', desc: 'High blood pressure increases heart-disease risk.' },
                                        { field: 'chol (Cholesterol Level)', desc: 'High cholesterol can block arteries and affect predictions.' },
                                        { field: 'fbs (Fasting Blood Sugar)', desc: 'High blood sugar is linked to heart disease and diabetes.' },
                                        { field: 'restecg (Resting ECG Result)', desc: 'ECG readings show abnormalities related to heart function.' },
                                        { field: 'thalach (Max Heart Rate Achieved)', desc: 'Lower maximum heart rate may indicate heart issues.' },
                                        { field: 'exang (Exercise-Induced Angina)', desc: 'Chest pain during exercise is a significant risk indicator.' },
                                        { field: 'oldpeak (ST Depression)', desc: 'Measures exercise-related heart stress.' },
                                        { field: 'slope (Slope of ST Segment)', desc: 'Helps detect exercise-related abnormalities in the ECG.' },
                                        { field: 'ca (Number of Major Vessels Colored)', desc: 'Shows the condition of major heart vessels.' },
                                        { field: 'thal (Thalassemia Test Result)', desc: 'Used to assess specific blood-related heart risks.' },
                                    ].map((row, idx) => (
                                        <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                                            <td className="p-6 font-medium text-[#0EA5E9]">{row.field}</td>
                                            <td className="p-6 text-gray-600">{row.desc}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>

                {/* 4. Team & Mission Section */}
                <section className="bg-[#0F172A] rounded-3xl p-8 md:p-12 text-white overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl -ml-16 -mb-16"></div>

                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="p-2 bg-white/10 rounded-lg text-white">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                            </div>
                            <h2 className="text-3xl font-bold">Our Team & Mission</h2>
                        </div>

                        <div className="grid md:grid-cols-2 gap-12">
                            <div>
                                <p className="text-lg text-gray-300 leading-relaxed mb-6">
                                    We are a dedicated team of engineering students from The Egyptian University, passionate about healthcare technology.
                                    This project was created as our graduation project.
                                </p>
                                <Button
                                    className="bg-[#0EA5E9] text-white hover:bg-[#0284C7] border-none"
                                    onClick={onNavigateHome}
                                >
                                    Explore Platform
                                </Button>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-4 text-white">Our Mission</h3>
                                <ul className="space-y-3">
                                    {[
                                        'Raise awareness about heart disease',
                                        'Provide quick and accessible ML-based predictions',
                                        'Support users with helpful medical tips',
                                        'Offer easy access to professional doctors through our platform',
                                        'Build trust by ensuring transparency and simplicity'
                                    ].map((item, idx) => (
                                        <li key={idx} className="flex items-start gap-3 text-gray-300">
                                            <svg className="w-5 h-5 text-[#0EA5E9] mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};
