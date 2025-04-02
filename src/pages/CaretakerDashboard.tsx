
import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/context/AuthContext';
import { Bell, Users, Calendar as CalendarIcon, AlertCircle, Pill } from 'lucide-react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

export default function CaretakerDashboard() {
  const { user } = useAuth();
  
  return (
    <div className="med-container">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Welcome, {user?.name}</h1>
        <Button variant="outline">
          <Bell className="h-4 w-4 mr-2" />
          Notifications
        </Button>
      </div>

      <Tabs defaultValue="overview">
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="patients">My Patients</TabsTrigger>
          <TabsTrigger value="alerts">Health Alerts</TabsTrigger>
          <TabsTrigger value="medications">Medications</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">Patients Under Care</CardTitle>
                <Users className="w-4 h-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">2</p>
                <p className="text-xs text-muted-foreground">
                  Currently under your care
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">Upcoming Appointments</CardTitle>
                <CalendarIcon className="w-4 h-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">3</p>
                <p className="text-xs text-muted-foreground">
                  In the next 7 days
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">Health Alerts</CardTitle>
                <AlertCircle className="w-4 h-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">1</p>
                <p className="text-xs text-muted-foreground">
                  Requiring your attention
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Patient Health Updates</CardTitle>
              <CardDescription>
                Recent health surveys and status updates from your patients
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-start space-x-4 p-4 border rounded-lg bg-amber-50">
                <div className="bg-amber-100 p-3 rounded-full">
                  <AlertCircle className="h-5 w-5 text-amber-700" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-medium">John Doe</p>
                    <span className="px-2 py-1 text-xs rounded-full bg-amber-100 text-amber-800">
                      Attention Needed
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Submitted 3 hours ago
                  </p>
                  <p className="mt-2">Patient reports feeling worse with increased pain and fever</p>
                  <div className="flex gap-2 mt-4">
                    <Button size="sm">View Details</Button>
                    <Button size="sm" variant="outline">Contact Doctor</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Medication Reminders</CardTitle>
              <CardDescription>
                Today's medication schedule for your patients
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-4 p-4 border rounded-lg">
                  <div className="bg-medblue-100 p-3 rounded-full">
                    <Pill className="h-5 w-5 text-medblue-700" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">John Doe</p>
                      <p className="text-sm text-muted-foreground">
                        {format(new Date().setHours(8, 0), 'h:mm a')}
                      </p>
                    </div>
                    <p className="mt-1">Amoxicillin 500mg</p>
                    <p className="text-sm text-muted-foreground">Take with food</p>
                    <div className="flex gap-2 mt-4">
                      <Button size="sm">Mark as Taken</Button>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 p-4 border rounded-lg">
                  <div className="bg-medblue-100 p-3 rounded-full">
                    <Pill className="h-5 w-5 text-medblue-700" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">Sarah Williams</p>
                      <p className="text-sm text-muted-foreground">
                        {format(new Date().setHours(12, 0), 'h:mm a')}
                      </p>
                    </div>
                    <p className="mt-1">Lisinopril 10mg</p>
                    <p className="text-sm text-muted-foreground">Take with water</p>
                    <div className="flex gap-2 mt-4">
                      <Button size="sm">Mark as Taken</Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="patients">
          <Card>
            <CardHeader>
              <CardTitle>My Patients</CardTitle>
              <CardDescription>Patients under your care</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-4 p-4 border rounded-lg">
                  <div className="bg-medblue-100 p-3 rounded-full">
                    <Users className="h-5 w-5 text-medblue-700" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">John Doe</p>
                      <span className="px-2 py-1 text-xs rounded-full bg-medgreen-100 text-medgreen-800">
                        Stable
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">Male, 38 years</p>
                    <p className="mt-1 text-sm">Conditions: Hypertension, Diabetes</p>
                    <div className="flex gap-2 mt-4">
                      <Button size="sm">View Details</Button>
                      <Button size="sm" variant="outline">View Medications</Button>
                      <Button size="sm" variant="outline">View Appointments</Button>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 p-4 border rounded-lg">
                  <div className="bg-medblue-100 p-3 rounded-full">
                    <Users className="h-5 w-5 text-medblue-700" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">Sarah Williams</p>
                      <span className="px-2 py-1 text-xs rounded-full bg-amber-100 text-amber-800">
                        Needs Attention
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">Female, 72 years</p>
                    <p className="mt-1 text-sm">Conditions: Arthritis, Glaucoma</p>
                    <div className="flex gap-2 mt-4">
                      <Button size="sm">View Details</Button>
                      <Button size="sm" variant="outline">View Medications</Button>
                      <Button size="sm" variant="outline">View Appointments</Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="alerts">
          <Card>
            <CardHeader>
              <CardTitle>Health Alerts</CardTitle>
              <CardDescription>Important updates about your patients</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-4 p-4 border rounded-lg bg-amber-50">
                  <div className="bg-amber-100 p-3 rounded-full">
                    <AlertCircle className="h-5 w-5 text-amber-700" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">Health Survey Alert - John Doe</p>
                      <p className="text-sm text-muted-foreground">3 hours ago</p>
                    </div>
                    <p className="mt-2">Patient reports feeling worse with increased pain and fever</p>
                    <div className="flex gap-2 mt-4">
                      <Button size="sm">View Details</Button>
                      <Button size="sm" variant="outline">Contact Doctor</Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="medications">
          <Card>
            <CardHeader>
              <CardTitle>Medication Management</CardTitle>
              <CardDescription>Track and manage medications for your patients</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-4 p-4 border rounded-lg">
                  <div className="bg-medblue-100 p-3 rounded-full">
                    <Pill className="h-5 w-5 text-medblue-700" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">John Doe</p>
                    </div>
                    <div className="mt-2 space-y-2">
                      <div className="border-l-2 border-medblue-500 pl-2">
                        <p className="font-medium">Amoxicillin 500mg</p>
                        <p className="text-sm text-muted-foreground">Every 8 hours</p>
                        <p className="text-sm text-muted-foreground">Until Aug 17, 2023</p>
                      </div>
                      <div className="border-l-2 border-medblue-500 pl-2">
                        <p className="font-medium">Paracetamol 1000mg</p>
                        <p className="text-sm text-muted-foreground">Every 6 hours as needed</p>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button size="sm">Set Reminders</Button>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 p-4 border rounded-lg">
                  <div className="bg-medblue-100 p-3 rounded-full">
                    <Pill className="h-5 w-5 text-medblue-700" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">Sarah Williams</p>
                    </div>
                    <div className="mt-2 space-y-2">
                      <div className="border-l-2 border-medblue-500 pl-2">
                        <p className="font-medium">Lisinopril 10mg</p>
                        <p className="text-sm text-muted-foreground">Once daily</p>
                      </div>
                      <div className="border-l-2 border-medblue-500 pl-2">
                        <p className="font-medium">Metformin 500mg</p>
                        <p className="text-sm text-muted-foreground">Twice daily with meals</p>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button size="sm">Set Reminders</Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
