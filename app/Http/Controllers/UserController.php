<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function __construct()
    {
        // Only admin can manage users
        $this->middleware(['auth:sanctum', 'role:admin'])->except(['me']);
    }

    /**
     * Return authenticated user's info
     */
    public function me(Request $request)
    {
        return response()->json($request->user());
    }

    /**
     * List all users (admin only)
     */
    public function index()
    {
        return response()->json(User::all());
    }

    /**
     * Show a specific user (admin only)
     */
    public function show(User $user)
    {
        return response()->json($user);
    }

    /**
     * Update a user (admin only)
     */
    public function update(Request $request, User $user)
    {
        $data = $request->validate([
            'name' => 'sometimes|string|max:255',
            'email' => 'sometimes|email',
            'role' => 'sometimes|in:admin,user',
        ]);

        $user->update($data);

        return response()->json($user);
    }

    /**
     * Delete a user (admin only)
     */
    public function destroy(User $user)
    {
        $user->delete();

        return response()->json(['message' => 'User deleted']);
    }
}
