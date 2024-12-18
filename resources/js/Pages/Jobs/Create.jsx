// resources/js/Pages/Jobs/Create.jsx
import React from 'react';
import { Head } from '@inertiajs/react';
import Sidebar from '@/Components/Sidebar/Sidebar';

export default function JobsCreate({ auth }) {
    return (
        <>
            <Head title="Post a Job" />
            <div className="flex">
                <Sidebar userType={auth.user.user_type} />
                <div className="flex-1 p-8">
                    <h1 className="text-2xl font-bold mb-4">Post a New Job</h1>
                    <p>Coming soon...</p>
                </div>
            </div>
        </>
    );
}