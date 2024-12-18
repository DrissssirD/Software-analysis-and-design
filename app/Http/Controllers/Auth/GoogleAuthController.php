<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;

class GoogleAuthController extends Controller
{
    public function redirect()
    {
        return Socialite::driver('google')->redirect();
    }

    public function callback()
    {
        try {
            $googleUser = Socialite::driver('google')->user();
            
            $user = User::where('email', $googleUser->email)->first();
            
            if (!$user) {
                $user = User::create([
                    'name' => $googleUser->name,
                    'email' => $googleUser->email,
                    'password' => bcrypt(str()->random(16)),
                    'google_id' => $googleUser->id,
                    'user_type' => session('intended_user_type', 'jobSeeker'), // Default to jobSeeker if not set
                ]);
            }
            
            Auth::login($user);
            
            return redirect()->route($user->user_type === 'company' ? 'company.dashboard' : 'jobseeker.dashboard');
            
        } catch (\Exception $e) {
            return redirect()->route('login')->with('error', 'Google authentication failed.');
        }
    }
}