<?php

namespace App\Http\Controllers\Order;

use Inertia\Inertia;
use App\Http\Controllers\Controller;


class OrderController extends Controller
{
    public function index()
    {
        return Inertia::render('order/OrderList', [
            // You can pass props here if needed
            'Order' => [] // or your actual data
        ]);
    }
}