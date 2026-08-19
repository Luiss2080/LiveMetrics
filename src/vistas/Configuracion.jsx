import React, { useState } from 'react';
import ContenedorPrincipal from '../componentes/layout/ContenedorPrincipal';
import Encabezado from '../componentes/layout/Encabezado';
import { useTema } from '../contextos/TemaContext';
import { motion } from 'framer-motion';

const Configuracion = () => {
  const { temaOscuro, setTemaOscuro } = useTema();
  const [notificaciones, setNotificaciones] = useState(true);
  const [umbralCpu, setUmbralCpu] = useState(80);
  
  const guardarAjustes = (e) => {
    e.preventDefault();
    alert('Ajustes guardados exitosamente (simulado)');
  };

  return (
    <ContenedorPrincipal>
      <Encabezado />
      <motion.main 
        className="flex flex-col flex-1 max-w-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4 }}
      >
        <div className="bg-white rounded-2xl shadow-sm border border-black/5 flex flex-col p-8">
          <h2 className="text-2xl font-bold text-text-main mb-8 pb-4 border-b border-black/5">Ajustes del Sistema</h2>
          
          <form className="flex flex-col gap-8" onSubmit={guardarAjustes}>
            <div className="flex justify-between items-center">
              <span className="font-semibold text-text-main text-lg">Tema Oscuro</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer"
                  checked={temaOscuro} 
                  onChange={(e) => setTemaOscuro(e.target.checked)} 
                />
                <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-accent-primary"></div>
              </label>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="font-semibold text-text-main text-lg">Notificaciones de Alerta</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer"
                  checked={notificaciones} 
                  onChange={(e) => setNotificaciones(e.target.checked)} 
                />
                <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-accent-primary"></div>
              </label>
            </div>
            
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-text-main text-lg">Umbral Crítico de CPU (%)</span>
                <span className="text-lg font-bold text-accent-primary bg-pastel-blue px-3 py-1 rounded-lg">{umbralCpu}%</span>
              </div>
              <input 
                type="range" 
                min="50" 
                max="99" 
                value={umbralCpu} 
                onChange={(e) => setUmbralCpu(e.target.value)} 
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-accent-primary"
              />
            </div>
            
            <button type="submit" className="mt-4 w-full py-4 bg-text-main text-white font-bold rounded-xl text-lg hover:bg-black transition-colors">
              Guardar Cambios
            </button>
          </form>
        </div>
      </motion.main>
    </ContenedorPrincipal>
  );
};

export default Configuracion;
