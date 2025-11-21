<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage; // Pastikan ada import ini biar Storage jalan

class Facility extends Model
{
    use HasFactory;

    // Ganti $fillable dengan $guarded = [] biar semua kolom (hospital_id, name, description, photo) otomatis boleh diisi
    protected $guarded = []; 

    // Ini fitur tambahan biar frontend gampang dapat URL foto
    protected $appends = ['photo_url'];
    
    // Kita sembunyikan nama file mentah biar response API bersih
    protected $hidden = ['photo'];

    // Magic function: Otomatis bikin link http://localhost:8000/storage/...
    public function getPhotoUrlAttribute()
    {
        // Pastikan logic ini aman kalau photonya null
        return $this->photo ? url('storage/' . $this->photo) : null;
    }

    public function hospital()
    {
        return $this->belongsTo(Hospital::class);
    }
}