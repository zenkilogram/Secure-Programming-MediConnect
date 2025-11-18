<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use App\Models\Doctor;
use App\Models\Hospital;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class AppointmentController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum'); // all routes require login
    }

    public function index()
    {
        $user = auth()->user();

        $appointments = $user->isAdmin()
            ? Appointment::with(['doctor', 'hospital', 'user'])->get()
            : Appointment::with(['doctor', 'hospital'])
                ->where('user_id', $user->id)
                ->get();


        return response()->json($appointments);
    }
    
    public function store(Request $request)
    {
        $user = auth()->user();

        if ($user->isAdmin()) {
            return response()->json(['message' => 'Admins cannot book appointments'], 403);
        }

        $data = $request->validate([
            'hospital_id' => 'required|exists:hospitals,id',
            'doctor_id' => 'required|exists:doctors,id',
            'date' => 'required|date|after_or_equal:today',
            'time' => 'required',
            'notes' => 'nullable|string',
        ]);

        $validdoctor = Doctor::where([
            'id' => $data['doctor_id'],
            'hospital_id' => $data['hospital_id'],
        ])->exists();

        if (!$validdoctor) {
            return response()->json(['message' => 'Doctor does not belong to selected hospital'], 422);
        }

        $exists = Appointment::where('doctor_id', $data['doctor_id'])
            ->where('date', $data['date'])
            ->where('time', $data['time'])
            ->exists();

        if ($exists) {
            return response()->json(['message' => 'This slot is already booked'], 409);
        }

        $appointment = Appointment::create([
            'user_id' => $user->id,
            'hospital_id' => $data['hospital_id'],
            'doctor_id' => $data['doctor_id'],
            'date' => $data['date'],
            'time' => $data['time'],
            'notes' => $data['notes'] ?? null,
        ]);

        return response()->json($appointment, 201);
    }

    public function show(Appointment $appointment)
    {
        $user = auth()->user();

        if (!$user->isAdmin() && $appointment->user_id !== $user->id) {
            return response()->json(['message'=>'Forbidden'], 403);
        }

        return response()->json(
            $appointment->load(['doctor','hospital','user'])
        );
    }

    public function update(Request $request, Appointment $appointment)
    {
        $user = auth()->user();

        if (!$user->isAdmin() && $appointment->user_id !== $user->id) {
            return response()->json(['message'=>'Forbidden'], 403);
        }

        $data = $request->validate([
            'date' => 'sometimes|date|after_or_equal:today',
            'time' => 'sometimes',
            'status' => ['sometimes', Rule::in(['pending','confirmed','cancelled'])],
            'notes' => 'nullable|string',
        ]);

        if (isset($data['date'], $data['time'])) {
            $exists = Appointment::where('doctor_id', $appointment->doctor_id)
                ->where('date', $data['date'])
                ->where('time', $data['time'])
                ->where('id', '!=', $appointment->id)
                ->exists();

            if ($exists) {
                return response()->json(['message' => 'This slot is already booked'], 409);
            }
        }

        $appointment->update($data);

        return response()->json($appointment);
    }

    public function destroy(Appointment $appointment)
    {
        $user = auth()->user();

        if (!$user->isAdmin() && $appointment->user_id !== $user->id) {
            return response()->json(['message'=>'Forbidden'], 403);
        }

        $appointment->delete();

        return response()->json(['message'=>'Appointment deleted']);
    }
}
