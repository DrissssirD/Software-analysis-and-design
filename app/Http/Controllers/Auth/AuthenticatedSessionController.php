<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

class AuthenticatedSessionController extends Controller
{
    public function create(): Response
    {
        return Inertia::render('Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    }
    public function destroy(Request $request): RedirectResponse
{
    Auth::guard('web')->logout();

    $request->session()->invalidate();
    $request->session()->regenerateToken();

    return redirect('/');
}

    public function store(LoginRequest $request): RedirectResponse
    {
        try {
            $request->authenticate();
            
            $user = Auth::user();
            if ($user->user_type !== $request->user_type) {
                Auth::logout();
                return back()->withErrors([
                    'email' => 'These credentials do not match our records for the selected user type.'
                ]);
            }
            
            $request->session()->regenerate();
            
            $route = $user->user_type === 'company' ? 'company.dashboard' : 'jobseeker.dashboard';
            return redirect()->intended(route($route));
            
        } catch (\Exception $e) {
            return back()->withErrors([
                'email' => 'The provided credentials are incorrect.'
            ]);
        }
    }
}