
export type UserRole = "patient" | "doctor" | "hospital" | "caretaker";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: Date;
}

export interface Patient extends User {
  role: "patient";
  dob: Date;
  gender: string;
  bloodGroup?: string;
  allergies?: string[];
  conditions?: string[];
  caretakerId?: string;
}

export interface Doctor extends User {
  role: "doctor";
  specialization: string;
  hospitalId: string;
  qualification: string;
  experience: number;
}

export interface Hospital extends User {
  role: "hospital";
  address: string;
  phone: string;
  specialties: string[];
}

export interface Caretaker extends User {
  role: "caretaker";
  phone: string;
  relationship: string;
  patientIds: string[];
}

export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  hospitalId: string;
  date: Date;
  status: "scheduled" | "completed" | "cancelled";
  notes?: string;
  followUp?: Date;
}

export interface Medicine {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  startDate: Date;
  endDate?: Date;
  notes?: string;
  patientId: string;
  doctorId: string;
}

export interface HealthSurvey {
  id: string;
  patientId: string;
  date: Date;
  feeling: "better" | "same" | "worse";
  symptoms: string[];
  notes?: string;
  notifyDoctor: boolean;
  notifyCaretaker: boolean;
  medicationFeedback?: Record<string, MedicationFeedback>;
}

export interface MedicationFeedback {
  effective: boolean;
  sideEffects?: string;
}

