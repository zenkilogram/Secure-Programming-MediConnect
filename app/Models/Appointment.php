<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Appointment extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'hospital_id',
        'doctor_id',
        'date',
        'time',
        'status',
        'notes',
    ];

    /**
     * Patient who booked the appointment.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Hospital where the appointment is scheduled.
     */
    public function hospital()
    {
        return $this->belongsTo(Hospital::class);
    }

    /**
     * Doctor assigned to this appointment.
     */
    public function doctor()
    {
        return $this->belongsTo(Doctor::class);
    }
}
