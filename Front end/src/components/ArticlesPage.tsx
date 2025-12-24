/**
 * ArticlesPage.tsx
 * 
 * Role: Health Articles Library
 * Responsibilities:
 * - Displays a collection of health and wellness articles.
 * - Supports pagination to manage large lists of articles.
 * - Provides a modal view for reading full article content.
 * - Allows users to browse educational content related to heart health.
 */

import React, { useState } from 'react';
import { Button } from './Button';
import { Modal } from './Modal';

// Article Data Structure
interface Article {
    id: string;
    title: string;
    description: string;
    content: string;
    image: string;
    category: string;
    readTime: string;
}

interface ArticlesPageProps {
    onNavigateHome: () => void;
}

// Mock Data for Articles
const articles: Article[] = [
    {
        id: '1',
        title: '5 Simple Exercises to Strengthen Your Heart',
        description: 'Discover easy, low-impact workouts you can do at home to improve cardiovascular health and boost your overall well-being.',
        content: 'Regular physical activity is one of the best things you can do for your heart. Here are 5 simple exercises: 1. Brisk Walking: Aim for 30 minutes a day. 2. Swimming: A full-body workout that is easy on the joints. 3. Cycling: Great for building endurance. 4. Yoga: Helps reduce stress and improve flexibility. 5. Strength Training: Builds muscle and boosts metabolism. Remember to consult your doctor before starting any new exercise routine.',
        image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80&w=500',
        category: 'Fitness',
        readTime: '5 min'
    },
    {
        id: '2',
        title: 'The Top 10 Heart-Healthy Foods You Should Be Eating',
        description: 'Learn which foods can help lower your cholesterol, reduce blood pressure, and keep your heart in top condition. It\'s easier than you think!',
        content: 'Your diet plays a major role in heart health. Incorporate these foods: 1. Leafy Green Vegetables (Spinach, Kale). 2. Whole Grains (Oats, Brown Rice). 3. Berries (Strawberries, Blueberries). 4. Avocados. 5. Fatty Fish (Salmon, Mackerel). 6. Walnuts. 7. Beans. 8. Dark Chocolate. 9. Tomatoes. 10. Seeds (Chia, Flax). These foods are rich in nutrients, fiber, and healthy fats.',
        image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=500',
        category: 'Nutrition',
        readTime: '7 min'
    },
    {
        id: '3',
        title: 'Managing Stress for a Healthier Heart',
        description: 'Stress can have a significant impact on your cardiovascular system. We\'ll explore effective techniques to manage stress daily.',
        content: 'Chronic stress can lead to high blood pressure and heart disease. Manage stress with these techniques: 1. Meditation and Mindfulness. 2. Deep Breathing Exercises. 3. Regular Physical Activity. 4. Connecting with Loved Ones. 5. Getting Enough Sleep. 6. Engaging in Hobbies. Taking time for yourself is crucial for your heart health.',
        image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=500',
        category: 'Wellness',
        readTime: '6 min'
    },
    {
        id: '4',
        title: 'Understanding Blood Pressure Readings',
        description: 'What do those numbers actually mean? A comprehensive guide to understanding your blood pressure and what you can do to maintain healthy levels.',
        content: 'Blood pressure is recorded as two numbers: Systolic (top number) and Diastolic (bottom number). Normal blood pressure is usually less than 120/80 mmHg. Elevated is 120-129/<80. High Blood Pressure (Hypertension) Stage 1 is 130-139/80-89. Stage 2 is 140+/90+. Monitoring your blood pressure regularly is key to prevention.',
        image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=500',
        category: 'Medical',
        readTime: '4 min'
    },
    {
        id: '5',
        title: 'The Importance of Sleep for Heart Health',
        description: 'Quality sleep is essential for a healthy heart. Find out how sleep affects your cardiovascular system and tips for better rest.',
        content: 'Sleep is essential for a healthy heart. People who don\'t sleep enough are at higher risk for cardiovascular disease. During sleep, your body repairs itself. Lack of sleep is linked to high blood pressure, diabetes, and obesity. Aim for 7-9 hours of quality sleep per night. Establish a regular sleep schedule and create a relaxing bedtime routine.',
        image: 'https://images.unsplash.com/photo-1520206183501-b80df61043c2?auto=format&fit=crop&q=80&w=500',
        category: 'Lifestyle',
        readTime: '5 min'
    }
];

