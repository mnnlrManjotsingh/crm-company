<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ShareInertiaData
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next)
    {
        $authData = ['user' => null, 'is_employee' => false, 'is_admin' => false];
        
        if (Auth::check()) {
            $user = Auth::user();
            $authData = [
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'role' => $user->role, // This is the most important field
                ],
                'is_employee' => $user->role === 'employee',
                'is_admin' => $user->role === 'admin',
            ];
        }
        
        Inertia::share('auth', $authData);
        
        return $next($request);
    }
}