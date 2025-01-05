<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\HasMany;
use App\Models\Conversation;
use App\Models\Message;
use App\Models\MessageReaction;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'user_type',
        'google_id',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    /**
     * Get the company profile associated with the user.
     */
    public function companyProfile(): HasOne
    {
        return $this->hasOne(CompanyProfile::class);
    }

    /**
     * Get the job seeker profile associated with the user.
     */
    public function jobSeekerProfile(): HasOne
    {
        return $this->hasOne(JobSeekerProfile::class);
    }

    /**
     * Get the appropriate profile based on user type.
     */
    public function getProfileAttribute()
    {
        return $this->user_type === 'company' 
            ? $this->companyProfile
            : $this->jobSeekerProfile;
    }
    // In App\Models\User.php

public function conversations()
{
    return $this->hasMany(Conversation::class, 'sender_id')
        ->orWhere('receiver_id', $this->id);
}

public function messages()
{
    return $this->hasMany(Message::class, 'sender_id');
}

public function messageReactions()
{
    return $this->hasMany(MessageReaction::class);
}

// Helper method to get all conversations for the user
public function getAllConversations()
{
    return Conversation::where('sender_id', $this->id)
        ->orWhere('receiver_id', $this->id)
        ->with(['sender', 'receiver', 'lastMessage'])
        ->latest('last_message_at')
        ->get();
}
}