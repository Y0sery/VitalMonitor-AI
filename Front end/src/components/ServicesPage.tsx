/**
 * ServicesPage.tsx
 * 
 * Role: AI Prediction Service Page
 * Responsibilities:
 * - Hosts the heart disease prediction form.
 * - Manages form state, validation, and submission.
 * - Simulates an API call to an AI model.
 * - Displays the prediction results (Risk/No Risk) with confidence scores.
 * - Adapts content based on the selected model (initialService prop).
 */

import React, { useState } from 'react';
import { Button } from './Button';
import { Input } from './Input';

interface ServicesPageProps {
    onNavigate: (sectionId?: string) => void;
    // Determines which AI model context to show
    initialService?: 'model1' | 'model2';
}

// Interface for the medical data form
interface FormData {
    age: string;
    sex: string;
    cp: string;      // Chest Pain Type
    trestbps: string; // Resting Blood Pressure
    chol: string;    // Cholesterol
    fbs: string;     // Fasting Blood Sugar
    restecg: string; // Resting ECG
    thalach: string; // Max Heart Rate
    exang: string;   // Exercise Induced Angina
    oldpeak: string; // ST Depression
    slope: string;   // Slope of ST Segment
    ca: string;      // Number of Major Vessels
    thal: string;    // Thalassemia
}

