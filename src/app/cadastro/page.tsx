"use client";


import { Autocomplete, Box, Button } from '@mui/material';
import TextField from '@mui/material/TextField';

import DadosEmpresa from "../../components/EnterpriseRegister.tsx"

import StepContext from '@mui/material/Step';

import StepperControl from "../../components/StepperControl"

import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

import React, { useState, useRef, useEffect} from 'react';

import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import HorizontalNonLinearStepper from '@/components/Stepper';
import Categorias from '../../components/CategorySelection.tsx';
import Segmentos from '../../components/SegmentsSelection.tsx';
import { Segment } from '@mui/icons-material';
import StepperControls from '../../components/StepperControl';
import { CidadesProvider } from '@/contexts/CidadesContext';


const Cadastro: React.FC = () => {


  const steps = [
    '1. Dados da empresa',
    '2. Segmentos ',
    '3. Categorias',
  ];
const [erros, setErros] = useState<any>({});
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState<{ [k: number]: boolean }>({});
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
const [isValid, setIsValid] = useState(false);
 {/* const fetchCategories = async () => {
    try {
      const response = await fetch("api/category");

      if (!response.ok) {
        throw new Error("Erro ao buscar categorias");
      }

      const data: Category[] = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Erro ao carregar categorias:", error);
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);
*/}
const isLastStep = activeStep === steps.length - 1;

const [refresh, setRefresh] = useState(false);

  const segmentosRef = useRef<any>(null);
const categoriasRef = useRef<any>(null);
 const dadosEmpresaRef = useRef<any>(null);

const handleNext = () => {
  // Step 1: Validação de Dados da Empresa
if (activeStep === 0) {
      const isValid = dadosEmpresaRef.current.validarDados(); 
      console.log(isValid);// Chama a função de validação
      if (!isValid) {
        return;
      }
    }

  // Step 2: Validação de Segmentos
  if (activeStep === 1) {
    if (segmentosRef.current && !segmentosRef.current.validarSegmentos()) {
      alert('Por favor, selecione pelo menos um segmento.');
      return;
    }
  }

  // Step 3: Validação de Categorias
  if (activeStep === 2) {
    if (categoriasRef.current && !categoriasRef.current.validarCategorias()) {
      alert('Por favor, selecione pelo menos uma categoria.');
      return;
    }
  }

  // Avança para o próximo passo
  setActiveStep((prevStep) => prevStep + 1);
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
      
          <CidadesProvider>
        <div style={{ marginTop: '20px' }}>
        {activeStep === 0 && <DadosEmpresa setIsValid={setIsValid} ref={dadosEmpresaRef} />}
        {activeStep === 1 && <Segmentos ref={segmentosRef}></Segmentos>}
        {activeStep === 2 && <Categorias ref={categoriasRef} categoriesData={categories}/>}
      </div>
      </CidadesProvider>
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
          </div>
        </main>
        
      </div>
    );
  };

  export default Cadastro;
