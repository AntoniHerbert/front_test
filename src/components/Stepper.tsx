import React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import { Button, StepLabel } from '@mui/material';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

interface StepperProps {
  steps: string[];
  activeStep: number;
  completed: { [k: number]: boolean };
  onStepChange: (step: number) => void;
}

const HorizontalNonLinearStepper: React.FC<StepperProps> = ({
  steps,
  activeStep,
  completed,
  onStepChange,
}) => {
  return (
    <Box sx={{ width: '100%' }} className="border-t-2 border-gray-600">
      <Stepper nonLinear activeStep={activeStep} alternativeLabel connector={null} className='pt-8'>
        {steps.map((label, index) => (
          <Step key={label} completed={completed[index]}>
            <StepButton
              onClick={() => onStepChange(index)}
              sx={{
                '& .MuiStepIcon-root': { display: 'none' },
                color: activeStep === index || completed[index] ? 'green' : 'white',
                '& .MuiStepLabel-label': {
                  color: activeStep === index || completed[index] ? 'green' : 'white',
                },
                '& .MuiStepLabel-alternativeLabel': {
                  color: activeStep === index || completed[index] ? 'green' : 'white',
                },
                '& .MuiStepLabel-root': {
                  borderTop: '2px solid',
                  borderColor: activeStep === index || completed[index] ? 'green' : 'white',
                  color: activeStep === index || completed[index] ? 'green' : 'white',
                },
              }}
            >
             {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

export default HorizontalNonLinearStepper;
