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
    /**
     * Display the login view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    
public function store(LoginRequest $request): RedirectResponse
{
    $request->authenticate();

        // Check if the user's type matches the attempted login type
        $user = Auth::user();
        if ($user->user_type !== $request->user_type) {
            Auth::logout();
            return back()->withErrors([
                'email' => 'These credentials do not match our records for the selected user type.'
            ]);
        }

        $request->session()->regenerate();

        // Redirect based on user type
        $route = $user->user_type === 'company' ? 'company.dashboard' : 'jobseeker.dashboard';
        return redirect()->intended(route($route));}
    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }
}
