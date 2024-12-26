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

class JobPostController extends Controller
{
    public function __construct()
    {
        // Ensure user is a company for all methods except index
        $this->middleware(function ($request, $next) {
            if (Auth::user()->user_type !== 'company') {
                abort(403, 'Only companies can manage job posts.');
            }
            return $next($request);
        })->except(['index', 'show']);
    }

    /**
     * Display a listing of job posts.
     */
    
    /*
     public function index(): Response
     {
         $user = Auth::user();
         Log::info('Index accessed by:', ['user_id' => $user->id, 'type' => $user->user_type]);
     
         $query = JobPost::with('companyProfile');
         $posts = $query->latest()->get();
         Log::info('Posts retrieved:', ['count' => $posts->count()]);
     
         return Inertia::render('Jobs/Index', [
             'posts' => [
                 'data' => $posts
             ],
             'auth' => [
                 'user' => $user
             ]
         ]);
     }*/


     public function index(): Response
{
    $user = Auth::user();
    
    $query = JobPost::with(['companyProfile' => function($query) {
        $query->select('id', 'company_name', 'industry', 'location');
    }]);

    if ($user->user_type === 'company') {
        $query->where('company_profile_id', $user->companyProfile->id);
    }

    $posts = $query->latest()->paginate(10);

    return Inertia::render('Jobs/Index', [
        'posts' => $posts,
        'auth' => [
            'user' => $user
        ]
    ]);
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
    public function show(JobPost $jobPost): Response
{
    // Eager load relationships
    $jobPost->load(['companyProfile' => function($query) {
        $query->select('id', 'company_name', 'industry', 'location', 'website', 'company_size');
    }]);

    // For companies, also load application count
    if (Auth::check() && Auth::user()->user_type === 'company') {
        $jobPost->loadCount('applications');
    }

    return Inertia::render('Jobs/Show', [
        'job' => $jobPost,
        'canApply' => Auth::check() && Auth::user()->user_type === 'jobSeeker',
        'hasApplied' => Auth::check() && Auth::user()->user_type === 'jobSeeker' ? 
            $jobPost->applications()
                ->where('job_seeker_profile_id', Auth::user()->jobSeekerProfile->id)
                ->exists() : false
    ]);
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

        return redirect()->route('company.jobs')
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

        return redirect()->route('company.jobs')
            ->with('success', 'Job deleted successfully!');
    }
}