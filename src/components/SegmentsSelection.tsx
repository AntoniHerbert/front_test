import { Checkbox, FormControl, FormControlLabel, FormGroup, styled, Typography } from '@mui/material';
import React, { useEffect, useState, useImperativeHandle, forwardRef } from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

const CustomCheckbox = styled(Checkbox)(({ theme }) => ({
    '& .MuiSvgIcon-root': {
        fontSize: '2rem', // Aumenta o tamanho
        color: '#ffffff', // Azul padrão
    },
    '&.Mui-checked .MuiSvgIcon-root': {
        color: '#1e90ff', // Azul quando marcado
    },
}));

const LabelContent = styled('div')(({ theme }) => ({
    Width: '280px', // Largura mínima
}));

// Componente Segmentos com ForwardRef para expor a função de validação
const Segmentos = forwardRef((props, ref) => {
    const [selectedSegments, setSelectedSegments] = useState<string[]>([]);

    // Carrega os segmentos selecionados do localStorage ao montar o componente
    useEffect(() => {
        const storedSegments = localStorage.getItem('selectedSegments');
        if (storedSegments) {
            setSelectedSegments(JSON.parse(storedSegments));
        }
    }, []);

    const toggleSegment = (segment: string) => {
        setSelectedSegments((prev) => {
            const updatedSegments = prev.includes(segment)
                ? prev.filter((item) => item !== segment)
                : [...prev, segment];
            // Atualiza os segmentos no localStorage
            localStorage.setItem('selectedSegments', JSON.stringify(updatedSegments));
            return updatedSegments;
        });
    };

    // Função para validar se há pelo menos um segmento selecionado
    const validarSegmentos = () => {
        return selectedSegments.length > 0;
    };

    // Expondo a função validarSegmentos para a página que usa o componente
    useImperativeHandle(ref, () => ({
        validarSegmentos,
    }));

    return (
        <FormControl component="fieldset">
            <Typography variant='h3' className="text-foreground items text-center text-4xl col-start-1 row-start-1 col-span-3">
                Selecionar Segmentos
            </Typography>
            <FormGroup className=' border-t-2 border-b-2 border-gray-600 grid grid-cols-2 place-items-center '>
                <FormControlLabel
                    control={<CustomCheckbox icon={<RadioButtonUncheckedIcon />} checkedIcon={<CheckCircleIcon />} checked={selectedSegments.includes('Restaurante')} onChange={() => toggleSegment('Restaurante')} />}
                    label={
                        <LabelContent>
                            <Typography variant="body1" color="text-foreground">
                                Restaurante
                            </Typography>
                            <Typography variant="caption" color="text-foreground">
                                Focado na venda de refeições diárias
                            </Typography>
                        </LabelContent>
                    }
                    labelPlacement="start"
                />
                <FormControlLabel
                    control={<CustomCheckbox icon={<RadioButtonUncheckedIcon />} checkedIcon={<CheckCircleIcon />} checked={selectedSegments.includes('Pizzaria')} onChange={() => toggleSegment('Pizzaria')} />}
                    label={
                        <LabelContent>
                            <Typography variant="body1" color="text-foreground">
                                Pizzaria
                            </Typography>
                            <Typography variant="caption" color="text-foreground">
                                Focada na venda de pizzas e massas
                            </Typography>
                        </LabelContent>
                    }
                    labelPlacement="start"
                />
                <FormControlLabel
                    control={<CustomCheckbox icon={<RadioButtonUncheckedIcon />} checkedIcon={<CheckCircleIcon />} checked={selectedSegments.includes('Churrascaria')} onChange={() => toggleSegment('Churrascaria')} />}
                    label={
                        <LabelContent>
                            <Typography variant="body1" color="text-foreground">
                                Churrascaria
                            </Typography>
                            <Typography variant="caption" color="text-foreground">
                                Focado na venda de carnes
                            </Typography>
                        </LabelContent>
                    }
                    labelPlacement="start"
                />
                <FormControlLabel
                    control={<CustomCheckbox icon={<RadioButtonUncheckedIcon />} checkedIcon={<CheckCircleIcon />} checked={selectedSegments.includes('Fast Food')} onChange={() => toggleSegment('Fast Food')} />}
                    label={
                        <LabelContent>
                            <Typography variant="body1" color="text-foreground">
                                Fast Food
                            </Typography>
                            <Typography variant="caption" color="text-foreground">
                                Focado na venda de sanduíches
                            </Typography>
                        </LabelContent>
                    }
                    labelPlacement="start"
                />
                {/* Continue com os outros segmentos... */}
            </FormGroup>
        </FormControl>
    );
});

export default Segmentos;
