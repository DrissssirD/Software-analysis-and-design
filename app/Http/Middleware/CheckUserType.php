<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class CheckUserType
{
    public function handle(Request $request, Closure $next, string $userType)
{
    if (!Auth::check()) {
        Log::warning('Unauthenticated access attempt', [
            'path' => $request->path(),
            'ip' => $request->ip()
        ]);
        return redirect()->route('login');
    }

    // Remove strtolower() calls
    $currentUserType = Auth::user()->user_type;
    if ($currentUserType !== $userType) {
        $redirectRoute = $currentUserType === 'company' 
            ? 'company.dashboard' 
            : 'jobseeker.dashboard';
            
        return redirect()->route($redirectRoute)
            ->with('error', 'Unauthorized access.');
    }

    return $next($request);
}
}