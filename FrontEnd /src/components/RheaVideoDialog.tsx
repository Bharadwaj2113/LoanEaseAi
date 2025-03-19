
import React from 'react';
import { X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog';

interface RheaVideoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  message: string;
  currentStep: number;
}

const RheaVideoDialog: React.FC<RheaVideoDialogProps> = ({
  open,
  onOpenChange,
  title,
  message,
  currentStep,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-loanease-primary">
            <span>Rhea</span>
            <span className="text-xs px-2 py-1 bg-loanease-light text-loanease-secondary rounded-full">
              AI Loan Officer
            </span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-col items-center space-y-4">
          <div className="rounded-full overflow-hidden border-2 border-loanease-secondary w-24 h-24">
            <img
              src="/lovable-uploads/4bedc6f4-26f2-4be1-8b92-3ebc81d87dba.png"
              alt="Rhea AI Loan Officer"
              className="w-full h-full object-cover object-top"
            />
          </div>
          
          <div className="p-4 bg-loanease-light/50 rounded-lg">
            <p className="text-gray-700">{message}</p>
          </div>
          
          <div className="bg-loanease-light/30 rounded-lg p-2 w-full text-center text-xs text-gray-500">
            Step {currentStep + 1}: {title}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RheaVideoDialog;
