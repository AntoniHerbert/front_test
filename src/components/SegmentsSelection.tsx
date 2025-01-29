
import React from 'react';
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  styled,
  Typography,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { useSegmentos } from '@/contexts/SegmentosContext';

const CustomCheckbox = styled(Checkbox)(({ theme }) => ({
  '& .MuiSvgIcon-root': {
    fontSize: '2rem',
    color: '#ffffff',
  },
  '&.Mui-checked .MuiSvgIcon-root': {
    color: '#1e90ff',
  },
}));

const LabelContent = styled('div')({
  minWidth: '280px',
});

const segments = [
  { name: 'Restaurante', description: 'Focado na venda de refeições diárias' },
  { name: 'Pizzaria', description: 'Focada na venda de pizzas e massas' },
  { name: 'Churrascaria', description: 'Focado na venda de carnes' },
  { name: 'Fast Food', description: 'Focado na venda de sanduíches' },
  { name: 'Supermercado', description: 'Focado na venda de diversos produtos' },
  { name: 'Bufê', description: 'Produtos relacionados a grãos e sementes' },
  { name: 'Doceria', description: 'Focado na venda de doces e sobremesas' },
  { name: 'Padaria', description: 'Focado na venda de pães' },
  { name: 'Confeitaria', description: 'Focado na venda de doces e sobremesas' },
  { name: 'Cafeteria', description: 'Focado na venda de cafés e chás' },
  { name: 'Peixaria', description: 'Focado na venda de peixes e frutos do mar' },
  { name: 'Adega', description: 'Focado na venda de bebidas alcoólicas' },
  { name: 'Bar', description: 'Focado na venda de bebidas e drinks' },
  { name: 'Sorveteria', description: 'Focado na venda de sorvetes e picolés' },
];

const Segmentos: React.FC = () => {
  const { selectedSegments, toggleSegment } = useSegmentos();

  return (
    <FormControl component="fieldset">
      <Typography
        variant="h3"
        className="text-foreground text-center text-4xl col-start-1 row-start-1 col-span-3"
      >
        Selecionar Segmentos
      </Typography>
      <FormGroup className="border-t-2 border-b-2 border-gray-600 grid grid-cols-2 place-items-center">
        {segments.map(({ name, description }) => (
          <FormControlLabel
            key={name}
            control={
              <CustomCheckbox
                icon={<RadioButtonUncheckedIcon />}
                checkedIcon={<CheckCircleIcon />}
                checked={selectedSegments.includes(name)}
                onChange={() => toggleSegment(name)}
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
        ))}
      </FormGroup>
    </FormControl>
  );
};

export default Segmentos;
