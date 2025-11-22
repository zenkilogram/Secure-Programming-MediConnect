<?php

namespace App\Http\Controllers;

use App\Models\AuditLog;
use Illuminate\Http\Request;

class AuditLogController extends Controller
{
    public function index()
    {
        // Ambil semua log, urutkan dari yang paling baru (latest)
        $logs = AuditLog::latest()->get();
        return response()->json($logs);
    }
}