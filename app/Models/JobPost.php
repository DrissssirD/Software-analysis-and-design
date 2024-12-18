<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class JobPost extends Model
{
    protected $fillable = [
        'company_profile_id',
        'title',
        'description',
        'requirements',
        'location',
        'salary_range',
        'employment_type',
        'experience_level',
        'skills_required',
        'deadline',
        'status'
    ];

    protected $casts = [
        'skills_required' => 'array',
        'deadline' => 'datetime',
    ];

    public function companyProfile(): BelongsTo
    {
        return $this->belongsTo(CompanyProfile::class);
    }

    public function applications(): HasMany
    {
        return $this->hasMany(JobApplication::class);
    }
}