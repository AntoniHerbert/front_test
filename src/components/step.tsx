import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { StepLabel } from '@mui/material';

const steps = ['1. Dados da empresa', '2. Segmentos', '3. Categorias'];

export default function HorizontalNonLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState<{
    [k: number]: boolean;
  }>({});

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    setCompleted({
      ...completed,
      [activeStep]: true,
    });
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  return (
    <Box sx={{ width: '100%' }}>
        <div>

<React.Fragment>

  <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
    <Button
      disabled={activeStep === 0}
      onClick={handleBack}
      sx={{ mr: 1 }}
      className=" text-slate-400 flex flex-row items-center uppercase py-2 px-4 rounded-xl font-semibold cursor-pointer hover:bg-slate-700 hover: text-white transition duration-200 ease-in-out"><IoIosArrowBack />Anterior
    
    </Button>
    <Box sx={{ flex: '1 1 auto' }} />
    <Button onClick={handleNext} sx={{ mr: 1 }} className=" text-slate-400 flex flex-row items-center uppercase py-2 px-4 rounded-xl font-semibold cursor-pointer hover:bg-slate-700 hover: text-white transition duration-200 ease-in-out">Próximo<IoIosArrowForward />
    </Button>

  </Box>
</React.Fragment>

</div>
      <Stepper nonLinear activeStep={activeStep} alternativeLabel connector={null}>
        {steps.map((label, index) => (
          <Step key={label} completed={completed[index]}  >
            <StepButton  onClick={handleStep(index)} sx={{ '& .MuiStepIcon-root': { display: 'none' },                 color: activeStep === index || completed[index] ? 'green' : 'white', // Verde se ativo ou completo, branco caso contrário
                // Cor do ícone (se for exibido)
                '& .MuiStepLabel-icon': {
                  color: activeStep === index || completed[index] ? 'green' : 'white', // Verde se ativo ou completo, branco caso contrário
                },
                                // Cor do texto (igual à cor da borda)
                                '& .MuiStepLabel-label': {
                                    color: activeStep === index || completed[index] ? 'green' : 'white', // Verde se ativo ou completo, branco caso contrário
                                  },
                // Borda superior de 2px
                '& .MuiStepLabel-root': {
                  borderTop: '2px solid',
                  borderColor: activeStep === index || completed[index] ? 'green' : 'white', // Verde se ativo ou completo, branco caso contrário
                },}} >

              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      
    </Box>
  );
}
