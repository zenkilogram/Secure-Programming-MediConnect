<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Doctor extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'specialty',
        'hospital_id',
    ];

    /**
     * The hospital this doctor belongs to.
     */
    public function hospital()
    {
        return $this->belongsTo(Hospital::class);
    }

    /**
     * Appointments assigned to this doctor.
     */
    public function appointments()
    {
        return $this->hasMany(Appointment::class);
    }
}
