<?php
// app/Http/Controllers/Auth/EmployeeLoginController.php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Employee\Employee;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class EmployeeLoginController extends Controller
{
    /**
     * Show the employee login form.
     */
    public function showLoginForm()
    {
        return Inertia::render('Auth/Login', [
            'canResetPassword' => false,
            'canRegister' => false,
            'isEmployeeLogin' => true, // Add this flag
        ]);
    }

    /**
     * Handle an employee login request.
     */
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        // Find employee by email
        $employee = Employee::where('email', $request->email)->first();

        // Check if employee exists and password is correct
        if ($employee && Hash::check($request->password, $employee->password)) {
            // Manually log in the employee
            Auth::guard('employee')->login($employee, $request->boolean('remember'));
            
            $request->session()->regenerate();
            
            return redirect()->route('employee.dashboard');
        }

        return back()->withErrors([
            'email' => 'The provided credentials do not match our records.',
        ]);
    }

    /**
     * Log the employee out.
     */
    public function logout(Request $request)
    {
        Auth::guard('employee')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }
}