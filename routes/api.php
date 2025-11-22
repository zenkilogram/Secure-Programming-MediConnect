<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
// use Illuminate\Foundation\Auth\EmailVerificationRequest;

use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\AuthController;

use App\Http\Controllers\UserController;
use App\Http\Controllers\ImageUploadController;
use App\Http\Controllers\ProfileController;

use App\Http\Controllers\HospitalController;
use App\Http\Controllers\DoctorController;
use App\Http\Controllers\AppointmentController;
use App\Http\Controllers\FacilityController;

use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Cache\RateLimiting\Limit;

Route::prefix('v1')->group(function () {
    Route::post('/register', [RegisteredUserController::class, 'store'])->name('api.register')->middleware('throttle:register');
    Route::post('/login', [AuthenticatedSessionController::class, 'apiLogin'])->middleware('throttle:login');

    // Route::post('/email/verification-notification', function (Request $request) {
    //     if ($request->user()->hasVerifiedEmail()) {
    //         return response()->json(['message' => 'Already verified']);
    //     }

    //     $request->user()->sendEmailVerificationNotification();

    //     return response()->json(['message' => 'Verification email sent']);
    // })->middleware(['auth:sanctum'])->name('verification.send');

    // When user clicks the email verification link
    // Route::get('/verify-email/{id}/{hash}', function (EmailVerificationRequest $request) {
    //     $request->fulfill();

    //     return redirect(env('FRONTEND_URL') . '/email-verified'); 
    // })->middleware(['signed'])->name('verification.verify');

    Route::middleware('auth:sanctum', 'throttle:global')->group(function () {
        Route::post('/logout', [AuthenticatedSessionController::class, 'apiLogout'])->name('api.logout');

        Route::get('/user', fn(Request $request) => $request->user());

        // Route::middleware('verified')->group(function () {

        Route::get('/me', [UserController::class, 'me']);
            // Route::get('/me', [ProfileController::class, 'edit']);
            Route::post('/me', [ProfileController::class, 'update']);
            Route::post('/upload-image', [ImageUploadController::class, 'upload']);

            Route::middleware('role:admin')->group(function () {
                Route::apiResource('users', UserController::class);

                Route::apiResource('hospitals', HospitalController::class);
                Route::apiResource('doctors', DoctorController::class);
                Route::apiResource('facilities', FacilityController::class);
                
                // Appointment biasanya Admin cuma perlu lihat dan update status
                Route::apiResource('appointments', AppointmentController::class);
            });

            Route::middleware('role:user')->group(function () {
                Route::apiResource('appointments', AppointmentController::class)->only(['index', 'store', 'show']);
            });

            Route::get('hospitals', [HospitalController::class, 'index']);
            Route::get('hospitals/{hospital}', [HospitalController::class, 'show']);
            Route::get('doctors', [DoctorController::class, 'index']);
            Route::get('doctors/{doctor}', [DoctorController::class, 'show']);
            Route::get('facilities', [FacilityController::class, 'index']);
            Route::get('facilities/{facility}', [FacilityController::class, 'show']);
        });
    });
// });