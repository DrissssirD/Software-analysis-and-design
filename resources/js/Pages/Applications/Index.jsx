import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import Sidebar from '@/Components/Sidebar/Sidebar';
import { Dialog } from '@headlessui/react';

export default function ApplicationsIndex({ auth, applications = { data: [] } }) {
    const [selectedApplication, setSelectedApplication] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const { put, processing } = useForm();
    const [feedback, setFeedback] = useState('');

    const handleStatusUpdate = (applicationId, newStatus) => {
        // For debugging
        console.log('Sending update with:', {
            applicationId,
            newStatus,
            feedback
        });
    
        put(`/applications/${applicationId}/status`, {
            status: newStatus,
            feedback: feedback
        }, {
            preserveScroll: true,
            onSuccess: () => {
                console.log('Update successful');
                setShowModal(false);
                setSelectedApplication(null);
                setFeedback('');
                window.location.reload();
            },
            onError: (errors) => {
                console.error('Update failed:', errors);
            }
        });
    };

    const openReviewModal = (application) => {
        setSelectedApplication(application);
        setShowModal(true);
    };
    

    const ApplicationStatus = ({ status }) => {
        const statusClasses = {
            pending: 'bg-yellow-100 text-yellow-800',
            reviewed: 'bg-blue-100 text-blue-800',
            accepted: 'bg-green-100 text-green-800',
            rejected: 'bg-red-100 text-red-800'
        };

        return (
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusClasses[status]}`}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
        );
    };

    const ReviewModal = () => (
        <Dialog open={showModal} onClose={() => setShowModal(false)} className="relative z-50">
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
            
            <div className="fixed inset-0 flex items-center justify-center p-4">
                <Dialog.Panel className="w-full max-w-md bg-white rounded-lg p-6">
                    <Dialog.Title className="text-lg font-bold mb-4">
                        Review Application
                    </Dialog.Title>
    
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Feedback (optional)
                        </label>
                        <textarea
                            value={feedback}
                            onChange={(e) => setFeedback(e.target.value)}
                            className="w-full border rounded-lg p-2"
                            rows={4}
                            placeholder="Enter feedback for the applicant..."
                        />
                    </div>
    
                    <div className="flex gap-3 justify-end">
                        <button
                            type="button"
                            onClick={() => setShowModal(false)}
                            className="px-4 py-2 text-gray-600 hover:text-gray-800"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={() => handleStatusUpdate(selectedApplication.id, 'rejected')}
                            disabled={processing}
                            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
                        >
                            {processing ? 'Processing...' : 'Reject'}
                        </button>
                        <button
                            onClick={() => handleStatusUpdate(selectedApplication.id, 'accepted')}
                            disabled={processing}
                            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
                        >
                            {processing ? 'Processing...' : 'Accept'}
                        </button>
                    </div>
                </Dialog.Panel>
            </div>
        </Dialog>
    );
    
    const ApplicationCard = ({ application }) => (
        <div className="bg-white rounded-lg shadow-sm p-6 transition-shadow hover:shadow-md">
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
                <ApplicationStatus status={application.status} />
            </div>

            <div className="mt-4 text-sm text-gray-500">
                Applied on {new Date(application.applied_at).toLocaleDateString()}
            </div>

            {application.cover_letter && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-medium text-gray-900 mb-2">Cover Letter</h3>
                    <p className="text-gray-600">{application.cover_letter}</p>
                </div>
            )}

            <div className="mt-4 flex gap-4">
                {application.resume_path && (
                    <a 
                        href={`/storage/${application.resume_path}`}
                        target="_blank"
                        className="inline-flex items-center text-blue-600 hover:text-blue-800"
                    >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        View Resume
                    </a>
                )}

                {auth.user.user_type === 'company' && application.status === 'pending' && (
                    <button
                        onClick={() => openReviewModal(application)}
                        className="inline-flex items-center text-indigo-600 hover:text-indigo-800"
                    >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Review Application
                    </button>
                )}
            </div>

            {application.feedback && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-medium text-gray-900 mb-2">Feedback</h3>
                    <p className="text-gray-600">{application.feedback}</p>
                </div>
            )}
        </div>
    );

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
                                    <ApplicationCard 
                                        key={application.id} 
                                        application={application} 
                                    />
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
            <ReviewModal />
        </>
    );
}