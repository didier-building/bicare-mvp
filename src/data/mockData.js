// Shared mock data for the BiCare MVP
export const redFlagSamples = [
  { 
    id: "rf1", 
    patient: "Solange N.", 
    symptom: "Severe dizziness", 
    sev: "high", 
    mins: 2,
    condition: "Hypertension",
    facility: "Kimisagara HC",
    vitals: { bp: "136/84", hr: "76", temp: "37.2°C", o2: "98%" },
    medications: ["Amlodipine 5mg", "Paracetamol PRN"],
    allergies: ["None known"],
    aiSuggestion: "Monitor BP, consider orthostatic vitals",
    aiConfidence: 85,
    status: "pending"
  },
  { 
    id: "rf2", 
    patient: "Jean P.", 
    symptom: "Bleeding at wound site", 
    sev: "critical", 
    mins: 0,
    condition: "Post-operative",
    facility: "Kigali Hospital",
    vitals: { bp: "110/70", hr: "92", temp: "36.8°C", o2: "96%" },
    medications: ["Cefazolin", "Tramadol"],
    allergies: ["Penicillin"],
    aiSuggestion: "Immediate wound assessment, pressure dressing",
    aiConfidence: 95,
    status: "pending"
  },
  { 
    id: "rf3", 
    patient: "Claudine U.", 
    symptom: "Chest pain", 
    sev: "high", 
    mins: 7,  // Changed from 4 to 7 to show SLA progress bar
    condition: "Diabetes",
    facility: "Nyagatare HC",
    vitals: { bp: "145/90", hr: "88", temp: "36.9°C", o2: "97%" },
    medications: ["Metformin", "Aspirin"],
    allergies: ["Sulfa drugs"],
    aiSuggestion: "ECG recommended, cardiac assessment",
    aiConfidence: 78,
    status: "pending"
  },
  { 
    id: "rf4", 
    patient: "Marie T.", 
    symptom: "Difficulty breathing", 
    sev: "high", 
    mins: 9,  // Close to SLA breach
    condition: "Asthma",
    facility: "Muhanga HC",
    vitals: { bp: "125/80", hr: "102", temp: "37.1°C", o2: "93%" },
    medications: ["Salbutamol", "Prednisolone"],
    allergies: ["Aspirin"],
    aiSuggestion: "Oxygen therapy, nebulizer treatment",
    aiConfidence: 92,
    status: "pending"
  },
];

export const chatSamples = [
  {
    id: "chat1",
    patient: "Solange N.",
    priority: "normal",
    lastMessage: "Ndumva umutwe unyerera...",
    timestamp: "2m ago",
    isRelatedToRedFlag: true,
    redFlagId: "rf1"
  },
  {
    id: "chat2", 
    patient: "Jean P.",
    priority: "urgent",
    lastMessage: "Kuraguza amaraso...",
    timestamp: "30s ago",
    isRelatedToRedFlag: true,
    redFlagId: "rf2"
  },
  {
    id: "chat3",
    patient: "Claudine U.", 
    priority: "normal",
    lastMessage: "Ndumva umutwe unyerera...",
    timestamp: "5m ago",
    isRelatedToRedFlag: true,
    redFlagId: "rf3"
  }
];

export const commonTemplates = [
  { id: "t1", text: "Please monitor symptoms for 30 minutes and report any changes" },
  { id: "t2", text: "Take your medication as prescribed and rest" },
  { id: "t3", text: "If symptoms worsen, seek immediate medical attention" },
  { id: "t4", text: "Your case has been escalated to a doctor who will contact you shortly" }
];