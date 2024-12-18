// resources/js/Pages/Profile/JobSeekerProfile.jsx
import React from 'react';
import { Head } from '@inertiajs/react';
import { useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';

export default function JobSeekerProfile({ auth, mustVerifyEmail, status }) {
    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        title: auth.user.profile?.title || '',
        experience_years: auth.user.profile?.experience_years || '',
        education_level: auth.user.profile?.education_level || '',
        skills: auth.user.profile?.skills ? auth.user.profile.skills.join(', ') : '',
        bio: auth.user.profile?.bio || '',
        linkedin_url: auth.user.profile?.linkedin_url || '',
    });

    const submit = (e) => {
        e.preventDefault();
        patch(route('profile.update'));
    };

    return (
        <AuthenticatedLayout>
            <Head title="Profile" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <section className="max-w-xl">
                            <header>
                                <h2 className="text-lg font-medium text-gray-900">Profile Information</h2>
                                <p className="mt-1 text-sm text-gray-600">
                                    Update your profile information and job preferences.
                                </p>
                            </header>

                            <form onSubmit={submit} className="mt-6 space-y-6">
                                <div>
                                    <InputLabel htmlFor="title" value="Professional Title" />
                                    <TextInput
                                        id="title"
                                        className="mt-1 block w-full"
                                        value={data.title}
                                        onChange={(e) => setData('title', e.target.value)}
                                        required
                                        isFocused
                                        placeholder="e.g. Senior Software Engineer"
                                    />
                                    <InputError className="mt-2" message={errors.title} />
                                </div>

                                <div>
                                    <InputLabel htmlFor="experience_years" value="Years of Experience" />
                                    <TextInput
                                        id="experience_years"
                                        type="number"
                                        className="mt-1 block w-full"
                                        value={data.experience_years}
                                        onChange={(e) => setData('experience_years', e.target.value)}
                                        required
                                        min="0"
                                    />
                                    <InputError className="mt-2" message={errors.experience_years} />
                                </div>

                                <div>
                                    <InputLabel htmlFor="education_level" value="Education Level" />
                                    <select
                                        id="education_level"
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                        value={data.education_level}
                                        onChange={(e) => setData('education_level', e.target.value)}
                                    >
                                        <option value="">Select education level</option>
                                        <option value="high_school">High School</option>
                                        <option value="associate">Associate Degree</option>
                                        <option value="bachelor">Bachelor's Degree</option>
                                        <option value="master">Master's Degree</option>
                                        <option value="phd">PhD</option>
                                    </select>
                                    <InputError className="mt-2" message={errors.education_level} />
                                </div>

                                <div>
                                    <InputLabel htmlFor="skills" value="Skills (comma-separated)" />
                                    <TextInput
                                        id="skills"
                                        className="mt-1 block w-full"
                                        value={data.skills}
                                        onChange={(e) => setData('skills', e.target.value)}
                                        required
                                        placeholder="e.g. React, Node.js, Python"
                                    />
                                    <InputError className="mt-2" message={errors.skills} />
                                </div>

                                <div>
                                    <InputLabel htmlFor="bio" value="Professional Bio" />
                                    <textarea
                                        id="bio"
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                        value={data.bio}
                                        onChange={(e) => setData('bio', e.target.value)}
                                        rows={4}
                                        placeholder="Tell us about your professional journey and what you're looking for"
                                    />
                                    <InputError className="mt-2" message={errors.bio} />
                                </div>

                                <div>
                                    <InputLabel htmlFor="linkedin_url" value="LinkedIn Profile URL" />
                                    <TextInput
                                        id="linkedin_url"
                                        type="url"
                                        className="mt-1 block w-full"
                                        value={data.linkedin_url}
                                        onChange={(e) => setData('linkedin_url', e.target.value)}
                                        placeholder="https://linkedin.com/in/your-profile"
                                    />
                                    <InputError className="mt-2" message={errors.linkedin_url} />
                                </div>

                                <div className="flex items-center gap-4">
                                    <PrimaryButton disabled={processing}>Save</PrimaryButton>

                                    <Transition
                                        show={recentlySuccessful}
                                        enterFrom="opacity-0"
                                        leaveTo="opacity-0"
                                        className="transition ease-in-out"
                                    >
                                        <p className="text-sm text-gray-600">Saved.</p>
                                    </Transition>
                                </div>
                            </form>
                        </section>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}