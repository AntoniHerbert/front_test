import React, { useEffect, useState } from 'react';
import { TextField, Autocomplete, FormControl, Typography } from '@mui/material';
import { useDadosEmpresa } from '@/contexts/DadosEmpresaContext';
import { useCidades } from '@/contexts/CidadesContext';

const DadosEmpresa: React.FC = () => {

  const {dadosEmpresa, atualizarDadosEmpresa} = useDadosEmpresa();
  const {carregarCidades} = useCidades();

  const [cidades, setCidades] = useState([]);

  const areas = [
    'Tecnologia da Informação',
    'Saúde',
    'Educação',
    'Comércio',
    'Indústria',
    'Serviços',
    'Construção Civil',
    'Agropecuária',
    'Transporte e Logística',
    'Turismo e Hospitalidade',
  ];

  const estados = [
    'AC',
    'AL',
    'AP',
    'AM',
    'BA',
    'CE',
    'ES',
    'GO',
    'MA',
    'MT',
    'MS',
    'MG',
    'PA',
    'PB',
    'PR',
    'PE',
    'PI',
    'RJ',
    'RN',
    'RS',
    'RO',
    'RR',
    'SC',
    'SP',
    'SE',
    'TO',
    'DF',
  ];

  useEffect(() => {
    if (dadosEmpresa.estado) {
      carregarCidades(dadosEmpresa.estado).then(setCidades);
    } else {
      setCidades([]);
    }
  }, [dadosEmpresa.estado, carregarCidades]);



  const textFieldStyles = {
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
    '& .MuiInputBase-input': {
          color: '#ffffff',
        },
        '& .MuiInput-underline:before': {
          borderBottomColor: '#ffffff',
        },
        '& .MuiInput-underline:after': {
          borderBottomColor: '#ffffff',
        },
        '& .MuiInputBase-root': {
          minHeight: '80px', // Definindo altura mínima do input
        },
  };

  const autoCompleteStyles = {
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
    '& .MuiInputBase-input': {
      color: '#ffffff', // Cor do texto dentro do input
    },
    '& .MuiInputBase-root': {
      minHeight: '80px',
      padding: '0', // Definindo altura mínima do input
    },
    '& .MuiAutocomplete-listbox': {
      padding: 0, // Remover padding da lista de opções
      marginTop: 0, // Remover margem
    },
    
  };



  return (
    

    <FormControl className="grid grid-cols-3 gap-4 items-center">
 <Typography variant="h1" color="#ffffff" className="text-foreground items text-center text-4xl col-start-1 row-start-1 col-span-3">
               Cadastro da Empresa
              </Typography>

      <TextField
        label="CNPJ"
        placeholder="Ex: 00000000000"
        variant="outlined"
        fullWidth
        margin="normal"
        sx={textFieldStyles}
        className="col-start-1 row-start-2"
        value={dadosEmpresa.cnpj || ''}
        onChange={(e) => atualizarDadosEmpresa('cnpj', e.target.value)}
      />

      <TextField
        label="RAZÃO SOCIAL"
        placeholder="Ex: Comércio de Alimentos Ltda"
        variant="outlined"
        fullWidth
        margin="normal"
        sx={textFieldStyles}
        className="col-start-2 row-start-2"
        value={dadosEmpresa.razaoSocial || ''}
        onChange={(e) => atualizarDadosEmpresa('razaoSocial', e.target.value)}
      />

      <TextField
        label="NOME"
        placeholder="Ex: Minha Empresa"
        variant="outlined"
        fullWidth
        margin="normal"
        sx={textFieldStyles}
        className="col-start-3 row-start-2"
        value={dadosEmpresa.nome || ''}
        onChange={(e) => atualizarDadosEmpresa('nome', e.target.value)}
      />

      <TextField
        label="CEP"
        placeholder="Ex: 00000000"
        variant="outlined"
        fullWidth
        margin="normal"
        sx={textFieldStyles}
        className="col-start-1 row-start-3"
        value={dadosEmpresa.cep || ''}
        onChange={(e) => atualizarDadosEmpresa('cep', e.target.value)}
      />

      <Autocomplete
        options={estados}
        value={dadosEmpresa.estado || ''}
        onChange={(event, newValue) => 
          atualizarDadosEmpresa('estado', newValue || '') // Atualiza a UF selecionada
        } 
        renderInput={(params) => (
          <TextField {...params} label="ESTADO" variant="outlined" fullWidth />
        )}
        freeSolo
        sx={autoCompleteStyles}
        className="col-start-2 row-start-3"
        fullWidth
      />
 
      <Autocomplete
        options={cidades}
        value={dadosEmpresa.cidade || ''}
        onChange={(event, newValue) => atualizarDadosEmpresa('cidade', newValue || '')}
        renderInput={(params) => (
          <TextField {...params} label="CIDADE" variant="outlined" fullWidth />
        )}
        disabled={!dadosEmpresa.estado}
        freeSolo
        sx={autoCompleteStyles}
        className="col-start-3 row-start-3"
        fullWidth
      />

      <TextField
        label="BAIRRO"
        placeholder="Ex: Bairro Alto"
        variant="outlined"
        fullWidth
        margin="normal"
        sx={textFieldStyles}
        className="col-start-1 row-start-4"
        value={dadosEmpresa.bairro || ''}
        onChange={(e) => atualizarDadosEmpresa('bairro', e.target.value)}
      />

      <TextField
        label="RUA"
        placeholder="Ex: Rua Baixa"
        variant="outlined"
        fullWidth
        margin="normal"
        sx={textFieldStyles}
        className="col-start-2 row-start-4"
        value={dadosEmpresa.rua || ''}
        onChange={(e) => atualizarDadosEmpresa('rua', e.target.value)}
      />

      <TextField
        label="NÚMERO"
        placeholder="987"
        variant="outlined"
        fullWidth
        margin="normal"
        sx={textFieldStyles}
        className="col-start-3 row-start-4"
        value={dadosEmpresa.numero || ''}
        onChange={(e) => atualizarDadosEmpresa('numero', e.target.value)}
      />

      <TextField
        label="EMAIL PARA CONTATO"
        placeholder="Ex: meuemail@email.com"
        variant="outlined"
        fullWidth
        margin="normal"
        sx={textFieldStyles}
        className="col-start-1 row-start-5"
        value={dadosEmpresa.email || ''}
        onChange={(e) => atualizarDadosEmpresa('email', e.target.value)}
      />

      <TextField
        label="TELEFONE"
        placeholder="Ex: 0000000000"
        variant="outlined"
        fullWidth
        margin="normal"
        sx={textFieldStyles}
        className="col-start-2 row-start-5"
        value={dadosEmpresa.telefone || ''}
        onChange={(e) => atualizarDadosEmpresa('telefone', e.target.value)}
      />

      <Autocomplete
        options={areas}
        value={dadosEmpresa.area || ''}
        onChange={(event, newValue) => atualizarDadosEmpresa('area', newValue || '')}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Área da empresa"
            variant="outlined"
            fullWidth
            placeholder="Ex: Construção"
          />
        )}
        freeSolo
        sx={autoCompleteStyles}
        className="col-start-3 row-start-5"
        fullWidth
    
      />
    </FormControl>
  );
};

export default DadosEmpresa;
