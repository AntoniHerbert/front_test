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
  atualizarDadosEmpresa: (campo: keyof DadosEmpresa, valor: string) => void;
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

  const atualizarDadosEmpresa = (campo: keyof DadosEmpresa, valor: string) => {
    setDadosEmpresa((prevDados) => ({
      ...prevDados,
      [campo]: valor,
    }));
  };

  return (
    <DadosEmpresaContext.Provider value={{ dadosEmpresa, atualizarDadosEmpresa }}>
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
