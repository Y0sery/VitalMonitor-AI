/**
 * Modal.tsx
 * 
 * Role: Generic Modal Component
 * Responsibilities:
 * - Provides a reusable overlay and container for modal content.
 * - Handles mount/unmount animations (fade in/out).
 * - Manages closing on backdrop click.
 */

import React, { useEffect, useState } from 'react';

interface ModalProps {
    // Controls visibility
    isOpen: boolean;
    // Function to close the modal
    onClose: () => void;
    // Modal header title
    title: string;
    // Modal content
    children: React.ReactNode;
    // Optional max-width class override
    maxWidth?: string;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, maxWidth = 'max-w-[22rem]' }) => {
    // State to control rendering for animation purposes
    // We keep the component mounted while it animates out
    const [shouldRender, setShouldRender] = useState(isOpen);

    // Update internal state when isOpen prop changes
    useEffect(() => {
        if (isOpen) setShouldRender(true);
    }, [isOpen]);

    // Handle end of CSS transition to unmount component if closed
    const handleAnimationEnd = () => {
        if (!isOpen) setShouldRender(false);
    };

    if (!shouldRender) return null;

    return (
        <>
            {/* Backdrop Overlay */}
            <div
                className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
                onClick={onClose} // Close on backdrop click
            />

            {/* Modal Container */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
                <div
                    className={`bg-white rounded-3xl shadow-2xl w-full ${maxWidth} max-h-[90vh] flex flex-col overflow-hidden pointer-events-auto transition-all duration-300 transform ${isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-4'}`}
                    onTransitionEnd={handleAnimationEnd}
                >
                    {/* Modal Header */}
                    {title && (
                        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50 flex-shrink-0">
                            <h3 className="text-lg font-bold text-[#0F172A]">{title}</h3>
                            <button
                                onClick={onClose}
                                className="text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-full p-1 transition-colors"
                            >
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    )}

                    {/* Modal Content - Scrollable */}
                    <div className="p-6 overflow-y-auto">
                        {children}
                    </div>
                </div>
            </div>
        </>
    );
};
