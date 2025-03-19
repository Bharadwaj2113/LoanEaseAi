
import React, { useState } from 'react';
import { Upload, CheckCircle2, XCircle, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface DocumentUploaderProps {
  title: string;
  description: string;
  onFileUpload: (file: File) => void;
  acceptedFileTypes?: string;
  isUploading?: boolean;
  isSuccess?: boolean;
  isError?: boolean;
  errorMessage?: string;
}

const DocumentUploader: React.FC<DocumentUploaderProps> = ({
  title,
  description,
  onFileUpload,
  acceptedFileTypes = "application/pdf,image/jpeg,image/png",
  isUploading = false,
  isSuccess = false,
  isError = false,
  errorMessage = "There was an error uploading your document. Please try again."
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const uploadedFile = e.dataTransfer.files[0];
      handleFile(uploadedFile);
    }
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const uploadedFile = e.target.files[0];
      handleFile(uploadedFile);
    }
  };
  
  const handleFile = (uploadedFile: File) => {
    setFile(uploadedFile);
    onFileUpload(uploadedFile);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 animate-fade-in">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-loanease-primary">{title}</h3>
        <p className="text-gray-700">{description}</p>
        
        <div 
          className={cn(
            "border-2 border-dashed rounded-lg p-8 text-center transition-all",
            dragActive ? "border-loanease-secondary bg-loanease-light/50" : "border-gray-300 hover:border-loanease-secondary",
            isSuccess ? "bg-green-50 border-green-300" : "",
            isError ? "bg-red-50 border-red-300" : ""
          )}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          {!isSuccess && !isError && !isUploading && (
            <div className="space-y-4">
              <div className="mx-auto w-12 h-12 bg-loanease-light rounded-full flex items-center justify-center">
                <Upload size={24} className="text-loanease-secondary" />
              </div>
              <div>
                <p className="text-sm font-medium">
                  Drag and drop your file here, or
                </p>
                <label className="mt-2 cursor-pointer inline-block">
                  <span className="text-sm bg-loanease-light text-loanease-secondary px-4 py-2 rounded-md hover:bg-loanease-light/80 transition-colors">
                    Browse files
                  </span>
                  <input
                    type="file"
                    className="hidden"
                    accept={acceptedFileTypes}
                    onChange={handleFileChange}
                  />
                </label>
              </div>
              <p className="text-xs text-gray-500">
                Supported formats: PDF, JPG, PNG (Max size: 10MB)
              </p>
            </div>
          )}
          
          {isUploading && (
            <div className="space-y-4">
              <div className="flex items-center justify-center space-x-2">
                <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-loanease-secondary"></div>
                <span className="font-medium text-loanease-primary">Uploading document...</span>
              </div>
              {file && <p className="text-sm text-gray-600">{file.name}</p>}
            </div>
          )}
          
          {isSuccess && (
            <div className="space-y-4">
              <CheckCircle2 size={48} className="text-green-500 mx-auto" />
              <p className="font-medium text-green-700">Document uploaded successfully!</p>
              {file && (
                <div className="flex items-center justify-center space-x-2 text-sm">
                  <FileText size={16} />
                  <span>{file.name}</span>
                </div>
              )}
            </div>
          )}
          
          {isError && (
            <div className="space-y-4">
              <XCircle size={48} className="text-red-500 mx-auto" />
              <p className="font-medium text-red-700">{errorMessage}</p>
              <Button 
                variant="outline" 
                className="border-red-300 text-red-600 hover:bg-red-50"
                onClick={() => setFile(null)}
              >
                Try Again
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DocumentUploader;
