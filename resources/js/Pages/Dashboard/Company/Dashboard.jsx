// resources/js/Pages/Dashboard/Company/Dashboard.jsx
import React from 'react';
import { Head } from '@inertiajs/react';
import Sidebar from '@/Components/Sidebar/Sidebar';

export default function Dashboard({ auth, stats }) {
    // Ensure stats exists and has the required property
    const activeJobs = stats?.activeJobPosts ?? 0;

    return (
        <>
            <Head title="Company Dashboard" />
            <div className="flex">
                <Sidebar userType="company" />
                <div className="flex-1 p-8">
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold">Welcome, {auth.user.name}</h1>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-6 mb-6 lg:grid-cols-3">
                        {/* Active Jobs Card */}
                        <div className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold">Active Job Posts</h3>
                                <div className="p-2 bg-blue-50 rounded-full">
                                    <svg 
                                        className="w-6 h-6 text-[#4640DE]" 
                                        fill="none" 
                                        stroke="currentColor" 
                                        viewBox="0 0 24 24"
                                    >
                                        <path 
                                            strokeLinecap="round" 
                                            strokeLinejoin="round" 
                                            strokeWidth="2" 
                                            d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                        />
                                    </svg>
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <p className="text-3xl font-bold text-[#4640DE]">{activeJobs}</p>
                                <p className="text-sm text-gray-500 mt-1">Currently active positions</p>
                            </div>
                        </div>

                        {/* Applications Card */}
                        <div className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold">Total Applications</h3>
                                <div className="p-2 bg-green-50 rounded-full">
                                    <svg 
                                        className="w-6 h-6 text-green-600" 
                                        fill="none" 
                                        stroke="currentColor" 
                                        viewBox="0 0 24 24"
                                    >
                                        <path 
                                            strokeLinecap="round" 
                                            strokeLinejoin="round" 
                                            strokeWidth="2" 
                                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <p className="text-3xl font-bold text-[#4640DE]">0</p>
                                <p className="text-sm text-gray-500 mt-1">Total applications received</p>
                            </div>
                        </div>

                        {/* Messages Card */}
                        <div className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold">Messages</h3>
                                <div className="p-2 bg-purple-50 rounded-full">
                                    <svg 
                                        className="w-6 h-6 text-purple-600" 
                                        fill="none" 
                                        stroke="currentColor" 
                                        viewBox="0 0 24 24"
                                    >
                                        <path 
                                            strokeLinecap="round" 
                                            strokeLinejoin="round" 
                                            strokeWidth="2" 
                                            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                                        />
                                    </svg>
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <p className="text-3xl font-bold text-[#4640DE]">0</p>
                                <p className="text-sm text-gray-500 mt-1">Unread messages</p>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 bg-white rounded-lg shadow">
                        <h2 className="mb-4 text-xl font-semibold">Recent Applications</h2>
                        <div className="text-gray-500">No applications yet</div>
                    </div>
                </div>
            </div>
        </>
    );
}