import React, { createContext, useContext, useState, ReactNode } from 'react';

// Definição dos tipos
type SegmentosContextType = {
  selectedSegments: string[];
  toggleSegment: (segment: string) => void;
};

const SegmentosContext = createContext<SegmentosContextType | undefined>(undefined);

interface SegmentosProviderProps {
  children: ReactNode;
}

export const SegmentosProvider: React.FC<SegmentosProviderProps> = ({ children }) => {
  const [selectedSegments, setSelectedSegments] = useState<string[]>([]);

  const toggleSegment = (segment: string) => {
    setSelectedSegments((prev) =>
      prev.includes(segment)
        ? prev.filter((item) => item !== segment)
        : [...prev, segment]
    );
  };

  return (
    <SegmentosContext.Provider value={{ selectedSegments, toggleSegment }}>
      {children}
    </SegmentosContext.Provider>
  );
};

export const useSegmentos = (): SegmentosContextType => {
  const context = useContext(SegmentosContext);
  if (!context) {
    throw new Error('useSegmentos deve ser usado dentro de SegmentosProvider');
  }
  return context;
};
