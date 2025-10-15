<?php

namespace App\Http\Controllers;

use App\Models\Facility;
use App\Models\Hospital;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class FacilityController extends Controller
{
    public function __construct()
    {
        $this->middleware(['auth', 'admin']); // only admin can manage facilities
    }

    public function index()
    {
        return Facility::with('hospital')->get();
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

        $facility = $hospital->facilities()->create($request->all());
        return response()->json($facility, 201);
    }

    public function show(Facility $facility)
    {
        return $facility->load('hospital');
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
        
        $facility->update($request->all());
        return response()->json($facility);
    }

    public function destroy(Facility $facility)
    {
        if ($facility->photo && Storage::disk('public')->exists($facility->photo)) {
            Storage::disk('public')->delete($facility->photo);
        }

        $facility->delete();
        return response()->json(['message' => 'Facility deleted successfully']);
    }
}
