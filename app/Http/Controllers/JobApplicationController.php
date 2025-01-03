<?php

namespace App\Http\Controllers;

use App\Models\JobApplication;
use App\Models\JobPost;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException; 

class JobApplicationController extends Controller
{
    public function index(): Response
{
    $user = Auth::user();
    
    try {
        if ($user->user_type === 'company') {
            // For companies, get applications for their job posts
            $applications = JobApplication::whereHas('jobPost', function ($query) use ($user) {
                $query->where('company_profile_id', $user->companyProfile->id);
            })
            ->with(['jobPost', 'jobSeekerProfile.user'])
            ->latest()
            ->paginate(10);
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
    } catch (\Exception $e) {
        Log::error('Error fetching applications: ' . $e->getMessage());
        return Inertia::render('Applications/Index', [
            'applications' => ['data' => []]
        ]);
    }
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

    // Validate the request
    $validated = $request->validate([
        'cover_letter' => 'nullable|string|max:5000',
        'resume' => 'required|file|mimes:pdf,doc,docx|max:5120', // 5MB max
    ]);

    try {
        // Handle resume upload
        $resumePath = $request->file('resume')->store('resumes', 'public');

        // Create the application
        JobApplication::create([
            'job_post_id' => $jobPost->id,
            'job_seeker_profile_id' => $user->jobSeekerProfile->id,
            'cover_letter' => $validated['cover_letter'],
            'resume_path' => $resumePath,
            'status' => 'pending',
            'applied_at' => now(),
        ]);

        return redirect()->route('applications.index')
            ->with('success', 'Application submitted successfully!');
    } catch (\Exception $e) {
        return back()->with('error', 'Failed to submit application. Please try again.');
    }
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
    try {
        // Log the entire request for debugging
        Log::info('Raw request data:', [
            'all' => $request->all(),
            'input' => $request->input(),
            'json' => $request->json()->all()
        ]);

        $validated = $request->validate([
            'status' => 'required|string|in:pending,reviewed,accepted,rejected',
            'feedback' => 'nullable|string|max:1000'
        ]);

        $application->update([
            'status' => $validated['status'],
            'feedback' => $validated['feedback'],
            'reviewed_at' => now(),
            'reviewed_by' => Auth::id()
        ]);

        Log::info('Application updated successfully', [
            'application_id' => $application->id,
            'new_status' => $validated['status']
        ]);

        return back()->with('success', 'Application status updated');

    } catch (ValidationException $e) {
        Log::error('Validation failed', [
            'errors' => $e->errors(),
            'application_id' => $application->id
        ]);
        throw $e;
    } catch (\Exception $e) {
        Log::error('Update failed', [
            'message' => $e->getMessage(),
            'application_id' => $application->id
        ]);
        throw $e;
    }
}
public function viewResume(JobApplication $application)
{
    $this->authorize('view', $application);

    try {
        $filePath = storage_path('app/public/' . $application->resume_path);
        
        if (!file_exists($filePath)) {
            return back()->with('error', 'Resume file not found.');
        }

        // Log resume view
        Log::info('Resume viewed', [
            'application_id' => $application->id,
            'viewed_by' => Auth::id(),
            'company_id' => Auth::user()->companyProfile->id
        ]);

        return response()->file($filePath);
    } catch (\Exception $e) {
        Log::error('Failed to view resume: ' . $e->getMessage());
        return back()->with('error', 'Failed to view resume. Please try again.');
    }
}

}