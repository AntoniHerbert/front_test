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
            <StepLabel
sx={{
    '& .MuiStepIcon-root': { display: 'none' }, // Remove os ícones dos passos
    '& .MuiStepLabel-label': {
      color: activeStep === index || completed[index] ? 'green' : 'white', // Cor do texto da label
    },
    '& .MuiStepLabel-label.Mui-active': {
      color: 'green', // Garante que a label fique verde quando ativa
    },
    '& .MuiStepLabel-label.Mui-completed': {
      color: 'green', // Garante que a label fique verde quando completa
    },
    borderTop: '2px solid', // Adiciona a borda superior
    borderColor: activeStep === index || completed[index] ? 'green' : 'white', // Cor da borda
  }}
            >
             {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

export default HorizontalNonLinearStepper;
