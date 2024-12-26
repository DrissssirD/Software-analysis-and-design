<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\JobPostController;
use Inertia\Inertia;

// Public routes
Route::get('/', function () {
   return Inertia::render('LandingPage');
})->name('home');

// Auth routes
Route::middleware(['auth', 'verified'])->group(function () {
   // Jobs routes
   Route::controller(JobPostController::class)->group(function() {
       Route::get('/jobs', 'index')->name('jobs.index');
       Route::post('/jobs', 'store')->name('jobs.store');
       Route::get('/jobs/create', 'create')->name('jobs.create');
       Route::get('/jobs/{jobPost}', 'show')->name('jobs.show');
   });

   // Dashboard routes
   Route::get('/dashboard', function () {
       return Auth::user()->user_type === 'company' 
           ? redirect()->route('company.dashboard')
           : redirect()->route('jobseeker.dashboard');
   })->name('dashboard');

   Route::get('/company/dashboard', function () {
       return Inertia::render('Dashboard/Company/Dashboard');
   })->name('company.dashboard');

   Route::get('/jobseeker/dashboard', function () {
       return Inertia::render('Dashboard/JobSeeker/Dashboard');
   })->name('jobseeker.dashboard');

   // Profile routes
   Route::controller(ProfileController::class)->group(function() {
       Route::get('/profile', 'edit')->name('profile.edit');
       Route::patch('/profile', 'update')->name('profile.update');
       Route::delete('/profile', 'destroy')->name('profile.destroy');
   });
});

require __DIR__.'/auth.php';