<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use App\Http\Controllers\Employee\EmployeeController;
use App\Http\Controllers\Lead\LeadController;
use App\Http\Controllers\Customer\CustomerController;
use App\Http\Controllers\Reports\ReportsController;
use App\Http\Controllers\Order\OrderController;
use App\Http\Controllers\Dispatch\DispatchController;
use App\Http\Controllers\LostProduct\LostProductController;

use App\Http\Controllers\DashboardController;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');


Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::middleware(['auth', 'role:admin'])->group(function () {

    Route::get('/employees', [EmployeeController::class, 'index'])->name('employees.index');
    Route::get('/employees/create', [EmployeeController::class, 'create'])->name('employees.create');
    Route::post('/employees', [EmployeeController::class, 'store'])->name('employees.store');
    Route::get('/employees/{employee}/edit', [EmployeeController::class, 'edit'])->name('employees.edit');
    Route::put('/employees/{employee}', [EmployeeController::class, 'update'])->name('employees.update');
    Route::delete('/employees/{employee}', [EmployeeController::class, 'destroy'])->name('employees.destroy');
    Route::get('/employees/export/excel', [EmployeeController::class, 'exportExcel'])->name('employees.export.excel');
    Route::get('/employees/unassigned-leads', [EmployeeController::class, 'getUnassignedLeads']);
    Route::post('/employees/assign-leads', [EmployeeController::class, 'assignLeads']);
    Route::get('/employees/{employee}/report', [EmployeeController::class, 'report'])->name('employees.report');

     Route::prefix('leads')->group(function () {
        // Main routes
        Route::get('/', [LeadController::class, 'index'])->name('leads.index');
        Route::get('/create', [LeadController::class, 'create'])->name('leads.create');
        Route::post('/', [LeadController::class, 'store'])->name('leads.store');
        Route::get('/{lead}/edit', [LeadController::class, 'edit'])->name('leads.edit');
        Route::put('/{lead}', [LeadController::class, 'update'])->name('leads.update');
        Route::delete('/{lead}', [LeadController::class, 'destroy'])->name('leads.destroy');

        Route::get('/deleted/list', [LeadController::class, 'deletedLeads'])->name('leads.deleted');
        Route::post('/{id}/restore', [LeadController::class, 'restore'])->name('leads.restore');
        Route::delete('/{id}/force-delete', [LeadController::class, 'forceDelete'])->name('leads.force-delete');
        
        // Additional routes
        Route::get('/export/excel', [LeadController::class, 'exportExcel'])->name('leads.export.excel');
        Route::post('/pull/{source}', [LeadController::class, 'pullFromSource'])->name('leads.pull');
        Route::post('/{lead}/status', [LeadController::class, 'updateStatus'])->name('leads.status.update');

        Route::get('/{lead}', [LeadController::class, 'show'])->name('leads.show');

    });

    Route::prefix('customers')->group(function () {
        Route::get('/', [CustomerController::class, 'index'])->name('customers.index');
        Route::get('/create', [CustomerController::class, 'create'])->name('customers.create');
        Route::post('/', [CustomerController::class, 'store'])->name('customers.store');
        Route::get('/{customer}/edit', [CustomerController::class, 'edit'])->name('customers.edit');
        Route::put('/{customer}', [CustomerController::class, 'update'])->name('customers.update');
        Route::delete('/{customer}', [CustomerController::class, 'destroy'])->name('customers.destroy');
        
        // Status update route
        Route::post('/{customer}/status', [CustomerController::class, 'updateStatus'])->name('customers.status');
        
        // Deleted customers routes
        Route::get('/deleted/list', [CustomerController::class, 'deletedCustomers'])->name('customers.deleted');
        Route::post('/{id}/restore', [CustomerController::class, 'restore'])->name('customers.restore');
        Route::delete('/{id}/force-delete', [CustomerController::class, 'forceDelete'])->name('customers.force-delete');
        
        // Export route
        Route::get('/export/excel', [CustomerController::class, 'exportExcel'])->name('customers.export.excel');
    });


    Route::get('/leadreports', [ReportsController::class, 'index'])->name('reports.index');
    Route::get('/orderlisting', [OrderController::class, 'index'])->name('reports.index');
    Route::get('/dispatchlisting', [DispatchController::class, 'index'])->name('reports.index');
    Route::get('/lostproduct', [LostProductController::class, 'index'])->name('reports.index');

    });


    Route::middleware(['auth', 'role:employee'])->group(function () {

    Route::get('/viewleads', [EmployeeController::class, 'assignedLeads'])->name('employees.leads');
    Route::post('/leads/{lead}/update-status', [EmployeeController::class, 'updateLeadStatus'])
        ->name('employee.leads.update-status');

    });

    Route::patch('/leads/{lead}/update-remark', [EmployeeController::class, 'updateRemark'])
        ->name('employee.leads.update-remark');

});

require __DIR__.'/settings.php';
