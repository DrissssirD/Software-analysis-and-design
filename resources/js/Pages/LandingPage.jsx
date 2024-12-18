import React, { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import NavBar from "@/Components/NavBar";

// Sample sections data (move to a separate file in production)
const sections = [
    { 
        title: "Design", 
        jobs: "235", 
        icon: (
            <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 19l7-7 3 3-7 7-3-3z" />
                <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
                <path d="M2 2l7.586 7.586" />
                <circle cx="11" cy="11" r="2" />
            </svg>
        ),
        trending: true 
    },
    { 
        title: "Sales", 
        jobs: "145", 
        icon: (
            <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                <path d="M12 22V2M2 12h20" />
            </svg>
        ),
        trending: false 
    },
    { 
        title: "Marketing", 
        jobs: "210", 
        icon: (
            <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
        ),
        trending: true 
    },
    { 
        title: "Finance", 
        jobs: "190", 
        icon: (
            <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
            </svg>
        ),
        trending: false 
    },
    { 
        title: "Technology", 
        jobs: "300", 
        icon: (
            <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" />
            </svg>
        ),
        trending: true 
    },
    { 
        title: "Engineering", 
        jobs: "280", 
        icon: (
            <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
            </svg>
        ),
        trending: false 
    },
    { 
        title: "Business", 
        jobs: "220", 
        icon: (
            <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z" />
                <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" />
            </svg>
        ),
        trending: false 
    },
    { 
        title: "Human Resource", 
        jobs: "160", 
        icon: (
            <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
            </svg>
        ),
        trending: false 
    },
];

export default function LandingPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [location, setLocation] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const [jobCount, setJobCount] = useState(0);

    // Animated counter effect
    useEffect(() => {
        const target = 1000;
        const increment = target / 50;
        const interval = setInterval(() => {
            setJobCount(prev => {
                const newCount = prev + increment;
                if (newCount >= target) {
                    clearInterval(interval);
                    return target;
                }
                return newCount;
            });
        }, 50);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="bg-[#25324B] min-h-screen">
            <div className="p-4 xl:px-32 md:px-5">
                <NavBar />

                {/* Hero Section with animated counter */}
                <div className="mt-5 sm:mt-10 flex flex-col gap-3 sm:gap-5">
                    <h1 className="text-white text-3xl sm:text-5xl md:text-6xl lg:text-7xl leading-snug animate-fade-in">
                        Discover <br />
                        More than <br />
                    </h1>
                    <h1 className="text-blue-500 text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
                        {Math.floor(jobCount)}+ jobs
                    </h1>
                    <div className="w-1/2 sm:w-[35%] h-1 bg-blue-500 sm:mt-3 animate-slide-right" />
                </div>

                {/* Enhanced Search Section */}
                <div className="mt-8 sm:mt-12">
                    <div className={`bg-white rounded-lg p-4 transition-all duration-300 ${
                        isSearchFocused ? 'shadow-lg scale-[1.02]' : 'shadow'
                    }`}>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="flex-1 relative">
                                <input
                                    type="text"
                                    placeholder="Job title or keyword"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onFocus={() => setIsSearchFocused(true)}
                                    onBlur={() => setIsSearchFocused(false)}
                                    className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                                />
                                {searchQuery && (
                                    <button
                                        onClick={() => setSearchQuery('')}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    >
                                        ×
                                    </button>
                                )}
                            </div>
                            <div className="flex-1 relative">
                                <input
                                    type="text"
                                    placeholder="Location"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                                />
                                <svg 
                                    className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                                    fill="none" 
                                    stroke="currentColor" 
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <button className="bg-[#4640DE] text-white px-8 py-3 rounded-lg hover:bg-[#3530A8] transition-all duration-300 transform hover:scale-105 active:scale-95">
                                Search Jobs
                            </button>
                        </div>
                        {isSearchFocused && searchQuery && (
                            <div className="mt-2 p-2">
                                <div className="text-sm text-gray-600">Popular searches:</div>
                                <div className="flex flex-wrap gap-2 mt-1">
                                    {['React Developer', 'Product Manager', 'UI Designer'].map((term) => (
                                        <button
                                            key={term}
                                            onClick={() => setSearchQuery(term)}
                                            className="px-3 py-1 bg-gray-100 rounded-full text-sm hover:bg-gray-200 transition-colors"
                                        >
                                            {term}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Categories Section with Hover Effects */}
                <div className="mt-16">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-2xl sm:text-5xl text-white">
                            Explore by <span className="text-[#26A4FF]">category</span>
                        </h2>
                        <Link
                            href={route('jobs.index')}
                            className="group text-[#4640DE] hover:text-[#3530A8] bg-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-300 hover:shadow-lg"
                        >
                            Show all jobs
                            <svg 
                                className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" 
                                viewBox="0 0 20 20" 
                                fill="currentColor"
                            >
                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                        </Link>
                    </div>

                    <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
                        {sections.map((section, index) => (
                            <div
                                key={index}
                                onMouseEnter={() => setSelectedCategory(section.title)}
                                onMouseLeave={() => setSelectedCategory(null)}
                                className={`bg-white p-8 rounded-lg transition-all duration-300 cursor-pointer 
                                    ${selectedCategory === section.title ? 'shadow-xl scale-105' : 'hover:shadow-lg hover:scale-[1.02]'}
                                    relative overflow-hidden`}
                            >
                                {section.trending && (
                                    <div className="absolute top-2 right-2 bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-xs">
                                        Trending
                                    </div>
                                )}
                                <div className="text-[#4640DE] mb-4">
                                    {section.icon}
                                </div>
                                <h3 className="text-[#25324B] text-xl sm:text-2xl text-center mb-2">
                                    {section.title}
                                </h3>
                                <div className="flex items-center justify-center gap-2 text-gray-500">
                                    <span>{section.jobs} jobs available</span>
                                    <svg 
                                        className={`w-5 h-5 transform transition-transform ${
                                            selectedCategory === section.title ? 'translate-x-1' : ''
                                        }`} 
                                        viewBox="0 0 20 20" 
                                        fill="currentColor"
                                    >
                                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
          
        </div>
        
    );
}