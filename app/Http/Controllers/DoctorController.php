<?php

namespace App\Http\Controllers;

use App\Models\Doctor;
use App\Models\Hospital;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class DoctorController extends Controller
{
    // HAPUS __construct KARENA SUDAH DIATUR DI ROUTE API.PHP

    public function index(Request $request) // ← TAMBAHKAN Request $request
{
    $search = $request->query('search');
    $hospital_id = $request->query('hospital_id');
    $specialty = $request->query('specialty'); // ← specialty bukan specialty_id

    $query = Doctor::query();

    if ($search) {
        $query->where('name', 'like', '%' . $search . '%');
    }

    if ($hospital_id) {
        $query->where('hospital_id', $hospital_id);
    }

    if ($specialty) {
        $query->where('specialty', $specialty);
    }

    return response()->json($query->get());
}

    public function store(Request $request)
    {
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
        return response()->json(['message' => 'Success', 'data' => $doctor], 201);
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
        return response()->json(['message' => 'Updated', 'data' => $doctor]);
    }

    public function destroy(Doctor $doctor)
    {
        if ($doctor->photo && Storage::disk('public')->exists($doctor->photo)) {
            Storage::disk('public')->delete($doctor->photo);
        }
        
        $doctor->delete();
        
        return response()->json(['message' => 'Doctor deleted']);
    }
}