<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash; // Tambahan penting buat password

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Buat Akun ADMIN
        User::create([
            'name' => 'Super Admin',
            'email' => 'admin@mediconnect.com',
            'password' => Hash::make('password123'), // Passwordnya: password123
            'role' => 'admin',
            'email_verified_at' => now(),
        ]);

        // 2. Buat Akun DOKTER (Buat tes nanti)
        User::create([
            'name' => 'Dr. Strange',
            'email' => 'doctor@mediconnect.com',
            'password' => Hash::make('password123'),
            'role' => 'doctor',
        ]);

        // 3. Buat Akun PASIEN/USER BIASA (Buat tes login user)
        User::create([
            'name' => 'John Doe',
            'email' => 'user@mediconnect.com',
            'password' => Hash::make('password123'),
            'role' => 'patient', // Sesuaikan dengan ENUM di database (patient/user)
        ]);
    }
}