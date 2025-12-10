<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Lead extends Model
{
    use HasFactory, SoftDeletes;

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