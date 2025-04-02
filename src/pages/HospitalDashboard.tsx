
import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/context/AuthContext';
import { Calendar as CalendarIcon, User, UserPlus, Building, UsersRound } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { RegisterDoctorForm } from '@/components/hospital/RegisterDoctorForm';

export default function HospitalDashboard() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [showRegisterDoctorDialog, setShowRegisterDoctorDialog] = useState(false);
  
  return (
    <div className="med-container">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Welcome, {user?.name}</h1>
        <Button onClick={() => setShowRegisterDoctorDialog(true)}>
          <UserPlus className="h-4 w-4 mr-2" />
          Register New Doctor
        </Button>
      </div>

      {/* Register Doctor Dialog */}
      <Dialog open={showRegisterDoctorDialog} onOpenChange={setShowRegisterDoctorDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Register New Doctor</DialogTitle>
          </DialogHeader>
          <RegisterDoctorForm 
            onSuccess={() => setShowRegisterDoctorDialog(false)}
            onCancel={() => setShowRegisterDoctorDialog(false)}
          />
        </DialogContent>
      </Dialog>

      <Tabs defaultValue="overview">
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="doctors">Doctors</TabsTrigger>
          <TabsTrigger value="patients">Patients</TabsTrigger>
          <TabsTrigger value="departments">Departments</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">Total Doctors</CardTitle>
                <User className="w-4 h-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">12</p>
                <p className="text-xs text-muted-foreground">
                  Across 5 departments
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
                <UsersRound className="w-4 h-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">248</p>
                <p className="text-xs text-muted-foreground">
                  Currently registered
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">Today's Appointments</CardTitle>
                <CalendarIcon className="w-4 h-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">32</p>
                <p className="text-xs text-muted-foreground">
                  Across all departments
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Hospital Performance</CardTitle>
              <CardDescription>Overall metrics and statistics</CardDescription>
            </CardHeader>
            <CardContent className="h-80 flex items-center justify-center">
              <p className="text-muted-foreground">Analytics dashboard will be displayed here</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="doctors">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Hospital Doctors</CardTitle>
                <CardDescription>Manage your medical staff</CardDescription>
              </div>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Input
                    type="search"
                    placeholder="Search doctors..."
                    className="w-64"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button onClick={() => setShowRegisterDoctorDialog(true)}>
                  <UserPlus className="h-4 w-4 mr-2" />
                  Add Doctor
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <User className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-2 text-lg font-medium">Doctors information will be displayed here</h3>
                <p className="text-muted-foreground">
                  You can add new doctors to your hospital and manage them
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="patients">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Hospital Patients</CardTitle>
                <CardDescription>View and manage patient records</CardDescription>
              </div>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Input
                    type="search"
                    placeholder="Search patients..."
                    className="w-64"
                  />
                </div>
                <Button>
                  <UserPlus className="h-4 w-4 mr-2" />
                  Add Patient
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <UsersRound className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-2 text-lg font-medium">Patient information will be displayed here</h3>
                <p className="text-muted-foreground">
                  View and manage patients registered at your hospital
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="departments">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Departments</CardTitle>
                <CardDescription>Manage hospital departments and specialties</CardDescription>
              </div>
              <Button>
                <Building className="h-4 w-4 mr-2" />
                Add Department
              </Button>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Building className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-2 text-lg font-medium">Department information will be displayed here</h3>
                <p className="text-muted-foreground">
                  Manage your hospital departments and their specialties
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
