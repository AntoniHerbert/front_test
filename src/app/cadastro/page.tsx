"use client";


import { Autocomplete, Box, Button } from '@mui/material';
import TextField from '@mui/material/TextField';

import DadosEmpresa from "../../components/Cadastro"

import StepContext from '@mui/material/Step';

import StepperControl from "../../components/StepperControl"

import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

import React, { useState } from 'react';

import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import HorizontalNonLinearStepper from '@/components/Stepper';
import Categorias from '@/components/Categorias';
import Segmentos from '@/components/Segmentos';
import { Segment } from '@mui/icons-material';
import StepperControls from '../../components/StepperControl';
import { CategoriasProvider } from '@/contexts/CategoriasContext';
import { SegmentosProvider } from '@/contexts/SegmentosContext';
import { DadosEmpresaProvider } from '@/contexts/DadosEmpresaContext';
import { CidadesProvider } from '@/contexts/CidadesContext';


const Cadastro: React.FC = () => {
  const steps = [
    '1. Dados da empresa',
    '2. Segmentos ',
    '3. Categorias',
  ];

const [activeStep, setActiveStep] = useState(0);
const [completed, setCompleted] = useState<{ [k: number]: boolean }>({});

const isLastStep = activeStep === steps.length - 1;

const handleNext= () => {
  const newActiveStep =
  isLastStep && !allStepsCompleted()
  ? steps.findIndex((_, i) => !(i in completed))
  : activeStep + 1;
setActiveStep(newActiveStep);
  };
  

const handleBack=()=>{
      setActiveStep((prevStep) => prevStep - 1)

  };

  const handleStepChange = (step: number) => {
    setActiveStep(step);
  };

  const allStepsCompleted = () => {
    return Object.keys(completed).length === steps.length;
  };

    return (
      <div className=" items-center justify-items-center p-8 pb-20 gap-16 font-[family-name:var(--font-geist-sans)]">
        
        <main className=" grid grid-cols-1 justify-items-center bg-other w-1285 h-921">
        <DadosEmpresaProvider>
      <SegmentosProvider>
        <CategoriasProvider>
          <CidadesProvider>
        <div style={{ marginTop: '20px' }}>
        {activeStep === 0 && <DadosEmpresa></DadosEmpresa>}
        {activeStep === 1 && <Segmentos></Segmentos>}
        {activeStep === 2 && <Categorias></Categorias>}
      </div>
      </CidadesProvider>
      </CategoriasProvider>
      </SegmentosProvider>
      </DadosEmpresaProvider>
          <div className="flex gap-4 items-center flex-col  w-500 h-100 col-start-1 row-start-6 col-span-3">

          <StepperControls
        activeStep={activeStep}
        isLastStep={isLastStep}
        onNext={handleNext}
        onBack={handleBack}
      />

    
          <HorizontalNonLinearStepper
        steps={steps}
        activeStep={activeStep}
        completed={completed}
        onStepChange={handleStepChange}
      />
























{/* 
            <a
              className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
              href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >

              Deploy now
            </a>
            <a
              className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
              href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              Read our docs
            </a> */}
          </div>
        </main>
        
      </div>
    );
  };

  export default Cadastro;