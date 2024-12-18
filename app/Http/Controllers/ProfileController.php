<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Models\CompanyProfile;
use App\Models\JobSeekerProfile;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        $user = $request->user();
        
        // Get or create the appropriate profile based on user type
        if ($user->user_type === 'company') {
            $profile = $user->companyProfile ?? CompanyProfile::create([
                'user_id' => $user->id,
                'company_name' => '',
                'industry' => '',
                'location' => ''
            ]);
        } else {
            $profile = $user->jobSeekerProfile ?? JobSeekerProfile::create([
                'user_id' => $user->id,
                'title' => '',
                'experience_years' => 0,
                'education_level' => '',
                'skills' => []
            ]);
        }

        // Load the relationship to ensure it's available
        $user->load($user->user_type === 'company' ? 'companyProfile' : 'jobSeekerProfile');

        return Inertia::render(
            $user->user_type === 'company' ? 'Profile/CompanyProfile' : 'Profile/JobSeekerProfile',
            [
                'mustVerifyEmail' => $user instanceof MustVerifyEmail,
                'status' => session('status'),
                'profile' => $profile
            ]
        );
    }

    /**
     * Update the user's profile information.
     */
    public function update(Request $request): RedirectResponse
    {
        $user = $request->user();

        try {
            if ($user->user_type === 'company') {
                $this->updateCompanyProfile($request, $user);
            } else {
                $this->updateJobSeekerProfile($request, $user);
            }

            return Redirect::route('profile.edit')->with('success', 'Profile updated successfully');
        } catch (\Exception $e) {
            return Redirect::route('profile.edit')->with('error', 'Failed to update profile: ' . $e->getMessage());
        }
    }

    /**
     * Update company profile information.
     */
    private function updateCompanyProfile(Request $request, $user): void
    {
        $validated = $request->validate([
            'company_name' => ['required', 'string', 'max:255'],
            'industry' => ['required', 'string', 'max:255'],
            'company_size' => ['nullable', 'string'],
            'founded_year' => ['nullable', 'integer', 'min:1800', 'max:' . date('Y')],
            'website' => ['nullable', 'url'],
            'location' => ['required', 'string', 'max:255'],
            'about' => ['nullable', 'string'],
        ]);

        $profile = $user->companyProfile;
        if (!$profile) {
            $profile = new CompanyProfile();
            $profile->user_id = $user->id;
        }

        $profile->fill($validated);
        $profile->save();

        // Refresh the relationship
        $user->load('companyProfile');
    }

    /**
     * Update job seeker profile information.
     */
    private function updateJobSeekerProfile(Request $request, $user): void
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'experience_years' => ['required', 'integer', 'min:0'],
            'education_level' => ['required', 'string'],
            'skills' => ['required', 'string'],
            'bio' => ['nullable', 'string'],
            'linkedin_url' => ['nullable', 'url'],
        ]);

        // Convert comma-separated skills to array
        $validated['skills'] = array_map('trim', explode(',', $validated['skills']));

        $profile = $user->jobSeekerProfile;
        if (!$profile) {
            $profile = new JobSeekerProfile();
            $profile->user_id = $user->id;
        }

        $profile->fill($validated);
        $profile->save();

        // Refresh the relationship
        $user->load('jobSeekerProfile');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}