
"use client";

import React, { useEffect, useState } from "react";
import {
  TextField,
  Autocomplete,
  FormControl,
  Typography,
  CircularProgress,
} from "@mui/material";
import axios from "axios";

const DadosEmpresa: React.FC = () => {
  const [dadosEmpresa, setDadosEmpresa] = useState<DadosEmpresa>(() => {
    console.log(typeof window);
    const storedData = localStorage.getItem("dadosEmpresa");
    return storedData
      ? JSON.parse(storedData)
      : {
          cnpj: "",
          razaoSocial: "",
          nome: "",
          cep: "",
          estado: "",
          cidade: "",
          bairro: "",
          rua: "",
          numero: "",
          email: "",
          telefone: "",
          area: "",
        };
  });

  const [camposComErro, setCamposComErro] = useState<string[]>([]);
  const [camposDesabilitados, setCamposDesabilitados] = useState<boolean>(false);
  const [cidades, setCidades] = useState<string[]>([]);
  const [loadingCep, setLoadingCep] = useState<boolean>(false);

  const areas = ["Restaurante"];
  const estados = [
    "AC",
    "AL",
    "AP",
    "AM",
    "BA",
    "CE",
    "ES",
    "GO",
    "MA",
    "MT",
    "MS",
    "MG",
    "PA",
    "PB",
    "PR",
    "PE",
    "PI",
    "RJ",
    "RN",
    "RS",
    "RO",
    "RR",
    "SC",
    "SP",
    "SE",
    "TO",
    "DF",
  ];

  // Atualiza o localStorage toda vez que `dadosEmpresa` mudar
  useEffect(() => {
    localStorage.setItem("dadosEmpresa", JSON.stringify(dadosEmpresa));
  }, [dadosEmpresa]);

  useEffect(() => {
    if (dadosEmpresa.estado) {
      carregarCidades(dadosEmpresa.estado).then(setCidades);
    } else {
      setCidades([]);
    }
  }, [dadosEmpresa.estado]);

  const atualizarDadosEmpresa = (campo: keyof DadosEmpresa, valor: string) => {
    setDadosEmpresa((prev) => ({ ...prev, [campo]: valor }));
    setCamposComErro((prev) => prev.filter((c) => c !== campo)); // Remove erro do campo se preenchido
  };

  const carregarCidades = async (estado: string): Promise<string[]> => {
    // Simula uma chamada para buscar cidades (adicione sua lógica aqui)
    return new Promise((resolve) => setTimeout(() => resolve(["Cidade1", "Cidade2"]), 500));
  };

  const buscarEnderecoPorCep = async (cep: string) => {
    if (!cep || cep.length < 8) return;

    setLoadingCep(true);
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      if (response.data && !response.data.erro) {
        const { logradouro, bairro, localidade, uf } = response.data;
        atualizarDadosEmpresa("rua", logradouro || "");
        atualizarDadosEmpresa("bairro", bairro || "");
        atualizarDadosEmpresa("cidade", localidade || "");
        atualizarDadosEmpresa("estado", uf || "");
        setCamposDesabilitados(true);
      } else {
        alert("O CEP informado não foi encontrado.");
        setCamposDesabilitados(false);
      }
    } catch (error) {
      console.error("Erro ao buscar o CEP:", error);
      alert("Erro ao buscar o CEP.");
      setCamposDesabilitados(false);
    } finally {
      setLoadingCep(false);
    }
  };

  const validarCNPJ = (cnpj: string): boolean => {
    // Adicione a validação de CNPJ aqui
    return true; // Exemplo simplificado
  };

  const validarDadosEmpresa = () => {
    const camposInvalidos: string[] = [];

    if (!validarCNPJ(dadosEmpresa.cnpj)) camposInvalidos.push("cnpj");
    if (!dadosEmpresa.telefone.match(/^\d{11}$/)) camposInvalidos.push("telefone");
    if (!dadosEmpresa.email.includes("@")) camposInvalidos.push("email");
    if (!dadosEmpresa.numero) camposInvalidos.push("numero");

    setCamposComErro(camposInvalidos);
  };

  return (
    <>
      {loadingCep && (
        <div className="absolute inset-0 bg-gray-800 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
          <CircularProgress size={60} />
        </div>
      )}
      <FormControl
        className={`grid grid-cols-3 gap-4 items-center transition-opacity duration-300 ${
          loadingCep ? "blur-sm" : ""
        }`}
      >
        <Typography
          variant="h1"
          color="#ffffff"
          className="text-foreground items text-center text-4xl col-start-1 row-start-1 col-span-3"
        >
          Cadastro da Empresa
        </Typography>

        <TextField
          required
          label="CNPJ"
          value={dadosEmpresa.cnpj}
          onChange={(e) => atualizarDadosEmpresa("cnpj", e.target.value)}
          error={camposComErro.includes("cnpj")}
          helperText={camposComErro.includes("cnpj") ? "CNPJ inválido" : ""}
        />

        {/* Adicione os outros campos seguindo a mesma lógica */}

        <button onClick={validarDadosEmpresa}>Validar</button>
      </FormControl>
    </>
  );
};

export default DadosEmpresa;
