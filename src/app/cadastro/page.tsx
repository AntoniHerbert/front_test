"use client";


import { Autocomplete, Box, Button } from '@mui/material';
import TextField from '@mui/material/TextField';



import StepperControl from "../../components/StepperControl"

import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

import React from 'react';

import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import HorizontalNonLinearStepper from '@/components/step';

export default function Cadastro() {
  const steps = [
    '1. Dados da empresa',
    '2. Segmentos ',
    '3. Categorias',
  ];

const [activeStep, setActiveStep] = React.useState(1)

const nextStep= () => {
  if (activeStep < 4){
    setActiveStep((currentStep) => currentStep + 1)
}
  }
  

const previousStep=()=>{
  if (activeStep > 0){
      setActiveStep((currentStep) => currentStep - 1)

  }
}

    return (
      <div className=" items-center justify-items-center p-8 pb-20 gap-16 font-[family-name:var(--font-geist-sans)]">
        
        <main className="grid grif-cols-3 gap-8 bg-other w-1285 h-921">
          <h1 className='text-foreground items text-center text-4xl col-start-1 row-start-1 col-span-3' >Cadastro da Empresa</h1>
        <TextField
        label="CNPJ"
        placeholder="Ex: 00000000000"
        variant="outlined"
        fullWidth
        margin="normal"
        sx={{
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#ffffff', // Borda
            },
          },
          '& .MuiInputLabel-root': {
            color: '#ffffff', // Cor da label
          },
          '& .MuiInputBase-input::placeholder': {
            color: '#ffffff', // Cor do placeholder
            opacity: 1, // Para garantir que o placeholder não fique transparente
          },
        }}
        className='col-start-1 row-start-2'
      />

        <TextField
        label="RAZÃO SOCIAL"
        placeholder="Ex: Comércio de Alimentos Ltda"
        variant="outlined"
        fullWidth
        margin="normal"
        sx={{
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#ffffff', // Borda
            },
          },
          '& .MuiInputLabel-root': {
            color: '#ffffff', // Cor da label
          },
          '& .MuiInputBase-input::placeholder': {
            color: '#ffffff', // Cor do placeholder
            opacity: 1, // Para garantir que o placeholder não fique transparente
          },
        }}
        className='col-start-2 row-start-2'

      />

<TextField
        label="NOME"
        placeholder="Ex: Minha Empresa"
        variant="outlined"
        fullWidth
        margin="normal"
        sx={{
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#ffffff', // Borda
            },
          },
          '& .MuiInputLabel-root': {
            color: '#ffffff', // Cor da label
          },
          '& .MuiInputBase-input::placeholder': {
            color: '#ffffff', // Cor do placeholder
            opacity: 1, // Para garantir que o placeholder não fique transparente
          },
        }}
        className='col-start-3 row-start-2'

      />

        <TextField 
        label="CEP"
        placeholder="Ex: 00000000"
        variant="outlined"
        fullWidth
        margin="normal"
        sx={{
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#ffffff', // Borda
            },
          },
          '& .MuiInputLabel-root': {
            color: '#ffffff', // Cor da label
          },
          '& .MuiInputBase-input::placeholder': {
            color: '#ffffff', // Cor do placeholder
            opacity: 1, // Para garantir que o placeholder não fique transparente
          },
        }}
        className='col-start-1 row-start-3'

      />


<Autocomplete
        options={['CE', 'AM', 'PE']}
        renderInput={(params) => (
          <TextField {...params} label="ESTADO" variant="outlined" fullWidth />
        )}
        freeSolo
        sx={{
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#ffffff', // Borda
            },

   
          },
          '& .MuiInputLabel-root': {
            color: '#ffffff', // Cor da label
  
          },
          '& .MuiInputBase-input::placeholder': {
            color: '#ffffff', // Cor do placeholder
            opacity: 1, // Garantir visibilidade do placeholder
          },
        }}
        className='col-start-2 row-start-3'

      />


