import { supabase } from '@/integrations/supabase/client';
import { User, Appointment, Medicine } from '@/lib/types';
import { toast } from '@/hooks/use-toast';
import { DbHospital, DbDoctor, DoctorWithProfile, PatientWithProfile, HospitalWithProfile } from '@/lib/database.types';

// Fetch patient appointments with doctor and hospital details
export async function fetchPatientAppointments(patientId: string) {
  try {
    const { data, error } = await supabase
      .from('appointments')
      .select(`
        id,
        patient_id,
        doctor_id,
        hospital_id,
        date,
        status,
        notes,
        follow_up,
        doctors:doctor_id(
          id,
          specialization,
          profiles:id(name)
        ),
        hospitals:hospital_id(
          id,
          profiles:id(name)
        )
      `)
      .eq('patient_id', patientId);
    
    if (error) {
      throw error;
    }
    
    return data.map((app: any) => ({
      id: app.id,
      patientId: app.patient_id,
      doctorId: app.doctor_id,
      hospitalId: app.hospital_id,
      date: new Date(app.date),
      status: app.status,
      notes: app.notes,
      followUp: app.follow_up ? new Date(app.follow_up) : undefined,
      doctorName: app.doctors?.profiles?.name || 'Unknown Doctor',
      hospitalName: app.hospitals?.profiles?.name || 'Unknown Hospital',
      specialization: app.doctors?.specialization || 'General Medicine'
    }));
  } catch (error: any) {
    console.error('Error fetching appointments:', error);
    toast.error('Failed to load appointments');
    return [];
  }
}

// Fetch doctor appointments with patient and hospital details
export async function fetchDoctorAppointments(doctorId: string) {
  try {
    const { data, error } = await supabase
      .from('appointments')
      .select(`
        id,
        patient_id,
        doctor_id,
        hospital_id,
        date,
        status,
        notes,
        follow_up,
        patients:patient_id(
          id,
          profiles:id(name),
          dob,
          gender
        ),
        hospitals:hospital_id(
          id,
          profiles:id(name)
        )
      `)
      .eq('doctor_id', doctorId);
    
    if (error) {
      throw error;
    }
    
    return data.map((app: any) => ({
      id: app.id,
      patientId: app.patient_id,
      doctorId: app.doctor_id,
      hospitalId: app.hospital_id,
      date: new Date(app.date),
      status: app.status,
      notes: app.notes,
      followUp: app.follow_up ? new Date(app.follow_up) : undefined,
      patientName: app.patients?.profiles?.name || 'Unknown Patient',
      patientDob: app.patients?.dob ? new Date(app.patients.dob) : undefined,
      patientGender: app.patients?.gender || 'Unknown',
      hospitalName: app.hospitals?.profiles?.name || 'Unknown Hospital'
    }));
  } catch (error: any) {
    console.error('Error fetching appointments:', error);
    toast.error('Failed to load appointments');
    return [];
  }
}

// Fetch medications for a patient
export async function fetchPatientMedications(patientId: string) {
  try {
    const { data, error } = await supabase
      .from('medicines')
      .select(`
        id,
        name,
        dosage,
        frequency,
        start_date,
        end_date,
        notes,
        patient_id,
        doctor_id,
        doctors:doctor_id(
          id,
          profiles:id(name)
        )
      `)
      .eq('patient_id', patientId);
    
    if (error) {
      throw error;
    }
    
    return data.map((med: any) => ({
      id: med.id,
      name: med.name,
      dosage: med.dosage,
      frequency: med.frequency,
      startDate: new Date(med.start_date),
      endDate: med.end_date ? new Date(med.end_date) : undefined,
      notes: med.notes,
      patientId: med.patient_id,
      doctorId: med.doctor_id,
      doctorName: med.doctors?.profiles?.name || 'Unknown Doctor'
    }));
  } catch (error: any) {
    console.error('Error fetching medications:', error);
    toast.error('Failed to load medications');
    return [];
  }
}

// Submit a health survey
export async function submitHealthSurvey(surveyData: any) {
  try {
    const { data, error } = await supabase
      .from('health_surveys')
      .insert([surveyData])
      .select();
    
    if (error) {
      throw error;
    }
    
    return data[0];
  } catch (error: any) {
    console.error('Error submitting health survey:', error);
    toast.error('Failed to submit health survey');
    throw error;
  }
}

// Submit medication feedback as part of a health survey
export async function submitMedicationFeedback(feedbackData: any) {
  try {
    const { data, error } = await supabase
      .from('medication_feedback')
      .insert([feedbackData])
      .select();
    
    if (error) {
      throw error;
    }
    
    return data[0];
  } catch (error: any) {
    console.error('Error submitting medication feedback:', error);
    toast.error('Failed to submit medication feedback');
    throw error;
  }
}

