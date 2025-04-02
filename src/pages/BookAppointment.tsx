import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import { addDays, format } from 'date-fns';
import { useAuth } from '@/context/AuthContext';
import { AppointmentStepIndicator } from '@/components/appointment/AppointmentStepIndicator';
import { SelectProviderStep } from '@/components/appointment/SelectProviderStep';
import { DateTimeStep } from '@/components/appointment/DateTimeStep';
import { ConfirmationStep } from '@/components/appointment/ConfirmationStep';
import { timeSlots } from '@/components/appointment/data/mockData';
import { fetchHospitals, fetchDoctors, bookAppointment } from '@/lib/api';
import { DoctorWithProfile, HospitalWithProfile } from '@/lib/database.types';

export default function BookAppointment() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [date, setDate] = useState<Date | undefined>(addDays(new Date(), 1));
  const [hospital, setHospital] = useState<string | null>(null);
  const [specialty, setSpecialty] = useState<string | null>(null);
  const [doctors, setDoctors] = useState<DoctorWithProfile[]>([]);
  const [allDoctors, setAllDoctors] = useState<DoctorWithProfile[]>([]);
  const [hospitals, setHospitals] = useState<HospitalWithProfile[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(true);

  // Fetch hospitals and doctors on component mount
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      
      try {
        // Fetch hospitals using our API function
        const hospitalsData = await fetchHospitals();
        setHospitals(hospitalsData);
        
        // Fetch all doctors using our API function
        const doctorsData = await fetchDoctors();
        setAllDoctors(doctorsData);
      } catch (error: any) {
        console.error('Error fetching data:', error);
        toast.error('Failed to load hospitals and doctors');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter doctors when hospital and specialty change
  useEffect(() => {
    if (hospital && specialty) {
      setLoading(true);
      fetchDoctors(hospital, specialty)
        .then(filteredDoctors => {
          setDoctors(filteredDoctors);
          setSelectedDoctor(null);
        })
        .catch(error => {
          console.error('Error fetching doctors:', error);
          toast.error('Failed to load doctors');
          setDoctors([]);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setDoctors([]);
      setSelectedDoctor(null);
    }
  }, [hospital, specialty]);

  // Get specialties for the selected hospital
  const getSpecialties = () => {
    if (!hospital) return [];
    const selectedHospital = hospitals.find(h => h.id === hospital);
    return selectedHospital?.specialties || [];
  };

  const handleSubmit = async (data: { reason: string }) => {
    if (!user || !date || !hospital || !specialty || !selectedDoctor || !selectedTime) {
      toast.error('Please fill in all fields');
      return;
    }
    
    try {
      // Format date and time
      const [hours, minutes] = selectedTime.split(':').map(Number);
      const appointmentDate = new Date(date);
      appointmentDate.setHours(hours);
      appointmentDate.setMinutes(minutes);
      
      // Create appointment in database using our API function
      await bookAppointment({
        patientId: user.id,
        doctorId: selectedDoctor,
        hospitalId: hospital,
        date: appointmentDate,
        notes: data.reason
      });
      
      toast.success('Appointment booked successfully!');
      navigate('/patient'); // Redirect to patient dashboard
    } catch (error: any) {
      console.error('Error booking appointment:', error);
      toast.error(error.message || 'Failed to book appointment');
    }
  };

  if (!user) {
    return (
      <div className="med-container">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">You need to be logged in to book an appointment</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="med-container">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Book an Appointment</h1>
        
        <AppointmentStepIndicator currentStep={step} />
        
        {step === 1 && (
          <SelectProviderStep 
            hospitals={hospitals}
            doctors={doctors}
            hospital={hospital}
            specialty={specialty}
            selectedDoctor={selectedDoctor}
            setHospital={setHospital}
            setSpecialty={setSpecialty}
            setSelectedDoctor={setSelectedDoctor}
            onNext={() => setStep(2)}
            getSpecialties={getSpecialties}
            isLoading={loading}
          />
        )}
        
        {step === 2 && (
          <DateTimeStep
            date={date}
            setDate={setDate}
            selectedTime={selectedTime}
            setSelectedTime={setSelectedTime}
            onNext={() => setStep(3)}
            onBack={() => setStep(1)}
            timeSlots={timeSlots}
          />
        )}
        
        {step === 3 && (
          <ConfirmationStep
            hospital={hospital}
            specialty={specialty}
            selectedDoctor={selectedDoctor}
            date={date}
            selectedTime={selectedTime}
            user={user}
            onBack={() => setStep(2)}
            onSubmit={handleSubmit}
            hospitals={hospitals}
            doctors={allDoctors}
          />
        )}
      </div>
    </div>
  );
}
