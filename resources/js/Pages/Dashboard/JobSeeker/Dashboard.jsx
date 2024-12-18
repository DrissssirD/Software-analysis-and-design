// resources/js/Pages/Dashboard/JobSeeker/Dashboard.jsx
import React from 'react';
import { Head } from '@inertiajs/react';
import Sidebar from '@/Components/Sidebar/Sidebar';

export default function JobSeekerDashboard({ auth }) {
    return (
        <>
            <Head title="Dashboard" />
            <div className="flex">
                <Sidebar userType="jobSeeker" />
                <div className="flex-1 p-8">
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold">Welcome, {auth.user.name}</h1>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-6 mb-6 lg:grid-cols-3">
                        <div className="p-6 bg-white rounded-lg shadow">
                            <h3 className="mb-2 text-lg font-semibold">Applied Jobs</h3>
                            <p className="text-3xl font-bold text-[#4640DE]">0</p>
                        </div>
                        <div className="p-6 bg-white rounded-lg shadow">
                            <h3 className="mb-2 text-lg font-semibold">Saved Jobs</h3>
                            <p className="text-3xl font-bold text-[#4640DE]">0</p>
                        </div>
                        <div className="p-6 bg-white rounded-lg shadow">
                            <h3 className="mb-2 text-lg font-semibold">Messages</h3>
                            <p className="text-3xl font-bold text-[#4640DE]">0</p>
                        </div>
                    </div>

                    <div className="p-6 bg-white rounded-lg shadow">
                        <h2 className="mb-4 text-xl font-semibold">Recommended Jobs</h2>
                        <div className="text-gray-500">No jobs found matching your profile</div>
                    </div>
                </div>
            </div>
        </>
    );
}