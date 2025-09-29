<?php

namespace App\Http\Controllers;

use App\Models\Doctor;
use App\Models\Hospital;
use Illuminate\Http\Request;

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
        ]);

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
        ]);

        $doctor->update($data);
        return response()->json($doctor);
    }

    public function destroy(Doctor $doctor)
    {
        $doctor->delete();
        return response()->json(['message' => 'Doctor deleted']);
    }
}
