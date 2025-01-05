<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function getAvailableUsers()
    {
        $currentUser = Auth::user();
        
        // Get users of opposite type (companies for job seekers, job seekers for companies)
        $users = User::where('user_type', $currentUser->user_type === 'company' ? 'jobSeeker' : 'company')
            ->where('id', '!=', $currentUser->id)
            ->when($currentUser->user_type === 'company', function ($query) {
                $query->with('jobSeekerProfile');
            })
            ->when($currentUser->user_type === 'jobSeeker', function ($query) {
                $query->with('companyProfile');
            })
            ->get()
            ->map(function ($user) {
                return [
                    'id' => $user->id,
                    'name' => $user->name,
                    'user_type' => $user->user_type,
                    'profile' => $user->user_type === 'company' 
                        ? $user->companyProfile 
                        : $user->jobSeekerProfile
                ];
            });

        return response()->json($users);
    }
}