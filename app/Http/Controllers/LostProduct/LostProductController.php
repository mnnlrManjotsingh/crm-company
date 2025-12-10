<?php

namespace App\Http\Controllers\LostProduct;

use Inertia\Inertia;
use App\Http\Controllers\Controller;


class LostProductController extends Controller
{
    public function index()
    {
        return Inertia::render('lostproduct/LostProductList', [
            // You can pass props here if needed
            'LostProduct' => [] // or your actual data
        ]);
    }
}