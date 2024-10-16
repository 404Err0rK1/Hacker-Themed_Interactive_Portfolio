import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

const bootSteps = [
  { message: 'Initializing system kernel...', duration: 1500 },
  { message: 'Loading system drivers...', duration: 1000 },
  { message: 'Checking hardware compatibility...', duration: 2000 },
  { message: 'Establishing network connection...', duration: 1500 },
  { message: 'Loading user interface...', duration: 1000 },
];

const BootSequence = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [stepProgress, setStepProgress] = useState('');

  useEffect(() => {
    if (currentStep < bootSteps.length) {
      const timer = setTimeout(() => {
        setCurrentStep(currentStep + 1);
        setStepProgress('');
      }, bootSteps[currentStep].duration);

      const progressTimer = setInterval(() => {
        setStepProgress((prev) => prev + '.');
      }, bootSteps[currentStep].duration / 3);

      return () => {
        clearTimeout(timer);
        clearInterval(progressTimer);
      };
    } else {
      onComplete();
    }
  }, [currentStep, onComplete]);

  return (
    <div className="font-mono text-green-400">
      <h2 className="text-2xl mb-4">System Boot Sequence</h2>
      {bootSteps.map((step, index) => (
        <div key={index} className="mb-2 flex items-center">
          {index < currentStep ? (
            <CheckCircle className="mr-2 text-green-500" size={16} />
          ) : index === currentStep ? (
            <div className="mr-2 w-4 h-4 bg-yellow-500 rounded-full animate-pulse"></div>
          ) : (
            <XCircle className="mr-2 text-gray-500" size={16} />
          )}
          <span className={index < currentStep ? 'text-gray-400' : ''}>
            {step.message}
            {index === currentStep && stepProgress}
          </span>
        </div>
      ))}
      {currentStep >= bootSteps.length && (
        <div className="mt-4 text-yellow-500">
          Boot sequence completed. Initializing main system...
        </div>
      )}
    </div>
  );
};

export default BootSequence;
