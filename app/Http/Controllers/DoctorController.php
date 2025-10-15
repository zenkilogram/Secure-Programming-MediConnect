<?php

namespace App\Http\Controllers;

use App\Models\Doctor;
use App\Models\Hospital;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class DoctorController extends Controller
{
    public function __construct()
    {
        $this->middleware(['auth', 'admin']); // only admin can manage doctors
    }

    public function index()
    {
        return Doctor::with('hospital')->get();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'specialty' => 'nullable|string',
            'hospital_id' => 'required|exists:hospitals,id',
            'photo' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
            'education' => 'nullable|string',
            'available_schedule' => 'nullable|array',
        ]);

        if ($request->hasFile('photo')) {
            $path = $request->file('photo')->store('doctors', 'public');
            $data['photo'] = $path;
        }

        $doctor = Doctor::create($data);
        return response()->json($doctor, 201);
    }

    public function show(Doctor $doctor)
    {
        return $doctor->load('hospital');
    }

    public function update(Request $request, Doctor $doctor)
    {
        $data = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'specialty' => 'nullable|string',
            'hospital_id' => 'sometimes|required|exists:hospitals,id',
            'photo' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
            'education' => 'nullable|string',
            'available_schedule' => 'nullable|array',
        ]);

        // Handle image upload (replace old one if new uploaded)
        if ($request->hasFile('photo')) {
            if ($doctor->photo && Storage::disk('public')->exists($doctor->photo)) {
                Storage::disk('public')->delete($doctor->photo);
            }

            $path = $request->file('photo')->store('doctors', 'public');
            $data['photo'] = $path;
        }

        $doctor->update($data);
        return response()->json($doctor);
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
