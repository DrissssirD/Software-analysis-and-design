<?php

namespace App\Http\Controllers;

use App\Models\JobApplication;
use App\Models\JobPost;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;

class JobApplicationController extends Controller
{
    public function index(): Response
    {
        $user = Auth::user();
        $applications = [];

        if ($user->user_type === 'company') {
            // For companies, get applications for their job posts
            $applications = JobApplication::whereHas('jobPost', function ($query) use ($user) {
                $query->where('company_profile_id', $user->companyProfile->id);
            })->with(['jobPost', 'jobSeekerProfile'])->latest()->paginate(10);
        } else {
            // For job seekers, get their applications
            $applications = JobApplication::where('job_seeker_profile_id', $user->jobSeekerProfile->id)
                ->with(['jobPost.companyProfile'])
                ->latest()
                ->paginate(10);
        }

        return Inertia::render('Applications/Index', [
            'applications' => $applications
        ]);
    }

    public function store(Request $request, JobPost $jobPost): RedirectResponse
    {
        $user = Auth::user();
        
        // Verify user is a job seeker
        if ($user->user_type !== 'jobSeeker') {
            abort(403, 'Only job seekers can apply for jobs');
        }

        // Check if already applied
        $existingApplication = JobApplication::where('job_post_id', $jobPost->id)
            ->where('job_seeker_profile_id', $user->jobSeekerProfile->id)
            ->exists();

        if ($existingApplication) {
            return back()->with('error', 'You have already applied for this job');
        }

        $validated = $request->validate([
            'cover_letter' => 'nullable|string',
            'resume_path' => 'required|string', // Assuming the file is already uploaded
        ]);

        JobApplication::create([
            'job_post_id' => $jobPost->id,
            'job_seeker_profile_id' => $user->jobSeekerProfile->id,
            'cover_letter' => $validated['cover_letter'],
            'resume_path' => $validated['resume_path'],
            'status' => 'pending',
            'applied_at' => now(),
        ]);

        return redirect()->route('jobseeker.applications')
            ->with('success', 'Application submitted successfully!');
    }

    public function show(JobApplication $application): Response
    {
        $this->authorize('view', $application);

        $application->load(['jobPost', 'jobSeekerProfile']);

        return Inertia::render('Applications/Show', [
            'application' => $application
        ]);
    }

    public function updateStatus(Request $request, JobApplication $application): RedirectResponse
    {
        $this->authorize('updateStatus', $application);

        $validated = $request->validate([
            'status' => 'required|string|in:pending,reviewed,accepted,rejected'
        ]);

        $application->update($validated);

        return back()->with('success', 'Application status updated successfully!');
    }
}