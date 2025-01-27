
<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\JobPostController;
use App\Http\Controllers\JobApplicationController;
use App\Http\Controllers\CompanyDashboardController;
use App\Http\Controllers\Auth\GoogleAuthController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Middleware\CheckUserType;
use App\Http\Controllers\Auth\RegisteredUserController;
use Inertia\Inertia;

// Public routes and assets
Route::get('/', function () {
    return Inertia::render('LandingPage');
})->name('home');

Route::get('/company', function () {
    return Inertia::render('Static/Company');
})->name('company');

Route::get('/pricing', function () {
    return Inertia::render('Static/Pricing');
})->name('pricing');

Route::get('/terms', function () {
    return Inertia::render('Static/Terms');
})->name('terms');

Route::get('/advice', function () {
    return Inertia::render('Static/Advice');
})->name('advice');

Route::get('/privacy', function () {
    return Inertia::render('Static/Privacy');
})->name('privacy');

Route::get('/help', function () {
    return Inertia::render('Static/Help');
})->name('help');

Route::get('/guide', function () {
    return Inertia::render('Static/Guide');
})->name('guide');

Route::get('/updates', function () {
    return Inertia::render('Static/Updates');
})->name('updates');

Route::get('/contact', function () {
    return Inertia::render('Static/Contact');
})->name('contact');
// Auth routes
Route::middleware('guest')->group(function () {
    Route::get('login', [AuthenticatedSessionController::class, 'create'])
        ->name('login');
    Route::post('login', [AuthenticatedSessionController::class, 'store']);
    Route::get('register', [RegisteredUserController::class, 'create'])
        ->name('register');
    Route::post('register', [RegisteredUserController::class, 'store']);
});

Route::middleware('auth')->group(function () {
    Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])
        ->name('logout');
});

// Google authentication
Route::get('auth/google', [GoogleAuthController::class, 'redirect'])
    ->name('google.redirect');
Route::get('auth/google/callback', [GoogleAuthController::class, 'callback'])
    ->name('google.callback');

// Asset routes
Route::get('/assets/{filename}', function ($filename) {
    $path = resource_path("js/Assets/{$filename}");
    if (!file_exists($path)) {
        abort(404);
    }
    return response()->file($path);
})->where('filename', '.*');

// Authenticated routes
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        return redirect()->route(
            Auth::user()->user_type === 'company' ? 'company.dashboard' : 'jobseeker.dashboard'
        );  
    }
    )->name('dashboard');
    
    // Global job routes accessible to all authenticated users
    Route::get('/jobs', [JobPostController::class, 'index'])->name('jobs.index');
    Route::get('/jobs/{jobPost}', [JobPostController::class, 'show'])->name('jobs.show');

    
    // Company routes
    Route::middleware([CheckUserType::class . ':company'])->group(function () {
        Route::get('/company/dashboard', [CompanyDashboardController::class, 'index'])->name('company.dashboard');
        Route::get('/jobs/create', [JobPostController::class,'create'])->name('jobs.create');
        Route::get('/jobs/{jobPost}', [JobPostController::class, 'show'])->name('jobs.show');
        Route::post('/jobs', [JobPostController::class, 'store'])->name('jobs.store');
        Route::get('/jobs/{jobPost}/edit', [JobPostController::class, 'edit'])->name('jobs.edit');
        Route::put('/jobs/{jobPost}', [JobPostController::class, 'update'])->name('jobs.update');
        Route::delete('/jobs/{jobPost}', [JobPostController::class, 'destroy'])->name('jobs.destroy');
       
    });

    // Job seeker routes
    Route::middleware([CheckUserType::class . ':jobSeeker'])->group(function () {
        Route::get('/jobseeker/dashboard', function () {
            return Inertia::render('Dashboard/JobSeeker/Dashboard');
        })->name('jobseeker.dashboard');
        
        Route::post('/jobs/{jobPost}/apply', [JobApplicationController::class, 'store'])
            ->name('applications.store');
    });

    Route::controller(JobApplicationController::class)->group(function() {
        Route::get('/applications', 'index')->name('applications.index');
        Route::get('/applications/{application}', 'show')->name('applications.show');
        Route::put('/applications/{application}/status', 'updateStatus')
            ->middleware(CheckUserType::class . ':company')
            ->name('applications.updateStatus');
    });

    Route::controller(ProfileController::class)->group(function() {
        Route::get('/profile', 'edit')->name('profile.edit');
        Route::patch('/profile', 'update')->name('profile.update');
        Route::delete('/profile', 'destroy')->name('profile.destroy');
    });
});

require __DIR__.'/auth.php';