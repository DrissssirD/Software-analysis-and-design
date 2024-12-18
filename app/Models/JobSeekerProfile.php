<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class JobSeekerProfile extends Model
{
    protected $fillable = [
        'user_id',
        'title',
        'experience_years',
        'education_level',
        'skills',
        'bio',
        'resume_path',
        'avatar_path',
        'linkedin_url'
    ];

    protected $casts = [
        'skills' => 'array'
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function applications(): HasMany
    {
        return $this->hasMany(JobApplication::class);
    }
}

