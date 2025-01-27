import React, { useEffect, useState } from 'react';
import { TextField, Autocomplete, FormControl, Typography, CircularProgress } from '@mui/material';
import { useDadosEmpresa } from '@/contexts/DadosEmpresaContext';
import { useCidades } from '@/contexts/CidadesContext';
import axios from 'axios';

const DadosEmpresa: React.FC = () => {

  const {dadosEmpresa, camposComErro, atualizarDadosEmpresa, camposDesabilitados, setCamposDesabilitados} = useDadosEmpresa();


  const {carregarCidades} = useCidades();

  const [cidades, setCidades] = useState([]);
  const [loadingCep, setLoadingCep] = useState(false);

  const areas = [
    'Restaurante',
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

  const buscarEnderecoPorCep = async (cep: string) => {
    if (!cep || cep.length < 8) return; // Apenas busca se o CEP for válido

    setLoadingCep(true); // Ativa o estado de loading
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      if (response.data && !response.data.erro) {
        const { logradouro, bairro, localidade, uf } = response.data;

        // Atualiza os campos no contexto
        atualizarDadosEmpresa('rua', logradouro || '');
        atualizarDadosEmpresa('bairro', bairro || '');
        atualizarDadosEmpresa('cidade', localidade || '');
        atualizarDadosEmpresa('estado', uf || '');

        // Atualiza o estado de desabilitação no contexto
        setCamposDesabilitados(true);
      } else {
        alert('O cep informado não foi encontrado');
        setCamposDesabilitados(false); // Permite que o usuário preencha os campos manualmente
      }
    } catch (error) {
      console.error('Erro ao buscar o CEP:', error);
      alert('O cep informado não foi encontrado');
      setCamposDesabilitados(false); // Permite que o usuário preencha os campos manualmente
    } finally {
      setLoadingCep(false); // Desativa o estado de loading
    }
  };

const textFieldStyles = {
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#ffffff', // Borda padrão
    },
    '&.Mui-focused fieldset': {
      borderColor: '#ffffff', // Borda ao focar
    },
    '&.Mui-error fieldset': {
      borderColor: '#ff0000', // Borda em caso de erro
    },
  },
  '& .MuiInputLabel-root': {
    color: '#ffffff', // Cor padrão da label
    '&.Mui-focused': {
      color: '#ffffff', // Cor da label ao focar
    },
    '&.Mui-error': {
      color: '#ff0000', // Cor da label em caso de erro
    },
  },
  '& .MuiInputBase-input::placeholder': {
    color: '#ffffff', // Cor do placeholder
    opacity: 1, // Garantir visibilidade do placeholder
  },
  '& .MuiInputBase-input': {
    color: '#ffffff', // Cor do texto
  },
  '& .MuiInput-underline:before': {
    borderBottomColor: '#ffffff', // Linha inferior padrão
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#ffffff', // Linha inferior ao focar
  },
  '& .MuiInputBase-root': {
    minHeight: '80px', // Definindo altura mínima do input
  },
};

