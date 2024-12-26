import React from 'react';
import { Head, Link } from '@inertiajs/react';
import Sidebar from '@/Components/Sidebar/Sidebar';

export default function JobIndex({ auth, posts }) {
    return (
        <>
            <Head title="Jobs" />
            <div className="flex">
                <Sidebar userType={auth.user.user_type} />
                <div className="flex-1 p-8 bg-gray-50">
                    <div className="max-w-7xl mx-auto">
                        {/*Header with Create Button */}
                        <div className="flex justify-between items-center mb-8">
                            <h1 className="text-2xl font-bold text-gray-900">
                                {auth.user.user_type === 'company' ? 'My Job Posts' : 'Available Jobs'}
                            </h1>
                            {auth.user.user_type === 'company' && (
                                <Link
                                    href={route('jobs.create')}
                                    className="inline-flex items-center px-4 py-2 bg-[#4640DE] text-white rounded-lg hover:bg-[#3530A8] transition-colors duration-200"
                                >
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                                    </svg>
                                    Post New Job
                                </Link>
                            )}
                        </div>

                         
                        <div className="grid gap-6">
                            {posts?.data?.length > 0 ? (
                                posts.data.map((job) => (
                                    <div 
                                        key={job.id} 
                                        className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-200"
                                    >
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h2 className="text-xl font-semibold text-gray-900">
                                                    <Link 
                                                        href={route('jobs.show', job.id)}
                                                        className="hover:text-[#4640DE]"
                                                    >
                                                        {job.title}
                                                    </Link>
                                                </h2>
                                                {job.companyProfile && (
                                                    <p className="text-gray-600 mt-1">{job.companyProfile.company_name}</p>
                                                )}
                                            </div>
                                            <span className="text-sm text-gray-500">
                                                Posted {new Date(job.created_at).toLocaleDateString()}
                                            </span>
                                        </div>

                                        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                            <div>
                                                <span className="text-gray-600">Location:</span>
                                                <p className="font-medium">{job.location}</p>
                                            </div>
                                            <div>
                                                <span className="text-gray-600">Type:</span>
                                                <p className="font-medium capitalize">{job.employment_type}</p>
                                            </div>
                                            <div>
                                                <span className="text-gray-600">Experience:</span>
                                                <p className="font-medium capitalize">{job.experience_level}</p>
                                            </div>
                                            <div>
                                                <span className="text-gray-600">Salary:</span>
                                                <p className="font-medium">{job.salary_range || 'Not specified'}</p>
                                            </div>
                                        </div>

                                        {job.skills_required && (
                                            <div className="mt-4 flex flex-wrap gap-2">
                                                {job.skills_required.map((skill, index) => (
                                                    <span 
                                                        key={index}
                                                        className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium"
                                                    >
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                                    <p className="text-gray-500 mb-4">
                                        {auth.user.user_type === 'company' 
                                            ? 'You haven\'t posted any jobs yet.' 
                                            : 'No jobs available at the moment.'}
                                    </p>
                                    {auth.user.user_type === 'company' && (
                                        <Link
                                            href={route('jobs.create')}
                                            className="inline-flex items-center px-4 py-2 bg-[#4640DE] text-white rounded-lg hover:bg-[#3530A8] transition-colors duration-200"
                                        >
                                            Post Your First Job
                                        </Link>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
    