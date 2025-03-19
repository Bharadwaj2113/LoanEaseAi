
import { useState, useEffect, useCallback } from 'react';

interface UseSpeechRecognitionProps {
  onResult?: (transcript: string) => void;
  onEnd?: () => void;
  language?: string;
}

interface UseSpeechRecognitionReturn {
  isListening: boolean;
  transcript: string;
  startListening: () => void;
  stopListening: () => void;
  resetTranscript: () => void;
  browserSupportsSpeechRecognition: boolean;
}

const useSpeechRecognition = ({
  onResult,
  onEnd,
  language = 'en-US',
}: UseSpeechRecognitionProps = {}): UseSpeechRecognitionReturn => {
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [browserSupportsSpeechRecognition, setBrowserSupportsSpeechRecognition] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Check if browser supports SpeechRecognition
    const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (SpeechRecognitionAPI) {
      setBrowserSupportsSpeechRecognition(true);
      
      const recognitionInstance = new SpeechRecognitionAPI();
      
      recognitionInstance.continuous = true;
      recognitionInstance.interimResults = true;
      recognitionInstance.lang = language;
      
      recognitionInstance.onresult = (event) => {
        const current = event.resultIndex;
        const result = event.results[current];
        const transcriptResult = result[0].transcript;
        
        setTranscript(transcriptResult);
        
        if (onResult) {
          onResult(transcriptResult);
        }
      };
      
      recognitionInstance.onend = () => {
        setIsListening(false);
        
        if (onEnd) {
          onEnd();
        }
      };
      
      recognitionInstance.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };
      
      setRecognition(recognitionInstance);
    }
    
    return () => {
      if (recognition) {
        recognition.stop();
      }
    };
  }, [language, onEnd, onResult]);

  const startListening = useCallback(() => {
    if (!recognition) return;
    
    setTranscript('');
    setIsListening(true);
    
    try {
      recognition.start();
    } catch (error) {
      console.error('Error starting speech recognition:', error);
    }
  }, [recognition]);

  const stopListening = useCallback(() => {
    if (!recognition) return;
    
    recognition.stop();
    setIsListening(false);
  }, [recognition]);

  const resetTranscript = useCallback(() => {
    setTranscript('');
  }, []);

  return {
    isListening,
    transcript,
    startListening,
    stopListening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  };
};

export default useSpeechRecognition;
