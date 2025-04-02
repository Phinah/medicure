
import React from 'react';

interface AppointmentStepIndicatorProps {
  currentStep: number;
}

export const AppointmentStepIndicator = ({ currentStep }: AppointmentStepIndicatorProps) => {
  return (
    <div className="mb-8">
      <div className="flex items-center">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-medblue-100 text-medblue-700 font-bold">
          1
        </div>
        <div className="h-0.5 flex-1 mx-2 bg-medblue-100" />
        <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
          currentStep >= 2 ? 'bg-medblue-100 text-medblue-700' : 'bg-gray-100 text-gray-400'
        } font-bold`}>
          2
        </div>
        <div className="h-0.5 flex-1 mx-2 bg-medblue-100" />
        <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
          currentStep >= 3 ? 'bg-medblue-100 text-medblue-700' : 'bg-gray-100 text-gray-400'
        } font-bold`}>
          3
        </div>
      </div>
      <div className="flex justify-between mt-2 text-sm">
        <span className="text-medblue-700 font-medium">Select Provider</span>
        <span className={currentStep >= 2 ? 'text-medblue-700 font-medium' : 'text-gray-400'}>
          Choose Date & Time
        </span>
        <span className={currentStep >= 3 ? 'text-medblue-700 font-medium' : 'text-gray-400'}>
          Confirm Details
        </span>
      </div>
    </div>
  );
};
