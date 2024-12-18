<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class CheckUserType
{
    public function handle(Request $request, Closure $next, string $userType): Response
    {
        $currentUserType = strtolower(Auth::user()?->user_type);
        $requestedType = strtolower($userType);

        if ($currentUserType !== $requestedType) {
            $redirectRoute = $currentUserType === 'company' 
                ? 'company.dashboard' 
                : 'jobseeker.dashboard';
                
            return redirect()->route($redirectRoute);
        }

        return $next($request);
    }
}