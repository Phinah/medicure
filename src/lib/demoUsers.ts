
// Demo user accounts for testing the application
export const demoUsers = {
  patient: {
    email: 'patient@example.com',
    password: 'password123',
    name: 'John Patient',
    role: 'patient'
  },
  doctor: {
    email: 'doctor@example.com',
    password: 'password123',
    name: 'Dr. Jane Doctor',
    role: 'doctor',
    specialization: 'Cardiology'
  },
  hospital: {
    email: 'hospital@example.com',
    password: 'password123',
    name: 'Med Central Hospital',
    role: 'hospital'
  },
  caretaker: {
    email: 'caretaker@example.com',
    password: 'password123',
    name: 'Robert Caretaker',
    role: 'caretaker'
  },
  multiRole: {
    email: 'multi@example.com',
    password: 'password123',
    name: 'Multi Role User',
    roles: ['patient', 'doctor', 'hospital', 'caretaker']
  }
};

// This function would be used to create these users in the database
export async function createDemoUsers() {
  // Implementation would go here to create these users in Supabase Auth
  // This would typically be run once during development/testing setup
}
