<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\NewPasswordController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('auth.login');
});

Route::get('/register', [RegisteredUserController::class, 'create'])->name('register');
Route::post('/register', [RegisteredUserController::class, 'store']);

Route::get('/login', function () {
    return view('auth.login');
})->name('login');
Route::post('/login', [AuthenticatedSessionController::class, 'store']);

Route::get('/home', function () {
    return view('home');
})->middleware('auth')->name('home');

Route::get('/register/success', function () {
    return view('auth.register_success');
})->name('register.success');

require __DIR__.'/auth.php';