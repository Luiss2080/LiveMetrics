import React from 'react';
import BarraLateral from './BarraLateral';

const ContenedorPrincipal = ({ children }) => {
  return (
    <div className="min-h-screen w-full bg-background flex p-6 gap-6 box-border">
      <BarraLateral />
      
      <div className="flex-1 flex flex-col h-full max-h-[calc(100vh-3rem)] bg-card rounded-2xl shadow-sm overflow-y-auto overflow-x-hidden p-8 relative custom-scrollbar">
        {children}
      </div>
    </div>
  );
};

export default ContenedorPrincipal;
