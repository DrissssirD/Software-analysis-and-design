<?php

namespace App\Http\Controllers;

use App\Models\JobPost;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;
use App\Http\Middleware\CheckUserType;

class JobPostController extends Controller
{
    public function __construct()
    {
        $this->middleware(function ($request, $next) {
            if (Auth::user()->user_type !== 'company') {
                abort(403, 'Only companies can manage job posts.');
            }
            return $next($request);
        })->except(['index', 'show']);}

    public function index(): Response
    {
        try {
            $user = Auth::user();
            Log::info('User accessing jobs index:', ['user_type' => $user->user_type]);
            
            $query = JobPost::with(['companyProfile' => function($query) {
                $query->select('id', 'company_name', 'industry', 'location');
            }]);

            // If company user, only show their posts
            if ($user->user_type === 'company') {
                $query->where('company_profile_id', $user->companyProfile->id);
                Log::info('Filtering for company:', ['company_id' => $user->companyProfile->id]);
            }

            $posts = $query->latest()->paginate(10);

            return Inertia::render('Jobs/Index', [
                'posts' => $posts,
                'auth' => [
                    'user' => $user
                ],
                'isCompany' => $user->user_type === 'company'
            ]);
        } catch (\Exception $e) {
            Log::error('Error in jobs index:', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            throw $e;
        }
    }
  /**
     * Show the form for creating a new job post.
     */
    public function create(): Response
    {
        return Inertia::render('Jobs/Create');
    }

    /**
     * Store a newly created job post.
     */
    public function store(Request $request): RedirectResponse
{
    try {
        $user = Auth::user();
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'requirements' => 'required|string',
            'location' => 'required|string|max:255',
            'salary_range' => 'nullable|string|max:255',
            'employment_type' => 'required|string|in:full-time,part-time,contract',
            'experience_level' => 'required|string|in:entry,mid,senior',
            'skills_required' => 'required|array',
            'deadline' => 'required|date|after:today',
        ]);

        $jobPost = JobPost::create([
            'company_profile_id' => $user->companyProfile->id,
            'title' => $validated['title'],
            'description' => $validated['description'],
            'requirements' => $validated['requirements'],
            'location' => $validated['location'],
            'salary_range' => $validated['salary_range'],
            'employment_type' => $validated['employment_type'],
            'experience_level' => $validated['experience_level'],
            'skills_required' => $validated['skills_required'],
            'deadline' => $validated['deadline'],
            'status' => 'open'
        ]);

        Log::info('Created job post:', ['job' => $jobPost->toArray()]);

        return redirect()->route('jobs.index');
    } catch (\Exception $e) {
        Log::error('Error creating job:', ['error' => $e->getMessage()]);
        return back()->withErrors(['error' => $e->getMessage()]);
    }
}

    /**
     * Display the specified job post.
     */
    // In JobPostController.php, update the show method:
    public function show(JobPost $jobPost): Response
{
    try {
        $user = Auth::user();
        
        // Eager load relationships
        $jobPost->load(['companyProfile' => function($query) {
            $query->select('id', 'company_name', 'industry', 'location', 'website', 'company_size');
        }]);
        
        $jobPost->loadCount('applications');

        // Get the company profile directly
        $companyProfile = $user->companyProfile;

        Log::info('Job post show debug:', [
            'user_type' => $user->user_type,
            'user_company_id' => $companyProfile ? $companyProfile->id : null,
            'job_company_id' => $jobPost->company_profile_id,
            'matches' => $companyProfile && $companyProfile->id === $jobPost->company_profile_id
        ]);

        return Inertia::render('Jobs/Show', [
            'auth' => [
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'user_type' => $user->user_type,
                    'companyProfile' => $companyProfile
                ]
            ],
            'job' => $jobPost
        ]);
    } catch (\Exception $e) {
        Log::error('Error in show method:', [
            'error' => $e->getMessage(),
            'trace' => $e->getTraceAsString()
        ]);
        throw $e;
    }
}



    /**
     * Show the form for editing the job post.
     */
    public function edit(JobPost $jobPost): Response
    {
        // Check if the logged-in company owns this job post
        if ($jobPost->company_profile_id !== Auth::user()->companyProfile->id) {
            abort(403, 'Unauthorized access to job post.');
        }

        return Inertia::render('Jobs/Edit', [
            'jobPost' => $jobPost
        ]);
    }

    /**
     * Update the specified job post.
     */
    public function update(Request $request, JobPost $jobPost): RedirectResponse
    {
        // Check if the logged-in company owns this job post
        if ($jobPost->company_profile_id !== Auth::user()->companyProfile->id) {
            abort(403, 'Unauthorized access to job post.');
        }

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'requirements' => 'required|string',
            'location' => 'required|string|max:255',
            'salary_range' => 'nullable|string|max:255',
            'employment_type' => 'required|string|in:full-time,part-time,contract',
            'experience_level' => 'required|string|in:entry,mid,senior',
            'skills_required' => 'required|array',
            'deadline' => 'required|date|after:today',
            'status' => 'required|string|in:open,closed,draft'
        ]);

        $jobPost->update($validated);

        return redirect()->route('jobs.index')
            ->with('success', 'Job updated successfully!');
    }

    /**
     * Remove the specified job post.
     */
    public function destroy(JobPost $jobPost): RedirectResponse
    {
        // Check if the logged-in company owns this job post
        if ($jobPost->company_profile_id !== Auth::user()->companyProfile->id) {
            abort(403, 'Unauthorized access to job post.');
        }
        
        $jobPost->delete();

        return redirect()->route('jobs.index')
            ->with('success', 'Job deleted successfully!');
    }
}