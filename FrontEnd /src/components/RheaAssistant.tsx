
import React, { useState } from 'react';
import { Mic, MicOff, Circle, Video } from 'lucide-react';
import { Button } from '@/components/ui/button';
import RheaVideoDialog from './RheaVideoDialog';

interface RheaAssistantProps {
  onStartListening: () => void;
  onStopListening: () => void;
  isListening: boolean;
  transcript: string;
  message?: string;
  currentStep?: number;
  currentStepTitle?: string;
}

const RheaAssistant: React.FC<RheaAssistantProps> = ({ 
  onStartListening, 
  onStopListening, 
  isListening, 
  transcript,
  message = "Hi there! I'm Rhea, your AI loan assistant. I'll guide you through the application process. How can I help you today?",
  currentStep = 0,
  currentStepTitle = "Welcome"
}) => {
  const [videoDialogOpen, setVideoDialogOpen] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 animate-fade-in">
      <div className="flex flex-col md:flex-row gap-6 items-center">
        <div className="flex-shrink-0 rounded-full overflow-hidden border-2 border-loanease-secondary">
          <img 
            src="/lovable-uploads/4bedc6f4-26f2-4be1-8b92-3ebc81d87dba.png" 
            alt="Rhea AI Loan Officer" 
            className="w-20 h-20 object-cover object-top"
          />
        </div>
        
        <div className="flex-grow space-y-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold text-loanease-primary">Rhea</h3>
              <span className="text-xs px-2 py-1 bg-loanease-light text-loanease-secondary rounded-full">AI Loan Officer</span>
            </div>
            
            <p className="text-gray-700">{message}</p>
          </div>
          
          {isListening && (
            <div className="voice-wave-container flex items-center justify-center h-10 my-2">
              {[...Array(10)].map((_, i) => (
                <div 
                  key={i} 
                  className="voice-bar" 
                  style={{ '--index': i } as React.CSSProperties}
                />
              ))}
            </div>
          )}
          
          {transcript && (
            <div className="bg-loanease-light rounded-lg p-3 text-gray-700">
              <p className="font-medium text-sm">I heard:</p>
              <p>{transcript}</p>
            </div>
          )}
          
          <div className="flex justify-between items-center">
            <Button
              variant={isListening ? "destructive" : "default"}
              className={isListening ? "bg-red-500 hover:bg-red-600" : "bg-loanease-secondary hover:bg-loanease-secondary/90"}
              onClick={isListening ? onStopListening : onStartListening}
            >
              {isListening ? (
                <>
                  <MicOff size={16} className="mr-2" />
                  Stop Listening
                </>
              ) : (
                <>
                  <Mic size={16} className="mr-2" />
                  Speak to Rhea
                </>
              )}
            </Button>
            
            <Button 
              variant="outline" 
              onClick={() => setVideoDialogOpen(true)}
              className="flex items-center"
            >
              <Video size={16} className="mr-2" />
              Open Video
            </Button>
            
            {isListening && (
              <div className="flex items-center text-xs text-loanease-gray">
                <Circle size={8} className="text-red-500 animate-pulse mr-2" />
                Listening...
              </div>
            )}
          </div>
        </div>
      </div>

      <RheaVideoDialog 
        open={videoDialogOpen}
        onOpenChange={setVideoDialogOpen}
        title={currentStepTitle}
        message={message}
        currentStep={currentStep}
      />
    </div>
  );
};

export default RheaAssistant;
