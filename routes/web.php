<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use App\Http\Controllers\Employee\EmployeeController;
use App\Http\Controllers\Lead\LeadController;


Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
   // Employee Routes - Make sure these use GET method for browser access
    Route::get('/employees', [EmployeeController::class, 'index'])->name('employees.index');
    Route::get('/employees/create', [EmployeeController::class, 'create'])->name('employees.create');
    Route::post('/employees', [EmployeeController::class, 'store'])->name('employees.store');
    Route::get('/employees/{employee}/edit', [EmployeeController::class, 'edit'])->name('employees.edit');
    Route::put('/employees/{employee}', [EmployeeController::class, 'update'])->name('employees.update');
    Route::delete('/employees/{employee}', [EmployeeController::class, 'destroy'])->name('employees.destroy');
    Route::get('/employees/export/excel', [EmployeeController::class, 'exportExcel'])->name('employees.export.excel');

     Route::prefix('leads')->group(function () {
        // Main routes
        Route::get('/', [LeadController::class, 'index'])->name('leads.index');
        Route::get('/create', [LeadController::class, 'create'])->name('leads.create');
        Route::post('/', [LeadController::class, 'store'])->name('leads.store');
        Route::get('/{lead}', [LeadController::class, 'show'])->name('leads.show');
        Route::get('/{lead}/edit', [LeadController::class, 'edit'])->name('leads.edit');
        Route::put('/{lead}', [LeadController::class, 'update'])->name('leads.update');
        Route::delete('/{lead}', [LeadController::class, 'destroy'])->name('leads.destroy');
        
        // Additional routes
        Route::get('/export/excel', [LeadController::class, 'exportExcel'])->name('leads.export.excel');
        Route::post('/pull/{source}', [LeadController::class, 'pullFromSource'])->name('leads.pull');
        Route::post('/{lead}/status', [LeadController::class, 'updateStatus'])->name('leads.status.update');
    });
});

require __DIR__.'/settings.php';
