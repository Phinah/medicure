
import React from 'react';
import { FormLabel } from '@/components/ui/form';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { DoctorWithProfile, HospitalWithProfile } from '@/lib/database.types';

interface SelectProviderStepProps {
  hospitals: HospitalWithProfile[];
  doctors: DoctorWithProfile[];
  hospital: string | null;
  specialty: string | null;
  selectedDoctor: string | null;
  setHospital: (value: string) => void;
  setSpecialty: (value: string) => void;
  setSelectedDoctor: (value: string) => void;
  onNext: () => void;
  getSpecialties: () => string[];
  isLoading: boolean;
}

export const SelectProviderStep = ({
  hospitals,
  doctors,
  hospital,
  specialty,
  selectedDoctor,
  setHospital,
  setSpecialty,
  setSelectedDoctor,
  onNext,
  getSpecialties,
  isLoading
}: SelectProviderStepProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Select Healthcare Provider</CardTitle>
        <CardDescription>
          Choose a hospital, specialty, and doctor for your appointment
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <FormLabel>Hospital</FormLabel>
          <Select value={hospital || ''} onValueChange={setHospital} disabled={isLoading}>
            <SelectTrigger>
              <SelectValue placeholder={isLoading ? "Loading hospitals..." : "Select a hospital"} />
            </SelectTrigger>
            <SelectContent>
              {hospitals.map(hospital => (
                <SelectItem key={hospital.id} value={hospital.id}>
                  {hospital.profile?.name || 'Unknown Hospital'}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <FormLabel>Specialty</FormLabel>
          <Select 
            value={specialty || ''} 
            onValueChange={setSpecialty}
            disabled={!hospital || isLoading}
          >
            <SelectTrigger>
              <SelectValue placeholder={!hospital ? "Select a hospital first" : "Select a specialty"} />
            </SelectTrigger>
            <SelectContent>
              {getSpecialties().map(specialty => (
                <SelectItem key={specialty} value={specialty}>{specialty}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <FormLabel>Doctor</FormLabel>
          <Select 
            value={selectedDoctor || ''} 
            onValueChange={setSelectedDoctor}
            disabled={!specialty || doctors.length === 0 || isLoading}
          >
            <SelectTrigger>
              <SelectValue placeholder={!specialty ? "Select a specialty first" : "Select a doctor"} />
            </SelectTrigger>
            <SelectContent>
              {doctors.map(doctor => (
                <SelectItem key={doctor.id} value={doctor.id}>
                  {doctor.profile?.name || 'Unknown Doctor'}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {doctors.length === 0 && specialty && hospital && !isLoading && (
            <p className="text-sm text-muted-foreground">No doctors available for this specialty and hospital</p>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={onNext} 
          disabled={!selectedDoctor || isLoading}
          className="ml-auto"
        >
          Next: Select Date & Time
        </Button>
      </CardFooter>
    </Card>
  );
};
