import React, { useState } from 'react';
import "./doctor.css";

const fetchDoctors = async (hospital, speciality) => {
    const url = "http://localhost:8000/api/v1/doctors=${encodeURIComponent(hospital)}&speciality=${encodeURIComponent(speciality)}";
    
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
};

export default function Doctors() {
    const [selectedHospital, setSelectedHospital] = useState(''); 
    const [selectedSpeciality, setSelectedSpeciality] = useState(''); 
    const [doctors, setDoctors] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const hospitals = ['Swelis Hospital', 'Ayama Hospital', 'City General'];
    const specialities = [
        'Allergy & Immunology', 'Cardiology', 'Dental', 'Dermatology', 
        'Endocrinology', 'ENT (Ear Nose Throat)', 'General', 'Neurology',
        'OBGYN', 'Ophthalmology', 'Orthopedics', 'Pediatrics' 
    ];

    const handleHospitalChange = (event) => {
        setSelectedHospital(event.target.value);
    };

    const handleSpecialityChange = (event) => {
        setSelectedSpeciality(event.target.value);
    };

    const handleFindClick = async () => {
        if (!selectedHospital || !selectedSpeciality) {
            alert('Please select a Hospital and a Speciality before searching.');
            return;
        }

        setIsLoading(true);
        setError(null);
        setDoctors(null); 

        try {
            const results = await fetchDoctors(selectedHospital, selectedSpeciality);
            
            setDoctors(results); 
        } catch (err) {
            console.error("Fetch error:", err);
            setError('Could not retrieve data from the server. Please check the network.');
            setDoctors([]);
        } finally {
            setIsLoading(false);
        }
    };

    // --- Rendering ---
    return(
        <div className="filter-section">
            <h2>Find a Doctor</h2>

            <label>Choose Hospital</label>
            <select 
                className="filter-select"
                value={selectedHospital}
                onChange={handleHospitalChange}
            >
                <option value="" disabled>Select Hospital</option> 
                {hospitals.map(hospital => (
                    <option key={hospital} value={hospital}>{hospital}</option>
                ))}
            </select>

            <label>Choose Speciality</label>
            <select 
                className="filter-select"
                value={selectedSpeciality}
                onChange={handleSpecialityChange}
            >
                <option value="" disabled>Select Speciality</option> 
                {specialities.map(speciality => (
                    <option key={speciality} value={speciality}>{speciality}</option>
                ))}
            </select>

            <button 
                className="find-btn" 
                onClick={handleFindClick}
                disabled={isLoading}
            >
                {isLoading ? 'Searching...' : 'Find'}
            </button>
            
            <div className="results-section">

                {isLoading && <p className="status-message">Searching for doctors...</p>}

                {error && <p className="error-message">❌ {error}</p>}
                
                {!isLoading && doctors !== null && (
                    doctors.length > 0 ? (
                        <>
                            <h3>Results ({doctors.length} Doctors Found)</h3>
                            <div className="doctor-list">
                                {doctors.map((doctor, index) => (
                                    <div key={index} className="doctor-card">
                                        <p className="doctor-name">Dr. {doctor.name}</p>
                                        <p className="doctor-details">{doctor.degree} | {doctor.speciality}</p>
                                        <p className="doctor-timing">Available: *{doctor.timing}*</p>
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : (
                        <p className="status-message">😔 No doctors found matching the criteria.</p>
                    )
                )}
            </div>
        </div>
    )
}