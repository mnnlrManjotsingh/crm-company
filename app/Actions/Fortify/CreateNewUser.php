<?php

namespace App\Actions\Fortify;

use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Laravel\Fortify\Contracts\CreatesNewUsers;

class CreateNewUser implements CreatesNewUsers
{
    use PasswordValidationRules;

    /**
     * Validate and create a newly registered user.
     *
     * @param  array<string, string>  $input
     */
    public function create(array $input): User
    {
        Validator::make($input, [
            'name' => ['required', 'string', 'max:255'],
            'email' => [
                'required',
                'string',
                'email',
                'max:255',
                Rule::unique(User::class),
            ],
            'password' => $this->passwordRules(),
            'role' => ['required', 'in:admin,employee'], 
            'mobile' => ['required_if:role,employee', 'string', 'max:20'], 
            'gender' => ['required_if:role,employee', 'in:male,female,other'],
        ])->validate();

         $userData = [
            'name' => $input['name'],
            'email' => $input['email'],
            'password' => $input['password'],
            'role' => $input['role'],
        ];

        // Add optional fields if provided
        if (isset($input['mobile'])) $userData['mobile'] = $input['mobile'];
        if (isset($input['gender'])) $userData['gender'] = $input['gender'];
        if (isset($input['address'])) $userData['address'] = $input['address'];
        if (isset($input['city'])) $userData['city'] = $input['city'];
        if (isset($input['about'])) $userData['about'] = $input['about'];

        return User::create($userData);
    }
}
