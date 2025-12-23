<?php
namespace App\Http\Controllers\Employee;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Lead;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;

class EmployeeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $employees = User::where('role', 'employee')->paginate(10);
        $unassignedLeads = Lead::whereNull('employee_id')
        ->where('status', '!=', 'Rejected')
        ->get();
        
        return Inertia::render('Employee/EmployeeList', [
            'employees' => $employees,
            'unassignedLeads' => $unassignedLeads
        ]);
    }

    /**
     * Export employees to CSV
     */
    public function exportExcel()
    {
         $employees = User::where('role', 'employee')->get();
        
        $filename = 'employees-' . date('Y-m-d') . '.csv';
        
        $headers = [
            'Content-Type' => 'text/csv; charset=UTF-8',
            'Content-Disposition' => 'attachment; filename="' . $filename . '"',
            'Pragma' => 'no-cache',
            'Cache-Control' => 'must-revalidate, post-check=0, pre-check=0',
            'Expires' => '0'
        ];

        $callback = function() use ($employees) {
            $file = fopen('php://output', 'w');
            
            // Add BOM for UTF-8
            fwrite($file, "\xEF\xBB\xBF");
            
            // Headers
            fputcsv($file, [
                'ID',
                'Name', 
                'Email',
                'Mobile',
                'Gender',
                'Address',
                'City',
                'Role',
                'About',
                'Created At'
            ]);
            
            // Data
            foreach ($employees as $employee) {
                fputcsv($file, [
                    $employee->id,
                    $employee->name,
                    $employee->email,
                    $employee->mobile,
                    $employee->gender,
                    $employee->address ?? '',
                    $employee->city ?? '',
                    $employee->role,
                    $employee->about ?? '',
                    $employee->created_at ? $employee->created_at->format('Y-m-d H:i:s') : ''
                ]);
            }
            
            fclose($file);
        };

        return response()->stream($callback, 200, $headers);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Employee/EmployeeCreateEdit');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
         $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:8',
            'mobile' => 'required|string|max:15',
            'gender' => 'required|in:male,female,other',
            'address' => 'nullable|string',
            'city' => 'nullable|string',
            'about' => 'nullable|string',
            'role' => 'required|string|in:employee,Employee',
        ]);

        if ($validator->fails()) {
            return redirect()->back()
                ->withErrors($validator)
                ->withInput();
        }

        try {
            $employeeData = $request->all();
            $employeeData['password'] = Hash::make($request->password);

            $employeeData['role'] = 'employee';

            // Ensure optional fields are not null
            $employeeData['about'] = $employeeData['about'] ?? '';
            $employeeData['address'] = $employeeData['address'] ?? '';
            $employeeData['city'] = $employeeData['city'] ?? '';

            User::create($employeeData);

            return redirect()->route('employees.index')
                ->with('success', 'Employee created successfully.');
                
        } catch (\Exception $e) {
            return redirect()->back()
                ->with('error', 'Error creating employee: ' . $e->getMessage())
                ->withInput();
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $employee)
    {
         if ($employee->role !== 'employee') {
            abort(404);
        }
        return Inertia::render('Employee/EmployeeCreateEdit', [
            'employee' => $employee
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $employee)
    {
        if ($employee->role !== 'employee') {
            abort(404);
        }
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $employee->id,
            'mobile' => 'required|string|max:15',
            'gender' => 'required|in:male,female,other',
            'address' => 'nullable|string',
            'city' => 'nullable|string',
            'about' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return redirect()->back()
                ->withErrors($validator)
                ->withInput();
        }

        try {
            $updateData = $request->except(['_method', '_token']);
            
            // Ensure optional fields are not null
            $updateData['about'] = $updateData['about'] ?? '';
            $updateData['address'] = $updateData['address'] ?? '';
            $updateData['city'] = $updateData['city'] ?? '';

            $employee->update($updateData);

            return redirect()->route('employees.index')
                ->with('success', 'Employee updated successfully.');
                
        } catch (\Exception $e) {
            return redirect()->back()
                ->with('error', 'Error updating employee: ' . $e->getMessage())
                ->withInput();
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $employee)
    {
        if ($employee->role !== 'employee') {
            abort(404);
        }
        try {
            $employee->delete();

            return redirect()->route('employees.index')
                ->with('success', 'Employee deleted successfully.');
                
        } catch (\Exception $e) {
            return redirect()->route('employees.index')
                ->with('error', 'Error deleting employee: ' . $e->getMessage());
        }
    }


    public function getUnassignedLeads()
    {
        $leads = Lead::whereNull('employee_id')
            ->where('status', '!=', 'Rejected')
            ->get();
        
        return response()->json($leads);
    }

    /**
     * Assign leads to employee
     */
    public function assignLeads(Request $request)
    {
        \Log::info('=== ASSIGN LEADS START ===');
        \Log::info('Request Data:', $request->all());
        
        $request->validate([
            'employee_id' => 'required|exists:users,id,role,employee',
            'lead_ids' => 'required|array',
            'lead_ids.*' => 'exists:leads,id',
        ]);
        
        try {
            // Check if any of the leads are already assigned
            $alreadyAssigned = Lead::whereIn('id', $request->lead_ids)
                ->whereNotNull('employee_id')
                ->exists();

            if ($alreadyAssigned) {
                \Log::warning('Leads already assigned', $request->lead_ids);
                
                // If it's an Inertia request, return back with error
                if ($request->header('X-Inertia')) {
                    return back()->with('error', 'Some leads are already assigned to other employees.');
                }
                
                return response()->json([
                    'error' => 'Some leads are already assigned to other employees.',
                    'success' => false
                ], 400);
            }
            
            // Assign leads
            $updated = Lead::whereIn('id', $request->lead_ids)
                ->update(['employee_id' => $request->employee_id]);
                
            \Log::info('Leads updated successfully', ['updated_count' => $updated]);

            \Log::info('=== ASSIGN LEADS END ===');
            
            // If it's an Inertia request, return back with success
            if ($request->header('X-Inertia')) {
                return back()->with('success', 'Leads assigned successfully.');
            }
            
            return response()->json([
                'message' => 'Leads assigned successfully.',
                'success' => true,
                'updated_count' => $updated
            ]);
                
        } catch (\Exception $e) {
            \Log::error('Error in assignLeads: ' . $e->getMessage());
            
            // If it's an Inertia request, return back with error
            if ($request->header('X-Inertia')) {
                return back()->with('error', 'Error assigning leads: ' . $e->getMessage());
            }
            
            return response()->json([
                'error' => 'Error assigning leads: ' . $e->getMessage(),
                'success' => false
            ], 500);
        }
    }


     /**
     * Show employee report with assigned leads
     */
    public function report(User $employee)
    {
        if ($employee->role !== 'employee') {
            abort(404);
        }
        $leads = Lead::where('employee_id', $employee->id)
            ->with('employee') // Eager load employee relationship
            ->orderBy('created_at', 'desc')
            ->paginate(10);
        
        return Inertia::render('Employee/EmployeeReport', [
            'employee' => $employee,
            'leads' => $leads
        ]); 
    }



    public function assignedLeads()
    {
        $employee = Auth::user();
        
        // Ensure only employees can access this
        if ($employee->role !== 'employee') {
            abort(403, 'Unauthorized access.');
        }

        $leads = Lead::where('employee_id', $employee->id)
            ->orderBy('created_at', 'desc')
            ->paginate(10);
        
        return Inertia::render('Employee/AssignedLeads', [
            'employee' => $employee,
            'leads' => $leads
        ]);
    }   

  
    /**
     * Update lead status (for employees)
     */
    public function updateLeadStatus(Request $request, $id)  // Change from Lead $lead to $id
    {
        $employee = Auth::user();
        
        // Find the lead
        $lead = Lead::find($id);
        
        if (!$lead) {
            return back()->with('error', 'Lead not found.');
        }
        
        // Ensure the lead belongs to this employee
        if ($lead->employee_id !== $employee->id) {
            return back()->with('error', 'Unauthorized access. This lead does not belong to you.');
        }
        
        $request->validate([
            'status' => 'required|in:pending,confirmed,rejected',
        ]);
        
        try {
            $lead->update([
                'status' => $request->status,
                'updated_at' => now(),
            ]);
            
            return back()->with('success', 'Lead status updated successfully.');
            
        } catch (\Exception $e) {
            return back()->with('error', 'Error updating lead status: ' . $e->getMessage());
        }
    }   



    /**
     * Update lead remark (for employees)
     */
    public function updateRemark(Request $request, $id)  
    {
        $employee = Auth::user();
        
        // Find the lead
        $lead = Lead::find($id);
        
        if (!$lead) {
            return back()->with('error', 'Lead not found.');
        }
        
        // Ensure the lead belongs to this employee
        if ($lead->employee_id !== $employee->id) {
            return back()->with('error', 'Unauthorized access. This lead does not belong to you.');
        }
        
        $request->validate([
            'remark' => 'nullable|string|max:500',
        ]);
        
        try {
            $lead->update([
                'remark' => $request->remark,
                'updated_at' => now(),
            ]);
            
            return back()->with('success', 'Remark updated successfully.');
            
        } catch (\Exception $e) {
            return back()->with('error', 'Error updating remark: ' . $e->getMessage());
        }
    }
}