
// Mock data for the appointment booking page
export interface Hospital {
  id: string;
  name: string;
  specialties: string[];
}

export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  hospitalId: string;
}

export const mockHospitals: Hospital[] = [
  {
    id: 'hospital1',
    name: 'General Hospital',
    specialties: ['Cardiology', 'Dermatology', 'Neurology', 'Orthopedics', 'Pediatrics']
  },
  {
    id: 'hospital2',
    name: 'City Medical Center',
    specialties: ['Cardiology', 'Oncology', 'Ophthalmology', 'Psychiatry']
  },
  {
    id: 'hospital3',
    name: 'Community Health Hospital',
    specialties: ['Family Medicine', 'Internal Medicine', 'Geriatrics', 'Pediatrics']
  }
];

export const mockDoctors: Doctor[] = [
  {
    id: 'doctor1',
    name: 'Dr. Jane Smith',
    specialization: 'Cardiology',
    hospitalId: 'hospital1'
  },
  {
    id: 'doctor2',
    name: 'Dr. Robert Johnson',
    specialization: 'Neurology',
    hospitalId: 'hospital1'
  },
  {
    id: 'doctor3',
    name: 'Dr. Emily Chen',
    specialization: 'Pediatrics',
    hospitalId: 'hospital1'
  },
  {
    id: 'doctor4',
    name: 'Dr. Michael Lee',
    specialization: 'Cardiology',
    hospitalId: 'hospital2'
  },
  {
    id: 'doctor5',
    name: 'Dr. Sarah Wilson',
    specialization: 'Oncology',
    hospitalId: 'hospital2'
  },
  {
    id: 'doctor6',
    name: 'Dr. David Brown',
    specialization: 'Family Medicine',
    hospitalId: 'hospital3'
  }
];

export const timeSlots = [
  '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM',
  '4:00 PM', '4:30 PM'
];
