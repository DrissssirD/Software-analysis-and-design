<?php

namespace App\Providers;

use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use App\Models\JobPost;
use App\Models\JobApplication;
use App\Policies\JobPostPolicy;
use App\Policies\JobApplicationPolicy;


class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }
/**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        JobPost::class => JobPostPolicy::class,
        JobApplication::class => JobApplicationPolicy::class,
    ];

    /**
     * Register any authentication / authorization services.
     */

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);
    }
}
