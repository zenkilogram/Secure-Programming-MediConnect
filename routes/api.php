<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ImageUploadController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\HospitalController;
use App\Http\Controllers\DoctorController;
use App\Http\Controllers\AppointmentController;
use App\Http\Controllers\FacilityController;
use App\Http\Controllers\AuditLogController;

Route::prefix('v1')->group(function () {
    Route::post('/register', [RegisteredUserController::class, 'store'])->name('api.register')->middleware('throttle:register');
    Route::post('/login', [AuthenticatedSessionController::class, 'apiLogin'])->middleware('throttle:login');

    Route::middleware('auth:sanctum', 'throttle:global')->group(function () {
        Route::post('/logout', [AuthenticatedSessionController::class, 'apiLogout'])->name('api.logout');
        Route::get('/user', fn(Request $request) => $request->user());

        // PERBAIKAN: GANTI INI ↓
        // Route::get('/me', [UserController::class, 'me']); // ← HAPUS/COMMENT BARIS INI
        
        // MENJADI INI ↓
        Route::get('/me', [ProfileController::class, 'me']); // ← PAKAI PROFILE CONTROLLER

        Route::post('/me', [ProfileController::class, 'update']);
        Route::post('/upload-image', [ImageUploadController::class, 'upload']);

        Route::middleware('role:admin')->group(function () {
            Route::apiResource('users', UserController::class);
            Route::apiResource('hospitals', HospitalController::class);
            Route::apiResource('doctors', DoctorController::class);
            Route::apiResource('facilities', FacilityController::class);
            Route::apiResource('appointments', AppointmentController::class);
        });

        Route::middleware('role:user')->group(function () {
            Route::apiResource('appointments', AppointmentController::class)->only(['index', 'store', 'show']);
        });
	
	Route::get('/audit-logs', [AuditLogController::class, 'index']);
        Route::get('hospitals', [HospitalController::class, 'index']);
        Route::get('hospitals/{hospital}', [HospitalController::class, 'show']);
        Route::get('doctors', [DoctorController::class, 'index']);
        Route::get('doctors/{doctor}', [DoctorController::class, 'show']);
        Route::get('facilities', [FacilityController::class, 'index']);
        Route::get('facilities/{facility}', [FacilityController::class, 'show']);
    });
});