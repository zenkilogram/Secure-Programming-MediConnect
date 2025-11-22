<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AuditLog extends Model
{
    use HasFactory;
    
    // Pastikan nama tabel sesuai
    protected $table = 'audit_logs';

    // Izinkan input data
    protected $guarded = []; 
}