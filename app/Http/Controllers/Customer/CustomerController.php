<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use App\Models\Customer\Customer;
use Illuminate\Http\Request;
use Inertia\Inertia;


class CustomerController extends Controller
{
    public function index()
    {
        $customers = Customer::latest()->paginate(10);
        
        return Inertia::render('customers/CustomerList', [
            'customers' => $customers
        ]);
    }

    public function exportExcel()
    {
        $customers = Customer::all();
        
        $filename = 'customers-' . date('Y-m-d') . '.csv';
        
        $headers = [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => 'attachment; filename="' . $filename . '"',
        ];

        $callback = function() use ($customers) {
            $file = fopen('php://output', 'w');
            
            // Add BOM for UTF-8
            fwrite($file, "\xEF\xBB\xBF");
            
            // Headers
            fputcsv($file, [
                'ID',
                'Customer Name', 
                'City',
                'Address',
                'Phone Number',
                'Email',
                'Reminder',
                'Quotation',
                'Status',
                'Created At'
            ]);
            
            // Data
            foreach ($customers as $customer) {
                fputcsv($file, [
                    $customer->id,
                    $customer->customer_name,
                    $customer->city,
                    $customer->address,
                    $customer->phone_no,
                    $customer->email,
                    $customer->reminder ? $customer->reminder->format('Y-m-d') : '',
                    $customer->quotation,
                    $customer->status,
                    $customer->created_at->format('Y-m-d H:i:s')
                ]);
            }
            
            fclose($file);
        };

        return response()->stream($callback, 200, $headers);
    }

    public function create()
    {
        return Inertia::render('customers/CustomerCreateEdit', [
            'mode' => 'create'
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'customer_name' => 'required|string|max:255',
            'city' => 'required|string|max:255',
            'address' => 'required|string',
            'phone_no' => 'nullable|string',
            'email' => 'nullable|email',
            'reminder' => 'nullable|date',
            'quotation' => 'nullable|string',
        ]);

        $customerData = $validated;
        $customerData['status'] = 'Active'; // Default status

        Customer::create($customerData);

        return redirect()->route('customers.index')
            ->with('success', 'Customer created successfully.');
    }

    public function edit(Customer $customer)
    {
        return Inertia::render('customers/CustomerCreateEdit', [
            'mode' => 'edit',
            'customer' => $customer
        ]);
    }

    public function update(Request $request, Customer $customer)
    {
        $validated = $request->validate([
            'customer_name' => 'required|string|max:255',
            'city' => 'required|string|max:255',
            'address' => 'required|string',
            'phone_no' => 'nullable|string',
            'email' => 'nullable|email',
            'reminder' => 'nullable|date',
            'quotation' => 'nullable|string',
            'status' => 'required|in:active,inactive',
        ]);

        $customer->update($validated);

        return redirect()->route('customers.index')
            ->with('success', 'Customer updated successfully.');
    }

    public function deletedCustomers()
    {
        $deletedCustomers = Customer::onlyTrashed()->latest()->paginate(10);
        
        return Inertia::render('customers/DeletedCustomer', [
            'deletedCustomers' => $deletedCustomers
        ]);
    }

    public function restore($id)
    {
        $customer = Customer::withTrashed()->findOrFail($id);
        $customer->restore();

        return redirect()->route('customers.deleted')
            ->with('success', 'Customer restored successfully.');
    }

    public function forceDelete($id)
    {
        $customer = Customer::withTrashed()->findOrFail($id);
        $customer->forceDelete();

        return redirect()->route('customers.deleted')
            ->with('success', 'Customer permanently deleted.');
    }

    public function destroy(Customer $customer)
    {
        $customer->delete();
        return redirect()->route('customers.index')
            ->with('success', 'Customer deleted successfully.');
    }

    public function updateStatus(Customer $customer, Request $request)
    {
        $request->validate([
            'status' => 'required|in:active,inactive'
        ]);
        
        $customer->update(['status' => $request->status]);
        return back()->with('success', 'Status updated successfully');
    }
}
