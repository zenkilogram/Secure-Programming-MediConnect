<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\JsonResponse;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
// use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Illuminate\View\View;

class RegisteredUserController extends Controller
{

    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'lowercase', 'email', 'max:255', 'unique:'.User::class],
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role ?? 'user', // default to 'user'
        ]);

        // $user->sendEmailVerificationNotification();

        $token = $user->createToken('auth_token')->plainTextToken;

        // If it's an API request, return JSON
        // if ($request->is('api/*') || $request->expectsJson()) {
        //     $token = $user->createToken('auth_token')->plainTextToken;

        //     return response()->json([
        //         'message' => 'User registered successfully',
        //         'access_token' => $token,
        //         'token_type' => 'Bearer',
        //         'role' => $user->role,
        //         'user' => $user,
        //     ], 201);
        // }


        return response()->json([
            'message' => 'User registered successfully. Please verify your email.',
            'access_token' => $token,
            'token_type' => 'Bearer',
            'user' => $user,
        ], 201);
    }
}