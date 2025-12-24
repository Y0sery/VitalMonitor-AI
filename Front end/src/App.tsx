/**
 * App.tsx
 * 
 * Role: Main Application Component
 * Responsibilities:
 * - Acts as the central hub for the application.
 * - Manages global state (user authentication, current page navigation).
 * - Handles "routing" by conditionally rendering page components based on state.
 * - Manages global UI elements like Modals and Toasts.
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ServicesList } from './components/ServicesList';
import { TipsList } from './components/TipsList';
import { Footer } from './components/Footer';
import { Modal } from './components/Modal';
import { CardDoctor } from './components/CardDoctor';
import { HomeDoctorCard } from './components/HomeDoctorCard';
import { Button } from './components/Button';
import { ServicesPage } from './components/ServicesPage';
import { DoctorsPage } from './components/DoctorsPage';
import { ArticlesPage } from './components/ArticlesPage';
import { TestimonialsSection } from './components/TestimonialsSection';
import { AboutPage } from './components/AboutPage';
import { AuthPage } from './components/AuthPage';
import { PatientProfilePage } from './components/PatientProfilePage';
import { DoctorProfilePage } from './components/DoctorProfilePage';

// --- Mock Data Section ---
// In a real application, this data would be fetched from an API.
const doctors = [
    {
        id: '1',
        name: 'Dr. Sarah Smith',
        specialty: 'Cardiologist',
        image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300&h=300',
        rating: 4.9,
        availability: 'Available',
        country: 'USA',
        description: 'Specializes in preventative cardiology and advanced heart failure management with over 15 years of experience.'
    },
    {
        id: '2',
        name: 'Dr. Michael Chen',
        specialty: 'Cardiac Surgeon',
        image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=300&h=300',
        rating: 4.8,
        availability: 'Busy',
        country: 'Canada',
        description: 'Expert in minimally invasive cardiac surgery and complex valve repairs. Pioneered several new surgical techniques.'
    },
    {
        id: '3',
        name: 'Dr. Emily Davis',
        specialty: 'Pediatric Cardiologist',
        image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=300&h=300',
        rating: 4.9,
        availability: 'Available',
        country: 'UK',
        description: 'Dedicated to treating congenital heart defects in children. Known for her compassionate approach with families.'
    },
    {
        id: '4',
        name: 'Dr. James Wilson',
        specialty: 'Interventional Cardiologist',
        image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=300&h=300',
        rating: 4.7,
        availability: 'Available',
        country: 'Australia',
        description: 'Focuses on catheter-based treatments for structural heart diseases. Active researcher in new stent technologies.'
    }
];

const tips = [
    {
        id: '1',
        title: '7 Foods for a Healthy Heart',
        content: 'Incorporating these nutrient-rich foods into your diet can significantly improve your heart health. Berries, leafy greens, and whole grains are excellent choices.',
        image: 'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?auto=format&fit=crop&q=80&w=500',
        category: 'Nutrition',
        readTime: '5 min'
    },
    {
        id: '2',
        title: 'The Benefits of Daily Walking',
        content: 'Walking is one of the simplest and most effective exercises for heart health. Aim for at least 30 minutes a day to lower blood pressure and improve circulation.',
        image: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&q=80&w=500',
        category: 'Fitness',
        readTime: '4 min'
    },
    {
        id: '3',
        title: 'Managing Stress for Heart Health',
        content: 'Chronic stress can negatively impact your heart. Learn effective stress management techniques like meditation, deep breathing, and yoga.',
        image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=500',
        category: 'Wellness',
        readTime: '6 min'
    }
];

function App() {
    // --- State Management ---

    // Controls which "page" or section is currently visible
    const [currentPage, setCurrentPage] = useState<'home' | 'services' | 'doctors' | 'articles' | 'about' | 'auth' | 'profile'>('home');

    // Controls the mode of the AuthPage (login vs signup)
    const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

    // Modal visibility states
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false); // Unused in current flow but kept for future
    const [activeModal, setActiveModal] = useState<'booking' | 'tip' | null>(null);

    // Data selection states for modals
    const [selectedDoctor, setSelectedDoctor] = useState<any>(null);
    const [selectedTip, setSelectedTip] = useState<any>(null);

    // UI feedback state
    const [toastMessage, setToastMessage] = useState<string | null>(null);

    // Service selection state (Model 1 vs Model 2)
    const [selectedService, setSelectedService] = useState<'model1' | 'model2'>('model1');

    // Authentication state
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userRole, setUserRole] = useState<'patient' | 'doctor'>('patient');

    // --- Event Handlers ---

    // Opens the booking modal for a specific doctor
    const handleBook = (doctor: any) => {
        setSelectedDoctor(doctor);
        setActiveModal('booking');
    };

    // Placeholder for viewing a doctor's full profile
    const handleViewProfile = (doctor: any) => {
        console.log('View profile:', doctor.name);
    };

    // Handles navigation when a user clicks "Try Service"
    // Redirects to Doctors page for consultation or Services page for AI models
    const handleTryService = (serviceId: string) => {
        console.log('Try service:', serviceId);
        if (serviceId === 'consultation') {
            setCurrentPage('doctors');
        } else {
            setSelectedService(serviceId as 'model1' | 'model2');
            setCurrentPage('services');
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Central navigation handler
    // Updates currentPage state and handles scrolling
    const handleNavigate = (sectionId?: string) => {
        if (sectionId === 'about') {
            setCurrentPage('about');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else if (sectionId === 'login' || sectionId === 'signup') {
            // If already logged in, go to profile, otherwise go to auth page
            if (isLoggedIn) {
                setCurrentPage('profile');
            } else {
                setAuthMode(sectionId);
                setCurrentPage('auth');
            }
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else if (sectionId === 'profile') {
            setCurrentPage('profile');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else if (sectionId === 'services') {
            setCurrentPage('services');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else if (sectionId === 'doctors') {
            setCurrentPage('doctors');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else if (sectionId === 'articles') {
            setCurrentPage('articles');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            // Default to home, optionally scrolling to a specific section ID
            setCurrentPage('home');
            setTimeout(() => {
                if (sectionId) {
                    const element = document.getElementById(sectionId);
                    if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                    }
                } else {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            }, 100);
        }
    };

    // Opens the modal to read a full health tip
    const handleReadMore = (tip: any) => {
        setSelectedTip(tip);
        setActiveModal('tip');
    };

    // Navigates to the full articles page
    const handleViewAllTips = () => {
        setCurrentPage('articles');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Displays a temporary toast message
    const showToast = (message: string) => {
        setToastMessage(message);
        setTimeout(() => setToastMessage(null), 3000);
    };

    // Closes any active modal and clears selected data
    const closeModal = () => {
        setActiveModal(null);
        setSelectedDoctor(null);
        setSelectedTip(null);
    };

    // Handles successful login: updates auth state and redirects to profile
    const handleLoginSuccess = (role: 'patient' | 'doctor') => {
        setIsLoggedIn(true);
        setUserRole(role);
        setCurrentPage('profile');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Handles logout: clears auth state and redirects to home
    const handleLogout = () => {
        setIsLoggedIn(false);
        setCurrentPage('home');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] font-sans text-[#0F172A]">
            {/* Global Header - visible on all pages */}
            <Header onNavigate={handleNavigate} currentPage={currentPage} isLoggedIn={isLoggedIn} />

            <main>
                {/* Conditional Rendering based on currentPage state */}
                {currentPage === 'home' ? (
                    <>
                        <Hero />

                        <ServicesList onTryService={handleTryService} />

                        {/* Doctors Section - Displayed on Home Page */}
                        <section id="doctors" className="py-24 bg-[#F8FAFC]">
                            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                                <div className="text-center max-w-3xl mx-auto mb-16">
                                    <div className="text-[#0EA5E9] font-bold tracking-wide uppercase text-sm mb-2">Our Specialists</div>
                                    <h2 className="text-3xl md:text-4xl font-extrabold text-[#0F172A] mb-4">
                                        Meet Our Expert Team
                                    </h2>
                                    <p className="text-lg text-[#64748B]">
                                        World-class cardiologists and surgeons dedicated to your heart health.
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                                    {doctors.map((doctor) => (
                                        <div key={doctor.id} className="h-full">
                                            <HomeDoctorCard
                                                doctor={doctor}
                                            />
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-12 text-center">
                                    <Button
                                        variant="outline"
                                        className="rounded-full px-8 border-gray-200 hover:border-[#0EA5E9] hover:text-[#0EA5E9]"
                                        onClick={() => {
                                            setCurrentPage('doctors');
                                            window.scrollTo({ top: 0, behavior: 'smooth' });
                                        }}
                                    >
                                        View All Doctors
                                    </Button>
                                </div>
                            </div>
                        </section>

                        <TipsList
                            tips={tips}
                            onReadMore={handleReadMore}
                            onViewAll={handleViewAllTips}
                        />

                        <TestimonialsSection />
                    </>
                ) : currentPage === 'services' ? (
                    <ServicesPage onNavigate={handleNavigate} initialService={selectedService} />
                ) : currentPage === 'articles' ? (
                    <ArticlesPage onNavigateHome={() => handleNavigate()} />
                ) : currentPage === 'about' ? (
                    <AboutPage onNavigateHome={() => handleNavigate()} />
                ) : currentPage === 'auth' ? (
                    <AuthPage
                        initialMode={authMode}
                        onNavigateHome={() => handleNavigate()}
                        onLoginSuccess={handleLoginSuccess}
                    />
                ) : currentPage === 'profile' ? (
                    // Render appropriate profile based on user role
                    userRole === 'doctor'
                        ? <DoctorProfilePage onNavigate={handleNavigate} onLogout={handleLogout} />
                        : <PatientProfilePage onNavigate={handleNavigate} onLogout={handleLogout} />
                ) : (
                    // Default fallback to Doctors Page if no other match (e.g. 'doctors' state)
                    <DoctorsPage onNavigateHome={() => handleNavigate()} />
                )}
            </main>

            {/* Global Modals */}

            {/* Booking Modal */}
            <Modal
                isOpen={activeModal === 'booking'}
                onClose={closeModal}
                title="Book Consultation"
            >
                <div className="space-y-4">
                    <p className="text-gray-600">
                        Booking appointment with <span className="font-semibold text-[#0F172A]">{selectedDoctor?.name}</span>
                    </p>
                    <div className="bg-blue-50 p-4 rounded-lg text-sm text-blue-800">
                        Available slots will be shown here. This is a demo.
                    </div>
                    <div className="flex justify-end gap-3 pt-4">
                        <Button variant="outline" onClick={closeModal}>Cancel</Button>
                        <Button onClick={() => {
                            showToast("Appointment request sent!");
                            closeModal();
                        }}>Confirm Booking</Button>
                    </div>
                </div>
            </Modal>

            {/* Tip Details Modal */}
            <Modal
                isOpen={activeModal === 'tip'}
                onClose={closeModal}
                title={selectedTip?.title}
            >
                <div className="space-y-4">
                    <img
                        src={selectedTip?.image}
                        alt={selectedTip?.title}
                        className="w-full h-48 object-cover rounded-xl"
                    />
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <span className="bg-sky-100 text-[#0EA5E9] px-2 py-0.5 rounded-full text-xs font-medium">
                            {selectedTip?.category}
                        </span>
                        <span>•</span>
                        <span>{selectedTip?.readTime} read</span>
                    </div>
                    <p className="text-gray-600 leading-relaxed">
                        {selectedTip?.content}
                    </p>
                    <p className="text-gray-600 leading-relaxed">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                    <div className="flex justify-end pt-4">
                        <Button onClick={closeModal}>Close</Button>
                    </div>
                </div>
            </Modal>

            {/* Global Toast Notification */}
            {toastMessage && (
                <div className="fixed bottom-8 right-8 bg-[#0F172A] text-white px-6 py-3 rounded-xl shadow-lg animate-fade-in z-50 flex items-center gap-3">
                    <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {toastMessage}
                </div>
            )}

            {/* Footer - hidden on certain pages */}
            {currentPage !== 'doctors' && currentPage !== 'about' && currentPage !== 'auth' && currentPage !== 'profile' && <Footer />}
        </div>
    );
}

export default App;
