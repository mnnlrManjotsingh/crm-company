<?php

namespace App\Http\Controllers\Dispatch;

use Inertia\Inertia;
use App\Http\Controllers\Controller;


class DispatchController extends Controller
{
    public function index()
    {
        return Inertia::render('dispatch/DispatchList', [
            // You can pass props here if needed
            'Dispatch' => [] // or your actual data
        ]);
    }
}