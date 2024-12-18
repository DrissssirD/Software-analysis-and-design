<?php

namespace App\Policies;

use App\Models\JobApplication;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class JobApplicationPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return true;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, JobApplication $application): bool
    {
        if ($user->user_type === 'company') {
            return $user->companyProfile->id === $application->jobPost->company_profile_id;
        }
        
        return $user->jobSeekerProfile->id === $application->job_seeker_profile_id;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return $user->user_type === 'jobSeeker';
    }

    /**
     * Determine whether the user can update status.
     */
    public function updateStatus(User $user, JobApplication $application): bool
    {
        if ($user->user_type !== 'company') {
            return false;
        }
        
        return $user->companyProfile->id === $application->jobPost->company_profile_id;
    }
}