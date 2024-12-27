import React, { createContext, useContext, useState, ReactNode } from 'react';

// Definição dos tipos
type CategoriasContextType = {
  selectedCategories: string[];
  toggleCategory: (category: string) => void;
};

const CategoriasContext = createContext<CategoriasContextType | undefined>(undefined);

interface CategoriasProviderProps {
  children: ReactNode;
}

export const CategoriasProvider: React.FC<CategoriasProviderProps> = ({ children }) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((item) => item !== category)
        : [...prev, category]
    );
  };

  return (
    <CategoriasContext.Provider value={{ selectedCategories, toggleCategory }}>
      {children}
    </CategoriasContext.Provider>
  );
};

export const useCategorias = (): CategoriasContextType => {
  const context = useContext(CategoriasContext);
  if (!context) {
    throw new Error('useCategorias deve ser usado dentro de CategoriasProvider');
  }
  return context;
};