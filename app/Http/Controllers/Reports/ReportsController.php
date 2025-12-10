<?php

namespace App\Http\Controllers\Reports;

use Inertia\Inertia;
use App\Http\Controllers\Controller;


class ReportsController extends Controller
{
    public function index()
    {
        return Inertia::render('reports/ReportList', [
            // You can pass props here if needed
            'reports' => [] // or your actual data
        ]);
    }
}