<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Message extends Model
{
    protected $fillable = [
        'conversation_id',
        'sender_id',
        'content',
        'attachment_path',
        'attachment_type',
        'read_at'
    ];

    protected $casts = [
        'read_at' => 'datetime'
    ];

    
    protected $appends = ['formatted_created_at'];

    public function getFormattedCreatedAtAttribute()
    {
        return $this->created_at->diffForHumans();
    }
    public function conversation(): BelongsTo
    {
        return $this->belongsTo(Conversation::class);
    }

    public function sender(): BelongsTo
    {
        return $this->belongsTo(User::class, 'sender_id');
    }

    public function reactions(): HasMany
    {
        return $this->hasMany(MessageReaction::class);
    }

    // Helper method to check if message is read
    public function isRead(): bool
    {
        return $this->read_at !== null;
    }

    // Helper method to check if message has attachment
    public function hasAttachment(): bool
    {
        return $this->attachment_path !== null;
    }

    // Helper method to mark message as read
    public function markAsRead()
    {
        if (!$this->read_at) {
            $this->update(['read_at' => now()]);
        }
    }
}