const autoCompleteStyles = {
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#ffffff', // Borda padrão
    },
    '&.Mui-focused fieldset': {
      borderColor: '#ffffff', // Borda ao focar
    },
    '&.Mui-error fieldset': {
      borderColor: '#ff0000', // Borda em caso de erro
    },
  },
  '& .MuiInputBase-input': {
    color: '#ffffff', // Cor do texto dentro do input
  },
  '& .MuiInputBase-root': {
    minHeight: '80px', // Altura mínima do input
    padding: '0',
  },
  '& .MuiAutocomplete-listbox': {
    padding: 0, // Remover padding da lista de opções
    marginTop: 0, // Remover margem
  },
  '& .MuiInputLabel-root': {
    color: '#ffffff', // Cor da label padrão
    '&.Mui-focused': {
      color: '#ffffff', // Cor da label ao focar
    },
    '&.Mui-error': {
      color: '#ff0000', // Cor da label em caso de erro
    },
  },
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
        loadingCep ? 'blur-sm' : ''
      }`}>
      <Typography variant="h1" color="#ffffff" className="text-foreground items text-center text-4xl col-start-1 row-start-1 col-span-3">
               Cadastro da Empresa
              </Typography>

      <TextField
      required
        label="CNPJ"
        placeholder="Ex: 00000000000"
        variant="outlined"
        fullWidth
        margin="normal"
        sx={textFieldStyles}
        className="col-start-1 row-start-2"
        value={dadosEmpresa.cnpj || ''}
        onChange={(e) => atualizarDadosEmpresa('cnpj', e.target.value)}
error={camposComErro.includes('cnpj')}
        helpertext={camposComErro.includes('cnpj') ? 'Requerido' : ''}
      />

      <TextField
      required
        label="RAZÃO SOCIAL"
        placeholder="Ex: Comércio de Alimentos Ltda"
        variant="outlined"
        fullWidth
        margin="normal"
        sx={textFieldStyles}
        className="col-start-2 row-start-2"
        value={dadosEmpresa.razaoSocial || ''}
        onChange={(e) => atualizarDadosEmpresa('razaoSocial', e.target.value)}
error={
  camposComErro.includes('razaoSocial')
}
helpertext={camposComErro.includes('razaoSocial') ? 'Requerido' : ''}

      />

      <TextField
      required
        label="NOME"
        placeholder="Ex: Minha Empresa"
        variant="outlined"
        fullWidth
        margin="normal"
        sx={textFieldStyles}
        className="col-start-3 row-start-2"
        value={dadosEmpresa.nome || ''}
        onChange={(e) => atualizarDadosEmpresa('nome', e.target.value)}
error={camposComErro.includes('nome')}
helpertext={camposComErro.includes('nome') ? 'Requerido' : ''}

      />

      <TextField
      required
        label="CEP"
        placeholder="Ex: 00000000"
        variant="outlined"
        fullWidth
        margin="normal"
        sx={textFieldStyles}
        className="col-start-1 row-start-3"
        value={dadosEmpresa.cep || ''}
        onChange={(e) => {atualizarDadosEmpresa('cep', e.target.value); 
        setCamposDesabilitados(false);
        }}
onBlur={(e) => buscarEnderecoPorCep(e.target.value)}
error={camposComErro.includes('cep')}
helpertext={camposComErro.includes('cep') ? 'Requerido' : ''}

      />

      <Autocomplete
        options={estados}
        value={dadosEmpresa.estado || ''}
        onChange={(event, newValue) => 
          atualizarDadosEmpresa('estado', newValue || '') // Atualiza a UF selecionada
        } 
        renderInput={(params) => (
          <TextField {...params} required label="ESTADO"         sx={textFieldStyles} variant="outlined" fullWidth placeholder="Estado" error={camposComErro.includes('estado')}
helpertext={camposComErro.includes('estado') ? 'Requerido' : ''}
disabled={camposDesabilitados}
/>
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
          <TextField {...params} required label="CIDADE"         sx={textFieldStyles} variant="outlined" fullWidth error={camposComErro.includes('cidade')}
helpertext={camposComErro.includes('cidades') ? 'Requerido' : ''}
/>
        )}
        disabled={!dadosEmpresa.estado || camposDesabilitados}
        freeSolo
        sx={autoCompleteStyles}
        className="col-start-3 row-start-3"
        fullWidth

      />

      <TextField
      required
        label="BAIRRO"
        placeholder="Ex: Bairro Alto"
        variant="outlined"
        fullWidth
        margin="normal"
        sx={textFieldStyles}
        className="col-start-1 row-start-4"
        value={dadosEmpresa.bairro || ''}
        onChange={(e) => atualizarDadosEmpresa('bairro', e.target.value)}
error={camposComErro.includes('bairro')}
helpertext={camposComErro.includes('bairro') ? 'Requerido' : ''}
disabled={camposDesabilitados}

      />

      <TextField
      required
        label="RUA"
        placeholder="Ex: Rua Baixa"
        variant="outlined"
        fullWidth
        margin="normal"
        sx={textFieldStyles}
        className="col-start-2 row-start-4"
        value={dadosEmpresa.rua || ''}
        onChange={(e) => atualizarDadosEmpresa('rua', e.target.value)}
error={camposComErro.includes('rua')}
helpertext={camposComErro.includes('rua') ? 'Requerido' : ''}
disabled={camposDesabilitados}


      />

      <TextField
      required
        label="NÚMERO"
        placeholder="987"
        variant="outlined"
        fullWidth
        margin="normal"
        sx={textFieldStyles}
        className="col-start-3 row-start-4"
        value={dadosEmpresa.numero || ''}
        onChange={(e) => atualizarDadosEmpresa('numero', e.target.value)}
      error={camposComErro.includes('numero')}
helpertext={camposComErro.includes('numero') ? 'Requerido' : ''}

        />

      <TextField
      required
        label="EMAIL PARA CONTATO"
        placeholder="Ex: meuemail@email.com"
        variant="outlined"
        fullWidth
        margin="normal"
        sx={textFieldStyles}
        className="col-start-1 row-start-5"
        value={dadosEmpresa.email || ''}
        onChange={(e) => atualizarDadosEmpresa('email', e.target.value)}
     error={camposComErro.includes('email')}
helpertext={camposComErro.includes('email') ? 'Requerido' : ''}


        />

      <TextField
      required
        label="TELEFONE"
        placeholder="Ex: 0000000000"
        variant="outlined"
        fullWidth
        margin="normal"
        sx={textFieldStyles}
        className="col-start-2 row-start-5"
        value={dadosEmpresa.telefone || ''}
        onChange={(e) => atualizarDadosEmpresa('telefone', e.target.value)}
      error={camposComErro.includes('telefone')}
helpertext={camposComErro.includes('telefone') ? 'Requerido' : ''}

        />

      <Autocomplete
      
        options={areas}
        value={dadosEmpresa.area || ''}
        onChange={(event, newValue) => atualizarDadosEmpresa('area', newValue || '')}
        renderInput={(params) => (
          <TextField
            {...params}
            required
        sx={textFieldStyles}
            label="Área da empresa"
            variant="outlined"
            fullWidth
            placeholder="Ex: Construção"
 error={camposComErro.includes('area')}
helpertext={camposComErro.includes('area') ? 'Requerido' : ''}         />
        )}
        freeSolo
        className="col-start-3 row-start-5"
        fullWidth
    

      />
    </FormControl>
</>

  );
};

export default DadosEmpresa;
