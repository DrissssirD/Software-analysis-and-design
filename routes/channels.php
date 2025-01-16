<?php

use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('conversation.{id}', function ($user, $id) {
    $conversation = App\Models\Conversation::find($id);
    return $conversation && ($conversation->sender_id === $user->id || $conversation->receiver_id === $user->id);
});