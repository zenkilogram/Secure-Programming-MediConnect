import { useParams } from "react-router-dom";
import "./specdetail.css";

export default function SpecialityDetail() {
  const { id } = useParams();

  const data = {
    1: { name: "Allergy & Immunology",
         desc: `
         Our Allergy & Immunology specialty focuses on identifying, treating, and preventing allergies and immune system disorders.
          From seasonal allergies to chronic immune conditions, our specialists are here to help you stay healthy and comfortable.
          Common conditions we treat:
          • Allergic rhinitis
          • Asthma
          • Food and drug allergies
          • Autoimmune disorders
         `
    },

    2: { name: "Cardiology", desc:`
Our Cardiology specialty focuses on the diagnosis, treatment, and prevention of heart and blood vessel diseases.
From routine check-ups to managing complex conditions, our cardiologists help you maintain a healthy heart.
Common conditions we treat:
• Hypertension
• Coronary artery disease
• Arrhythmia`},
    3: {name: "Dental", desc:`
Our Dental specialty provides comprehensive care for your teeth, gums, and oral health.
From routine cleanings to advanced dental treatments, we ensure a confident and healthy smile.
Common conditions we treat:
• Cavities
• Gum disease
• Tooth sensitivity`},
    4: {name: "Dermatology", desc:`
Our Dermatology specialty focuses on skin, hair, and nail health.
Whether it’s acne, rashes, or chronic skin conditions, we provide personalized care for all ages.
Common conditions we treat:
• Acne
• Eczema
• Psoriasis`},
    5: {name: "Endocrinology", desc:`
Our Endocrinology specialty deals with hormone-related disorders and metabolic conditions.
We help diagnose and manage issues affecting your hormones and overall body balance.
Common conditions we treat:
• Diabetes
• Thyroid disorders
• Hormonal imbalances`},
    6: {name: "ENT (Ear Nose Throat)", desc:`
Our ENT specialty treats conditions affecting the ear, nose, and throat.
From hearing concerns to sinus issues, we provide expert care to improve daily comfort.
Common conditions we treat:
• Sinusitis
• Hearing problems
• Tonsillitis`},
    7: {name: "General", desc:`
Our General practice provides overall medical care for a variety of health concerns.
We offer routine check-ups, preventive care, and treatment for common illnesses.
Common conditions we treat:
• Fever
• Cough and cold
• Minor infections`},
    8: {name: "Hematology", desc:`
Our Hematology specialty focuses on blood disorders and related conditions.
We provide expert evaluation and long-term management for various blood-related issues.
Common conditions we treat:
• Anemia
• Clotting disorders
• Blood cancers (evaluation only)`},
    9: {name: "Neurology", desc:`
Our Neurology specialty handles disorders of the brain, nerves, and nervous system.
We help diagnose and manage conditions that affect movement, sensation, and cognition.
Common conditions we treat:
• Migraine
• Epilepsy
• Neuropathy`},
    10: {name: "OBGYN", desc:`
Our OBGYN specialty covers women’s reproductive health, pregnancy, and childbirth.
We provide supportive care from routine check-ups to advanced treatments.
Common conditions we treat:
• Pregnancy care
• Menstrual disorders
• Fertility concerns`},
    11: {name: "Ophthalmology", desc:`
Our Ophthalmology specialty focuses on eye health and vision care.
We offer complete eye examinations and treatment for eye diseases.
Common conditions we treat:
• Cataracts
• Glaucoma
• Vision problems`},
    12: {name: "Orthopedics", desc:`
Our Orthopedics specialty treats bone, joint, and muscle conditions.
We help restore mobility and reduce pain caused by injuries or chronic issues.
Common conditions we treat:
• Fractures
• Arthritis
• Joint pain`},
    13: {name: "Pediatrics", desc:`
Our Pediatrics specialty provides medical care for babies, children, and teenagers.
We ensure your child grows healthy through preventive care and treatment.
Common conditions we treat:
• Fever
• Respiratory infections
• Growth concerns`},
    14: {name: "Pulmonology", desc:`
Our Pulmonology specialty focuses on lung and respiratory health.
We diagnose and manage conditions that affect breathing and lung function.
Common conditions we treat:
• Asthma
• Pneumonia
• Chronic cough`},
    15: {name: "Psychiatry", desc:`
Our Psychiatry specialty treats mental, emotional, and behavioral disorders.
We provide a safe, supportive environment for your mental well-being.
Common conditions we treat:
• Anxiety
• Depression
• Stress-related disorders`},
    16: {name: "Rehabilitation", desc:`
 Our Rehabilitation specialty helps patients recover strength and mobility after injury, surgery, or illness.
We create personalized programs to support long-term recovery.
Common services include:
• Physical therapy
• Occupational therapy
• Post-surgery rehabilitation`}
  };

  const spec = data[Number(id)];

  return (
    <div className="speciality-detail">
      <h2>{spec.name}</h2>
      <p>{spec.desc}</p>
    </div>
  );
}