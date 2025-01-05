<?php

namespace App\Http\Controllers;

use App\Models\Message;
use App\Models\Conversation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class MessageController extends Controller
{
    public function store(Request $request, Conversation $conversation)
    {
        // Validate the request
        $validated = $request->validate([
            'content' => 'required_without:attachment|string',
            'attachment' => 'nullable|file|max:5120', // 5MB max
        ]);

        // Check if user is part of the conversation
        if (!$this->canAccessConversation($conversation)) {
            abort(403);
        }

        // Handle file attachment if present
        $attachmentPath = null;
        $attachmentType = null;
        if ($request->hasFile('attachment')) {
            $attachmentPath = $request->file('attachment')->store('attachments', 'public');
            $attachmentType = $request->file('attachment')->getMimeType();
        }

        // Create message
        $message = Message::create([
            'conversation_id' => $conversation->id,
            'sender_id' => Auth::id(),
            'content' => $validated['content'] ?? '',
            'attachment_path' => $attachmentPath,
            'attachment_type' => $attachmentType,
        ]);

        // Update conversation's last_message_at
        $conversation->update(['last_message_at' => now()]);

        return response()->json([
            'message' => $message->load('sender'),
        ]);
    }

    public function markAsRead(Message $message)
    {
        // Check if user can access this message
        if (!$this->canAccessMessage($message)) {
            abort(403);
        }

        $message->markAsRead();

        return response()->json(['success' => true]);
    }

    private function canAccessConversation(Conversation $conversation): bool
    {
        return $conversation->sender_id === Auth::id() || 
               $conversation->receiver_id === Auth::id();
    }

    private function canAccessMessage(Message $message): bool
    {
        return $this->canAccessConversation($message->conversation);
    }
}