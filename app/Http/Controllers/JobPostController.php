<?php

namespace App\Http\Controllers;

use App\Models\JobPost;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;

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
        })->except(['index']);
    }

    public function index(): Response
    {
        $user = Auth::user();
        $query = JobPost::with('companyProfile');

        if ($user->user_type === 'company') {
            $query->where('company_profile_id', $user->companyProfile->id);
        }

        $posts = $query->latest()->paginate(10);

        return Inertia::render('Jobs/Index', [
            'posts' => $posts
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Jobs/Create');
    }

    public function store(Request $request): RedirectResponse
    {
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

        $user = Auth::user();
        $validated['company_profile_id'] = $user->companyProfile->id;
        $validated['status'] = 'open';

        JobPost::create($validated);

        return redirect()->route('company.jobs')->with('success', 'Job posted successfully!');
    }

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

        return redirect()->route('company.jobs')->with('success', 'Job updated successfully!');
    }

    public function destroy(JobPost $jobPost): RedirectResponse
    {
        // Check if the logged-in company owns this job post
        if ($jobPost->company_profile_id !== Auth::user()->companyProfile->id) {
            abort(403, 'Unauthorized access to job post.');
        }
        
        $jobPost->delete();

        return redirect()->route('company.jobs')->with('success', 'Job deleted successfully!');
    }
}