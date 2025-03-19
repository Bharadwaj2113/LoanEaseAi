
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import ProgressTracker from '@/components/ProgressTracker';
import RheaAssistant from '@/components/RheaAssistant';
import PersonalInfoForm from '@/components/PersonalInfoForm';
import DocumentUploader from '@/components/DocumentUploader';
import LoanDetailsForm from '@/components/LoanDetailsForm';
import FaceVerification from '@/components/FaceVerification';
import EligibilitySummary from '@/components/EligibilitySummary';
import WelcomeStep from '@/components/WelcomeStep';
import StepNavigation from '@/components/StepNavigation';
import useSpeechRecognition from '@/hooks/useSpeechRecognition';
import useLoanApplication from '@/hooks/useLoanApplication';
import { isStepComplete } from '@/utils/stepCompletionUtils';
import { LOAN_APPLICATION_STEPS, RHEA_WELCOME_MESSAGES } from '@/constants/loanApplicationConstants';
import { toast } from 'sonner';

const Index = () => {
  // Current step state
  const [currentStep, setCurrentStep] = useState(0);
  
  // Loan application state from our custom hook
  const loanState = useLoanApplication();
  
  // Speech recognition
  const {
    transcript,
    isListening,
    startListening,
    stopListening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition({
    onResult: (result) => {
      console.log('Speech recognition result:', result);
    }
  });
  
  // Calculate eligibility when reaching the final step
  useEffect(() => {
    if (currentStep === 5) {
      loanState.calculateEligibility();
    }
  }, [currentStep, loanState]);
  
  // Navigate to next step
  const nextStep = () => {
    if (currentStep < LOAN_APPLICATION_STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
      resetTranscript();
      window.scrollTo(0, 0);
    }
  };
  
  // Navigate to previous step
  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      resetTranscript();
      window.scrollTo(0, 0);
    }
  };
  
  return (
    <div className="min-h-screen bg-loanease-light/50 flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <ProgressTracker currentStep={currentStep} steps={LOAN_APPLICATION_STEPS} />
        
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <RheaAssistant
            onStartListening={startListening}
            onStopListening={stopListening}
            isListening={isListening}
            transcript={transcript}
            message={RHEA_WELCOME_MESSAGES[currentStep]}
            currentStep={currentStep}
            currentStepTitle={LOAN_APPLICATION_STEPS[currentStep]}
          />
          
          <div className="mt-8">
            {currentStep === 0 && <WelcomeStep onContinue={nextStep} />}
            
            {currentStep === 1 && (
              <PersonalInfoForm
                fullName={loanState.fullName}
                setFullName={loanState.setFullName}
                email={loanState.email}
                setEmail={loanState.setEmail}
                phone={loanState.phone}
                setPhone={loanState.setPhone}
                address={loanState.address}
                setAddress={loanState.setAddress}
                employment={loanState.employment}
                setEmployment={loanState.setEmployment}
                income={loanState.income}
                setIncome={loanState.setIncome}
              />
            )}
            
            {currentStep === 2 && (
              <div className="space-y-6">
                <DocumentUploader
                  title="Upload Identification"
                  description="Please upload a government-issued ID (driver's license, passport, etc.)"
                  onFileUpload={loanState.handleIdUpload}
                  isUploading={loanState.isIdUploading}
                  isSuccess={loanState.isIdUploaded}
                />
                
                <DocumentUploader
                  title="Upload Proof of Income"
                  description="Please upload a recent pay stub, W-2, or tax return"
                  onFileUpload={loanState.handleIncomeUpload}
                  isUploading={loanState.isIncomeUploading}
                  isSuccess={loanState.isIncomeUploaded}
                />
              </div>
            )}
            
            {currentStep === 3 && (
              <LoanDetailsForm
                loanAmount={loanState.loanAmount}
                setLoanAmount={loanState.setLoanAmount}
                loanPurpose={loanState.loanPurpose}
                setLoanPurpose={loanState.setLoanPurpose}
                loanTerm={loanState.loanTerm}
                setLoanTerm={loanState.setLoanTerm}
                interestRate={loanState.interestRate}
              />
            )}
            
            {currentStep === 4 && (
              <FaceVerification
                isCapturing={loanState.isCapturing}
                isVerifying={loanState.isVerifying}
                isVerified={loanState.isVerified}
                onStartCapture={loanState.handleStartCapture}
                onRetry={() => {
                  loanState.setIsVerified(false);
                  loanState.setIsVerifying(false);
                }}
              />
            )}
            
            {currentStep === 5 && (
              <EligibilitySummary
                status={loanState.eligibilityStatus}
                loanAmount={loanState.loanAmount}
                interestRate={loanState.interestRate}
                loanTerm={loanState.loanTerm}
                monthlyPayment={loanState.calculateMonthlyPayment()}
                reasons={
                  loanState.eligibilityStatus === 'rejected' 
                    ? ['Insufficient income relative to loan amount', 'High debt-to-income ratio'] 
                    : []
                }
                suggestions={
                  loanState.eligibilityStatus !== 'approved'
                    ? [
                        'Consider requesting a lower loan amount',
                        'Increase your down payment to reduce the loan amount',
                        'Extend the loan term to lower monthly payments'
                      ]
                    : []
                }
                onContinue={() => toast.success('Application submitted successfully!')}
                onModify={() => setCurrentStep(3)}
              />
            )}
          </div>
          
          <StepNavigation
            currentStep={currentStep}
            totalSteps={LOAN_APPLICATION_STEPS.length}
            isStepComplete={isStepComplete(currentStep, loanState)}
            onNext={nextStep}
            onPrev={prevStep}
          />
        </div>
      </main>
      
      <footer className="py-6 bg-white shadow-md mt-10">
        <div className="container mx-auto px-4 text-center text-sm text-gray-600">
          <p>© 2023 LoanEase AI. All rights reserved.</p>
          <p className="mt-2">
            <a href="#" className="text-loanease-secondary hover:underline mx-2">Privacy Policy</a>
            <a href="#" className="text-loanease-secondary hover:underline mx-2">Terms of Service</a>
            <a href="#" className="text-loanease-secondary hover:underline mx-2">Contact Us</a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
