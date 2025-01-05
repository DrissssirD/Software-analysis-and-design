<?php

namespace App\Http\Controllers;

use App\Models\Conversation;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Log;

class ConversationController extends Controller
{
    public function index(): Response
    {
        $user = Auth::user();
        
        // Make sure we have a User instance
        if (!$user instanceof User) {
            $user = User::find($user->id);
        }
        
        $conversations = Conversation::where(function ($query) use ($user) {
            $query->where('sender_id', $user->id)
                  ->orWhere('receiver_id', $user->id);
        })
        ->with(['sender', 'receiver', 'lastMessage'])
        ->latest('last_message_at')
        ->get()
        ->map(function ($conversation) use ($user) {
            $otherUser = $conversation->otherUser($user);
            return [
                'id' => $conversation->id,
                'other_user' => [
                    'id' => $otherUser->id,
                    'name' => $otherUser->name,
                    'user_type' => $otherUser->user_type,
                ],
                'last_message' => $conversation->lastMessage,
                'unread_count' => $conversation->unreadCount($user)
            ];
        });

        return Inertia::render('Messages/Index', [
            'conversations' => $conversations
        ]);
    }


    public function show(Conversation $conversation): Response
    {
        // Authorization check
        if (!$this->canAccessConversation($conversation)) {
            abort(403);
        }

        $conversation->load(['messages.sender', 'messages.reactions']);
        $otherUser = $conversation->otherUser(Auth::user());

        // Mark all messages as read
        $conversation->messages()
            ->where('sender_id', '!=', Auth::id())
            ->whereNull('read_at')
            ->update(['read_at' => now()]);

        return Inertia::render('Messages/Show', [
            'conversation' => [
                'id' => $conversation->id,
                'other_user' => [
                    'id' => $otherUser->id,
                    'name' => $otherUser->name,
                    'user_type' => $otherUser->user_type,
                ],
                'messages' => $conversation->messages->map(function ($message) {
                    return [
                        'id' => $message->id,
                        'content' => $message->content,
                        'sender_id' => $message->sender_id,
                        'created_at' => $message->created_at,
                        'is_read' => $message->isRead(),
                        'attachment' => $message->hasAttachment() ? [
                            'path' => $message->attachment_path,
                            'type' => $message->attachment_type,
                        ] : null,
                        'reactions' => $message->reactions->map(function ($reaction) {
                            return [
                                'id' => $reaction->id,
                                'type' => $reaction->reaction_type,
                                'user_id' => $reaction->user_id,
                            ];
                        }),
                    ];
                }),
            ],
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'receiver_id' => 'required|exists:users,id',
        ]);

        try {
            // Check if conversation already exists
            $conversation = Conversation::where(function ($query) use ($validated) {
                $query->where('sender_id', Auth::id())
                      ->where('receiver_id', $validated['receiver_id']);
            })->orWhere(function ($query) use ($validated) {
                $query->where('sender_id', $validated['receiver_id'])
                      ->where('receiver_id', Auth::id());
            })->first();

            if (!$conversation) {
                $conversation = Conversation::create([
                    'sender_id' => Auth::id(),
                    'receiver_id' => $validated['receiver_id'],
                    'last_message_at' => now(),
                ]);
            }

            return redirect()->route('messages.show', $conversation->id);
        } catch (\Exception $e) {
            Log::error('Conversation creation failed: ' . $e->getMessage());
            return back()->with('error', 'Failed to create conversation');
        }
    }

    private function canAccessConversation(Conversation $conversation): bool
    {
        return $conversation->sender_id === Auth::id() || 
               $conversation->receiver_id === Auth::id();
    }
}