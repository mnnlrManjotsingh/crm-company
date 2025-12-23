<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\User;
use Illuminate\Database\Eloquent\Relations\BelongsTo; 

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
        'remark',
        'employee_id'
    ];

    protected $casts = [
        'reminder' => 'date',
        'products' => 'array',
    ];

    public function employee(): BelongsTo
    {
        // If foreign key is 'employee_id' (default), this is correct
        return $this->belongsTo(User::class, 'employee_id');
    }

}