<Autocomplete
        options={['Fortaleza', 'Maranguape', 'Maracanaú']}
        renderInput={(params) => (
          <TextField {...params} label="CIDADE" variant="outlined" fullWidth />
        )}
        freeSolo
        sx={{
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#ffffff', // Borda
            },

   
          },
          '& .MuiInputLabel-root': {
            color: '#ffffff', // Cor da label
  
          },
          '& .MuiInputBase-input::placeholder': {
            color: '#ffffff', // Cor do placeholder
            opacity: 1, // Garantir visibilidade do placeholder
          },
        }}
                className='col-start-3 row-start-3'
      />











<TextField
        label="BAIRRO"
        placeholder="Ex: Bairro Alto"
        variant="outlined"
        fullWidth
        margin="normal"
        sx={{
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#ffffff', // Borda
            },
          },
          '& .MuiInputLabel-root': {
            color: '#ffffff', // Cor da label
          },
          '& .MuiInputBase-input::placeholder': {
            color: '#ffffff', // Cor do placeholder
            opacity: 1, // Para garantir que o placeholder não fique transparente
          },
        }}
        className='col-start-1 row-start-4'

      />

<TextField 
        label="RUA"
        placeholder="Ex: Rua Baixa"
        variant="outlined"
        fullWidth
        margin="normal"
        sx={{
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#ffffff', // Borda
            },
          },
          '& .MuiInputLabel-root': {
            color: '#ffffff', // Cor da label
          },
          '& .MuiInputBase-input::placeholder': {
            color: '#ffffff', // Cor do placeholder
            opacity: 1, // Para garantir que o placeholder não fique transparente
          },
        }}
        className='col-start-2 row-start-4'

      />

<TextField 
        label="NUMERO"
        placeholder="987"
        variant="outlined"
        fullWidth
        margin="normal"
        sx={{
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#ffffff', // Borda
            },
          },
          '& .MuiInputLabel-root': {
            color: '#ffffff', // Cor da label
          },
          '& .MuiInputBase-input::placeholder': {
            color: '#ffffff', // Cor do placeholder
            opacity: 1, // Para garantir que o placeholder não fique transparente
          },
        }}
        className='col-start-3 row-start-4'

      />

<TextField 
        label="EMAIL PARA CONTATO"
        placeholder="Ex: meuemail@email.com"
        variant="outlined"
        fullWidth
        margin="normal"
        sx={{
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#ffffff', // Borda
            },
          },
          '& .MuiInputLabel-root': {
            color: '#ffffff', // Cor da label
          },
          '& .MuiInputBase-input::placeholder': {
            color: '#ffffff', // Cor do placeholder
            opacity: 1, // Para garantir que o placeholder não fique transparente
          },
        }}
        className='col-start-1 row-start-5'

      />

<TextField
        label="TELEFONE"
        placeholder="Ex: 0000000000"
        variant="outlined"
        fullWidth
        margin="normal"
        sx={{
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#ffffff', // Borda
            },
          },
          '& .MuiInputLabel-root': {
            color: '#ffffff', // Cor da label
          },
          '& .MuiInputBase-input::placeholder': {
            color: '#ffffff', // Cor do placeholder
            opacity: 1, // Para garantir que o placeholder não fique transparente
          },
        }}
        className='col-start-2 row-start-5'

      />

<Autocomplete
        options={['Construção', 'Mercado']}
        renderInput={(params) => (
          <TextField {...params} label="Área da empresa" variant="outlined" fullWidth placeholder='Ex: Construção'/>
        )}
        freeSolo
        sx={{
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#ffffff', // Borda
            },

   
          },
          '& .MuiInputLabel-root': {
            color: '#ffffff', // Cor da label
  
          },
          '& .MuiInputBase-input::placeholder': {
            color: '#ffffff', // Cor do placeholder
            opacity: 1, // Garantir visibilidade do placeholder
          },
        }}
        className='col-start-3 row-start-5'

      />
  
          <div className="flex gap-4 items-center flex-col  w-500 h-100 col-start-1 row-start-6 col-span-3">



    
<HorizontalNonLinearStepper></HorizontalNonLinearStepper>

























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
  }