import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar } from '@/components/ui/calendar';
import { Appointment, Medicine } from '@/lib/types';
import { useAuth } from '@/context/AuthContext';
import { Calendar as CalendarIcon, Clock, Pill, Bell, Plus } from 'lucide-react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

export default function PatientDashboard() {
  const { user } = useAuth();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [medications, setMedications] = useState<Medicine[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchUserData();
    }
  }, [user]);

  const fetchUserData = async () => {
    if (!user) return;
    
    setLoading(true);
    
    try {
      // Fetch appointments
      const { data: appointmentsData, error: appointmentsError } = await supabase
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
        .eq('patient_id', user.id);
      
      if (appointmentsError) {
        throw appointmentsError;
      }
      
      // Fetch medications
      const { data: medicationsData, error: medicationsError } = await supabase
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
        .eq('patient_id', user.id);
      
      if (medicationsError) {
        throw medicationsError;
      }
      
      // Transform data for our component
      const formattedAppointments: Appointment[] = appointmentsData.map((app: any) => ({
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

      const formattedMedications: Medicine[] = medicationsData.map((med: any) => ({
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

      setAppointments(formattedAppointments);
      setMedications(formattedMedications);
    } catch (error: any) {
      console.error('Error fetching user data:', error);
      toast.error('Failed to load your data');
    } finally {
      setLoading(false);
    }
  };

  const upcomingAppointments = appointments
    .filter(app => app.status === 'scheduled' && app.date > new Date())
    .sort((a, b) => a.date.getTime() - b.date.getTime());

  const activeMedications = medications.filter(
    med => !med.endDate || med.endDate >= new Date()
  );

  if (loading) {
    return (
      <div className="med-container py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Loading...</h1>
        </div>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-medblue-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="med-container">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Welcome, {user?.name}</h1>
      </div>

      <Tabs defaultValue="overview">
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
          <TabsTrigger value="medications">Medications</TabsTrigger>
          <TabsTrigger value="surveys">Health Surveys</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">Upcoming Appointment</CardTitle>
                <CalendarIcon className="w-4 h-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                {upcomingAppointments.length > 0 ? (
                  <div>
                    <p className="text-lg font-bold">
                      {format(upcomingAppointments[0].date, 'MMMM d, yyyy')}
                    </p>
                    <div className="flex items-center mt-1 text-sm text-muted-foreground">
                      <Clock className="w-3 h-3 mr-1" />
                      {format(upcomingAppointments[0].date, 'h:mm a')}
                    </div>
                    <p className="mt-2">{upcomingAppointments[0].notes}</p>
                    <Button asChild variant="outline" size="sm" className="mt-4">
                      <Link to="/appointments">View all appointments</Link>
                    </Button>
                  </div>
                ) : (
                  <div>
                    <p className="text-muted-foreground">No upcoming appointments</p>
                    <Button asChild variant="outline" size="sm" className="mt-4">
                      <Link to="/book-appointment">Book an appointment</Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">Medication Reminders</CardTitle>
                <Pill className="w-4 h-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                {activeMedications.length > 0 ? (
                  <div>
                    <p className="text-lg font-bold">{activeMedications.length} Active Medications</p>
                    <div className="mt-2 space-y-2">
                      {activeMedications.slice(0, 2).map(med => (
                        <div key={med.id} className="border-l-2 border-medblue-500 pl-2">
                          <p className="font-medium">{med.name} {med.dosage}</p>
                          <p className="text-sm text-muted-foreground">{med.frequency}</p>
                        </div>
                      ))}
                    </div>
                    <Button asChild variant="outline" size="sm" className="mt-4">
                      <Link to="/medications">View all medications</Link>
                    </Button>
                  </div>
                ) : (
                  <p className="text-muted-foreground">No active medications</p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">Health Survey</CardTitle>
                <Bell className="w-4 h-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">How are you feeling today?</p>
                <Button asChild>
                  <Link to="/surveys/new">Take a quick survey</Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Appointment Calendar</CardTitle>
                <CardDescription>
                  View and manage your scheduled appointments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border"
                />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>
                    Your recent health activity and records
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="bg-medblue-100 p-2 rounded-full">
                    <CalendarIcon className="h-4 w-4 text-medblue-700" />
                  </div>
                  <div>
                    <p className="font-medium">Appointment scheduled</p>
                    <p className="text-sm text-muted-foreground">1 day ago</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-medblue-100 p-2 rounded-full">
                    <Pill className="h-4 w-4 text-medblue-700" />
                  </div>
                  <div>
                    <p className="font-medium">New medication prescribed</p>
                    <p className="text-sm text-muted-foreground">3 days ago</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="appointments">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Appointments</CardTitle>
                <CardDescription>Manage your scheduled appointments</CardDescription>
              </div>
              <Button asChild size="sm">
                <Link to="/book-appointment">
                  <Plus className="h-4 w-4 mr-2" />
                  Book Appointment
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              {appointments.length > 0 ? (
                <div className="space-y-4">
                  {appointments.map(appointment => (
                    <div key={appointment.id} className="flex items-start space-x-4 p-4 border rounded-lg">
                      <div className="bg-medblue-100 p-3 rounded-full">
                        <CalendarIcon className="h-5 w-5 text-medblue-700" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="font-medium">{format(appointment.date, 'MMMM d, yyyy')}</p>
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            appointment.status === 'scheduled' ? 'bg-medblue-100 text-medblue-800' : 
                            appointment.status === 'completed' ? 'bg-medgreen-100 text-medgreen-800' : 
                            'bg-red-100 text-red-800'
                          }`}>
                            {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          <Clock className="inline h-3 w-3 mr-1" />
                          {format(appointment.date, 'h:mm a')}
                        </p>
                        <p className="mt-2">{appointment.notes}</p>
                        <div className="flex gap-2 mt-4">
                          <Button size="sm" variant="outline">View Details</Button>
                          {appointment.status === 'scheduled' && (
                            <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                              Cancel
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <CalendarIcon className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-2 text-lg font-medium">No appointments</h3>
                  <p className="text-muted-foreground">You have no scheduled appointments.</p>
                  <Button className="mt-4">Book an appointment</Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="medications">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Medications</CardTitle>
                <CardDescription>Your prescribed medications and reminders</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              {medications.length > 0 ? (
                <div className="space-y-4">
                  {medications.map(medication => (
                    <div key={medication.id} className="flex items-start space-x-4 p-4 border rounded-lg">
                      <div className="bg-medblue-100 p-3 rounded-full">
                        <Pill className="h-5 w-5 text-medblue-700" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="font-medium">{medication.name} {medication.dosage}</p>
                          <span className="px-2 py-1 text-xs rounded-full bg-medblue-100 text-medblue-800">
                            Active
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">{medication.frequency}</p>
                        <p className="mt-1 text-sm">Start: {format(medication.startDate, 'MMM d, yyyy')}</p>
                        {medication.endDate && (
                          <p className="text-sm">End: {format(medication.endDate, 'MMM d, yyyy')}</p>
                        )}
                        {medication.notes && <p className="mt-2 text-sm">{medication.notes}</p>}
                        <Button size="sm" variant="outline" className="mt-4">View Details</Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Pill className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-2 text-lg font-medium">No medications</h3>
                  <p className="text-muted-foreground">You have no active medications.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="surveys">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Health Surveys</CardTitle>
                <CardDescription>Track and report your health status</CardDescription>
              </div>
              <Button asChild size="sm">
                <Link to="/surveys/new">
                  <Plus className="h-4 w-4 mr-2" />
                  New Survey
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Bell className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-2 text-lg font-medium">No recent surveys</h3>
                <p className="text-muted-foreground">Let your doctor know how you're feeling.</p>
                <Button className="mt-4">Take a health survey</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
