<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;

class Admin
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next): Response
    {

        // if Not logged in
        if (!auth()->check()) {
            // If API request
            if ($request->expectsJson() || $request->is('api/*')) {
                return response()->json(['message' => 'Unauthorized'], 401);
            }
            // If web request
            return redirect()->route('login');
        }

        $user = auth()->user();

        // if Not admin
        if ($user->role !== 'admin') {
            if ($request->expectsJson() || $request->is('api/*')) {
                return response()->json(['message' => 'Forbidden Access'], 403);
            }
            return redirect()->route('home')->with('error', 'You are not authorized to access this page.');
        }

        return $next($request);
    }
}
