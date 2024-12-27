import { Checkbox, FormControl, FormControlLabel, FormGroup, styled, Typography } from '@mui/material';
import React from 'react';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { useCategorias } from '@/contexts/CategoriasContext';

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

const Categorias: React.FC = () => {

    const { selectedCategories, toggleCategory } = useCategorias();

    return    (
        <FormControl component="fieldset"> 
    <Typography variant='h3' className="text-foreground items text-center text-4xl col-start-1 row-start-1 col-span-3">
    Categorias - Cadastro
  </Typography>
    <FormGroup className=' border-t-2 border-b-2 border-gray-600 grid grid-cols-2 place-items-center '>
    <FormControlLabel
        control={<CustomCheckbox icon={<RadioButtonUncheckedIcon/>}
        checkedIcon ={<CheckCircleIcon/>} checked={selectedCategories.includes('Frutas e Vegetais')}
        onChange={() => toggleCategory('Frutas e Vegetais')} />}
        label={
          <LabelContent>
            <Typography variant="body1" color="text-foreground">
              Frutas e Vegetais
            </Typography>
            <Typography variant="caption" color="text-foreground">
Bananas, beterrabas, etc...    
 </Typography>    
 </LabelContent>
        }
        labelPlacement="start"
      /> 
       <FormControlLabel
        control={<CustomCheckbox icon={<RadioButtonUncheckedIcon/>}
        checkedIcon ={<CheckCircleIcon/>} checked={selectedCategories.includes('Fardamentos')}
        onChange={() => toggleCategory('Fardamentos')}/>}
        label={
          <LabelContent>
            <Typography variant="body1" color="text-foreground">
Fardamentos            </Typography>
            <Typography variant="caption" color="text-foreground">
Calças, calçados, jaquetas, etc...           </Typography>
          </LabelContent>
        }
        labelPlacement="start"
      />
      <FormControlLabel
        control={<CustomCheckbox icon={<RadioButtonUncheckedIcon/>}
        checkedIcon ={<CheckCircleIcon/>} checked={selectedCategories.includes('Carnes')}
        onChange={() => toggleCategory('Carnes')}/>}
        label={
          <LabelContent>
            <Typography variant="body1" color="text-foreground">
Carnes            </Typography>
            <Typography variant="caption" color="text-foreground">
Porco, peixe, frango, etc...            </Typography>
          </LabelContent>
        }
        labelPlacement="start"
      />
            <FormControlLabel
        control={<CustomCheckbox icon={<RadioButtonUncheckedIcon/>}
        checkedIcon ={<CheckCircleIcon/>} checked={selectedCategories.includes('Chocolates')}
        onChange={() => toggleCategory('Chocolates')}/>}
        label={
          <LabelContent>
            <Typography variant="body1" color="text-foreground">
Chocolates         </Typography>
            <Typography variant="caption" color="text-foreground">
Bombons, barras, etc...           </Typography>
          </LabelContent>
        }
        labelPlacement="start"
      />
            <FormControlLabel
        control={<CustomCheckbox icon={<RadioButtonUncheckedIcon/>}
        checkedIcon ={<CheckCircleIcon/>} checked={selectedCategories.includes('Grãos e Sementes')}
        onChange={() => toggleCategory('Grãos e Sementes')}/>}
        label={
          <LabelContent>
            <Typography variant="body1" color="text-foreground">
Grãos e Sementes            </Typography>
            <Typography variant="caption" color="text-foreground">
Arroz, linhaça, feijão, etc...            </Typography>
          </LabelContent>
        }
        labelPlacement="start"
      />
            <FormControlLabel
        control={<CustomCheckbox icon={<RadioButtonUncheckedIcon/>}
        checkedIcon ={<CheckCircleIcon/>} checked={selectedCategories.includes('Bebidas Alcoólicas')}
        onChange={() => toggleCategory('Bebidas Alcoólicas')}/>}
        label={
          <LabelContent>
            <Typography variant="body1" color="text-foreground">
Bebidas Alcoólicas            </Typography>
            <Typography variant="caption" color="text-foreground">
Cervejas, vinhos, vodkas, etc...            </Typography>
          </LabelContent>
        }
        labelPlacement="start"
      />
            <FormControlLabel
        control={<CustomCheckbox icon={<RadioButtonUncheckedIcon/>}
        checkedIcon ={<CheckCircleIcon/>} checked={selectedCategories.includes('Massas e pães')}
        onChange={() => toggleCategory('Massas e pães')}/>}
        label={
          <LabelContent>
            <Typography variant="body1" color="text-foreground">
Massas e pães            </Typography>
            <Typography variant="caption" color="text-foreground">
Macarrão, pão bola, etc...            </Typography>
          </LabelContent>
        }
        labelPlacement="start"
      />
            <FormControlLabel
        control={<CustomCheckbox icon={<RadioButtonUncheckedIcon/>}
        checkedIcon ={<CheckCircleIcon/>} checked={selectedCategories.includes('Cosméticos')}
        onChange={() => toggleCategory('Cosméticos')}/>}
        label={
          <LabelContent>
            <Typography variant="body1" color="text-foreground">
Cosméticos            </Typography>
            <Typography variant="caption" color="text-foreground">
Esmaltes, maquiagens, etc...           </Typography>
          </LabelContent>
        }
        labelPlacement="start"
      />
            <FormControlLabel
        control={<CustomCheckbox icon={<RadioButtonUncheckedIcon/>}
        checkedIcon ={<CheckCircleIcon/>} checked={selectedCategories.includes('Produtos de Limpeza')}
        onChange={() => toggleCategory('Produtos de Limpeza')}/>}
        label={
          <LabelContent>
            <Typography variant="body1" color="text-foreground">
Produtos de Limpeza            </Typography>
            <Typography variant="caption" color="text-foreground">
Alvejante, água sanitária, etc...            </Typography>
          </LabelContent>
        }
        labelPlacement="start"
      />
            <FormControlLabel
        control={<CustomCheckbox icon={<RadioButtonUncheckedIcon/>}
        checkedIcon ={<CheckCircleIcon/>} checked={selectedCategories.includes('Higiene Pessoal')}
        onChange={() => toggleCategory('Higiene Pessoal')}/>}
        label={
          <LabelContent>
            <Typography variant="body1" color="text-foreground">
Higiene Pessoal            </Typography>
            <Typography variant="caption" color="text-foreground">
Sabonetes, shampoos, etc...             </Typography>
          </LabelContent>
        }
        labelPlacement="start"
      />
            <FormControlLabel
        control={<CustomCheckbox icon={<RadioButtonUncheckedIcon/>}
        checkedIcon ={<CheckCircleIcon/>} checked={selectedCategories.includes('Frios')}
        onChange={() => toggleCategory('Frios')}/>}
        label={
          <LabelContent>
            <Typography variant="body1" color="text-foreground">
Frios            </Typography>
            <Typography variant="caption" color="text-foreground">
Linguiças, salsichas, etc...          </Typography>
          </LabelContent>
        }
        labelPlacement="start"
      />
            <FormControlLabel
        control={<CustomCheckbox icon={<RadioButtonUncheckedIcon/>}
        checkedIcon ={<CheckCircleIcon/>} checked={selectedCategories.includes('Mobilia')}
        onChange={() => toggleCategory('Mobilia')}/>}
        label={
          <LabelContent>
            <Typography variant="body1" color="text-foreground">
Mobilia            </Typography>
            <Typography variant="caption" color="text-foreground">
Sofás, estantes, armários, etc...           </Typography>
          </LabelContent>
        }
        labelPlacement="start"
      />
            <FormControlLabel
        control={<CustomCheckbox icon={<RadioButtonUncheckedIcon/>}
        checkedIcon ={<CheckCircleIcon/>} checked={selectedCategories.includes('Enlatados')}
        onChange={() => toggleCategory('Enlatados')}/>}
        label={
          <LabelContent>
            <Typography variant="body1" color="text-foreground">
Enlatados            </Typography>
            <Typography variant="caption" color="text-foreground">
Milhos, ervilhas, carnes, etc...            </Typography>
          </LabelContent>
        }
        labelPlacement="start"
      />
            <FormControlLabel
        control={<CustomCheckbox icon={<RadioButtonUncheckedIcon/>}
        checkedIcon ={<CheckCircleIcon/>} checked={selectedCategories.includes('Material de Construção')}
        onChange={() => toggleCategory('Material de Construção')}/>}
        label={
          <LabelContent>
            <Typography variant="body1" color="text-foreground">
Material de Construção            </Typography>
            <Typography variant="caption" color="text-foreground">
Pregos, vigas, trenas, etc...            </Typography>
          </LabelContent>
        }
        labelPlacement="start"
      />
    </FormGroup >
  </FormControl>  
    )
}

export default Categorias;