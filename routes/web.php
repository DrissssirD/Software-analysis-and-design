<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;


// Landing Page
Route::get('/', function () {
    return Inertia::render('LandingPage');
})->name('home');

// Jobs Listing
Route::get('/jobs', function () {
    return Inertia::render('Jobs/Index');
})->name('jobs.index');

// Auth & Protected Routes
Route::middleware(['auth', 'verified'])->group(function () {
    // Dashboards
    Route::get('/company/dashboard', function () {
        return Inertia::render('Dashboard/Company/Dashboard');
    })->name('company.dashboard');

    Route::get('/jobseeker/dashboard', function () {
        return Inertia::render('Dashboard/JobSeeker/Dashboard');
    })->name('jobseeker.dashboard');

    // Main dashboard router
    Route::get('/dashboard', function () {
        if (Auth::user()->user_type === 'company') {
            return redirect()->route('company.dashboard');
        }
        return redirect()->route('jobseeker.dashboard');
    })->name('dashboard');

    // Other routes
    Route::get('/jobs/create', function () {
        return Inertia::render('Jobs/Create');
    })->name('jobs.create');

    Route::get('/applications', function () {
        return Inertia::render('Applications/Index');
    })->name('applications.index');

    Route::get('/messages', function () {
        return Inertia::render('Messages/Index');
    })->name('messages.index');

    // Profile routes
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';