interface FormErrors {
    [key: string]: string;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onNavigate, initialService = 'model1' }) => {
    // Form state initialization
    const [formData, setFormData] = useState<FormData>({
        age: '',
        sex: 'male',
        cp: '0',
        trestbps: '',
        chol: '',
        fbs: '0',
        restecg: '0',
        thalach: '',
        exang: '0',
        oldpeak: '',
        slope: '0',
        ca: '',
        thal: '3'
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const [isLoading, setIsLoading] = useState(false);
    // State to hold the prediction result
    const [result, setResult] = useState<{ detected: boolean; confidence: number } | null>(null);

    // Dynamic content based on selected service
    const isModel1 = initialService === 'model1';
    const pageTitle = isModel1 ? "Heart Disease Prediction" : "Heart Disease Severity Assessment";
    const pageDescription = isModel1
        ? "Please fill in the fields below. All fields are required for an accurate assessment."
        : "Detailed severity classification to guide your treatment path. Please provide your clinical metrics.";

    // Validation logic for individual fields
    const validateField = (name: string, value: string): string => {
        if (!value && value !== '0') return 'This field is required';

        const numVal = parseFloat(value);
        switch (name) {
            case 'age':
                if (numVal < 0 || numVal > 120) return 'Age must be between 0 and 120';
                if (!Number.isInteger(numVal)) return 'Age must be a whole number';
                break;
            case 'trestbps':
                if (numVal < 40 || numVal > 300) return 'Must be between 40 and 300';
                break;
            case 'chol':
                if (numVal < 50 || numVal > 1000) return 'Must be between 50 and 1000';
                break;
            case 'thalach':
                if (numVal < 30 || numVal > 300) return 'Must be between 30 and 300';
                break;
            case 'oldpeak':
                if (numVal < 0 || numVal > 10) return 'Must be between 0 and 10';
                break;
            case 'ca':
                if (numVal < 0 || numVal > 4) return 'Must be between 0 and 4';
                if (!Number.isInteger(numVal)) return 'Must be a whole number';
                break;
        }
        return '';
    };

    // Handle input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        // Validate on change for immediate feedback
        const error = validateField(name, value);
        setErrors(prev => ({ ...prev, [name]: error }));
    };

    // Handle input blur (focus lost)
    const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        const error = validateField(name, value);
        setErrors(prev => ({ ...prev, [name]: error }));
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validate all fields before submission
        const newErrors: FormErrors = {};
        let isValid = true;
        Object.keys(formData).forEach(key => {
            const error = validateField(key, formData[key as keyof FormData]);
            if (error) {
                newErrors[key] = error;
                isValid = false;
            }
        });

        setErrors(newErrors);

        if (!isValid) return;

        setIsLoading(true);

        // Simulate API call delay
        setTimeout(() => {
            // Mock prediction logic (simple heuristic for demo)
            const isHighRisk = parseInt(formData.age) > 50 && parseInt(formData.chol) > 240;
            setResult({
                detected: isHighRisk,
                confidence: 0.87
            });
            setIsLoading(false);
        }, 2000);
    };

    // Helper component for Select inputs with optional tooltips
    const SelectField = ({ label, name, options, tooltip, helper }: any) => (
        <div className="flex flex-col gap-1.5 group">
            <label className="text-sm font-medium text-[#0F172A] flex items-center gap-1">
                {label}
                <span className="text-[#E05A4D]">*</span>
                {tooltip && (
                    <div className="relative group/tooltip ml-1 cursor-help">
                        <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {/* Tooltip Popup */}
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-gray-900 text-white text-xs rounded shadow-lg opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none z-10 text-center">
                            {tooltip}
                        </div>
                    </div>
                )}
            </label>
            <select
                name={name}
                value={formData[name as keyof FormData]}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`px-3 py-2 rounded-lg border bg-white text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-offset-0 transition-all ${errors[name] ? 'border-[#E05A4D] focus:ring-[#E05A4D]' : 'border-gray-300 focus:border-[#0B67A6] focus:ring-[#0B67A6]/20'
                    }`}
                disabled={isLoading || !!result}
            >
                {options.map((opt: any) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
            </select>
            {errors[name] && <span className="text-xs text-[#E05A4D]">{errors[name]}</span>}
            {!errors[name] && helper && <span className="text-xs text-gray-500">{helper}</span>}
        </div>
    );

    return (
        <div className="min-h-screen bg-[#F8FAFC] pt-24 pb-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-12">
                    <h1 className="text-4xl font-extrabold text-[#0F172A] mb-4">Our AI-Powered Services</h1>
                    <p className="text-lg text-[#64748B]">Use our advanced machine learning models to assess your cardiovascular health.</p>
                </div>

                <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                    <h2 className="text-2xl font-bold text-[#0F172A] mb-2">{pageTitle}</h2>
                    <p className="text-[#64748B] mb-8">{pageDescription}</p>

                    {result ? (
                        // Result Display View
                        <div className={`rounded-3xl p-8 border animate-in fade-in zoom-in-95 duration-500 ${result.detected ? 'bg-red-50 border-red-100' : 'bg-emerald-50 border-emerald-100'}`}>
                            <div className="text-center mb-8">
                                <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6 ${result.detected ? 'bg-red-100' : 'bg-emerald-100'}`}>
                                    {result.detected ? (
                                        <svg className="w-10 h-10 text-[#E05A4D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                        </svg>
                                    ) : (
                                        <svg className="w-10 h-10 text-[#2E8B57]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    )}
                                </div>
                                <h3 className={`text-3xl font-bold mb-2 ${result.detected ? 'text-[#E05A4D]' : 'text-[#2E8B57]'}`}>
                                    {result.detected ? 'Heart Disease Detected' : 'No Heart Disease Detected'}
                                </h3>
                                <p className="text-gray-600 font-medium">Confidence: {(result.confidence * 100).toFixed(0)}%</p>
                                <p className="text-gray-500 mt-4 max-w-lg mx-auto">
                                    {result.detected
                                        ? "Our analysis suggests potential indicators of heart disease. We strongly recommend consulting with a cardiologist for a thorough evaluation."
                                        : "Your metrics appear to be within healthy ranges. Continue maintaining a healthy lifestyle and regular check-ups."}
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Button
                                    variant="outline"
                                    className="bg-white border-gray-200 hover:border-[#0EA5E9] hover:text-[#0EA5E9]"
                                    onClick={() => onNavigate('articles')}
                                >
                                    See Tips
                                </Button>
                                <Button
                                    className="bg-[#0EA5E9] text-white hover:bg-[#0284C7]"
                                    onClick={() => onNavigate('doctors')}
                                >
                                    Get a Consultation
                                </Button>
                            </div>

                            <div className="mt-8 text-center">
                                <button
                                    onClick={() => {
                                        setResult(null);
                                        setFormData(prev => ({ ...prev }));
                                    }}
                                    className="text-sm text-gray-500 hover:text-gray-700 underline"
                                >
                                    Start New Assessment
                                </button>
                            </div>
                        </div>
                    ) : (
                        // Prediction Form View
                        <form onSubmit={handleSubmit} className="space-y-8" role="form" aria-labelledby="form-title">
                            {/* Demographics Section */}
                            <div>
                                <h3 className="text-lg font-semibold text-[#0F172A] mb-4 border-b pb-2">Demographics</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <Input
                                        label="Age"
                                        name="age"
                                        type="number"
                                        placeholder="e.g. 45"
                                        required
                                        value={formData.age}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={errors.age}
                                        helperText="Heart risk increases with age."
                                        disabled={isLoading}
                                    />
                                    <SelectField
                                        label="Sex"
                                        name="sex"
                                        options={[
                                            { value: 'male', label: 'Male' },
                                            { value: 'female', label: 'Female' }
                                        ]}
                                    />
                                </div>
                            </div>

                            {/* Vitals Section */}
                            <div>
                                <h3 className="text-lg font-semibold text-[#0F172A] mb-4 border-b pb-2">Vitals</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <Input
                                        label="Resting Blood Pressure (mm Hg)"
                                        name="trestbps"
                                        type="number"
                                        placeholder="e.g. 130"
                                        required
                                        value={formData.trestbps}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={errors.trestbps}
                                        disabled={isLoading}
                                    />
                                    <Input
                                        label="Serum Cholesterol (mg/dL)"
                                        name="chol"
                                        type="number"
                                        placeholder="e.g. 245"
                                        required
                                        value={formData.chol}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={errors.chol}
                                        disabled={isLoading}
                                    />
                                    <SelectField
                                        label="Fasting Blood Sugar > 120 mg/dL"
                                        name="fbs"
                                        options={[
                                            { value: '0', label: 'No' },
                                            { value: '1', label: 'Yes' }
                                        ]}
                                        helper="1 = true, 0 = false"
                                    />
                                </div>
                            </div>

                            {/* Chest / ECG Section */}
                            <div>
                                <h3 className="text-lg font-semibold text-[#0F172A] mb-4 border-b pb-2">Chest / ECG</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <SelectField
                                        label="Chest Pain Type"
                                        name="cp"
                                        tooltip="Type of chest pain experienced"
                                        options={[
                                            { value: '0', label: 'Typical Angina' },
                                            { value: '1', label: 'Atypical Angina' },
                                            { value: '2', label: 'Non-anginal Pain' },
                                            { value: '3', label: 'Asymptomatic' }
                                        ]}
                                    />
                                    <SelectField
                                        label="Resting ECG Result"
                                        name="restecg"
                                        tooltip="Result of resting electrocardiogram"
                                        options={[
                                            { value: '0', label: 'Normal' },
                                            { value: '1', label: 'ST-T Abnormality' },
                                            { value: '2', label: 'LV Hypertrophy' }
                                        ]}
                                    />
                                    <SelectField
                                        label="Slope of ST Segment"
                                        name="slope"
                                        options={[
                                            { value: '0', label: 'Upsloping' },
                                            { value: '1', label: 'Flat' },
                                            { value: '2', label: 'Downsloping' }
                                        ]}
                                    />
                                    <Input
                                        label="ST Depression (oldpeak)"
                                        name="oldpeak"
                                        type="number"
                                        step="0.1"
                                        placeholder="e.g. 1.2"
                                        required
                                        value={formData.oldpeak}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={errors.oldpeak}
                                        helperText="ST depression induced by exercise relative to rest"
                                        disabled={isLoading}
                                    />
                                </div>
                            </div>

                            {/* Exercise Section */}
                            <div>
                                <h3 className="text-lg font-semibold text-[#0F172A] mb-4 border-b pb-2">Exercise</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <Input
                                        label="Max Heart Rate (thalach)"
                                        name="thalach"
                                        type="number"
                                        placeholder="e.g. 150"
                                        required
                                        value={formData.thalach}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={errors.thalach}
                                        disabled={isLoading}
                                    />
                                    <SelectField
                                        label="Exercise Induced Angina"
                                        name="exang"
                                        options={[
                                            { value: '0', label: 'No' },
                                            { value: '1', label: 'Yes' }
                                        ]}
                                    />
                                </div>
                            </div>

                            {/* Imaging / Labs Section */}
                            <div>
                                <h3 className="text-lg font-semibold text-[#0F172A] mb-4 border-b pb-2">Imaging / Labs</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <Input
                                        label="Number of Major Vessels (ca)"
                                        name="ca"
                                        type="number"
                                        placeholder="0"
                                        required
                                        value={formData.ca}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={errors.ca}
                                        helperText="0-4 colored by fluoroscopy"
                                        disabled={isLoading}
                                    />
                                    <SelectField
                                        label="Thalassemia"
                                        name="thal"
                                        tooltip="Blood disorder status"
                                        options={[
                                            { value: '3', label: 'Normal' },
                                            { value: '6', label: 'Fixed Defect' },
                                            { value: '7', label: 'Reversible Defect' }
                                        ]}
                                    />
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="flex justify-end pt-6 border-t border-gray-100">
                                <Button
                                    type="submit"
                                    className="bg-[#0EA5E9] text-white px-8 py-4 rounded-xl hover:bg-[#0284C7] shadow-lg shadow-sky-500/20 w-full md:w-auto text-lg font-semibold transition-all hover:scale-[1.02]"
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <span className="flex items-center justify-center gap-2">
                                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Analyzing...
                                        </span>
                                    ) : (
                                        'Predict'
                                    )}
                                </Button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};
