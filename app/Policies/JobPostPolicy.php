<?php

namespace App\Policies;

use App\Models\JobPost;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class JobPostPolicy
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
    public function view(User $user, JobPost $jobPost): bool
    {
        return true; // Anyone can view job posts
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return $user->user_type === 'company';
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, JobPost $jobPost): bool
    {
        if ($user->user_type !== 'company') {
            return false;
        }
        
        return $user->companyProfile->id === $jobPost->company_profile_id;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, JobPost $jobPost): bool
    {
        if ($user->user_type !== 'company') {
            return false;
        }
        
        return $user->companyProfile->id === $jobPost->company_profile_id;
    }
}