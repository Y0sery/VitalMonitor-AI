/**
 * PredictForm.tsx
 * 
 * Role: AI Prediction Form Component
 * Responsibilities:
 * - Collects medical data inputs from the user (e.g., age, blood pressure, cholesterol).
 * - Handles form validation and submission to the backend/AI model.
 * - Displays the prediction result (Disease Detected/Not Detected or Severity Level).
 * - Provides immediate feedback and recommendations based on the result.
 */

import React, { useState } from 'react';
import { Button } from './Button';
import { Input } from './Input';

// Interface for the medical data required by the AI model
interface PredictionData {
    age: number;
    sex: 'male' | 'female';
    cp: number;       // Chest Pain Type
    trestbps: number; // Resting Blood Pressure
    chol: number;     // Serum Cholesterol
    fbs: number;      // Fasting Blood Sugar > 120 mg/dl
    restecg: number;  // Resting Electrocardiographic Results
    thalach: number;  // Maximum Heart Rate Achieved
    exang: number;    // Exercise Induced Angina
    oldpeak: number;  // ST Depression induced by exercise
    slope: number;    // Slope of the peak exercise ST segment
    ca: number;       // Number of major vessels colored by flourosopy
    thal: number;     // Thalassemia
}

interface PredictFormProps {
    type: 'disease' | 'severity'; // Determines which model to use
    onSubmit: (data: PredictionData) => Promise<any>;
    onCancel: () => void;
}

