
import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import { Checkbox, FormControl, FormControlLabel, FormGroup, styled, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

const CustomCheckbox = styled(Checkbox)(({ }) => ({
  '& .MuiSvgIcon-root': {
    fontSize: '2rem', // Aumenta o tamanho
    color: '#ffffff', // Azul padrão
  },
  '&.Mui-checked .MuiSvgIcon-root': {
    color: '#1e90ff', // Azul quando marcado
  },
}));

const LabelContent = styled('div')(({ theme }) => ({
  minWidth: '187px', // Largura mínima
}));

// Tipagem da categoria para a prop
interface Category {
  id: number;
  name: string;
  description: string;
}

interface CategoriasProps {
  categoriesData: Category[];
}

const Categorias = forwardRef(({ categoriesData }: CategoriasProps, ref) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // Carregar categorias do localStorage ao montar o componente
  useEffect(() => {
    const storedCategories = localStorage.getItem('selectedCategories');
    if (storedCategories) {
      setSelectedCategories(JSON.parse(storedCategories));
    }
  }, []);

  // Salvar categorias no localStorage quando houver alteração
  useEffect(() => {
    if (selectedCategories.length > 0) {
      localStorage.setItem('selectedCategories', JSON.stringify(selectedCategories));
    }
  }, [selectedCategories]);

  // Função que valida se pelo menos uma categoria foi selecionada
  const validarCategorias = () => {
    return selectedCategories.length > 0;
  };

  // Expor a função validarCategorias para ser chamada externamente
  useImperativeHandle(ref, () => ({
    validarCategorias,
  }));

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((item) => item !== category)
        : [...prev, category]
    );
  };

  return (
    <FormControl component="fieldset">
      <Typography variant='h3' className="text-foreground items text-center text-4xl col-start-1 row-start-1 col-span-3">
        Categorias - Cadastro
      </Typography>
      <FormGroup className=' border-t-2 border-b-2 border-gray-600 grid grid-cols-2 place-items-center '>
        {categoriesData.map((category) => (
          <FormControlLabel
            key={category.id}
            control={
              <CustomCheckbox
                icon={<RadioButtonUncheckedIcon />}
                checkedIcon={<CheckCircleIcon />}
                checked={selectedCategories.includes(category.name)}
                onChange={() => toggleCategory(category.name)}
              />
            }
            label={
              <LabelContent>
                <Typography variant="body1" color="text-foreground">
                  {category.name}
                </Typography>
                <Typography variant="caption" color="text-foreground">
                  {category.description}
                </Typography>
              </LabelContent>
            }
            labelPlacement="start"
          />
        ))}
      </FormGroup>
    </FormControl>
  );
});

export default Categorias;

