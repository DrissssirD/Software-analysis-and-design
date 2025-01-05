
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
use App\Http\Controllers\ConversationController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\MessageReactionController;
use App\Http\Controllers\UserController;

use Inertia\Inertia;

// Public routes and assets
Route::get('/', function () {
    return Inertia::render('LandingPage');
})->name('home');

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
    })->name('dashboard');

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
    // Global job routes accessible to all authenticated users
    Route::get('/jobs', [JobPostController::class, 'index'])->name('jobs.index');
    Route::get('/jobs/{jobPost}', [JobPostController::class, 'show'])->name('jobs.show');


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
        Route::get('/applications/{application}/resume', 'viewResume')
            ->middleware(CheckUserType::class . ':company')
            ->name('applications.viewResume');
    });

    Route::controller(ProfileController::class)->group(function() {
        Route::get('/profile', 'edit')->name('profile.edit');
        Route::patch('/profile', 'update')->name('profile.update');
        Route::delete('/profile', 'destroy')->name('profile.destroy');
    });

     // Messages and conversation routes
     Route::middleware(['auth'])->prefix('messages')->name('messages.')->group(function () {
        // Conversation routes
        Route::get('/', [ConversationController::class, 'index'])->name('index');
        Route::get('/new', function () {
            return Inertia::render('Messages/NewConversation');
        })->name('new');
        Route::get('/{conversation}', [ConversationController::class, 'show'])->name('show');
        Route::post('/', [ConversationController::class, 'store'])->name('store');

        // Messages
        Route::post('/{conversation}/messages', [MessageController::class, 'store'])->name('message.store');
        Route::post('/messages/{message}/read', [MessageController::class, 'markAsRead'])->name('message.read');

        // Message reactions
        Route::post('/messages/{message}/reactions', [MessageReactionController::class, 'store'])->name('reaction.store');
        Route::delete('/messages/{message}/reactions', [MessageReactionController::class, 'destroy'])->name('reaction.destroy');

        // Available users for messaging
        Route::get('/users/available', [UserController::class, 'getAvailableUsers'])->name('users.available');
    });

});

require __DIR__.'/auth.php';