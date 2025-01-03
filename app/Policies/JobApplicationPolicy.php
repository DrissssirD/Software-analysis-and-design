<?php

namespace App\Policies;

use App\Models\JobApplication;
use App\Models\User;
use Illuminate\Support\Facades\Log;
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
    Log::info('Checking updateStatus permission', [
        'user_id' => $user->id,
        'user_type' => $user->user_type,
        'application_id' => $application->id
    ]);

    // Only company users can update status
    if ($user->user_type !== 'company') {
        Log::warning('User type check failed for updateStatus', [
            'user_id' => $user->id,
            'user_type' => $user->user_type
        ]);
        return false;
    }
    
    // Verify the application belongs to a job post from this company
    $hasPermission = $user->companyProfile->id === $application->jobPost->company_profile_id;
    
    Log::info('Permission check result for updateStatus', [
        'user_id' => $user->id,
        'has_permission' => $hasPermission
    ]);
    
    return $hasPermission;
}
}