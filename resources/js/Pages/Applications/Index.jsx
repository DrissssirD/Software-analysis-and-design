import React from 'react';
import { Head } from '@inertiajs/react';
import Sidebar from '@/Components/Sidebar/Sidebar';

export default function ApplicationsIndex({ auth, applications = { data: [] } }) {
    const handleStatusUpdate = (applicationId, newStatus) => {
        // Add status update logic here
        console.log(`Updating application ${applicationId} to ${newStatus}`);
    };

    return (
        <>
            <Head title="Applications" />
            <div className="flex">
                <Sidebar userType={auth.user.user_type} />
                <div className="flex-1 p-8 bg-gray-50">
                    <div className="max-w-7xl mx-auto">
                        <h1 className="text-2xl font-bold text-gray-900 mb-8">
                            {auth.user.user_type === 'company' ? 'Received Applications' : 'My Applications'}
                        </h1>

                        <div className="grid gap-6">
                            {applications?.data?.length > 0 ? (
                                applications.data.map((application) => (
                                    <div 
                                        key={application.id} 
                                        className="bg-white rounded-lg shadow-sm p-6"
                                    >
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h2 className="text-xl font-semibold text-gray-900">
                                                    {application.jobPost?.title}
                                                </h2>
                                                <p className="text-gray-600 mt-1">
                                                    {auth.user.user_type === 'company' 
                                                        ? `Applicant: ${application.jobSeekerProfile?.user?.name}`
                                                        : `Company: ${application.jobPost?.companyProfile?.company_name}`
                                                    }
                                                </p>
                                            </div>
                                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                                application.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                                application.status === 'reviewed' ? 'bg-blue-100 text-blue-800' :
                                                application.status === 'accepted' ? 'bg-green-100 text-green-800' :
                                                'bg-red-100 text-red-800'
                                            }`}>
                                                {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                                            </span>
                                        </div>

                                        <div className="mt-4 text-sm text-gray-500">
                                            Applied on {new Date(application.applied_at).toLocaleDateString()}
                                        </div>

                                        {auth.user.user_type === 'company' && application.status === 'pending' && (
                                            <div className="mt-4 flex gap-2">
                                                <button 
                                                    onClick={() => handleStatusUpdate(application.id, 'accepted')}
                                                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                                                >
                                                    Accept
                                                </button>
                                                <button 
                                                    onClick={() => handleStatusUpdate(application.id, 'rejected')}
                                                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                                                >
                                                    Reject
                                                </button>
                                            </div>
                                        )}

                                        {application.cover_letter && (
                                            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                                                <h3 className="font-medium text-gray-900 mb-2">Cover Letter</h3>
                                                <p className="text-gray-600">{application.cover_letter}</p>
                                            </div>
                                        )}

                                        {application.resume_path && (
                                            <div className="mt-4">
                                                <a 
                                                    href={`/storage/${application.resume_path}`}
                                                    target="_blank"
                                                    className="inline-flex items-center text-blue-600 hover:text-blue-800"
                                                >
                                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                    </svg>
                                                    View Resume
                                                </a>
                                            </div>
                                        )}
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                                    <p className="text-gray-500">
                                        {auth.user.user_type === 'company' 
                                            ? 'No applications received yet.'
                                            : 'You haven\'t applied to any jobs yet.'
                                        }
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}