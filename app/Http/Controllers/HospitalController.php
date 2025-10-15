<?php

namespace App\Http\Controllers;

use App\Models\Hospital;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

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
            'description' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        if ($request->hasFile('image')) {
        $path = $request->file('image')->store('hospitals', 'public');
        $data['image'] = $path;
    }

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
            'description' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        if ($request->hasFile('image')) {
        // optional: delete old image
            if ($hospital->image && \Storage::disk('public')->exists($hospital->image)) {
                \Storage::disk('public')->delete($hospital->image);
            }

                $path = $request->file('image')->store('hospitals', 'public');
                $data['image'] = $path;
        }


        $hospital->update($data);
        return response()->json($hospital);
    }

    public function destroy(Hospital $hospital)
    {
        if ($hospital->image && Storage::disk('public')->exists($hospital->image)) {
            Storage::disk('public')->delete($hospital->image);
        }
        
        $hospital->delete();
        return response()->json(['message' => 'Hospital deleted']);
    }
}
