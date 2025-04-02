
import { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { 
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/components/ui/tabs';
import { 
  HoverCard,
  HoverCardTrigger,
  HoverCardContent
} from '@/components/ui/hover-card';
import { HealthSurvey, Medicine } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { CalendarIcon, ThumbsUp, ThumbsDown, Pill } from 'lucide-react';

interface SurveyReviewDialogProps {
  isOpen: boolean;
  onClose: () => void;
  survey: HealthSurvey | null;
  patientName: string;
  medicines: Medicine[];
}

export function SurveyReviewDialog({
  isOpen,
  onClose,
  survey,
  patientName,
  medicines
}: SurveyReviewDialogProps) {
  const [activeTab, setActiveTab] = useState('details');
  
  if (!survey) return null;

  // Format the feeling status to match UI design
  const getFeelingInfo = (feeling: string) => {
    switch (feeling) {
      case 'better':
        return { icon: <ThumbsUp className="h-5 w-5 text-medgreen-600" />, label: 'Better', color: 'bg-medgreen-100 text-medgreen-800' };
      case 'worse':
        return { icon: <ThumbsDown className="h-5 w-5 text-red-600" />, label: 'Worse', color: 'bg-red-100 text-red-800' };
      default:
        return { icon: null, label: 'About the same', color: 'bg-medblue-100 text-medblue-800' };
    }
  };

  const feelingInfo = getFeelingInfo(survey.feeling);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">Health Survey Review</DialogTitle>
          <DialogDescription>
            Submitted by {patientName} on {format(survey.date, 'MMMM d, yyyy')} at {format(survey.date, 'h:mm a')}
          </DialogDescription>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 mb-6">
            <TabsTrigger value="details">Survey Details</TabsTrigger>
            <TabsTrigger value="medications">Medication Feedback</TabsTrigger>
          </TabsList>
          
          <TabsContent value="details" className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="font-medium">Feeling:</span>
              <Badge className={feelingInfo.color}>
                <span className="flex items-center gap-1">
                  {feelingInfo.icon}
                  {feelingInfo.label}
                </span>
              </Badge>
            </div>
            
            {survey.symptoms && survey.symptoms.length > 0 && (
              <div className="space-y-2">
                <h3 className="font-medium">Reported Symptoms:</h3>
                <div className="flex flex-wrap gap-2">
                  {survey.symptoms.map(symptom => (
                    <Badge key={symptom} variant="outline" className="bg-amber-50">
                      {symptom}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            
            {survey.notes && (
              <div className="space-y-2">
                <h3 className="font-medium">Patient Notes:</h3>
                <div className="p-4 bg-slate-50 rounded-md">
                  {survey.notes}
                </div>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="medications" className="space-y-4">
            <h3 className="font-medium">Medications during survey period:</h3>
            
            {medicines.length > 0 ? (
              <div className="space-y-3">
                {medicines.map(medicine => (
                  <div key={medicine.id} className="flex items-start space-x-4 p-4 border rounded-lg">
                    <div className="bg-medblue-100 p-3 rounded-full">
                      <Pill className="h-5 w-5 text-medblue-700" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="font-medium">{medicine.name} {medicine.dosage}</p>
                        <HoverCard>
                          <HoverCardTrigger asChild>
                            <Badge
                              className={survey.feeling === 'better' ? 'bg-medgreen-100 text-medgreen-800' : 
                                       survey.feeling === 'worse' ? 'bg-red-100 text-red-800' : 
                                       'bg-medblue-100 text-medblue-800'}>
                              Patient felt {survey.feeling}
                            </Badge>
                          </HoverCardTrigger>
                          <HoverCardContent className="w-80">
                            <div className="space-y-2">
                              <h4 className="font-medium">Patient feedback on {medicine.name}</h4>
                              <p className="text-sm">
                                Patient reported feeling {survey.feeling} while taking this medication.
                                {survey.symptoms.length > 0 && ` Symptoms reported: ${survey.symptoms.join(', ')}.`}
                              </p>
                            </div>
                          </HoverCardContent>
                        </HoverCard>
                      </div>
                      <p className="text-sm text-muted-foreground">{medicine.frequency}</p>
                      <div className="mt-2 text-sm flex items-center gap-1">
                        <CalendarIcon className="h-3.5 w-3.5 text-muted-foreground" />
                        <span>Started {format(medicine.startDate, 'MMM d, yyyy')}</span>
                        {medicine.endDate && <span> · Ends {format(medicine.endDate, 'MMM d, yyyy')}</span>}
                      </div>
                      <Button size="sm" variant="outline" className="mt-3">View Full History</Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 border rounded-lg">
                <Pill className="mx-auto h-10 w-10 text-muted-foreground" />
                <h4 className="mt-2 font-medium">No medications recorded</h4>
                <p className="text-muted-foreground">No medications were associated with this patient at the time of the survey.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
        
        <div className="flex justify-end gap-2 mt-6">
          <Button onClick={onClose}>Close</Button>
          <Button variant="outline">Download Report</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
