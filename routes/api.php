<?php

use Illuminate\Http\Request;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\HospitalController;
use App\Http\Controllers\DoctorController;
use App\Http\Controllers\AppointmentController;
use App\Http\Controllers\FacilityController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredUserController;

Route::post('/register', [RegisteredUserController::class, 'store'])->name('api.register');
Route::post('/login', [AuthenticatedSessionController::class, 'apiLogin']);
Route::middleware('auth:sanctum')->post('/logout', [AuthenticatedSessionController::class, 'apiLogout']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/me', [UserController::class, 'me']);

    Route::post('/upload-image', [ImageUploadController::class, 'upload']);

    Route::middleware('role:admin')->group(function () {
        Route::apiResource('users', UserController::class);
    });
});

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    // Admin only
    Route::middleware('role:admin')->group(function () {
        Route::apiResource('hospitals', HospitalController::class)->except(['index', 'show']);
        Route::apiResource('doctors', DoctorController::class)->except(['index', 'show']);
        Route::apiResource('appointments', AppointmentController::class)->only(['update', 'destroy']);
        Route::apiResource('facilities', FacilityController::class)->except(['index', 'show']);
    });

    // User only
    Route::middleware('role:user')->group(function () {
        Route::apiResource('appointments', AppointmentController::class)->only(['index', 'store', 'show']);
    });

    // Public for both
    Route::get('hospitals', [HospitalController::class, 'index']);
    Route::get('hospitals/{hospital}', [HospitalController::class, 'show']);
    Route::get('doctors', [DoctorController::class, 'index']);
    Route::get('doctors/{doctor}', [DoctorController::class, 'show']);
    Route::get('facilities', [FacilityController::class, 'index']);
    Route::get('facilities/{facility}', [FacilityController::class, 'show']);
});
