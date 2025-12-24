/**
 * DoctorCard.stories.tsx
 * 
 * Role: Storybook Configuration for CardDoctor
 * Responsibilities:
 * - Defines stories to visualize the CardDoctor component in isolation.
 * - Demonstrates different states of the doctor card (Available, Busy).
 * - Provides mock data for doctor profiles.
 */

import type { Meta, StoryObj } from '@storybook/react';
import { CardDoctor } from '../components/CardDoctor';

const meta: Meta<typeof CardDoctor> = {
    title: 'Components/CardDoctor',
    component: CardDoctor,
    tags: ['autodocs'],
    argTypes: {
        onBook: { action: 'booked' },
        onViewProfile: { action: 'viewed profile' },
    },
};

export default meta;
type Story = StoryObj<typeof CardDoctor>;

// Story showing an available doctor
export const Available: Story = {
    args: {
        doctor: {
            id: '1',
            name: 'Dr. Sarah Johnson',
            specialty: 'Cardiologist',
            image: 'https://i.pravatar.cc/300?img=1',
            rating: 4.9,
            availability: 'Available',
            country: 'USA',
        },
    },
};

// Story showing a busy doctor
export const Busy: Story = {
    args: {
        doctor: {
            id: '2',
            name: 'Dr. Ahmed Hassan',
            specialty: 'Surgeon',
            image: 'https://i.pravatar.cc/300?img=11',
            rating: 4.8,
            availability: 'Busy',
            country: 'Egypt',
        },
    },
};
