/**
 * PredictForm.stories.tsx
 * 
 * Role: Storybook Configuration for PredictForm
 * Responsibilities:
 * - Defines stories to visualize the PredictForm component in isolation.
 * - Provides mock interactions for submitting and cancelling the form.
 * - Demonstrates different states (Disease Prediction, Severity Assessment, Result View).
 */

import type { Meta, StoryObj } from '@storybook/react';
import { PredictForm } from '../components/PredictForm';

const meta: Meta<typeof PredictForm> = {
    title: 'Features/PredictForm',
    component: PredictForm,
    tags: ['autodocs'],
    argTypes: {
        onSubmit: { action: 'submitted' },
        onCancel: { action: 'cancelled' },
    },
};

export default meta;
type Story = StoryObj<typeof PredictForm>;

// Story for Disease Prediction Mode
export const DiseasePrediction: Story = {
    args: {
        type: 'disease',
    },
};

// Story for Severity Assessment Mode
export const SeverityAssessment: Story = {
    args: {
        type: 'severity',
    },
};

// Story demonstrating the Result View after submission
export const WithResult: Story = {
    render: (args: React.ComponentProps<typeof PredictForm>) => {
        // Mocking a successful submission that returns a result immediately for demo
        const handleSubmit = async () => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve({
                        prediction: true,
                        probability: 0.85,
                        explanation: 'High risk detected based on elevated cholesterol levels.',
                    });
                }, 1000);
            });
        };
        return <PredictForm {...args} onSubmit={handleSubmit} />;
    },
    args: {
        type: 'disease',
    },
};
