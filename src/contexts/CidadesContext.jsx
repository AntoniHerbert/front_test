// CidadesContext.js
import React, { createContext, useState, useContext } from 'react';

const CidadesContext = createContext();

export const CidadesProvider = ({ children }) => {
  const [cidadesPorUF, setCidadesPorUF] = useState(new Map());

  const carregarCidades = async (uf) => {
    if (!uf) return [];
    if (cidadesPorUF.has(uf)) return cidadesPorUF.get(uf);

    try {
      const response = await fetch(`https://brasilapi.com.br/api/ibge/municipios/v1/${uf}`);
      const data = await response.json();
      const cityNames = data.map((cidade) => cidade.nome);

      setCidadesPorUF((prev) => new Map(prev).set(uf, cityNames));
      return cityNames;
    } catch (error) {
      console.error(`Erro ao carregar cidades para ${uf}:`, error);
      return [];
    }
  };

  return (
    <CidadesContext.Provider value={{ carregarCidades }}>
      {children}
    </CidadesContext.Provider>
  );
};

export const useCidades = () => {
  return useContext(CidadesContext);
};
