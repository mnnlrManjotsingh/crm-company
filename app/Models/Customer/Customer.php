<?php

namespace App\Models\Customer;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;   

class Customer extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'customer_name',
        'city',
        'address',
        'phone_no',
        'email',
        'reminder',
        'quotation',
        'status',
    ];

    protected $casts = [
        'reminder' => 'date',
    ];
}
