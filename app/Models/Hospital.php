<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Hospital extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'address',
        'phone',
        'description',
        'image',
    ];

    protected $hidden = ['image'];

    /**
     * Get all doctors in this hospital.
     */
    public function doctors()
    {
        return $this->hasMany(Doctor::class);
    }

    /**
     * Get all appointments in this hospital.
     */
    public function appointments()
    {
        return $this->hasMany(Appointment::class);
    }

    public function facilities()
    {
        return $this->hasMany(Facility::class);
    }

    protected $appends = ['image_url'];

    public function getImageUrlAttribute()
    {
        return $this->image ? \Storage::disk('public')->url($this->image) : null;
    }
}
