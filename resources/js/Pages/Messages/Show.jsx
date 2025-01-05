import React, { useState, useRef, useEffect } from 'react';
import { Head } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import Sidebar from '@/Components/Sidebar/Sidebar';
import { formatDistanceToNow } from 'date-fns';
import { Paperclip, Send, Smile, ArrowLeft, MoreVertical } from 'lucide-react';

export default function Show({ auth, conversation }) {
    const [newMessage, setNewMessage] = useState('');
    const [attachment, setAttachment] = useState(null);
    const messageEndRef = useRef(null);
    const fileInputRef = useRef(null);

    const scrollToBottom = () => {
        messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [conversation.messages]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newMessage.trim() && !attachment) return;

        const formData = new FormData();
        if (newMessage.trim()) {
            formData.append('content', newMessage.trim());
        }
        if (attachment) {
            formData.append('attachment', attachment);
        }

        try {
            await axios.post(route('messages.store', conversation.id), formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            setNewMessage('');
            setAttachment(null);
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    const MessageBubble = ({ message, isOwn }) => (
        <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'} mb-4`}>
            <div className={`max-w-[70%] ${isOwn ? 'order-2' : 'order-1'}`}>
                <div className={`flex flex-col ${isOwn ? 'items-end' : 'items-start'}`}>
                    <div className={`rounded-lg px-4 py-2 ${
                        isOwn 
                            ? 'bg-[#4640DE] text-white' 
                            : 'bg-gray-100 text-gray-900'
                    }`}>
                        {message.content}
                        
                        {/* Attachment preview if exists */}
                        {message.attachment && (
                            <div className="mt-2">
                                {message.attachment.type.startsWith('image/') ? (
                                    <img 
                                        src={`/storage/${message.attachment.path}`}
                                        alt="attachment"
                                        className="max-w-xs rounded"
                                    />
                                ) : (
                                    <a 
                                        href={`/storage/${message.attachment.path}`}
                                        className="text-sm underline"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        View attachment
                                    </a>
                                )}
                            </div>
                        )}
                    </div>
                    
                    <div className={`text-xs text-gray-500 mt-1 ${isOwn ? 'text-right' : 'text-left'}`}>
                        {formatDistanceToNow(new Date(message.created_at), { addSuffix: true })}
                        {isOwn && message.is_read && (
                            <span className="ml-2 text-blue-500">✓✓</span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <>
            <Head title={`Chat with ${conversation.other_user.name}`} />
            <div className="flex min-h-screen">
                <Sidebar userType={auth.user.user_type} />
                
                <div className="flex-1 bg-white">
                    <div className="h-screen flex flex-col">
                        {/* Chat Header */}
                        <div className="border-b px-4 py-3 flex items-center justify-between bg-white">
                            <div className="flex items-center gap-3">
                                <Link 
                                    href={route('messages.index')} 
                                    className="text-gray-600 hover:text-gray-900"
                                >
                                    <ArrowLeft className="w-6 h-6" />
                                </Link>
                                <div>
                                    <h2 className="font-semibold text-gray-900">
                                        {conversation.other_user.name}
                                    </h2>
                                    <p className="text-sm text-gray-500">
                                        {conversation.other_user.user_type === 'company' ? 'Company' : 'Job Seeker'}
                                    </p>
                                </div>
                            </div>
                            <button className="text-gray-600 hover:text-gray-900">
                                <MoreVertical className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto px-4 py-6">
                            {conversation.messages.map((message) => (
                                <MessageBubble 
                                    key={message.id}
                                    message={message}
                                    isOwn={message.sender_id === auth.user.id}
                                />
                            ))}
                            <div ref={messageEndRef} />
                        </div>

                        {/* Message Input */}
                        <div className="border-t px-4 py-3 bg-white">
                            <form onSubmit={handleSubmit} className="flex items-center gap-2">
                                <button
                                    type="button"
                                    onClick={() => fileInputRef.current?.click()}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    <Paperclip className="w-6 h-6" />
                                </button>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    className="hidden"
                                    onChange={(e) => setAttachment(e.target.files[0])}
                                />
                                <input
                                    type="text"
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    placeholder="Type a message..."
                                    className="flex-1 border-0 focus:ring-0 focus:outline-none"
                                />
                                <button
                                    type="button"
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    <Smile className="w-6 h-6" />
                                </button>
                                <button
                                    type="submit"
                                    disabled={!newMessage.trim() && !attachment}
                                    className={`rounded-full p-2 ${
                                        !newMessage.trim() && !attachment
                                            ? 'bg-gray-100 text-gray-400'
                                            : 'bg-[#4640DE] text-white hover:bg-[#3530A8]'
                                    }`}
                                >
                                    <Send className="w-5 h-5" />
                                </button>
                            </form>
                            
                            {/* Attachment Preview */}
                            {attachment && (
                                <div className="mt-2 flex items-center gap-2">
                                    <span className="text-sm text-gray-600">
                                        {attachment.name}
                                    </span>
                                    <button
                                        type="button"
                                        onClick={() => setAttachment(null)}
                                        className="text-red-500 text-sm hover:text-red-700"
                                    >
                                        Remove
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}