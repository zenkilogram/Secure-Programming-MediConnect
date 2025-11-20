import "./doctor.css"
export default function Doctors() {
    return(
        <div className="filter-section">
        <h2>Find a Doctor</h2>

        <label>Choose Hospital</label>
        <select className="filter-select">
            <option>Select Hospital</option>
            <option>Swelis Hospital</option>
            <option>Ayama Hospital</option>
        </select>

        <label>Choose Speciality</label>
        <select className="filter-select">
            <option>Select Speciality</option>
            <option>Allergy & Immunology</option>
            <option>Cardiology</option>
            <option>Dental</option>
            <option>Dermatology</option>
            <option>Endocrinology</option>
            <option>ENT (Ear Nose Throat)</option>
            <option>General</option>
            <option>Hematology</option>
            <option>Neurology</option>
            <option>OBGYN</option>
            <option>Ophthalmology</option>
            <option>Orthopedics</option>
            <option>Pediatrics</option>
            <option>Pulmonology</option>
            <option>Psychiatry</option>
            <option>Rehabilitation</option>
        </select>

        <button className="find-btn">Find</button>
        </div>
    )
}