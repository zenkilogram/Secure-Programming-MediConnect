<?php

namespace App\Http\Controllers;

use App\Models\Hospital;
use Illuminate\Http\Request;

class HospitalController extends Controller
{
    public function __construct()
    {
        $this->middleware(['auth', 'admin']); // only admin can manage hospitals
    }

    public function index()
    {
        return Hospital::all();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'address' => 'nullable|string',
            'phone' => 'nullable|string|max:20',
        ]);

        $hospital = Hospital::create($data);
        return response()->json($hospital, 201);
    }

    public function show(Hospital $hospital)
    {
        return $hospital;
    }

    public function update(Request $request, Hospital $hospital)
    {
        $data = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'address' => 'nullable|string',
            'phone' => 'nullable|string|max:20',
        ]);

        $hospital->update($data);
        return response()->json($hospital);
    }

    public function destroy(Hospital $hospital)
    {
        $hospital->delete();
        return response()->json(['message' => 'Hospital deleted']);
    }
}
