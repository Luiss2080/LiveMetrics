import React, { createContext, useState, useEffect, useContext } from 'react';

const TemaContext = createContext();

export const TemaProvider = ({ children }) => {
  const [temaOscuro, setTemaOscuro] = useState(() => {
    // Intentar recuperar de localStorage
    const guardado = localStorage.getItem('livemetrics-tema');
    if (guardado !== null) {
      return JSON.parse(guardado);
    }
    // Por defecto oscuro
    return true;
  });

  useEffect(() => {
    localStorage.setItem('livemetrics-tema', JSON.stringify(temaOscuro));
    if (temaOscuro) {
      document.documentElement.removeAttribute('data-tema');
    } else {
      document.documentElement.setAttribute('data-tema', 'claro');
    }
  }, [temaOscuro]);

  return (
    <TemaContext.Provider value={{ temaOscuro, setTemaOscuro }}>
      {children}
    </TemaContext.Provider>
  );
};

export const useTema = () => useContext(TemaContext);
