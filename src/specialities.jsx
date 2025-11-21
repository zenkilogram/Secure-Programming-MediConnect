import { Link, Route } from "react-router-dom";
import "./specialities.css";

export default function Specialities() {
    const specialties = [
    { id: 1, name: "Allergy & Immunology", icon: "🤧" },
    { id: 2, name: "Cardiology", icon: "❤️" },
    { id: 3, name: "Dental", icon: "🦷" },
    { id: 4, name: "Dermatology", icon: "🌞" },
    { id: 5, name: "Endocrinology", icon: "🧬" },
    { id: 6, name: "ENT (Ear Nose Throat)", icon: "👂" },
    { id: 7, name: "General", icon: "⚕️" },
    { id: 8, name: "Hematology", icon: "🩸" },
    { id: 9, name: "Neurology", icon: "🧠" },
    { id: 10, name: "OBGYN", icon: "🤰"},
    { id: 11, name: "Ophthalmology", icon: "👁️" },
    { id: 12, name: "Orthopedics", icon: "🦴" },
    { id: 13, name: "Pediatrics", icon: "🧸" },
    { id: 14, name: "Pulmonology", icon: "🫁" },
    { id: 15,  name: "Psychiatry", icon: "🧩" },
    { id: 16, name: "Rehabilitation", icon: "🦽" },
  ];
    
    return (
    <div className="specialities-page">
        <h2>Specialities</h2>
        <div className="specialities-grid">
            {specialties.map((s) => (
                <Link to={`/specialities/${s.id}`} className="specialities-card">
                <div className="specialities-icon">{s.icon}</div>
                <div className="specialities-name">{s.name}</div>
                </Link>
            ))}
        </div>
    </div>


    );
        
}