
import { useState, useEffect } from 'react';
import { toast } from 'sonner';

export type EligibilityStatus = 'approved' | 'rejected' | 'pending' | 'conditional';

export interface LoanApplicationState {
  // Personal information
  fullName: string;
  setFullName: (value: string) => void;
  email: string;
  setEmail: (value: string) => void;
  phone: string;
  setPhone: (value: string) => void;
  address: string;
  setAddress: (value: string) => void;
  employment: string;
  setEmployment: (value: string) => void;
  income: string;
  setIncome: (value: string) => void;

  // Document upload
  isIdUploaded: boolean;
  setIsIdUploaded: (value: boolean) => void;
  isIdUploading: boolean;
  setIsIdUploading: (value: boolean) => void;
  isIncomeUploaded: boolean;
  setIsIncomeUploaded: (value: boolean) => void;
  isIncomeUploading: boolean;
  setIsIncomeUploading: (value: boolean) => void;
  handleIdUpload: (file: File) => void;
  handleIncomeUpload: (file: File) => void;

  // Loan details
  loanAmount: number;
  setLoanAmount: (value: number) => void;
  loanPurpose: string;
  setLoanPurpose: (value: string) => void;
  loanTerm: number;
  setLoanTerm: (value: number) => void;
  interestRate: number;
  setInterestRate: (value: number) => void;
  calculateMonthlyPayment: () => number;

  // Face verification
  isCapturing: boolean;
  setIsCapturing: (value: boolean) => void;
  isVerifying: boolean;
  setIsVerifying: (value: boolean) => void;
  isVerified: boolean;
  setIsVerified: (value: boolean) => void;
  handleStartCapture: () => void;

  // Eligibility
  eligibilityStatus: EligibilityStatus;
  setEligibilityStatus: (value: EligibilityStatus) => void;
  calculateEligibility: () => void;
}

const useLoanApplication = (): LoanApplicationState => {
  // Personal information state
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [employment, setEmployment] = useState('');
  const [income, setIncome] = useState('');
  
  // Document upload state
  const [isIdUploaded, setIsIdUploaded] = useState(false);
  const [isIdUploading, setIsIdUploading] = useState(false);
  const [isIncomeUploaded, setIsIncomeUploaded] = useState(false);
  const [isIncomeUploading, setIsIncomeUploading] = useState(false);
  
  // Loan details state
  const [loanAmount, setLoanAmount] = useState(25000);
  const [loanPurpose, setLoanPurpose] = useState('');
  const [loanTerm, setLoanTerm] = useState(60);
  const [interestRate, setInterestRate] = useState(5.25);
  
  // Face verification state
  const [isCapturing, setIsCapturing] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  
  // Eligibility state
  const [eligibilityStatus, setEligibilityStatus] = useState<EligibilityStatus>('pending');
  
  // Handle document upload
  const handleIdUpload = (file: File) => {
    console.log('ID document uploaded:', file.name);
    setIsIdUploading(true);
    
    // Simulate processing
    setTimeout(() => {
      setIsIdUploading(false);
      setIsIdUploaded(true);
      toast.success('ID document uploaded successfully');
    }, 2000);
  };
  
  const handleIncomeUpload = (file: File) => {
    console.log('Income document uploaded:', file.name);
    setIsIncomeUploading(true);
    
    // Simulate processing
    setTimeout(() => {
      setIsIncomeUploading(false);
      setIsIncomeUploaded(true);
      toast.success('Income document uploaded successfully');
    }, 2500);
  };
  
  // Handle face verification
  const handleStartCapture = () => {
    setIsCapturing(true);
    
    // Simulate capture process
    setTimeout(() => {
      setIsCapturing(false);
      setIsVerifying(true);
      
      // Simulate verification process
      setTimeout(() => {
        setIsVerifying(false);
        setIsVerified(true);
        toast.success('Face verification completed');
      }, 3000);
    }, 4000);
  };
  
  // Calculate monthly payment
  const calculateMonthlyPayment = () => {
    const principal = loanAmount;
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm;
    
    if (monthlyRate === 0) return principal / numberOfPayments;
    
    const payment = principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments) / 
                  (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    
    return payment;
  };

  // Calculate eligibility
  const calculateEligibility = () => {
    // Simulate eligibility calculation
    setTimeout(() => {
      // Simple eligibility logic
      const annualIncome = parseFloat(income.replace(/[^0-9.]/g, '')) || 0;
      const debtToIncome = (loanAmount / annualIncome) * 100;
      
      if (annualIncome > loanAmount * 0.5) {
        setEligibilityStatus('approved');
      } else if (debtToIncome > 40) {
        setEligibilityStatus('rejected');
      } else {
        setEligibilityStatus('conditional');
      }
    }, 2000);
  };

  return {
    // Personal information
    fullName,
    setFullName,
    email,
    setEmail,
    phone,
    setPhone,
    address,
    setAddress,
    employment,
    setEmployment,
    income,
    setIncome,

    // Document upload
    isIdUploaded,
    setIsIdUploaded,
    isIdUploading,
    setIsIdUploading,
    isIncomeUploaded,
    setIsIncomeUploaded,
    isIncomeUploading,
    setIsIncomeUploading,
    handleIdUpload,
    handleIncomeUpload,

    // Loan details
    loanAmount,
    setLoanAmount,
    loanPurpose,
    setLoanPurpose,
    loanTerm,
    setLoanTerm,
    interestRate,
    setInterestRate,
    calculateMonthlyPayment,

    // Face verification
    isCapturing,
    setIsCapturing,
    isVerifying,
    setIsVerifying,
    isVerified,
    setIsVerified,
    handleStartCapture,

    // Eligibility
    eligibilityStatus,
    setEligibilityStatus,
    calculateEligibility
  };
};

export default useLoanApplication;
