
import React from 'react';
import { format } from 'date-fns';
import { useForm } from 'react-hook-form';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { DoctorWithProfile, HospitalWithProfile } from '@/lib/database.types';

interface User {
  name: string;
  id: string;
}

interface ConfirmationStepProps {
  hospital: string | null;
  specialty: string | null;
  selectedDoctor: string | null;
  date: Date | undefined;
  selectedTime: string | null;
  user: User | null;
  onBack: () => void;
  onSubmit: (data: { reason: string }) => void;
  hospitals: HospitalWithProfile[];
  doctors: DoctorWithProfile[];
}

export const ConfirmationStep = ({
  hospital,
  specialty,
  selectedDoctor,
  date,
  selectedTime,
  user,
  onBack,
  onSubmit,
  hospitals,
  doctors
}: ConfirmationStepProps) => {
  const form = useForm({
    defaultValues: {
      reason: '',
    },
  });

  const selectedHospital = hospitals.find(h => h.id === hospital);
  const selectedDoctorObj = doctors.find(d => d.id === selectedDoctor);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Confirm Appointment Details</CardTitle>
        <CardDescription>
          Please review your appointment details and provide a reason for your visit
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Hospital</p>
                <p className="font-medium">{selectedHospital?.profile?.name || 'Unknown Hospital'}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Specialty</p>
                <p className="font-medium">{specialty}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Doctor</p>
                <p className="font-medium">{selectedDoctorObj?.profile?.name || 'Unknown Doctor'}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Patient</p>
                <p className="font-medium">{user?.name}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Date</p>
                <p className="font-medium">{date ? format(date, 'MMMM d, yyyy') : ''}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Time</p>
                <p className="font-medium">{selectedTime}</p>
              </div>
            </div>
            
            <FormField
              control={form.control}
              name="reason"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Reason for Visit</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Please briefly describe the reason for your appointment"
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    This helps your doctor prepare for your appointment.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button type="button" variant="outline" onClick={onBack}>
              Back
            </Button>
            <Button type="submit">Book Appointment</Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