export const PredictForm: React.FC<PredictFormProps> = ({ type, onSubmit, onCancel }) => {
    // UI States
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [result, setResult] = useState<any | null>(null);

    // Form Data State with default values
    const [formData, setFormData] = useState<PredictionData>({
        age: 50,
        sex: 'male',
        cp: 0,
        trestbps: 120,
        chol: 200,
        fbs: 0,
        restecg: 0,
        thalach: 150,
        exang: 0,
        oldpeak: 0,
        slope: 1,
        ca: 0,
        thal: 2,
    });

    // Handle input changes for both text/number inputs and selects
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'number' ? parseFloat(value) : value,
        }));
    };

    // Handle Form Submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        setResult(null);

        try {
            const response = await onSubmit(formData);
            setResult(response);
        } catch (err) {
            setError('An error occurred while processing your request. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    // Render Result View if prediction is available
    if (result) {
        const isDisease = type === 'disease' ? result.prediction : result.severity !== 'Early';
        const resultColor = isDisease ? 'text-[#E05A4D]' : 'text-[#2E8B57]';
        const resultBg = isDisease ? 'bg-red-50 border-red-100' : 'bg-green-50 border-green-100';

        return (
            <div className="text-center p-6 animate-in fade-in zoom-in-95 duration-300">
                {/* Result Icon */}
                <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6 ${isDisease ? 'bg-red-100' : 'bg-green-100'}`}>
                    {isDisease ? (
                        <svg className="w-10 h-10 text-[#E05A4D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    ) : (
                        <svg className="w-10 h-10 text-[#2E8B57]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    )}
                </div>

                {/* Result Title */}
                <h3 className={`text-2xl font-bold mb-2 ${resultColor}`}>
                    {type === 'disease'
                        ? (result.prediction ? 'Potential Risk Detected' : 'No Significant Risk Detected')
                        : `Severity Level: ${result.severity}`
                    }
                </h3>

                {/* Explanation / Recommendation */}
                <div className={`p-4 rounded-lg border mb-6 ${resultBg}`}>
                    <p className="text-gray-700">
                        {result.explanation || result.recommendation || 'Based on the provided data, we have analyzed your heart health status.'}
                    </p>
                    {result.probability && (
                        <p className="mt-2 text-sm font-medium text-gray-500">
                            Confidence Score: {(result.probability * 100).toFixed(1)}%
                        </p>
                    )}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button onClick={onCancel} variant="outline">Close</Button>
                    {isDisease && (
                        <Button onClick={() => window.location.href = '#doctors'}>
                            Consult a Specialist
                        </Button>
                    )}
                </div>
            </div>
        );
    }

    // Render Form View
    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                    label="Age"
                    name="age"
                    type="number"
                    required
                    min="1"
                    max="120"
                    value={formData.age}
                    onChange={handleChange}
                />

                <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-[#0F1724]">Sex</label>
                    <select
                        name="sex"
                        className="px-3 py-2 rounded-lg border border-gray-300 focus:border-[#0B67A6] focus:ring-[#0B67A6]/20 bg-white"
                        value={formData.sex}
                        onChange={handleChange}
                    >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>

                <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-[#0F1724]">Chest Pain Type (CP)</label>
                    <select
                        name="cp"
                        className="px-3 py-2 rounded-lg border border-gray-300 focus:border-[#0B67A6] focus:ring-[#0B67A6]/20 bg-white"
                        value={formData.cp}
                        onChange={handleChange}
                    >
                        <option value={0}>Typical Angina</option>
                        <option value={1}>Atypical Angina</option>
                        <option value={2}>Non-anginal Pain</option>
                        <option value={3}>Asymptomatic</option>
                    </select>
                </div>

                <Input
                    label="Resting Blood Pressure (trestbps)"
                    name="trestbps"
                    type="number"
                    required
                    min="50"
                    max="250"
                    value={formData.trestbps}
                    onChange={handleChange}
                    helperText="mm Hg"
                />

                <Input
                    label="Serum Cholestoral (chol)"
                    name="chol"
                    type="number"
                    required
                    min="100"
                    max="600"
                    value={formData.chol}
                    onChange={handleChange}
                    helperText="mg/dl"
                />

                <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-[#0F1724]">Fasting Blood Sugar &gt; 120 mg/dl</label>
                    <select
                        name="fbs"
                        className="px-3 py-2 rounded-lg border border-gray-300 focus:border-[#0B67A6] focus:ring-[#0B67A6]/20 bg-white"
                        value={formData.fbs}
                        onChange={handleChange}
                    >
                        <option value={0}>False</option>
                        <option value={1}>True</option>
                    </select>
                </div>

                <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-[#0F1724]">Resting ECG Results</label>
                    <select
                        name="restecg"
                        className="px-3 py-2 rounded-lg border border-gray-300 focus:border-[#0B67A6] focus:ring-[#0B67A6]/20 bg-white"
                        value={formData.restecg}
                        onChange={handleChange}
                    >
                        <option value={0}>Normal</option>
                        <option value={1}>ST-T Wave Abnormality</option>
                        <option value={2}>Left Ventricular Hypertrophy</option>
                    </select>
                </div>

                <Input
                    label="Max Heart Rate (thalach)"
                    name="thalach"
                    type="number"
                    required
                    min="50"
                    max="250"
                    value={formData.thalach}
                    onChange={handleChange}
                />

                <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-[#0F1724]">Exercise Induced Angina</label>
                    <select
                        name="exang"
                        className="px-3 py-2 rounded-lg border border-gray-300 focus:border-[#0B67A6] focus:ring-[#0B67A6]/20 bg-white"
                        value={formData.exang}
                        onChange={handleChange}
                    >
                        <option value={0}>No</option>
                        <option value={1}>Yes</option>
                    </select>
                </div>

                <Input
                    label="ST Depression (oldpeak)"
                    name="oldpeak"
                    type="number"
                    step="0.1"
                    required
                    min="0"
                    max="10"
                    value={formData.oldpeak}
                    onChange={handleChange}
                />
            </div>

            {error && (
                <div className="p-4 bg-red-50 text-[#E05A4D] rounded-lg text-sm">
                    {error}
                </div>
            )}

            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <Button type="button" variant="ghost" onClick={onCancel} disabled={isLoading}>
                    Cancel
                </Button>
                <Button type="submit" isLoading={isLoading}>
                    {type === 'disease' ? 'Predict Disease Risk' : 'Assess Severity'}
                </Button>
            </div>
        </form>
    );
};