// Fetch all hospitals with their profiles
export async function fetchHospitals() {
  try {
    // First, fetch hospitals
    const { data: hospitalsData, error: hospitalsError } = await supabase
      .from('hospitals')
      .select(`
        id,
        address,
        phone,
        specialties
      `);
    
    if (hospitalsError) {
      throw hospitalsError;
    }

    // Then, fetch profiles for those hospitals
    const hospitalIds = hospitalsData.map(h => h.id);
    const { data: profilesData, error: profilesError } = await supabase
      .from('profiles')
      .select(`
        id,
        name,
        email,
        role
      `)
      .in('id', hospitalIds);

    if (profilesError) {
      throw profilesError;
    }

    // Combine the data
    const hospitals: HospitalWithProfile[] = hospitalsData.map(hospital => {
      const profile = profilesData.find(p => p.id === hospital.id);
      return {
        ...hospital,
        profile: profile ? {
          id: profile.id,
          name: profile.name,
          email: profile.email,
          role: profile.role
        } : undefined
      };
    });
    
    return hospitals;
  } catch (error: any) {
    console.error('Error fetching hospitals:', error);
    toast.error('Failed to load hospitals');
    return [];
  }
}

// Fetch all doctors or doctors by hospital and/or specialization
export async function fetchDoctors(hospitalId?: string, specialization?: string) {
  try {
    // First, fetch doctors with the appropriate filters
    let query = supabase
      .from('doctors')
      .select(`
        id,
        specialization,
        hospital_id,
        qualification,
        experience
      `);
    
    if (hospitalId) {
      query = query.eq('hospital_id', hospitalId);
    }
    
    if (specialization) {
      query = query.eq('specialization', specialization);
    }
    
    const { data: doctorsData, error: doctorsError } = await query;
    
    if (doctorsError) {
      throw doctorsError;
    }

    // Then, fetch profiles for those doctors
    const doctorIds = doctorsData.map(d => d.id);
    
    if (doctorIds.length === 0) {
      return []; // No doctors found with the given criteria
    }
    
    const { data: profilesData, error: profilesError } = await supabase
      .from('profiles')
      .select(`
        id,
        name,
        email,
        role
      `)
      .in('id', doctorIds);

    if (profilesError) {
      throw profilesError;
    }

    // Fetch hospital data if needed
    const hospitalIds = doctorsData
      .filter(d => d.hospital_id)
      .map(d => d.hospital_id as string);
    
    let hospitalsData: any[] = [];
    let hospitalProfiles: any[] = [];
    
    if (hospitalIds.length > 0) {
      const { data: hospitals, error: hospitalsError } = await supabase
        .from('hospitals')
        .select(`
          id,
          address,
          phone,
          specialties
        `)
        .in('id', hospitalIds);
      
      if (hospitalsError) {
        throw hospitalsError;
      }
      
      hospitalsData = hospitals;
      
      // Fetch profiles for hospitals
      const { data: hospProfiles, error: hospProfilesError } = await supabase
        .from('profiles')
        .select(`
          id,
          name,
          email
        `)
        .in('id', hospitalIds);
        
      if (hospProfilesError) {
        throw hospProfilesError;
      }
      
      hospitalProfiles = hospProfiles;
    }

    // Combine the data
    const doctors: DoctorWithProfile[] = doctorsData.map(doctor => {
      const profile = profilesData.find(p => p.id === doctor.id);
      let hospital = undefined;
      
      if (doctor.hospital_id) {
        const hospitalData = hospitalsData.find(h => h.id === doctor.hospital_id);
        const hospitalProfile = hospitalProfiles.find(p => p.id === doctor.hospital_id);
        
        if (hospitalData) {
          hospital = {
            ...hospitalData,
            profile: hospitalProfile || null
          };
        }
      }
      
      return {
        ...doctor,
        profile: profile || undefined,
        hospital
      } as DoctorWithProfile;
    });
    
    return doctors;
  } catch (error: any) {
    console.error('Error fetching doctors:', error);
    toast.error('Failed to load doctors');
    return [];
  }
}

// Book a new appointment
export async function bookAppointment(appointmentData: {
  patientId: string;
  doctorId: string;
  hospitalId: string;
  date: Date;
  notes?: string;
}) {
  try {
    const { data, error } = await supabase
      .from('appointments')
      .insert([{
        patient_id: appointmentData.patientId,
        doctor_id: appointmentData.doctorId,
        hospital_id: appointmentData.hospitalId,
        date: appointmentData.date.toISOString(),
        status: 'scheduled',
        notes: appointmentData.notes || null
      }])
      .select();
    
    if (error) {
      throw error;
    }
    
    return data[0];
  } catch (error: any) {
    console.error('Error booking appointment:', error);
    toast.error('Failed to book appointment');
    throw error;
  }
}

// Create new user accounts with different roles
export async function createUserAccount(userData: {
  email: string;
  password: string;
  name: string;
  role: 'patient' | 'doctor' | 'hospital' | 'caretaker';
  additionalData?: any;
}) {
  try {
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: userData.email,
      password: userData.password,
      options: {
        data: {
          name: userData.name,
          role: userData.role,
          ...userData.additionalData
        }
      }
    });
    
    if (authError) {
      throw authError;
    }
    
    if (!authData.user) {
      throw new Error('Failed to create user account');
    }
    
    return authData.user;
  } catch (error: any) {
    console.error('Error creating user account:', error);
    toast.error('Failed to create user account');
    throw error;
  }
}
