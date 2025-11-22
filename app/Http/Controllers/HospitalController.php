<?php

namespace App\Http\Controllers;

use App\Models\Doctor;
use App\Models\Hospital;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;
use App\Models\AuditLog;

class DoctorController extends Controller
{
    // HAPUS __construct KARENA SUDAH DIATUR DI ROUTE API.PHP

    public function index()
    {
        return response()->json(
            Doctor::with('hospital')->get()
        );
    }

    public function store(Request $request)
    {
        Log::info("Store");
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'specialty' => 'nullable|string',
            'hospital_id' => 'nullable|exists:hospitals,id', 
            'photo' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
            'education' => 'nullable|string',
            'available_schedule' => 'nullable|string', // Ubah array ke string kalau frontend kirim teks
        ]);

        if ($request->hasFile('photo')) {
            // Pastikan folder storage/app/public/doctors ada
            $path = $request->file('photo')->store('doctors', 'public');
            // Simpan full URL biar gampang diakses frontend
            $data['photo_url'] = url('storage/' . $path); 
            $data['photo'] = $path; // Simpan path asli juga
        }

        $doctor = Doctor::create($data);
        AuditLog::create([
            'action' => "Add doctor, " . $doctor->name,
            'ip_address' => request()->ip(),
        ]);
        return response()->json($doctor, 201);
    }

    public function show(Doctor $doctor)
    {
        return response()->json(
            $doctor->load('hospital')
        );
    }

    public function update(Request $request, Doctor $doctor)
    {
        $data = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'specialty' => 'nullable|string',
            'hospital_id' => 'nullable|exists:hospitals,id',
            'photo' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
            'education' => 'nullable|string',
            'available_schedule' => 'nullable|string',
        ]);

        // Handle image upload (replace old one if new uploaded)
        if ($request->hasFile('photo')) {
            if ($doctor->photo && Storage::disk('public')->exists($doctor->photo)) {
                Storage::disk('public')->delete($doctor->photo);
            }

            $path = $request->file('photo')->store('doctors', 'public');
            $data['photo_url'] = url('storage/' . $path);
            $data['photo'] = $path;
        }

        $doctor->update($data);
        AuditLog::create([
            'action' => "Edit doctor, " . $doctor->name,
            'ip_address' => request()->ip(),
        ]);
        return response()->json($doctor);
    }

    public function destroy(Doctor $doctor)
{
    // 1. Simpan nama dokter sebelum dihapus buat catatan
    $doctorName = $doctor->name;

    // 2. Hapus Dokter
    $doctor->delete();

    // 3. CATAT KE LOG (Otomatisasi)
    AuditLog::create([
        'action' => "Remove doctor, $doctorName",
        'ip_address' => request()->ip(), // Ambil IP user otomatis
        // created_at otomatis diisi Laravel
    ]);

    return response()->json(['message' => 'Deleted']);
}
}