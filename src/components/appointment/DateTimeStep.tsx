
import React from 'react';
import { format, startOfToday } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { FormLabel } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { CheckIcon } from 'lucide-react';

interface DateTimeStepProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  selectedTime: string | null;
  setSelectedTime: (time: string) => void;
  onNext: () => void;
  onBack: () => void;
  timeSlots: string[];
}

export const DateTimeStep = ({
  date,
  setDate,
  selectedTime,
  setSelectedTime,
  onNext,
  onBack,
  timeSlots
}: DateTimeStepProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Select Date & Time</CardTitle>
        <CardDescription>
          Choose when you'd like to schedule your appointment
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div>
            <FormLabel className="block mb-2">Appointment Date</FormLabel>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              disabled={(date) => {
                // Disable dates in the past and weekends (for demonstration)
                return date < startOfToday() || 
                      date.getDay() === 0 || 
                      date.getDay() === 6;
              }}
              className="rounded-md border"
            />
          </div>
          
          <div className="flex-1">
            <FormLabel className="block mb-2">Available Time Slots</FormLabel>
            <div className="grid grid-cols-2 gap-2">
              {timeSlots.map((time) => (
                <Button
                  key={time}
                  type="button"
                  variant={selectedTime === time ? "default" : "outline"}
                  className={`justify-start ${selectedTime === time ? "bg-medblue-600" : ""}`}
                  onClick={() => setSelectedTime(time)}
                >
                  {selectedTime === time && <CheckIcon className="mr-2 h-4 w-4" />}
                  {time}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={onNext} disabled={!date || !selectedTime}>
          Next: Confirm Details
        </Button>
      </CardFooter>
    </Card>
  );
};
