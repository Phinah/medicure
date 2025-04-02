
import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Appointment, Patient, HealthSurvey, Medicine } from '@/lib/types';
import { useAuth } from '@/context/AuthContext';
import { Calendar as CalendarIcon, Clock, User, Search, UserPlus, Bell } from 'lucide-react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { SurveyReviewDialog } from '@/components/surveys/SurveyReviewDialog';

// Simulated data - in a real app, this would come from API calls
const mockAppointments: Appointment[] = [
  {
    id: 'app1',
    patientId: 'patient1',
    doctorId: 'doctor1',
    hospitalId: 'hospital1',
    date: new Date(2023, 7, 15, 14, 30),
    status: 'scheduled',
    notes: 'Regular checkup'
  },
  {
    id: 'app2',
    patientId: 'patient2',
    doctorId: 'doctor1',
    hospitalId: 'hospital1',
    date: new Date(2023, 7, 15, 15, 30),
    status: 'scheduled',
    notes: 'First consultation'
  },
  {
    id: 'app3',
    patientId: 'patient3',
    doctorId: 'doctor1',
    hospitalId: 'hospital1',
    date: new Date(2023, 7, 15, 16, 30),
    status: 'scheduled',
    notes: 'Follow up'
  }
];

const mockPatients: Patient[] = [
  {
    id: 'patient1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'patient',
    dob: new Date(1985, 5, 15),
    gender: 'Male',
    createdAt: new Date(),
    bloodGroup: 'A+',
    conditions: ['Hypertension', 'Diabetes']
  },
  {
    id: 'patient2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    role: 'patient',
    dob: new Date(1990, 8, 22),
    gender: 'Female',
    createdAt: new Date(),
    allergies: ['Penicillin']
  },
  {
    id: 'patient3',
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    role: 'patient',
    dob: new Date(1978, 2, 10),
    gender: 'Male',
    createdAt: new Date()
  }
];

// Mock health surveys
const mockSurveys: HealthSurvey[] = [
  {
    id: 'survey1',
    patientId: 'patient1',
    date: new Date(2023, 7, 15, 8, 30),
    feeling: 'worse',
    symptoms: ['fever', 'headache', 'fatigue'],
    notes: 'Experiencing increased pain and fever since starting new medication.',
    notifyDoctor: true,
    notifyCaretaker: true
  },
  {
    id: 'survey2',
    patientId: 'patient2',
    date: new Date(2023, 7, 14, 18, 15),
    feeling: 'same',
    symptoms: ['nausea'],
    notes: 'New side effects from medication include mild nausea after taking morning dose.',
    notifyDoctor: true,
    notifyCaretaker: true
  },
  {
    id: 'survey3',
    patientId: 'patient3',
    date: new Date(2023, 7, 12, 9, 0),
    feeling: 'better',
    symptoms: [],
    notes: 'Feeling much better after treatment. Pain has subsided.',
    notifyDoctor: true,
    notifyCaretaker: false
  }
];

// Mock medications
const mockMedications: Medicine[] = [
  {
    id: 'med1',
    name: 'Amoxicillin',
    dosage: '500mg',
    frequency: 'Every 8 hours',
    startDate: new Date(2023, 7, 10),
    endDate: new Date(2023, 7, 17),
    notes: 'Take with food',
    patientId: 'patient1',
    doctorId: 'doctor1'
  },
  {
    id: 'med2',
    name: 'Ibuprofen',
    dosage: '400mg',
    frequency: 'Every 6 hours as needed',
    startDate: new Date(2023, 7, 13),
    patientId: 'patient1',
    doctorId: 'doctor1'
  },
  {
    id: 'med3',
    name: 'Loratadine',
    dosage: '10mg',
    frequency: 'Once daily',
    startDate: new Date(2023, 7, 8),
    patientId: 'patient2',
    doctorId: 'doctor1'
  }
];

