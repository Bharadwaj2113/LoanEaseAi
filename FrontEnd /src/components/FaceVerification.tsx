
import React from 'react';
import { Camera, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface FaceVerificationProps {
  isCapturing: boolean;
  isVerifying: boolean;
  isVerified: boolean;
  onStartCapture: () => void;
  onRetry: () => void;
}

const FaceVerification: React.FC<FaceVerificationProps> = ({
  isCapturing,
  isVerifying,
  isVerified,
  onStartCapture,
  onRetry,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 animate-fade-in">
      <h3 className="text-lg font-semibold text-loanease-primary mb-4">Face Verification</h3>
      
      <div className="text-center space-y-6">
        <div 
          className={cn(
            "border-2 rounded-lg mx-auto max-w-md aspect-video flex items-center justify-center transition-all",
            isCapturing ? "border-loanease-secondary animate-border-pulse" : "border-gray-200",
            isVerified ? "border-green-500" : ""
          )}
        >
          {!isCapturing && !isVerifying && !isVerified && (
            <div className="p-8 flex flex-col items-center space-y-4">
              <div className="w-20 h-20 bg-loanease-light rounded-full flex items-center justify-center">
                <Camera size={32} className="text-loanease-secondary" />
              </div>
              <p className="text-gray-600">
                Please position your face within the frame and click "Start Capture" to begin the verification process.
              </p>
            </div>
          )}
          
          {isCapturing && (
            <div className="text-loanease-secondary">
              <div className="rounded-full bg-loanease-light p-3 mx-auto">
                <Camera size={40} className="animate-pulse" />
              </div>
              <p className="mt-4 font-medium">Please look directly at the camera</p>
            </div>
          )}
          
          {isVerifying && (
            <div className="text-loanease-primary">
              <RefreshCw size={40} className="mx-auto animate-spin" />
              <p className="mt-4 font-medium">Verifying your identity...</p>
            </div>
          )}
          
          {isVerified && (
            <div className="text-green-600">
              <svg className="mx-auto h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <p className="mt-4 font-medium">Verification completed successfully!</p>
            </div>
          )}
        </div>
        
        <div className="space-y-2">
          {!isVerified ? (
            <Button 
              onClick={onStartCapture}
              disabled={isCapturing || isVerifying}
              className="bg-loanease-secondary hover:bg-loanease-secondary/90"
            >
              {isCapturing ? "Capturing..." : "Start Capture"}
            </Button>
          ) : (
            <Button variant="outline" onClick={onRetry}>
              Retake
            </Button>
          )}
          
          <p className="text-xs text-gray-500 max-w-md mx-auto">
            Your face verification is securely processed and is only used for identity verification purposes.
            No permanent recording is stored.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FaceVerification;