export const ArticlesPage: React.FC<ArticlesPageProps> = ({ onNavigateHome }) => {
    // State for managing selected article and modal visibility
    const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;

    // Calculate pagination values
    const totalPages = Math.ceil(articles.length / itemsPerPage);
    const currentArticles = articles.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Open modal with full article content
    const handleReadMore = (article: Article) => {
        setSelectedArticle(article);
        setIsModalOpen(true);
    };

    // Handle page navigation
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            handlePageChange(currentPage + 1);
        }
    };

    const handlePrev = () => {
        if (currentPage > 1) {
            handlePageChange(currentPage - 1);
        }
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] pt-20 pb-12">
            {/* 1. Header Section */}
            <div className="bg-[#F8FAFC] pb-12 pt-8">
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
                    <h1 className="text-4xl font-extrabold text-[#0F172A] mb-3">Health & Wellness Articles</h1>
                    <p className="text-gray-500 text-lg">Explore our collection of tips and insights for a healthier heart and lifestyle.</p>
                </div>
            </div>

            {/* 2. Articles List with Pagination */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-12">
                <div className="flex flex-col gap-6 max-w-4xl mx-auto">
                    {currentArticles.map((article) => (
                        <div key={article.id} className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col md:flex-row gap-6 hover:shadow-md transition-shadow">
                            {/* Article Image */}
                            <div className="w-full md:w-64 h-48 md:h-auto flex-shrink-0 rounded-2xl overflow-hidden">
                                <img
                                    src={article.image}
                                    alt={article.title}
                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                />
                            </div>

                            {/* Article Content Preview */}
                            <div className="flex-1 flex flex-col">
                                <h3 className="text-xl font-bold text-[#0F172A] mb-2">{article.title}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-1">
                                    {article.description}
                                </p>
                                <div className="flex justify-end mt-auto">
                                    <button
                                        className="inline-flex items-center gap-2 px-6 py-2.5 bg-sky-100 text-[#0EA5E9] font-semibold rounded-full hover:bg-sky-200 transition-colors text-sm"
                                        onClick={() => handleReadMore(article)}
                                    >
                                        Read More
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-4 mt-16">
                        <button
                            onClick={handlePrev}
                            disabled={currentPage === 1}
                            className="text-gray-400 hover:text-[#0EA5E9] transition-colors flex items-center gap-1 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            Previous
                        </button>
                        <div className="flex gap-2">
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                <button
                                    key={page}
                                    onClick={() => handlePageChange(page)}
                                    className={`w-8 h-8 rounded-full font-medium text-sm flex items-center justify-center transition-all ${currentPage === page
                                        ? 'bg-[#0EA5E9] text-white shadow-lg shadow-sky-500/30'
                                        : 'bg-white text-gray-500 hover:bg-gray-50 border border-gray-100'
                                        }`}
                                >
                                    {page}
                                </button>
                            ))}
                        </div>
                        <button
                            onClick={handleNext}
                            disabled={currentPage === totalPages}
                            className="text-gray-400 hover:text-[#0EA5E9] transition-colors flex items-center gap-1 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Next
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                )}
            </div>

            {/* 3. Article Detail Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={selectedArticle?.title || 'Article Details'}
                maxWidth="max-w-2xl"
            >
                <div className="space-y-6">
                    {selectedArticle?.image && (
                        <div className="w-full h-64 rounded-2xl overflow-hidden">
                            <img
                                src={selectedArticle.image}
                                alt={selectedArticle.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    )}

                    <div className="flex items-center gap-3 text-sm">
                        <span className="px-3 py-1 bg-sky-100 text-sky-700 rounded-full font-medium">
                            {selectedArticle?.category}
                        </span>
                        <span className="text-gray-500 flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {selectedArticle?.readTime} read
                        </span>
                    </div>

                    <div className="prose prose-slate max-w-none">
                        <p className="text-gray-600 leading-relaxed text-lg">
                            {selectedArticle?.content}
                        </p>
                        <p className="text-gray-600 leading-relaxed">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </p>
                    </div>

                    <div className="pt-4 flex justify-end border-t border-gray-100 mt-8">
                        <Button
                            className="bg-[#0EA5E9] text-white hover:bg-[#0284C7] px-8"
                            onClick={() => setIsModalOpen(false)}
                        >
                            Close Article
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};
