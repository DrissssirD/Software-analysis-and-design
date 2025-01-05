import React from 'react';
import { Head } from '@inertiajs/react';
import Sidebar from '@/Components/Sidebar/Sidebar';
import { Link } from '@inertiajs/react';
import { formatDistanceToNow } from 'date-fns';
import { MessageCircle, Circle, PenSquare } from 'lucide-react';

export default function Index({ auth, conversations }) {
    return (
        <>
            <Head title="Messages" />
            <div className="flex min-h-screen">
                <Sidebar userType={auth.user.user_type} />
                
                <div className="flex-1 bg-white">
                    <div className="max-w-3xl mx-auto px-4 py-8">
                        <div className="flex items-center justify-between mb-6">
                            <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
                            <Link
                                href={route('messages.new')}
                                className="inline-flex items-center px-4 py-2 bg-[#4640DE] text-white rounded-lg hover:bg-[#3530A8] transition-colors duration-200"
                            >
                                <PenSquare className="w-5 h-5 mr-2" />
                                New Message
                            </Link>
                        </div>

                        <div className="bg-white rounded-lg shadow">
                            {conversations?.length > 0 ? (
                                <div className="divide-y divide-gray-200">
                                    {conversations.map((conversation) => (
                                        <Link
                                            key={conversation.id}
                                            href={route('messages.show', conversation.id)}
                                            className="flex items-center p-4 hover:bg-gray-50 transition-colors"
                                        >
                                            <div className="relative">
                                                {/* User Avatar or Default Icon */}
                                                <div className="w-12 h-12 bg-[#4640DE] text-white rounded-full flex items-center justify-center">
                                                    {conversation.other_user.name.charAt(0)}
                                                </div>
                                                
                                                {/* Online Status Indicator */}
                                                <Circle 
                                                    className="absolute bottom-0 right-0 w-3 h-3 text-green-500 fill-current" 
                                                />
                                            </div>

                                            <div className="ml-4 flex-1">
                                                <div className="flex items-center justify-between">
                                                    <h2 className="text-sm font-medium text-gray-900">
                                                        {conversation.other_user.name}
                                                    </h2>
                                                    {conversation.last_message && (
                                                        <span className="text-xs text-gray-500">
                                                            {formatDistanceToNow(new Date(conversation.last_message.created_at), { addSuffix: true })}
                                                        </span>
                                                    )}
                                                </div>

                                                <div className="flex items-center justify-between mt-1">
                                                    <p className="text-sm text-gray-600 truncate w-48">
                                                        {conversation.last_message 
                                                            ? conversation.last_message.content 
                                                            : 'Start a conversation'}
                                                    </p>
                                                    {conversation.unread_count > 0 && (
                                                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#4640DE] text-white text-xs">
                                                            {conversation.unread_count}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <div className="p-8 text-center">
                                    <MessageCircle className="mx-auto h-12 w-12 text-gray-400" />
                                    <h3 className="mt-2 text-sm font-medium text-gray-900">No messages</h3>
                                    <p className="mt-1 text-sm text-gray-500">
                                        Get started by messaging someone!
                                    </p>
                                    <Link
                                        href={route('messages.new')}
                                        className="inline-flex items-center px-4 py-2 bg-[#4640DE] text-white rounded-lg hover:bg-[#3530A8] transition-colors duration-200 mt-4"
                                    >
                                        <PenSquare className="w-5 h-5 mr-2" />
                                        Start a New Conversation
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}