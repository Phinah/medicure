
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';
import { Medicine } from '@/lib/types';
import { Pill } from 'lucide-react';

interface SurveyFormValues {
  feeling: 'better' | 'same' | 'worse';
  symptoms: string[];
  notes: string;
  notifyDoctor: boolean;
  notifyCaretaker: boolean;
  medicationFeedback: Record<string, {
    effective: boolean;
    sideEffects: string;
  }>;
}

const symptoms = [
  { id: 'fever', label: 'Fever' },
  { id: 'cough', label: 'Cough' },
  { id: 'sore-throat', label: 'Sore throat' },
  { id: 'headache', label: 'Headache' },
  { id: 'body-aches', label: 'Body aches' },
  { id: 'fatigue', label: 'Fatigue' },
  { id: 'shortness-of-breath', label: 'Shortness of breath' },
  { id: 'nausea', label: 'Nausea or vomiting' },
  { id: 'diarrhea', label: 'Diarrhea' },
  { id: 'loss-of-taste', label: 'Loss of taste or smell' },
  { id: 'chest-pain', label: 'Chest pain' },
  { id: 'dizziness', label: 'Dizziness' }
];

// Mock medications for the current patient
const mockPatientMedications: Medicine[] = [
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
  }
];

export default function HealthSurvey() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [medications, setMedications] = useState<Medicine[]>([]);
  
  useEffect(() => {
    // In a real application, fetch the current medications for the patient
    // For now, we'll use mock data
    setMedications(mockPatientMedications);
  }, []);
  
  const form = useForm<SurveyFormValues>({
    defaultValues: {
      feeling: 'same',
      symptoms: [],
      notes: '',
      notifyDoctor: true,
      notifyCaretaker: true,
      medicationFeedback: {},
    },
  });

  const onSubmit = async (data: SurveyFormValues) => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('Survey submitted:', data);
    
    toast.success('Health survey submitted successfully!');
    navigate('/patient');
    setIsSubmitting(false);
  };

  return (
    <div className="med-container">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Health Survey</h1>
        
        <Card>
          <CardHeader>
            <CardTitle>How are you feeling today?</CardTitle>
            <CardDescription>
              This survey helps your healthcare providers monitor your health. Your responses will be shared with your doctor and caretaker if you choose.
            </CardDescription>
          </CardHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardContent className="space-y-6">
                <FormField
                  control={form.control}
                  name="feeling"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Compared to your last visit, how are you feeling?</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="better" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Better
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="same" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              About the same
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="worse" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Worse
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="symptoms"
                  render={() => (
                    <FormItem>
                      <FormLabel>Are you experiencing any of the following symptoms?</FormLabel>
                      <div className="grid grid-cols-2 gap-2">
                        {symptoms.map((symptom) => (
                          <FormField
                            key={symptom.id}
                            control={form.control}
                            name="symptoms"
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={symptom.id}
                                  className="flex flex-row items-start space-x-3 space-y-0"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(symptom.id)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([...field.value, symptom.id])
                                          : field.onChange(
                                              field.value?.filter(
                                                (value) => value !== symptom.id
                                              )
                                            )
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    {symptom.label}
                                  </FormLabel>
                                </FormItem>
                              )
                            }}
                          />
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {medications.length > 0 && (
                  <div className="space-y-3 border-t pt-4">
                    <h3 className="font-medium">Your Current Medications</h3>
                    <p className="text-sm text-muted-foreground">Please provide feedback on your medications to help your doctor assess their effectiveness.</p>
                    
                    {medications.map((medicine) => (
                      <div key={medicine.id} className="p-4 border rounded-md">
                        <div className="flex items-center gap-2 mb-3">
                          <Pill className="h-5 w-5 text-medblue-600" />
                          <span className="font-medium">{medicine.name} {medicine.dosage}</span>
                        </div>
                        
                        <div className="space-y-3">
                          <FormField
                            control={form.control}
                            name={`medicationFeedback.${medicine.id}.effective` as any}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Is this medication helping your condition?</FormLabel>
                                <FormControl>
                                  <RadioGroup
                                    onValueChange={(value) => field.onChange(value === 'true')}
                                    value={field.value ? 'true' : 'false'}
                                    className="flex space-x-4"
                                  >
                                    <FormItem className="flex items-center space-x-2 space-y-0">
                                      <FormControl>
                                        <RadioGroupItem value="true" />
                                      </FormControl>
                                      <FormLabel className="font-normal">Yes</FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-2 space-y-0">
                                      <FormControl>
                                        <RadioGroupItem value="false" />
                                      </FormControl>
                                      <FormLabel className="font-normal">No</FormLabel>
                                    </FormItem>
                                  </RadioGroup>
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name={`medicationFeedback.${medicine.id}.sideEffects` as any}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Are you experiencing any side effects from this medication?</FormLabel>
                                <FormControl>
                                  <Textarea
                                    placeholder="Describe any side effects you're experiencing..."
                                    className="min-h-[80px]"
                                    {...field}
                                  />
                                </FormControl>
                                <FormDescription>
                                  List any side effects, even if you think they might not be related.
                                </FormDescription>
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                
                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Additional Notes</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe how you're feeling, any new symptoms, or concerns you'd like to share with your healthcare provider"
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="space-y-3">
                  <FormField
                    control={form.control}
                    name="notifyDoctor"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            Notify my doctor
                          </FormLabel>
                          <FormDescription>
                            Send this health update to my primary care physician
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="notifyCaretaker"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            Notify my caretaker
                          </FormLabel>
                          <FormDescription>
                            Share this health update with my registered caretaker
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
              
              <CardFooter>
                <Button
                  type="submit" 
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Health Survey'}
                </Button>
              </CardFooter>
            </form>
          </Form>
        </Card>
      </div>
    </div>
  );
}
