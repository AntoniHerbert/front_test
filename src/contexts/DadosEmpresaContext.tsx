
"use client";
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface DadosEmpresa {
  cnpj: string;
  razaoSocial: string;
  nome: string;
  cep: string;
  estado: string;
  cidade: string;
  bairro: string;
  rua: string;
  numero: string;
  email: string;
  telefone: string;
  area: string;
}

interface DadosEmpresaContextType {
  dadosEmpresa: DadosEmpresa;
  camposComErro: string[];
  atualizarDadosEmpresa: (campo: keyof DadosEmpresa, valor: string) => void;
  validarDadosEmpresa: () => void; // Não precisa mais retornar uma lista de erros
}

const DadosEmpresaContext = createContext<DadosEmpresaContextType | undefined>(undefined);

interface DadosEmpresaProviderProps {
  children: ReactNode;
}

export const DadosEmpresaProvider: React.FC<DadosEmpresaProviderProps> = ({ children }) => {
  const [dadosEmpresa, setDadosEmpresa] = useState<DadosEmpresa>({
    cnpj: '',
    razaoSocial: '',
    nome: '',
    cep: '',
    estado: '',
    cidade: '',
    bairro: '',
    rua: '',
    numero: '',
    email: '',
    telefone: '',
    area: '',
  });

  const [camposComErro, setCamposComErro] = useState<string[]>([]);



  const atualizarDadosEmpresa = (campo: keyof DadosEmpresa, valor: string) => {
    setDadosEmpresa((prevDados) => ({
      ...prevDados,
      [campo]: valor,
    }));

    // Remove erro do campo, se o valor for preenchido
    setCamposComErro((prev) => prev.filter((c) => c !== campo));
  };

 
const validarDadosEmpresa = () => {
  const camposInvalidos: string[] = [];
  Object.keys(dadosEmpresa).forEach((campo) => {
    if (!dadosEmpresa[campo as keyof DadosEmpresa]) {
      camposInvalidos.push(campo);
    }
  });

  setCamposComErro(camposInvalidos); // Atualiza o estado com os campos inválidos
  // Log para verificar
  return camposInvalidos;
};
  return (
    <DadosEmpresaContext.Provider value={{ dadosEmpresa, camposComErro, atualizarDadosEmpresa, validarDadosEmpresa }}>
      {children}
    </DadosEmpresaContext.Provider>
  );
};

export const useDadosEmpresa = (): DadosEmpresaContextType => {
  const context = useContext(DadosEmpresaContext);
  if (!context) {
    throw new Error('useDadosEmpresa deve ser usado dentro de um DadosEmpresaProvider');
  }
  return context;
};

