<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Facility extends Model
{
    use HasFactory;

    protected $fillable = [
        'hospital_id',
        'name',
        'description',
        'photo',
    ];

    protected $appends = ['photo_url'];

    protected $hidden = ['photo'];

    public function getPhotoUrlAttribute()
    {
        return $this->photo ? \Storage::disk('public')->url($this->photo) : null;
    }

    public function hospital()
    {
        return $this->belongsTo(Hospital::class);
    }
}
