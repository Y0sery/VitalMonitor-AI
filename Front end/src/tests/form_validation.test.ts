import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PredictForm } from '../components/PredictForm';

// Mock submission handler
const mockSubmit = jest.fn();
const mockCancel = jest.fn();

describe('PredictForm Validation', () => {
    beforeEach(() => {
        mockSubmit.mockClear();
        mockCancel.mockClear();
    });

    test('renders all required fields', () => {
        render(<PredictForm type="disease" onSubmit = { mockSubmit } onCancel = { mockCancel } />);

        expect(screen.getByLabelText(/age/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/sex/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/resting blood pressure/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/serum cholestoral/i)).toBeInTheDocument();
    });

    test('validates age input range', async () => {
        render(<PredictForm type="disease" onSubmit = { mockSubmit } onCancel = { mockCancel } />);

        const ageInput = screen.getByLabelText(/age/i);

        // Try invalid age (too low)
        fireEvent.change(ageInput, { target: { value: '-5' } });
        expect(ageInput).toBeInvalid();

        // Try invalid age (too high)
        fireEvent.change(ageInput, { target: { value: '150' } });
        // Note: HTML5 validation might not trigger 'invalid' state in JSDOM the same way, 
        // but we can check if the form submits.

        const submitBtn = screen.getByRole('button', { name: /predict disease risk/i });
        fireEvent.click(submitBtn);

        expect(mockSubmit).not.toHaveBeenCalled();
    });

    test('submits form with valid data', async () => {
        render(<PredictForm type="disease" onSubmit = { mockSubmit } onCancel = { mockCancel } />);

        // Fill out form with valid data
        fireEvent.change(screen.getByLabelText(/age/i), { target: { value: '45' } });
        fireEvent.change(screen.getByLabelText(/resting blood pressure/i), { target: { value: '120' } });
        fireEvent.change(screen.getByLabelText(/serum cholestoral/i), { target: { value: '200' } });
        fireEvent.change(screen.getByLabelText(/max heart rate/i), { target: { value: '150' } });
        fireEvent.change(screen.getByLabelText(/st depression/i), { target: { value: '1.5' } });

        const submitBtn = screen.getByRole('button', { name: /predict disease risk/i });
        fireEvent.click(submitBtn);

        await waitFor(() => {
            expect(mockSubmit).toHaveBeenCalledTimes(1);
            expect(mockSubmit).toHaveBeenCalledWith(expect.objectContaining({
                age: 45,
                trestbps: 120,
                chol: 200,
                thalach: 150,
                oldpeak: 1.5
            }));
        });
    });

    test('shows loading state during submission', async () => {
        // Mock a slow submission
        mockSubmit.mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100)));

        render(<PredictForm type="disease" onSubmit = { mockSubmit } onCancel = { mockCancel } />);

        const submitBtn = screen.getByRole('button', { name: /predict disease risk/i });
        fireEvent.click(submitBtn);

        expect(submitBtn).toBeDisabled();
        expect(screen.getByRole('button', { name: /cancel/i })).toBeDisabled();

        await waitFor(() => {
            expect(submitBtn).not.toBeDisabled();
        });
    });
});
