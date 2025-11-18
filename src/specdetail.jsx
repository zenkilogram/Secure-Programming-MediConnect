import { useParams } from "react-router-dom";
import "./specdetail.css";

export default function SpecialityDetail() {
  const { id } = useParams();

  const data = {
    1: { name: "Allergy & Immunology"},
    2: { name: "Cardiology"},
    3: {name: "Dental"},
    4: {name: "Dermatology"},
    5: {name: "Endocrinology"},
    6: {name: "ENT (Ear Nose Throat)"},
    7: {name: "General"},
    8: {name: "Hematology"},
    9: {name: "Neurology"},
    10: {name: "OBGYN"},
    11: {name: "Ophthalmology"},
    12: {name: "Orthopedics"},
    13: {name: "Pediatrics"},
    14: {name: "Pulmonology"},
    15: {name: "Psychiatry"},
    16: {name: "Rehabilitation"}
  };

  const spec = data[Number(id)];

  return (
    <div className="speciality-detail">
      <h2>{spec.name}</h2>
      <p>{spec.desc}</p>
    </div>
  );
}