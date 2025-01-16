<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Auth;
use App\Models\JobPost;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;
use App\Http\Middleware\CheckUserType;
use Symfony\Component\HttpFoundation\RedirectResponse;

class CompanyDashboardController extends Controller
{
    public function __construct()
    {
        $this->middleware(['auth', 'verified', CheckUserType::class . ':company']);
    }

    /**
     * @return Response|RedirectResponse
     */
    public function index()
    {
        try {
            Log::info('CompanyDashboardController accessed', [
                'user_id' => Auth::id(),
                'user_type' => Auth::user()->user_type,
                'authenticated' => Auth::check()
            ]);

            $user = Auth::user();
            
            if (!$user->companyProfile) {
                Log::error('Company profile not found for user', ['user_id' => $user->id]);
                return redirect()->route('profile.edit')
                    ->with('error', 'Please complete your company profile first.');
            }

            $companyProfileId = $user->companyProfile->id;

            $activeJobPosts = DB::table('job_posts')
                ->where('company_profile_id', $companyProfileId)
                ->where('status', 'open')
                ->where('deadline', '>', now())
                ->count();

            $totalJobs = DB::table('job_posts')
                ->where('company_profile_id', $companyProfileId)
                ->count();

            Log::info('Dashboard data retrieved', [
                'company_id' => $companyProfileId,
                'active_jobs' => $activeJobPosts,
                'total_jobs' => $totalJobs
            ]);

            return Inertia::render('Dashboard/Company/Dashboard', [
                'auth' => [
                    'user' => $user,
                    'company' => $user->companyProfile
                ],
                'stats' => [
                    'activeJobPosts' => $activeJobPosts,
                    'totalJobs' => $totalJobs,
                    'lastUpdated' => now()->toDateTimeString()
                ]
            ]);

        } catch (\Exception $e) {
            Log::error('Error in company dashboard:', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            if (request()->inertia()) {
                return Inertia::render('Error', [
                    'status' => 500,
                    'message' => 'Unable to load dashboard. Please try again later.'
                ]);
            }

            return redirect()->route('home')
                ->with('error', 'Unable to access dashboard. Please try again.');
        }
    }
}