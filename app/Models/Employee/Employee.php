<?php

namespace App\Models\Employee;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class Employee extends Model
{
    use Notifiable;

    protected $fillable = [
        'name',
        'email',
        'mobile',
        'password',
        'gender',
        'address',
        'city',
        'about',
        'role',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Validation rules for employee
     */
    public static $rules = [
        'name' => 'required|string|max:255',
        'email' => 'required|email|unique:employees,email',
        'mobile' => 'required|string|max:15',
        'password' => 'required|string|min:8',
        'gender' => 'required|in:male,female,other',
        'address' => 'nullable|string',
        'city' => 'nullable|string',
        'about' => 'nullable|string',
        'role' => 'required|string|max:255',
    ];

    /**
     * Validation rules for update (excluding unique email check for current record)
     */
    public static function updateRules($employeeId)
    {
        return [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:employees,email,' . $employeeId,
            'mobile' => 'required|string|max:15',
            'gender' => 'required|in:male,female,other',
            'address' => 'nullable|string',
            'city' => 'nullable|string',
            'about' => 'nullable|string',
            'role' => 'required|string|max:255',
        ];
    }
}
