// resources/js/Pages/Profile/CompanyProfile.jsx
import React from 'react';
import { Head } from '@inertiajs/react';
import { useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import Sidebar from '@/Components/Sidebar/Sidebar';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';

export default function CompanyProfile({ auth, mustVerifyEmail, status }) {
    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        company_name: auth.user.profile?.company_name || '',
        industry: auth.user.profile?.industry || '',
        company_size: auth.user.profile?.company_size || '',
        founded_year: auth.user.profile?.founded_year || '',
        website: auth.user.profile?.website || '',
        location: auth.user.profile?.location || '',
        about: auth.user.profile?.about || '',
    });

    const submit = (e) => {
        e.preventDefault();
        patch(route('profile.update'));
    };

    return (
        <div className="flex">
            <Sidebar userType="company" />
            <div className="flex-1 bg-[#F8F9FA] min-h-screen">
                <Head title="Company Profile" />
                
                <div className="py-12 px-8">
                    <div className="max-w-7xl mx-auto space-y-6">
                        {/* Company Profile Section */}
                        <div className="bg-white rounded-lg shadow-sm">
                            <div className="p-8">
                                <h2 className="text-2xl font-semibold text-[#202430] mb-6">
                                    Company Profile
                                </h2>

                                <form onSubmit={submit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* Company Name */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Company Name
                                            </label>
                                            <input
                                                type="text"
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#4640DE] focus:border-[#4640DE]"
                                                value={data.company_name}
                                                onChange={e => setData('company_name', e.target.value)}
                                            />
                                            <InputError message={errors.company_name} className="mt-2" />
                                        </div>

                                        {/* Industry */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Industry
                                            </label>
                                            <input
                                                type="text"
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#4640DE] focus:border-[#4640DE]"
                                                value={data.industry}
                                                onChange={e => setData('industry', e.target.value)}
                                            />
                                            <InputError message={errors.industry} className="mt-2" />
                                        </div>

                                        {/* Company Size */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Company Size
                                            </label>
                                            <select
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#4640DE] focus:border-[#4640DE]"
                                                value={data.company_size}
                                                onChange={e => setData('company_size', e.target.value)}
                                            >
                                                <option value="">Select size</option>
                                                <option value="1-10">1-10 employees</option>
                                                <option value="11-50">11-50 employees</option>
                                                <option value="51-200">51-200 employees</option>
                                                <option value="201-500">201-500 employees</option>
                                                <option value="501+">501+ employees</option>
                                            </select>
                                            <InputError message={errors.company_size} className="mt-2" />
                                        </div>

                                        {/* Founded Year */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Founded Year
                                            </label>
                                            <input
                                                type="number"
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#4640DE] focus:border-[#4640DE]"
                                                value={data.founded_year}
                                                onChange={e => setData('founded_year', e.target.value)}
                                            />
                                            <InputError message={errors.founded_year} className="mt-2" />
                                        </div>

                                        {/* Website */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Website
                                            </label>
                                            <input
                                                type="url"
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#4640DE] focus:border-[#4640DE]"
                                                value={data.website}
                                                onChange={e => setData('website', e.target.value)}
                                            />
                                            <InputError message={errors.website} className="mt-2" />
                                        </div>

                                        {/* Location */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Location
                                            </label>
                                            <input
                                                type="text"
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#4640DE] focus:border-[#4640DE]"
                                                value={data.location}
                                                onChange={e => setData('location', e.target.value)}
                                            />
                                            <InputError message={errors.location} className="mt-2" />
                                        </div>
                                    </div>

                                    {/* About */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            About Company
                                        </label>
                                        <textarea
                                            rows={4}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#4640DE] focus:border-[#4640DE]"
                                            value={data.about}
                                            onChange={e => setData('about', e.target.value)}
                                        />
                                        <InputError message={errors.about} className="mt-2" />
                                    </div>

                                    {/* Submit Button */}
                                    <div className="flex items-center justify-end gap-4">
                                        <button
                                            type="submit"
                                            disabled={processing}
                                            className={`px-6 py-3 bg-[#4640DE] text-white rounded-lg font-medium
                                                hover:bg-[#3530A8] transition-colors duration-200
                                                disabled:opacity-50 disabled:cursor-not-allowed
                                                flex items-center gap-2`}
                                        >
                                            {processing ? 'Saving...' : 'Save Changes'}
                                        </button>
                                        
                                        {recentlySuccessful && (
                                            <p className="text-sm text-green-600">Saved successfully.</p>
                                        )}
                                    </div>
                                </form>
                            </div>
                        </div>

                        {/* Password Update Section */}
                        <div className="bg-white rounded-lg shadow-sm">
                            <div className="p-8">
                                <UpdatePasswordForm />
                            </div>
                        </div>

                        {/* Account Management Section */}
                        <div className="bg-white rounded-lg shadow-sm">
                            <div className="p-8">
                                <DeleteUserForm />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}