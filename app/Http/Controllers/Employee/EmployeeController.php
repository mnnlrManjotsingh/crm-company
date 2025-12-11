<?php
namespace App\Http\Controllers\Employee;

use App\Http\Controllers\Controller;
use App\Models\Employee\Employee;
use App\Models\Lead;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;

class EmployeeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $employees = Employee::paginate(10);
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
        $employees = Employee::all();
        
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
        $validator = Validator::make($request->all(), Employee::$rules);

        if ($validator->fails()) {
            return redirect()->back()
                ->withErrors($validator)
                ->withInput();
        }

        try {
            $employeeData = $request->all();
            $employeeData['password'] = Hash::make($request->password);

            // Ensure optional fields are not null
            $employeeData['about'] = $employeeData['about'] ?? '';
            $employeeData['address'] = $employeeData['address'] ?? '';
            $employeeData['city'] = $employeeData['city'] ?? '';

            Employee::create($employeeData);

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
    public function edit(Employee $employee)
    {
        return Inertia::render('Employee/EmployeeCreateEdit', [
            'employee' => $employee
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Employee $employee)
    {
        $validator = Validator::make($request->all(), Employee::updateRules($employee->id));

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
    public function destroy(Employee $employee)
    {
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
        $request->validate([
            'employee_id' => 'required|exists:employees,id',
            'lead_ids' => 'required|array',
            'lead_ids.*' => 'exists:leads,id',
        ]);

        try {
            // Check if any of the leads are already assigned
            $alreadyAssigned = Lead::whereIn('id', $request->lead_ids)
                ->whereNotNull('employee_id')
                ->exists();

            if ($alreadyAssigned) {
                return response()->json([
                    'error' => 'Some leads are already assigned to other employees.'
                ], 400);
            }

            // Assign leads
            Lead::whereIn('id', $request->lead_ids)
                ->update(['employee_id' => $request->employee_id]);

            return response()->json([
                'message' => 'Leads assigned successfully.',
                'success' => true
            ]);
            
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Error assigning leads: ' . $e->getMessage(),
                'success' => false
            ], 500);
        }
    }


     /**
     * Show employee report with assigned leads
     */
    public function report(Employee $employee)
    {
        $leads = Lead::where('employee_id', $employee->id)
            ->with('employee') // Eager load employee relationship
            ->orderBy('created_at', 'desc')
            ->paginate(10);
        
        return Inertia::render('Employee/EmployeeReport', [
            'employee' => $employee,
            'leads' => $leads
        ]);
    }
}