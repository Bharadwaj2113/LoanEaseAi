
import React from 'react';
import { DollarSign, CalendarRange, Percent } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';

interface LoanDetailsFormProps {
  loanAmount: number;
  setLoanAmount: (value: number) => void;
  loanPurpose: string;
  setLoanPurpose: (value: string) => void;
  loanTerm: number;
  setLoanTerm: (value: number) => void;
  interestRate: number;
}

const LoanDetailsForm: React.FC<LoanDetailsFormProps> = ({
  loanAmount,
  setLoanAmount,
  loanPurpose,
  setLoanPurpose,
  loanTerm,
  setLoanTerm,
  interestRate,
}) => {
  const calculateMonthlyPayment = () => {
    const principal = loanAmount;
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm;
    
    if (monthlyRate === 0) return principal / numberOfPayments;
    
    const payment = principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments) / 
                  (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    
    return payment;
  };
  
  const monthlyPayment = calculateMonthlyPayment();
  
  const loanPurposeOptions = [
    "Home Purchase",
    "Auto Loan",
    "Debt Consolidation",
    "Home Improvement",
    "Medical Expenses",
    "Education",
    "Business",
    "Other"
  ];
  
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 animate-fade-in">
      <h3 className="text-lg font-semibold text-loanease-primary mb-4">Loan Details</h3>
      
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="loan-amount">Loan Amount</Label>
          <div className="relative">
            <DollarSign size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <Input
              id="loan-amount"
              type="number"
              min="1000"
              max="1000000"
              className="pl-9"
              value={loanAmount}
              onChange={(e) => setLoanAmount(Number(e.target.value))}
            />
          </div>
          <div className="pt-2">
            <Slider
              value={[loanAmount]}
              min={1000}
              max={100000}
              step={1000}
              onValueChange={(values) => setLoanAmount(values[0])}
              className="py-4"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>$1,000</span>
              <span>$100,000</span>
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="loan-purpose">Loan Purpose</Label>
          <Select value={loanPurpose} onValueChange={setLoanPurpose}>
            <SelectTrigger>
              <SelectValue placeholder="Select loan purpose" />
            </SelectTrigger>
            <SelectContent>
              {loanPurposeOptions.map((purpose) => (
                <SelectItem key={purpose} value={purpose}>
                  {purpose}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="loan-term">Loan Term (Months)</Label>
          <div className="relative">
            <CalendarRange size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <Input
              id="loan-term"
              type="number"
              min="6"
              max="360"
              className="pl-9"
              value={loanTerm}
              onChange={(e) => setLoanTerm(Number(e.target.value))}
            />
          </div>
          <div className="pt-2">
            <Slider
              value={[loanTerm]}
              min={6}
              max={360}
              step={6}
              onValueChange={(values) => setLoanTerm(values[0])}
              className="py-4"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>6 months</span>
              <span>360 months</span>
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label>Interest Rate</Label>
          <div className="flex items-center space-x-2">
            <Percent size={16} className="text-loanease-secondary" />
            <span className="font-semibold text-loanease-primary">{interestRate.toFixed(2)}%</span>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <span className="text-gray-700">Estimated Monthly Payment:</span>
            <span className="text-xl font-bold text-loanease-primary">
              ${monthlyPayment.toFixed(2)}
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            This is an estimate based on the information provided and current interest rates.
            Actual payment may vary based on credit evaluation.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoanDetailsForm;
