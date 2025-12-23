<?php

namespace App\Http\Controllers;

use App\Models\Lead;
use App\Models\User;
use App\Models\Customer;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display the main dashboard based on user type.
     */
    public function index(Request $request)
    {
        $user = auth()->user();
        
        // Check user role, NOT guard
        if ($user->role === 'employee') {
            return $this->employeeDashboard($user);
        }
        
        // Admin role or default
        return $this->adminDashboard($user);
    }
    
    /**
     * Display admin dashboard.
     */
    private function adminDashboard($user)
    {
        // Admin statistics
        $stats = [
            'total_leads' => Lead::count(),
            'total_employees' => User::where('role', 'employee')->count(),
            'pending_leads' => Lead::where('status', 'pending')->count(),
            'converted_leads' => Lead::where('status', 'converted')->count(),
        ];
        
    
   
        
      

    }
    
    /**
     * Display employee dashboard.
     */
    public function employeeDashboard($user)
    {
        // Get employee's leads statistics
        $leads = Lead::where('employee_id', $user->id);
        
        $stats = [
            'total_leads' => $leads->count(),
            'pending_leads' => $leads->clone()->where('status', 'pending')->count(),
            'converted_leads' => $leads->clone()->where('status', 'converted')->count(),
            'rejected_leads' => $leads->clone()->where('status', 'rejected')->count(),
        ];
        
        // Recent leads assigned to this employee
        $recentLeads = $leads->clone()
            ->with('customer')
            ->orderBy('created_at', 'desc')
            ->take(10)
            ->get();
        
        return Inertia::render('dashboard', [
            'employee' => $user,
            'user_type' => 'employee',
            'stats' => $stats,
            'recentLeads' => $recentLeads,
        ]);
    }
}