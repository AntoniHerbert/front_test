
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
  camposDesabilitados: boolean;
setCamposDesabilitados: (desabilitar: boolean) => void;
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
const [camposDesabilitados, setCamposDesabilitados] = useState<boolean>(false);


  const atualizarDadosEmpresa = (campo: keyof DadosEmpresa, valor: string) => {
    setDadosEmpresa((prevDados) => ({
      ...prevDados,
      [campo]: valor,
    }));

    // Remove erro do campo, se o valor for preenchido
    setCamposComErro((prev) => prev.filter((c) => c !== campo));
  };

  const validarCNPJ = (cnpj: string): boolean => {
    cnpj = cnpj.replace(/\D/g, ""); // Remove caracteres não numéricos
    if (cnpj.length !== 14) return false;

    const calcularDigito = (base: string, pesos: number[]): number => {
      const soma = base.split("").reduce((acc, curr, index) => acc + parseInt(curr) * pesos[index], 0);
      const resto = soma % 11;
      return resto < 2 ? 0 : 11 - resto;
    };

    const base = cnpj.slice(0, 12);
    const digito1 = calcularDigito(base, [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]);
    const digito2 = calcularDigito(base + digito1, [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]);

    return cnpj === base + digito1.toString() + digito2.toString();
  };
 
 const validarDadosEmpresa = (): string[] => {
  const camposInvalidos: string[] = [];
  const errosDetalhados: Record<string, string> = {}; // Para mensagens específicas de erro

  // Validações específicas
  if (!dadosEmpresa.telefone.match(/^\d{11}$/)) {
    camposInvalidos.push("telefone");
    errosDetalhados["telefone"] = "O telefone deve ter exatamente 11 dígitos.";
  }

  if (!dadosEmpresa.email.includes("@")) {
    camposInvalidos.push("email");
    errosDetalhados["email"] = "O email deve conter um '@'.";
  }

  if (isNaN(Number(dadosEmpresa.numero)) || dadosEmpresa.numero.trim() === "") {
    camposInvalidos.push("numero");
    errosDetalhados["numero"] = "O número deve ser um valor numérico.";
  }

  if (!validarCNPJ(dadosEmpresa.cnpj)) {
    camposInvalidos.push("cnpj");
    errosDetalhados["cnpj"] = "O CNPJ é inválido. Verifique os dígitos verificadores.";
  }

  // Verificar campos vazios
  Object.keys(dadosEmpresa).forEach((campo) => {
    if (!dadosEmpresa[campo as keyof DadosEmpresa] && !camposInvalidos.includes(campo)) {
      camposInvalidos.push(campo);
      errosDetalhados[campo] = `O campo '${campo}' é obrigatório.`;
    }
  });

  setCamposComErro(camposInvalidos); // Atualiza o estado com os campos inválidos

  // Exibe alert se houver erros
  if (camposInvalidos.length > 0) {
    const mensagens = camposInvalidos.map((campo) => errosDetalhados[campo]);
    alert(`Erros encontrados:\n${mensagens.join("\n")}`);
  }

  return camposInvalidos; // Certifique-se de retornar o array
};
  return (
    <DadosEmpresaContext.Provider value={{ dadosEmpresa, camposComErro, atualizarDadosEmpresa, validarDadosEmpresa, camposDesabilitados, setCamposDesabilitados, }}>
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

