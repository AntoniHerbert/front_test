
import { Checkbox, FormControl, FormControlLabel, FormGroup, styled, Typography } from '@mui/material';
import React from 'react';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { useCategorias } from '@/contexts/CategoriasContext';

const CustomCheckbox = styled(Checkbox)({
  '& .MuiSvgIcon-root': {
    fontSize: '2rem',
    color: '#ffffff',
  },
  '&.Mui-checked .MuiSvgIcon-root': {
    color: '#1e90ff',
  },
});

const LabelContent = styled('div')({
  minWidth: '187px',
});

const categoryData = [
  { name: 'Frutas e Vegetais', description: 'Bananas, beterrabas, etc...' },
  { name: 'Fardamentos', description: 'Calças, calçados, jaquetas, etc...' },
  { name: 'Carnes', description: 'Porco, peixe, frango, etc...' },
  { name: 'Chocolates', description: 'Bombons, barras, etc...' },
  { name: 'Grãos e Sementes', description: 'Arroz, linhaça, feijão, etc...' },
  { name: 'Bebidas Alcoólicas', description: 'Cervejas, vinhos, vodkas, etc...' },
  { name: 'Massas e pães', description: 'Macarrão, pão bola, etc...' },
  { name: 'Cosméticos', description: 'Esmaltes, maquiagens, etc...' },
  { name: 'Produtos de Limpeza', description: 'Alvejante, água sanitária, etc...' },
  { name: 'Higiene Pessoal', description: 'Sabonetes, shampoos, etc...' },
  { name: 'Frios', description: 'Linguiças, salsichas, etc...' },
  { name: 'Mobilia', description: 'Sofás, estantes, armários, etc...' },
  { name: 'Enlatados', description: 'Milhos, ervilhas, carnes, etc...' },
  { name: 'Material de Construção', description: 'Pregos, vigas, trenas, etc...' },
];

const Categorias: React.FC = () => {
  const { selectedCategories, toggleCategory } = useCategorias();

  const renderCategory = (name: string, description: string) => (
    <FormControlLabel
      key={name}
      control={
        <CustomCheckbox
          icon={<RadioButtonUncheckedIcon />}
          checkedIcon={<CheckCircleIcon />}
          checked={selectedCategories.includes(name)}
          onChange={() => toggleCategory(name)}
        />
      }
      label={
        <LabelContent>
          <Typography variant="body1" color="text-foreground">
            {name}
          </Typography>
          <Typography variant="caption" color="text-foreground">
            {description}
          </Typography>
        </LabelContent>
      }
      labelPlacement="start"
    />
  );

  return (
    <FormControl component="fieldset">
      <Typography
        variant="h3"
        className="text-foreground items text-center text-4xl col-start-1 row-start-1 col-span-3"
      >
        Categorias - Cadastro
      </Typography>
      <FormGroup className="border-t-2 border-b-2 border-gray-600 grid grid-cols-2 place-items-center">
        {categoryData.map(({ name, description }) => renderCategory(name, description))}
      </FormGroup>
    </FormControl>
  );
};

export default Categorias;
