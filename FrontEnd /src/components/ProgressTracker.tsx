
import React from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProgressTrackerProps {
  currentStep: number;
  steps: string[];
}

const ProgressTracker: React.FC<ProgressTrackerProps> = ({ currentStep, steps }) => {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            <div className="flex flex-col items-center">
              <div 
                className={cn(
                  "progress-step w-10 h-10 rounded-full border-2 flex items-center justify-center text-sm font-medium transition-all duration-300",
                  index < currentStep ? "completed" : index === currentStep ? "active" : "border-gray-300 text-gray-500"
                )}
              >
                {index < currentStep ? (
                  <Check size={16} />
                ) : (
                  index + 1
                )}
              </div>
              <span className="mt-2 text-xs text-center font-medium">
                {step}
              </span>
            </div>
            
            {index < steps.length - 1 && (
              <div 
                className={cn(
                  "progress-line",
                  index < currentStep ? "active" : ""
                )}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ProgressTracker;
