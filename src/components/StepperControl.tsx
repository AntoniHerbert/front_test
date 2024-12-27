import React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

interface StepperControlsProps {
  activeStep: number;
  isLastStep: boolean;
  onNext: () => void;
  onBack: () => void;
}

const StepperControls: React.FC<StepperControlsProps> = ({
  activeStep,
  isLastStep,
  onNext,
  onBack,
}) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2, gap: 35 }} >
      <Button
        disabled={activeStep === 0}
        onClick={onBack}
        sx={{ mr: 1 }}
        className="text-slate-400 flex flex-row items-center uppercase py-2 px-4 rounded-xl font-semibold cursor-pointer hover:bg-slate-700 hover:text-white transition duration-200 ease-in-out"
      >
        <IoIosArrowBack />
        Anterior
      </Button>
      <Box sx={{ flex: '1 1 auto' }} />
      <Button
        onClick={onNext}
        disabled={isLastStep}
        sx={{ mr: 1 }}
        className="text-slate-400 flex flex-row items-center uppercase py-2 px-4 rounded-xl font-semibold cursor-pointer hover:bg-slate-700 hover:text-white transition duration-200 ease-in-out"
      >
        Próximo
        <IoIosArrowForward />
      </Button>
    </Box>
  );
};

export default StepperControls;
