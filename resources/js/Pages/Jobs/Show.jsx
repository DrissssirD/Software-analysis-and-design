import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import Sidebar from '@/Components/Sidebar/Sidebar';

export default function Show({ auth, job }) {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showApplicationModal, setShowApplicationModal] = useState(false);
    
    const { data, setData, post, processing: applyProcessing, reset, errors } = useForm({
        cover_letter: '',
        resume: null
    });
    
    const { delete: destroy, processing } = useForm();

    const isOwner = auth.user.user_type === 'company' && 
                    auth.user.companyProfile?.id === job.company_profile_id;

    const handleApply = (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('cover_letter', data.cover_letter);
        formData.append('resume', data.resume);
    
        post(route('applications.store', job.id), formData, {
            onSuccess: () => {
                setShowApplicationModal(false);
                reset();
            },
            forceFormData: true
        });
    };

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: job.title,
                text: `Check out this job opportunity: ${job.title} at ${job.companyProfile.company_name}`,
                url: window.location.href,
            }).catch(console.error);
        } else {
            navigator.clipboard.writeText(window.location.href);
            alert('Link copied to clipboard!');
        }
    };

    const handleDelete = () => {
        destroy(route('jobs.destroy', job.id), {
            onSuccess: () => setShowDeleteModal(false),
        });
    };

    const daysUntilDeadline = Math.ceil(
        (new Date(job.deadline) - new Date()) / (1000 * 60 * 60 * 24)
    );

    return (
        <>
            <Head title={job.title} />
            <div className="flex min-h-screen">
                <Sidebar userType={auth.user.user_type} />
                <div className="flex-1 p-8 bg-gray-50">
                    <div className="max-w-4xl mx-auto">
                        <div className="flex justify-between items-center mb-6">
                            <Link
                                href={route('jobs.index')}
                                className="inline-flex items-center text-gray-600 hover:text-gray-900"
                            >
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                Back to Jobs
                            </Link>

                            <div className="flex gap-3">
                                <button
                                    onClick={handleShare}
                                    className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                                >
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                                    </svg>
                                    Share
                                </button>

                                {isOwner && (
                                    <>
                                        <Link
                                            href={route('jobs.edit', job.id)}
                                            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                        >
                                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                            </svg>
                                            Edit
                                        </Link>

                                        <button
                                            onClick={() => setShowDeleteModal(true)}
                                            className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                                        >
                                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                            Delete
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Job Header Info */}
                        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                        {job.title}
                                    </h1>
                                    <div className="text-lg text-gray-600">
                                        {job.companyProfile?.company_name} • {job.location}
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-sm text-gray-500 mb-1">
                                        Posted {new Date(job.created_at).toLocaleDateString()}
                                    </div>
                                    <div className={`text-sm font-medium ${
                                        daysUntilDeadline <= 3 ? 'text-red-600' : 'text-green-600'
                                    }`}>
                                        {daysUntilDeadline > 0 
                                            ? `${daysUntilDeadline} days left to apply`
                                            : 'Application deadline passed'
                                        }
                                    </div>
                                </div>
                            </div>

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
                                    <span className="text-gray-600">Total Applications:</span>
                                    <p className="font-medium">{job.applications_count || 0}</p>
                                </div>
                            </div>
                        </div>

                        {/* Job Content */}
                        <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
                            <div>
                                <h2 className="text-xl font-semibold mb-4">Job Description</h2>
                                <div className="prose max-w-none text-gray-600">
                                    {job.description}
                                </div>
                            </div>

                            <div>
                                <h2 className="text-xl font-semibold mb-4">Requirements</h2>
                                <div className="prose max-w-none text-gray-600">
                                    {job.requirements}
                                </div>
                            </div>

                            <div>
                                <h2 className="text-xl font-semibold mb-4">Required Skills</h2>
                                <div className="flex flex-wrap gap-2">
                                    {job.skills_required.map((skill, index) => (
                                        <span
                                            key={index}
                                            className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Apply Button for Job Seekers */}
                            {auth.user.user_type === 'jobSeeker' && !isOwner && daysUntilDeadline > 0 && (
                                <div className="mt-8 border-t pt-6">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <h3 className="text-lg font-semibold">Interested in this position?</h3>
                                            <p className="text-gray-600">Submit your application now</p>
                                        </div>
                                        <button
                                            onClick={() => setShowApplicationModal(true)}
                                            className="px-6 py-3 bg-[#4640DE] text-white rounded-lg hover:bg-[#3530A8] transition-colors duration-200"
                                        >
                                            Apply Now
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Delete Modal */}
                        {showDeleteModal && (
                            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                                <div className="bg-white rounded-lg p-6 max-w-md w-full">
                                    <h2 className="text-xl font-bold mb-4">Delete Job Post</h2>
                                    <p className="text-gray-600 mb-6">
                                        Are you sure you want to delete this job post? This action cannot be undone.
                                    </p>
                                    <div className="flex justify-end gap-3">
                                        <button
                                            onClick={() => setShowDeleteModal(false)}
                                            className="px-4 py-2 text-gray-600 hover:text-gray-800"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={handleDelete}
                                            disabled={processing}
                                            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
                                        >
                                            {processing ? 'Deleting...' : 'Delete'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Application Modal */}
                        {showApplicationModal && (
                            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                                <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
                                    <h2 className="text-2xl font-bold mb-4">Apply for {job.title}</h2>
                                    <form onSubmit={handleApply} className="space-y-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Cover Letter
                                            </label>
                                            <textarea
                                                value={data.cover_letter}
                                                onChange={e => setData('cover_letter', e.target.value)}
                                                rows={6}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                                placeholder="Tell us why you're interested in this position..."
                                            />
                                            {errors.cover_letter && (
                                                <p className="mt-1 text-sm text-red-600">{errors.cover_letter}</p>
                                            )}
                                        </div>
                                        
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Resume
                                            </label>
                                            <input
                                                type="file"
                                                onChange={e => setData('resume', e.target.files[0])}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                                accept=".pdf,.doc,.docx"
                                            />
                                            {errors.resume && (
                                                <p className="mt-1 text-sm text-red-600">{errors.resume}</p>
                                            )}
                                        </div>

                                        <div className="flex justify-end gap-3">
                                            <button
                                                type="button"
                                                onClick={() => setShowApplicationModal(false)}
                                                className="px-4 py-2 text-gray-600 hover:text-gray-800"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                type="submit"
                                                disabled={applyProcessing}
                                                className="px-6 py-2 bg-[#4640DE] text-white rounded-lg hover:bg-[#3530A8] disabled:opacity-50"
                                            >
                                                {applyProcessing ? 'Submitting...' : 'Submit Application'}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}