import React, { useEffect, useState } from 'react';
import { TextField, Autocomplete, FormControl, Typography } from '@mui/material';
import { useDadosEmpresa } from '@/contexts/DadosEmpresaContext';
import { useCidades } from '@/contexts/CidadesContext';

const DadosEmpresa: React.FC = () => {

  const {dadosEmpresa, camposComErro, atualizarDadosEmpresa} = useDadosEmpresa();


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
        onChange={(e) => atualizarDadosEmpresa('cep', e.target.value)}
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
        disabled={!dadosEmpresa.estado}
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
  );
};

export default DadosEmpresa;
