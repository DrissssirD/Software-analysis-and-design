<?php

namespace App\Http\Controllers;

use App\Models\Message;
use App\Models\MessageReaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MessageReactionController extends Controller
{
    public function store(Request $request, Message $message)
    {
        $validated = $request->validate([
            'reaction_type' => 'required|string|max:50',
        ]);

        // Check if user already reacted to this message
        $existingReaction = MessageReaction::where('message_id', $message->id)
            ->where('user_id', Auth::id())
            ->first();

        if ($existingReaction) {
            // If same reaction, remove it. If different, update it.
            if ($existingReaction->reaction_type === $validated['reaction_type']) {
                $existingReaction->delete();
                return response()->json(['status' => 'reaction_removed']);
            } else {
                $existingReaction->update(['reaction_type' => $validated['reaction_type']]);
                return response()->json(['reaction' => $existingReaction]);
            }
        }

        // Create new reaction
        $reaction = MessageReaction::create([
            'message_id' => $message->id,
            'user_id' => Auth::id(),
            'reaction_type' => $validated['reaction_type'],
        ]);

        return response()->json(['reaction' => $reaction]);
    }

    public function destroy(Message $message)
    {
        MessageReaction::where('message_id', $message->id)
            ->where('user_id', Auth::id())
            ->delete();

        return response()->json(['status' => 'reaction_removed']);
    }
}