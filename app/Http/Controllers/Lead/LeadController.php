<?php
namespace App\Http\Controllers\Lead;

use App\Http\Controllers\Controller;
use App\Models\Lead;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LeadController extends Controller
{
    public function index()
    {
        $leads = Lead::latest()->paginate(10);
        
        return Inertia::render('leads/leadList', [
            'leads' => $leads
        ]);
    }

    public function exportExcel()
    {
        $leads = Lead::all();
        
        $filename = 'leads-' . date('Y-m-d') . '.csv';
        
        $headers = [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => 'attachment; filename="' . $filename . '"',
        ];

        $callback = function() use ($leads) {
            $file = fopen('php://output', 'w');
            
            // Add BOM for UTF-8
            fwrite($file, "\xEF\xBB\xBF");
            
            // Headers
            fputcsv($file, [
                'ID',
                'Company Name', 
                'City',
                'Address',
                'Phone Number',
                'Email',
                'Remark',
                'Quotation',
                'Lead Type',
                'Documentation',
                'Status',
                'Created At'
            ]);
            
            // Data
            foreach ($leads as $lead) {
                fputcsv($file, [
                    $lead->id,
                    $lead->company_name,
                    $lead->city,
                    $lead->address,
                    $lead->phone_no,
                    $lead->email,
                    $lead->remark,
                    $lead->quotation,
                    $lead->lead_type,
                    $lead->documentation,
                    $lead->status,
                    $lead->created_at->format('Y-m-d H:i:s')
                ]);
            }
            
            fclose($file);
        };

        return response()->stream($callback, 200, $headers);
    }

    public function create()
    {
        return Inertia::render('leads/LeadCreateEdit', [
            'mode' => 'create'
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'company_name' => 'required|string|max:255',
            'city' => 'required|string|max:255',
            'address' => 'required|string',
            'lead_type' => 'required|in:domestic,international', // Changed to lowercase
            'documentation' => 'nullable|in:yes,no', // Changed to lowercase
            'products' => 'nullable|array',
            'products.*.product' => 'nullable|string',
            'products.*.quantity' => 'nullable|integer',
            'phone_no' => 'nullable|string',
            'email' => 'nullable|email',
            'reminder' => 'nullable|date',
            'quotation' => 'nullable|string',
            'remark' => 'nullable|string', // Added remark validation
        ]);

        // Convert to proper case before saving
        $leadData = $validated;
        $leadData['lead_type'] = ucfirst($validated['lead_type']);
        $leadData['documentation'] = ucfirst($validated['documentation']);
        $leadData['status'] = 'Pending'; // Default status

        Lead::create($leadData);

        return redirect()->route('leads.index')
            ->with('success', 'Lead created successfully.');
    }

    public function show(Lead $lead)
    {
        return Inertia::render('leads/LeadShow', [
            'lead' => $lead
        ]);
    }

    public function edit(Lead $lead)
    {
        return Inertia::render('leads/LeadCreateEdit', [
            'mode' => 'edit',
            'lead' => $lead
        ]);
    }

    public function update(Request $request, Lead $lead)
    {
        $validated = $request->validate([
            'company_name' => 'required|string|max:255',
            'city' => 'required|string|max:255',
            'address' => 'required|string',
            'lead_type' => 'required|in:domestic,international', // Changed to lowercase
            'documentation' => 'nullable|in:yes,no', // Changed to lowercase
            'products' => 'nullable|array',
            'products.*.product' => 'nullable|string',
            'products.*.quantity' => 'nullable|integer',
            'phone_no' => 'nullable|string',
            'email' => 'nullable|email',
            'reminder' => 'nullable|date',
            'quotation' => 'nullable|string',
            'status' => 'required|in:pending,confirmed,rejected', // Changed to lowercase
        ]);

        // Convert to proper case before updating
        $updateData = $validated;
        $updateData['lead_type'] = ucfirst($validated['lead_type']);
        $updateData['documentation'] = ucfirst($validated['documentation']);
        $updateData['status'] = ucfirst($validated['status']);

        $lead->update($updateData);

        return redirect()->route('leads.index')
            ->with('success', 'Lead updated successfully.');
    }

     public function deletedLeads()
    {
        $deletedLeads = Lead::onlyTrashed()->latest()->paginate(10);
        
        return Inertia::render('leads/DeletedLeads', [
            'deletedLeads' => $deletedLeads
        ]);
    }

    // Restore deleted lead
    public function restore($id)
    {
        $lead = Lead::withTrashed()->findOrFail($id);
        $lead->restore();

        return redirect()->route('leads.deleted')
            ->with('success', 'Lead restored successfully.');
    }

    // Permanent delete
    public function forceDelete($id)
    {
        $lead = Lead::withTrashed()->findOrFail($id);
        $lead->forceDelete();

        return redirect()->route('leads.deleted')
            ->with('success', 'Lead permanently deleted.');
    }

    public function destroy(Lead $lead)
    {
        $lead->delete();
        return redirect()->route('leads.index')
            ->with('success', 'Lead deleted successfully.');
    }

    public function pullFromSource(Request $request, $source)
    {
        return redirect()->route('leads.index')
            ->with('success', "Leads pulled from {$source} successfully.");
    }

    public function updateStatus(Lead $lead, Request $request)
    {
        $request->validate([
            'status' => 'required|in:pending,confirmed,rejected' // Changed to lowercase
        ]);
        
        $lead->update(['status' => ucfirst($request->status)]);
        return back()->with('success', 'Status updated successfully');
    }
}