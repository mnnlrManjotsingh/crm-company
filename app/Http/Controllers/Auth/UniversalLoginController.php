<?php

namespace App\Http\Controllers\Auth;

use App\Models\Employee\Employee;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Auth;
use Laravel\Fortify\Contracts\LoginResponse;
use Laravel\Fortify\Contracts\LogoutResponse;
use Laravel\Fortify\Http\Controllers\AuthenticatedSessionController as FortifyAuthController;

class UniversalLoginController extends FortifyAuthController
{
    /**
     * Attempt to authenticate the request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return mixed
     */
    public function store(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        $credentials = $request->only('email', 'password');
        $remember = $request->filled('remember');

        // First try to authenticate as User (admin)
        if (Auth::guard('web')->attempt($credentials, $remember)) {
            $request->session()->regenerate();
            
            // Get the authenticated user
            $user = Auth::guard('web')->user();
            
            // Check if user is admin (has role field)
            if ($user && isset($user->role) && $user->role === 'admin') {
                return app(LoginResponse::class);
            } else {
                // If user is not admin, logout and try as employee
                Auth::guard('web')->logout();
                $request->session()->invalidate();
                $request->session()->regenerateToken();
            }
        }

        // Try to authenticate as Employee
        if (Auth::guard('employee')->attempt($credentials, $remember)) {
            $request->session()->regenerate();
            return app(LoginResponse::class);
        }

        // If both fail, return error
        return back()->withErrors([
            'email' => 'The provided credentials do not match our records.',
        ])->onlyInput('email');
    }

    /**
     * Destroy an authenticated session.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Laravel\Fortify\Contracts\LogoutResponse
     */
    public function destroy(Request $request): LogoutResponse
    {
        // Logout from all guards
        Auth::guard('web')->logout();
        Auth::guard('employee')->logout();
        
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        
        return app(LogoutResponse::class);
    }
}