export default function DoctorDashboard() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [surveys, setSurveys] = useState<HealthSurvey[]>([]);
  const [medications, setMedications] = useState<Medicine[]>([]);
  
  // State for the survey review dialog
  const [selectedSurvey, setSelectedSurvey] = useState<HealthSurvey | null>(null);
  const [isSurveyDialogOpen, setIsSurveyDialogOpen] = useState(false);

  useEffect(() => {
    // Simulate API call to fetch data
    setTimeout(() => {
      setAppointments(mockAppointments);
      setPatients(mockPatients);
      setSurveys(mockSurveys);
      setMedications(mockMedications);
    }, 500);
  }, []);

  const todaysAppointments = appointments.filter(
    app => format(app.date, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd')
  ).sort((a, b) => a.date.getTime() - b.date.getTime());

  const filteredPatients = patients.filter(
    patient => patient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenSurvey = (survey: HealthSurvey) => {
    setSelectedSurvey(survey);
    setIsSurveyDialogOpen(true);
  };

  const getPatientName = (patientId: string) => {
    const patient = patients.find(p => p.id === patientId);
    return patient ? patient.name : 'Unknown Patient';
  };

  const getPatientMedications = (patientId: string) => {
    return medications.filter(med => med.patientId === patientId);
  };

  return (
    <div className="med-container">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Welcome, {user?.name}</h1>
        <div className="flex gap-2">
          <Button variant="outline">
            <Bell className="h-4 w-4 mr-2" />
            Notifications
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview">
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
          <TabsTrigger value="patients">Patients</TabsTrigger>
          <TabsTrigger value="surveys">Health Surveys</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">Today's Appointments</CardTitle>
                <CalendarIcon className="w-4 h-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{todaysAppointments.length}</p>
                <p className="text-xs text-muted-foreground">
                  For {format(new Date(), 'MMMM d, yyyy')}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
                <User className="w-4 h-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{patients.length}</p>
                <p className="text-xs text-muted-foreground">
                  Under your care
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">Pending Surveys</CardTitle>
                <Bell className="w-4 h-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">2</p>
                <p className="text-xs text-muted-foreground">
                  Requiring review
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Today's Schedule</CardTitle>
              <CardDescription>
                Your appointments for today, {format(new Date(), 'MMMM d, yyyy')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {todaysAppointments.length > 0 ? (
                <div className="space-y-4">
                  {todaysAppointments.map((appointment, index) => {
                    const patient = patients.find(p => p.id === appointment.patientId);
                    return (
                      <div key={appointment.id} className="flex items-start space-x-4 p-4 border rounded-lg">
                        <div className="bg-medblue-100 p-3 rounded-full">
                          <Clock className="h-5 w-5 text-medblue-700" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className="font-medium">{patient?.name || 'Unknown Patient'}</p>
                            <p className="text-sm text-muted-foreground">
                              {format(appointment.date, 'h:mm a')}
                            </p>
                          </div>
                          <p className="mt-1 text-sm">{appointment.notes}</p>
                          <div className="flex gap-2 mt-4">
                            <Button size="sm" variant="outline">View Details</Button>
                            <Button size="sm">Start Consultation</Button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-8">
                  <CalendarIcon className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-2 text-lg font-medium">No appointments today</h3>
                  <p className="text-muted-foreground">You have no scheduled appointments for today.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="appointments">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>All Appointments</CardTitle>
                <CardDescription>Manage your scheduled appointments</CardDescription>
              </div>
              <Button>Add Appointment</Button>
            </CardHeader>
            <CardContent>
              {appointments.length > 0 ? (
                <div className="space-y-4">
                  {appointments.map(appointment => {
                    const patient = patients.find(p => p.id === appointment.patientId);
                    return (
                      <div key={appointment.id} className="flex items-start space-x-4 p-4 border rounded-lg">
                        <div className="bg-medblue-100 p-3 rounded-full">
                          <CalendarIcon className="h-5 w-5 text-medblue-700" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className="font-medium">{patient?.name || 'Unknown Patient'}</p>
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              appointment.status === 'scheduled' ? 'bg-medblue-100 text-medblue-800' : 
                              appointment.status === 'completed' ? 'bg-medgreen-100 text-medgreen-800' : 
                              'bg-red-100 text-red-800'
                            }`}>
                              {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {format(appointment.date, 'MMMM d, yyyy')} at {format(appointment.date, 'h:mm a')}
                          </p>
                          <p className="mt-2">{appointment.notes}</p>
                          <div className="flex gap-2 mt-4">
                            <Button size="sm" variant="outline">View Details</Button>
                            {appointment.status === 'scheduled' && (
                              <Button size="sm">Start Consultation</Button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-8">
                  <CalendarIcon className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-2 text-lg font-medium">No appointments</h3>
                  <p className="text-muted-foreground">You have no scheduled appointments.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="patients">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>My Patients</CardTitle>
                <CardDescription>Manage and view patient information</CardDescription>
              </div>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search patients..."
                    className="w-64 pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button>
                  <UserPlus className="h-4 w-4 mr-2" />
                  Add Patient
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {filteredPatients.length > 0 ? (
                <div className="space-y-4">
                  {filteredPatients.map(patient => (
                    <div key={patient.id} className="flex items-start space-x-4 p-4 border rounded-lg">
                      <div className="bg-medblue-100 p-3 rounded-full">
                        <User className="h-5 w-5 text-medblue-700" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="font-medium">{patient.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {patient.gender}, {new Date().getFullYear() - patient.dob.getFullYear()} years
                          </p>
                        </div>
                        <p className="text-sm text-muted-foreground">{patient.email}</p>
                        
                        {(patient.conditions || patient.allergies) && (
                          <div className="mt-2 flex flex-wrap gap-2">
                            {patient.conditions?.map(condition => (
                              <span key={condition} className="px-2 py-1 text-xs rounded-full bg-medblue-100 text-medblue-800">
                                {condition}
                              </span>
                            ))}
                            {patient.allergies?.map(allergy => (
                              <span key={allergy} className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800">
                                Allergy: {allergy}
                              </span>
                            ))}
                          </div>
                        )}
                        
                        <div className="flex gap-2 mt-4">
                          <Button size="sm" variant="outline">View Profile</Button>
                          <Button size="sm" variant="outline">Medical Records</Button>
                          <Button size="sm">Schedule Appointment</Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <User className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-2 text-lg font-medium">No patients found</h3>
                  <p className="text-muted-foreground">
                    {searchTerm ? `No patients match "${searchTerm}"` : "You don't have any patients yet"}
                  </p>
                  {!searchTerm && <Button className="mt-4">Add New Patient</Button>}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="surveys">
          <Card>
            <CardHeader>
              <CardTitle>Health Surveys</CardTitle>
              <CardDescription>Patient health status updates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {surveys.map(survey => {
                  const patientName = getPatientName(survey.patientId);
                  const needsReview = survey.feeling === 'worse';
                  
                  return (
                    <div 
                      key={survey.id} 
                      className={`flex items-start space-x-4 p-4 border rounded-lg ${
                        needsReview ? 'bg-amber-50' : ''
                      }`}
                    >
                      <div className={`p-3 rounded-full ${
                        survey.feeling === 'better' ? 'bg-medgreen-100' : 
                        survey.feeling === 'worse' ? 'bg-amber-100' : 
                        'bg-medblue-100'
                      }`}>
                        <Bell className={`h-5 w-5 ${
                          survey.feeling === 'better' ? 'text-medgreen-700' : 
                          survey.feeling === 'worse' ? 'text-amber-700' : 
                          'text-medblue-700'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="font-medium">{patientName}</p>
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            survey.feeling === 'better' ? 'bg-medgreen-100 text-medgreen-800' : 
                            survey.feeling === 'worse' ? 'bg-amber-100 text-amber-800' : 
                            'bg-medblue-100 text-medblue-800'
                          }`}>
                            {needsReview ? 'Needs Review' : 'Reviewed'}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Submitted {format(survey.date, 'PPp')}
                        </p>
                        <p className="mt-2">
                          Patient reports feeling {survey.feeling}
                          {survey.symptoms.length > 0 && ` - experiencing ${survey.symptoms.join(', ')}`}
                        </p>
                        <div className="flex gap-2 mt-4">
                          <Button size="sm" onClick={() => handleOpenSurvey(survey)}>
                            {needsReview ? 'Review Survey' : 'View Details'}
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Survey Review Dialog */}
      <SurveyReviewDialog 
        isOpen={isSurveyDialogOpen}
        onClose={() => setIsSurveyDialogOpen(false)}
        survey={selectedSurvey}
        patientName={selectedSurvey ? getPatientName(selectedSurvey.patientId) : ''}
        medicines={selectedSurvey ? getPatientMedications(selectedSurvey.patientId) : []}
      />
    </div>
  );
}
