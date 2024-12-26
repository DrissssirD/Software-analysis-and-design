// resources/js/Pages/Jobs/Show.jsx
import React from 'react';
import { Head, Link } from '@inertiajs/react';
import Sidebar from '@/Components/Sidebar/Sidebar';

export default function Show({ auth, job }) {
    return (
        <>
            <Head title={job.title} />
            <div className="flex">
                <Sidebar userType={auth.user.user_type} />
                <div className="flex-1 p-8 bg-gray-50">
                    <div className="max-w-4xl mx-auto">
                        {/* Back Button */}
                        <Link
                            href={route('jobs.index')}
                            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6"
                        >
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Back to Jobs
                        </Link>

                        {/* Job Header */}
                        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                {job.title}
                            </h1>
                            <div className="text-lg text-gray-600 mb-4">
                                {job.companyProfile.company_name} • {job.location}
                            </div>

                            {/* Job Details Grid */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                <div>
                                    <span className="text-gray-600">Employment Type:</span>
                                    <p className="font-medium capitalize">{job.employment_type}</p>
                                </div>
                                <div>
                                    <span className="text-gray-600">Experience Level:</span>
                                    <p className="font-medium capitalize">{job.experience_level}</p>
                                </div>
                                <div>
                                    <span className="text-gray-600">Salary Range:</span>
                                    <p className="font-medium">{job.salary_range || 'Not specified'}</p>
                                </div>
                                <div>
                                    <span className="text-gray-600">Deadline:</span>
                                    <p className="font-medium">
                                        {new Date(job.deadline).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Job Content */}
                        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                            <div className="mb-6">
                                <h2 className="text-xl font-semibold mb-4">Job Description</h2>
                                <div className="prose max-w-none">
                                    {job.description}
                                </div>
                            </div>

                            <div className="mb-6">
                                <h2 className="text-xl font-semibold mb-4">Requirements</h2>
                                <div className="prose max-w-none">
                                    {job.requirements}
                                </div>
                            </div>

                            <div>
                                <h2 className="text-xl font-semibold mb-4">Required Skills</h2>
                                <div className="flex flex-wrap gap-2">
                                    {job.skills_required.map((skill, index) => (
                                        <span
                                            key={index}
                                            className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}