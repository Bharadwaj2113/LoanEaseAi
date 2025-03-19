
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

interface WelcomeStepProps {
  onContinue: () => void;
}

const WelcomeStep: React.FC<WelcomeStepProps> = ({ onContinue }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 animate-fade-in">
      <h2 className="text-2xl font-bold text-loanease-primary mb-4">Welcome to LoanEase AI</h2>
      <p className="text-gray-700 mb-6">
        We're here to make your loan application process simple, fast, and hassle-free. Our AI-powered 
        system will guide you through each step of the application and provide you with a quick decision.
      </p>
      
      <div className="space-y-4">
        <div className="flex items-start space-x-3">
          <div className="w-6 h-6 rounded-full bg-loanease-light flex items-center justify-center text-loanease-secondary font-medium shrink-0">1</div>
          <div>
            <h3 className="font-medium text-loanease-primary">Personal Information</h3>
            <p className="text-sm text-gray-600">Provide basic personal and contact details</p>
          </div>
        </div>
        
        <div className="flex items-start space-x-3">
          <div className="w-6 h-6 rounded-full bg-loanease-light flex items-center justify-center text-loanease-secondary font-medium shrink-0">2</div>
          <div>
            <h3 className="font-medium text-loanease-primary">Document Upload</h3>
            <p className="text-sm text-gray-600">Upload your ID and proof of income</p>
          </div>
        </div>
        
        <div className="flex items-start space-x-3">
          <div className="w-6 h-6 rounded-full bg-loanease-light flex items-center justify-center text-loanease-secondary font-medium shrink-0">3</div>
          <div>
            <h3 className="font-medium text-loanease-primary">Loan Details</h3>
            <p className="text-sm text-gray-600">Specify your loan amount, purpose, and term</p>
          </div>
        </div>
        
        <div className="flex items-start space-x-3">
          <div className="w-6 h-6 rounded-full bg-loanease-light flex items-center justify-center text-loanease-secondary font-medium shrink-0">4</div>
          <div>
            <h3 className="font-medium text-loanease-primary">Face Verification</h3>
            <p className="text-sm text-gray-600">Quick identity verification for security</p>
          </div>
        </div>
        
        <div className="flex items-start space-x-3">
          <div className="w-6 h-6 rounded-full bg-loanease-light flex items-center justify-center text-loanease-secondary font-medium shrink-0">5</div>
          <div>
            <h3 className="font-medium text-loanease-primary">Instant Decision</h3>
            <p className="text-sm text-gray-600">Get your loan eligibility result</p>
          </div>
        </div>
      </div>
      
      <div className="mt-8">
        <Button 
          onClick={onContinue}
          className="bg-loanease-secondary hover:bg-loanease-secondary/90 ml-auto flex items-center"
        >
          Get Started
          <ChevronRight size={16} className="ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default WelcomeStep;
