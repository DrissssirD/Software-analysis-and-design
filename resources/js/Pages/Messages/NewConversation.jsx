import React, { useState, useEffect } from 'react';
import { Head } from '@inertiajs/react';
import axios from 'axios';
import { useForm } from '@inertiajs/react';
import Sidebar from '@/Components/Sidebar/Sidebar';
import { Search, MessageSquare, Building2, User, ArrowLeft } from 'lucide-react';
import { Link } from '@inertiajs/react';

export default function NewConversation({ auth }) {
    const [users, setUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);
    const { post } = useForm();

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        try {
            const response = await axios.get(route('messages.users.available'));
            setUsers(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error loading users:', error);
            setLoading(false);
        }
    };

    const filteredUsers = users.filter(user => 
        user.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const startConversation = (userId) => {
        console.log('Starting conversation with user:', userId);
        
        post(route('messages.store'), {
            receiver_id: userId
        }, {
            preserveScroll: true,
            onSuccess: (page) => {
                console.log('Conversation created successfully:', page);
            },
            onError: (errors) => {
                console.error('Error creating conversation:', errors);
            },
            onFinish: () => {
                console.log('Request finished');
            }
        });
    };

    return (
        <>
            <Head title="New Conversation" />
            <div className="flex min-h-screen">
                <Sidebar userType={auth.user.user_type} />
                
                <div className="flex-1 bg-white">
                    <div className="max-w-3xl mx-auto px-4 py-8">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-4">
                                <Link
                                    href={route('messages.index')}
                                    className="text-gray-600 hover:text-gray-900"
                                >
                                    <ArrowLeft className="w-6 h-6" />
                                </Link>
                                <h1 className="text-2xl font-bold text-gray-900">Start a New Conversation</h1>
                            </div>
                        </div>
                        
                        {/* Search Bar */}
                        <div className="relative mb-6">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search users..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4640DE] focus:border-transparent"
                            />
                        </div>

                        {/* Users List */}
                        <div className="bg-white rounded-lg shadow">
                            {loading ? (
                                <div className="p-4 text-center text-gray-500">Loading users...</div>
                            ) : filteredUsers.length > 0 ? (
                                <div className="divide-y divide-gray-200">
                                    {filteredUsers.map((user) => (
                                        <div key={user.id} className="p-4 hover:bg-gray-50 transition-colors">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center space-x-3">
                                                    <div className="w-12 h-12 bg-[#4640DE] text-white rounded-full flex items-center justify-center">
                                                        {user.user_type === 'company' ? (
                                                            <Building2 size={24} />
                                                        ) : (
                                                            <User size={24} />
                                                        )}
                                                    </div>
                                                    <div>
                                                        <h3 className="font-medium text-gray-900">{user.name}</h3>
                                                        <p className="text-sm text-gray-500 capitalize">
                                                            {user.user_type === 'company' ? 'Company' : 'Job Seeker'}
                                                            {user.profile && user.user_type === 'company' && ` • ${user.profile.industry}`}
                                                        </p>
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={() => startConversation(user.id)}
                                                    className="inline-flex items-center px-4 py-2 bg-[#4640DE] text-white rounded-lg hover:bg-[#3530A8] transition-colors duration-200"
                                                >
                                                    <MessageSquare className="h-5 w-5 mr-2" />
                                                    Message
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="p-8 text-center">
                                    <User className="mx-auto h-12 w-12 text-gray-400" />
                                    <h3 className="mt-2 text-sm font-medium text-gray-900">No users found</h3>
                                    <p className="mt-1 text-sm text-gray-500">
                                        Try adjusting your search terms
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