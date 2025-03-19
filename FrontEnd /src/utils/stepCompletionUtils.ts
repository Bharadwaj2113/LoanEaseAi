
import { LoanApplicationState } from '@/hooks/useLoanApplication';

export const isStepComplete = (currentStep: number, loanState: LoanApplicationState): boolean => {
  switch (currentStep) {
    case 0: // Welcome
      return true;
    case 1: // Personal Info
      return Boolean(
        loanState.fullName && 
        loanState.email && 
        loanState.phone && 
        loanState.address && 
        loanState.employment && 
        loanState.income
      );
    case 2: // Documents
      return loanState.isIdUploaded && loanState.isIncomeUploaded;
    case 3: // Loan Details
      return loanState.loanAmount > 0 && Boolean(loanState.loanPurpose) && loanState.loanTerm > 0;
    case 4: // Face Verification
      return loanState.isVerified;
    default:
      return false;
  }
};
