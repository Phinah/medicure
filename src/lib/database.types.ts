
import type { Database } from '@/integrations/supabase/types';

// Define convenient type shortcuts for Supabase tables
export type DbProfile = Database['public']['Tables']['profiles']['Row'];
export type DbPatient = Database['public']['Tables']['patients']['Row'];
export type DbDoctor = Database['public']['Tables']['doctors']['Row'];
export type DbHospital = Database['public']['Tables']['hospitals']['Row'];
export type DbCaretaker = Database['public']['Tables']['caretakers']['Row'];
export type DbAppointment = Database['public']['Tables']['appointments']['Row'];
export type DbMedicine = Database['public']['Tables']['medicines']['Row'];
export type DbHealthSurvey = Database['public']['Tables']['health_surveys']['Row'];
export type DbMedicationFeedback = Database['public']['Tables']['medication_feedback']['Row'];
export type DbConsultation = Database['public']['Tables']['consultations']['Row'];

// Enhanced types with joins
export type DoctorWithProfile = DbDoctor & {
  profile?: {
    id: string; 
    name: string; 
    email: string; 
    role: string;
    created_at?: string; // Making this optional
  };
  hospital?: DbHospital;
};

export type PatientWithProfile = DbPatient & {
  profile?: DbProfile;
  caretaker?: DbProfile;
};

export type AppointmentWithDetails = DbAppointment & {
  patient?: PatientWithProfile;
  doctor?: DoctorWithProfile;
  hospital?: DbHospital;
  consultation?: DbConsultation;
};

export type MedicineWithDetails = DbMedicine & {
  patient?: PatientWithProfile;
  doctor?: DoctorWithProfile;
};

export type HealthSurveyWithDetails = DbHealthSurvey & {
  patient?: PatientWithProfile;
  medicationFeedback?: DbMedicationFeedback[];
};

export type HospitalWithProfile = DbHospital & {
  profile?: {
    id: string;
    name: string;
    email: string;
    role?: string;
    created_at?: string; // Making this optional
  };
};
