
import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { TextField, Autocomplete, FormControl, Typography, CircularProgress } from '@mui/material';
import axios from 'axios';

const estados = ['SP', 'RJ', 'MG', 'RS', 'SC', 'PR', 'BA', 'PE', 'CE'];
const areasEmpresa = ['Restaurante'];

const DadosEmpresa = forwardRef(({ setIsValid }: { setIsValid: (valid: boolean) => void }, ref) => {
  const [dadosEmpresa, setDadosEmpresa] = useState(() => {
    if (typeof window !== 'undefined') {
      return JSON.parse(localStorage.getItem('dadosEmpresa')) || {
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
        area: ''
      };
    }
    return {};
  });

  const [camposDesabilitados, setCamposDesabilitados] = useState(false);
  const [cidades, setCidades] = useState([]);
  const [loadingCep, setLoadingCep] = useState(false);
  
  const [erros, setErros] = useState<{ [key: string]: string }>({});
  
  useEffect(() => {
    localStorage.setItem('dadosEmpresa', JSON.stringify(dadosEmpresa));
  }, [dadosEmpresa]);
{/*
  useEffect(() => {
    if (dadosEmpresa.estado) {
      carregarCidades(dadosEmpresa.estado).then(setCidades);
    } else {
      setCidades([]);
    }
  }, [dadosEmpresa.estado]);
*/}
  const atualizarDadosEmpresa = (campo, valor) => {
    setDadosEmpresa(prev => ({ ...prev, [campo]: valor }));
  };

  const buscarEnderecoPorCep = async (cep) => {
    if (!cep || cep.length < 8) return;
    setLoadingCep(true);
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      if (response.data && !response.data.erro) {
        const { logradouro, bairro, localidade, uf } = response.data;
        atualizarDadosEmpresa('rua', logradouro || '');
        atualizarDadosEmpresa('bairro', bairro || '');
        atualizarDadosEmpresa('cidade', localidade || '');
        atualizarDadosEmpresa('estado', uf || '');
        setCamposDesabilitados(true);
      } else {
        alert('O cep informado não foi encontrado');
        setCamposDesabilitados(false);
      }
    } catch (error) {
      console.error('Erro ao buscar o CEP:', error);
      alert('O cep informado não foi encontrado');
      setCamposDesabilitados(false);
    } finally {
      setLoadingCep(false);
    }
  };

  // Função de validação local
  const validarCampos = () => {
    let novosErros: { [key: string]: string } = {};
    let valid = true;
    
    if (!dadosEmpresa.cnpj) {
      novosErros.cnpj = 'CNPJ é obrigatório';
      valid = false;
    } else if (!validarCNPJ(dadosEmpresa.cnpj)) {
      novosErros.cnpj = 'CNPJ inválido';
      valid = false;
    }

    if (!dadosEmpresa.razaoSocial) {
      novosErros.razaoSocial = 'Razão Social é obrigatória';
      valid = false;
    }

    if (!dadosEmpresa.nome) {
      novosErros.nome = 'Nome é obrigatório';
      valid = false;
    }

    if (!dadosEmpresa.cep) {
      novosErros.cep = 'CEP é obrigatório';
      valid = false;
    }

    if (!dadosEmpresa.estado) {
      novosErros.estado = 'Estado é obrigatório';
      valid = false;
    }

    if (!dadosEmpresa.cidade) {
      novosErros.cidade = 'Cidade é obrigatória';
      valid = false;
    }

    if (!dadosEmpresa.bairro) {
      novosErros.bairro = 'Bairro é obrigatório';
      valid = false;
    }

    if (!dadosEmpresa.rua) {
      novosErros.rua = 'Rua é obrigatória';
      valid = false;
    }

    if (!dadosEmpresa.numero || isNaN(dadosEmpresa.numero)) {
      novosErros.numero = 'Número é obrigatório e deve ser um valor numérico';
      valid = false;
    }

    if (!dadosEmpresa.email || !dadosEmpresa.email.includes('@')) {
      novosErros.email = 'Email inválido';
      valid = false;
    }

    if (!dadosEmpresa.telefone || !/^[0-9]{11}$/.test(dadosEmpresa.telefone)) {
      novosErros.telefone = 'Telefone inválido';
      valid = false;
    }

    if (!dadosEmpresa.area) {
      novosErros.area = 'Área da empresa é obrigatória';
      valid = false;
    }

    setErros(novosErros);
    // Atualiza os erros internamente
    setIsValid(valid);
    return valid;// Passa apenas a validade para o componente pai
  };

  const validarCNPJ = (cnpj: string) => {
    cnpj = cnpj.replace(/[\.\/-]/g, '');
    if (cnpj.length !== 14) return false;

    let tamanho = cnpj.length - 2;
    let numeros = cnpj.substring(0, tamanho);
    let digitos = cnpj.substring(tamanho);
    let soma = 0;
    let pos = tamanho - 7;

    for (let i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2) pos = 9;
    }
    let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado !== parseInt(digitos.charAt(0))) return false;

    tamanho = tamanho + 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2) pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    return resultado === parseInt(digitos.charAt(1));
  };

  useImperativeHandle(ref, () => ({
    validarDados: validarCampos, // Torna a função de validação acessível ao componente pai
  }));

  return (
    <>
      {loadingCep && (
        <div className="absolute inset-0 bg-gray-800 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
          <CircularProgress size={60} />
        </div>
      )}
      <FormControl className={`grid grid-cols-3 gap-4 items-center transition-opacity duration-300 ${loadingCep ? 'blur-sm' : ''}`}>
        <Typography variant="h1" color="#ffffff" className="text-foreground items text-center text-4xl col-start-1 row-start-1 col-span-3">
          Cadastro da Empresa
        </Typography>
        <TextField
          label="CNPJ"
          value={dadosEmpresa.cnpj}
          onChange={(e) => atualizarDadosEmpresa('cnpj', e.target.value)}
          fullWidth
          required
          error={!!erros.cnpj}
          helperText={erros.cnpj}
        />
        <TextField
          label="Razão Social"
          value={dadosEmpresa.razaoSocial}
          onChange={(e) => atualizarDadosEmpresa('razaoSocial', e.target.value)}
          fullWidth
          required
          error={!!erros.razaoSocial}
          helperText={erros.razaoSocial}
        />
        <TextField
          label="Nome"
          value={dadosEmpresa.nome}
          onChange={(e) => atualizarDadosEmpresa('nome', e.target.value)}
          fullWidth
          required
          error={!!erros.nome}
          helperText={erros.nome}
        />
        <TextField
          label="CEP"
          value={dadosEmpresa.cep}
          onChange={(e) => atualizarDadosEmpresa('cep', e.target.value)}
          onBlur={() => buscarEnderecoPorCep(dadosEmpresa.cep)}
          fullWidth
          required
          error={!!erros.cep}
          helperText={erros.cep}
        />
        <Autocomplete
          options={estados}
          value={dadosEmpresa.estado}
          onChange={(_, newValue) => atualizarDadosEmpresa('estado', newValue)}
          renderInput={(params) => <TextField {...params} label="Estado" required error={!!erros.estado} helperText={erros.estado} />}
        />
        <Autocomplete
          options={cidades}
          value={dadosEmpresa.cidade}
          onChange={(_, newValue) => atualizarDadosEmpresa('cidade', newValue)}
          renderInput={(params) => <TextField {...params} label="Cidade" required error={!!erros.cidade} helperText={erros.cidade} />}
        />
        <TextField
          label="Bairro"
          value={dadosEmpresa.bairro}
          onChange={(e) => atualizarDadosEmpresa('bairro', e.target.value)}
          fullWidth
          required
          disabled={camposDesabilitados}
          error={!!erros.bairro}
          helperText={erros.bairro}
        />
        <TextField
          label="Rua"
          value={dadosEmpresa.rua}
          onChange={(e) => atualizarDadosEmpresa('rua', e.target.value)}
          fullWidth
          required
          disabled={camposDesabilitados}
          error={!!erros.rua}
          helperText={erros.rua}
        />
        <TextField
          label="Número"
          value={dadosEmpresa.numero}
          onChange={(e) => atualizarDadosEmpresa('numero', e.target.value)}
          fullWidth
          required
          error={!!erros.numero}
          helperText={erros.numero}
        />
        <TextField
          label="Email"
          value={dadosEmpresa.email}
          onChange={(e) => atualizarDadosEmpresa('email', e.target.value)}
          fullWidth
          required
          error={!!erros.email}
          helperText={erros.email}
        />
        <TextField
          label="Telefone"
          value={dadosEmpresa.telefone}
          onChange={(e) => atualizarDadosEmpresa('telefone', e.target.value)}
          fullWidth
          required
          error={!!erros.telefone}
          helperText={erros.telefone}
        />
        <Autocomplete
          options={areasEmpresa}
          value={dadosEmpresa.area}
          onChange={(_, newValue) => atualizarDadosEmpresa('area', newValue)}
          renderInput={(params) => <TextField {...params} label="Área da Empresa" required error={!!erros.area} helperText={erros.area} />}
        />
      </FormControl>
    </>
  );
});

export default DadosEmpresa;

