
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight, ChevronLeft } from 'lucide-react';

interface StepNavigationProps {
  currentStep: number;
  totalSteps: number;
  isStepComplete: boolean;
  onNext: () => void;
  onPrev: () => void;
}

const StepNavigation: React.FC<StepNavigationProps> = ({
  currentStep,
  totalSteps,
  isStepComplete,
  onNext,
  onPrev
}) => {
  return (
    <div className="mt-8 flex justify-between">
      {currentStep > 0 && (
        <Button 
          variant="outline" 
          onClick={onPrev}
          className="flex items-center"
        >
          <ChevronLeft size={16} className="mr-2" />
          Back
        </Button>
      )}
      
      {currentStep < totalSteps - 1 && (
        <Button 
          onClick={onNext}
          disabled={!isStepComplete}
          className={`ml-auto flex items-center ${
            isStepComplete ? 'bg-loanease-secondary hover:bg-loanease-secondary/90' : ''
          }`}
        >
          {currentStep === 0 ? 'Get Started' : 'Continue'}
          <ChevronRight size={16} className="ml-2" />
        </Button>
      )}
    </div>
  );
};

export default StepNavigation;
