<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            // KITA TAMBAHKAN 'doctor' dan 'user' KE DALAM ARRAY INI
            // Supaya database menerima saat kita input akun dokter
            $table->enum('role', ['admin', 'patient', 'doctor', 'user'])->default('patient');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('role');
        });
    }
};