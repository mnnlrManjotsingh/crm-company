<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Lead extends Model
{
    protected $fillable = [
        'company_name',
        'city',
        'address',
        'lead_type',
        'documentation',
        'products',
        'phone_no',
        'email',
        'reminder',
        'quotation',
        'status',
        'lead_source',
    ];

    protected $casts = [
        'reminder' => 'date',
        'products' => 'array',
    ];
}