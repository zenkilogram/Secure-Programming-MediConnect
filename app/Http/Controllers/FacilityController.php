<?php

namespace App\Http\Controllers;

use App\Models\Facility;
use App\Models\Hospital;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Response;

class FacilityController extends Controller
{
    public function __construct()
    {
        $this->middleware(['auth:sanctum', 'admin']); // only admin can manage facilities
    }

    public function index()
    {
        return response()->json(
            Facility::with('hospital')->get()
        );
    }

    public function store(Request $request, Hospital $hospital)
    {
        $data = $request->validate([
            'hospital_id' => 'required|exists:hospitals,id',
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'photo' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        // handle image upload
        if ($request->hasFile('photo')) {
            $path = $request->file('photo')->store('facilities', 'public');
            $data['photo'] = $path;
        }

        $facility = Facility::create($data);
        return response()->json($facility, 201);
    }

    public function show(Facility $facility)
    {
        return response()->json(
            $facility->load('hospital')
        );
    }

    public function update(Request $request, Facility $facility)
    {
        $data = $request->validate([
            'hospital_id' => 'sometimes|required|exists:hospitals,id',
            'name' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'photo' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        // if new photo uploaded → delete old one
        if ($request->hasFile('photo')) {
            if ($facility->photo && Storage::disk('public')->exists($facility->photo)) {
                Storage::disk('public')->delete($facility->photo);
            }

            $path = $request->file('photo')->store('facilities', 'public');
            $data['photo'] = $path;
        }
        
        $facility->update($data);
        return response()->json($facility);
    }

    public function destroy(Facility $facility)
    {
        if ($facility->photo && Storage::disk('public')->exists($facility->photo)) {
            Storage::disk('public')->delete($facility->photo);
        }

        $facility->delete();
        return response()->json(['message' => 'Facility deleted successfully'], Response::HTTP_NO_CONTENT);
    }
}
