
import React from 'react';
import { CheckCircle2, XCircle, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export type EligibilityStatus = 'approved' | 'rejected' | 'pending' | 'conditional';

interface EligibilitySummaryProps {
  status: EligibilityStatus;
  loanAmount: number;
  interestRate: number;
  loanTerm: number;
  monthlyPayment: number;
  reasons?: string[];
  suggestions?: string[];
  onContinue?: () => void;
  onModify?: () => void;
}

const EligibilitySummary: React.FC<EligibilitySummaryProps> = ({
  status,
  loanAmount,
  interestRate,
  loanTerm,
  monthlyPayment,
  reasons = [],
  suggestions = [],
  onContinue,
  onModify,
}) => {
  const statusConfig = {
    approved: {
      title: "Congratulations! Your loan is pre-approved",
      icon: <CheckCircle2 size={48} className="text-green-500" />,
      color: "text-green-700",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
    },
    rejected: {
      title: "We're sorry, your loan application was not approved",
      icon: <XCircle size={48} className="text-red-500" />,
      color: "text-red-700",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
    },
    pending: {
      title: "Your application is being reviewed",
      icon: <AlertTriangle size={48} className="text-yellow-500" />,
      color: "text-yellow-700",
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200",
    },
    conditional: {
      title: "Your loan is conditionally approved",
      icon: <AlertTriangle size={48} className="text-blue-500" />,
      color: "text-blue-700",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
    },
  };
  
  const config = statusConfig[status];
  
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 animate-fade-in">
      <div className={cn("rounded-lg p-6 border", config.bgColor, config.borderColor)}>
        <div className="flex flex-col items-center text-center space-y-4 mb-6">
          {config.icon}
          <h3 className={cn("text-xl font-semibold", config.color)}>
            {config.title}
          </h3>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="p-4 bg-white rounded-lg shadow-sm">
            <p className="text-sm text-gray-500">Loan Amount</p>
            <p className="text-lg font-bold text-loanease-primary">${loanAmount.toLocaleString()}</p>
          </div>
          
          <div className="p-4 bg-white rounded-lg shadow-sm">
            <p className="text-sm text-gray-500">Interest Rate</p>
            <p className="text-lg font-bold text-loanease-primary">{interestRate.toFixed(2)}%</p>
          </div>
          
          <div className="p-4 bg-white rounded-lg shadow-sm">
            <p className="text-sm text-gray-500">Loan Term</p>
            <p className="text-lg font-bold text-loanease-primary">{loanTerm} months</p>
          </div>
          
          <div className="p-4 bg-white rounded-lg shadow-sm">
            <p className="text-sm text-gray-500">Monthly Payment</p>
            <p className="text-lg font-bold text-loanease-primary">${monthlyPayment.toFixed(2)}</p>
          </div>
        </div>
        
        {status === 'rejected' && reasons.length > 0 && (
          <div className="mb-6">
            <h4 className="font-medium text-red-700 mb-2">Reasons:</h4>
            <ul className="list-disc pl-5 space-y-1">
              {reasons.map((reason, index) => (
                <li key={index} className="text-gray-700">{reason}</li>
              ))}
            </ul>
          </div>
        )}
        
        {(status === 'rejected' || status === 'conditional') && suggestions.length > 0 && (
          <div className="mb-6">
            <h4 className="font-medium text-blue-700 mb-2">Suggestions:</h4>
            <ul className="list-disc pl-5 space-y-1">
              {suggestions.map((suggestion, index) => (
                <li key={index} className="text-gray-700">{suggestion}</li>
              ))}
            </ul>
          </div>
        )}
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {status === 'approved' && onContinue && (
            <Button 
              onClick={onContinue}
              className="bg-loanease-secondary hover:bg-loanease-secondary/90"
            >
              Continue to Final Steps
            </Button>
          )}
          
          {(status === 'rejected' || status === 'conditional') && onModify && (
            <Button 
              variant="outline" 
              onClick={onModify}
            >
              Modify Application
            </Button>
          )}
          
          {status === 'pending' && (
            <p className="text-sm text-gray-600 text-center">
              We're currently reviewing your application. This typically takes 1-2 business days.
              We'll notify you by email once a decision has been made.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EligibilitySummary;
