<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ImageUploadController extends Controller
{
    public function upload(Request $request)
    {
        $request->validate([
            'image' => 'required|image|mimes:jpg,jpeg,png|max:4096',
            'folder' => 'required|string', // e.g. 'profiles', 'doctors', etc.
        ]);

        $path = $request->file('image')->store($request->folder, 'public');

        return response()->json([
            'url' => asset("storage/$path"),
            'path' => $path, // Save this in DB
        ]);
    }
}
