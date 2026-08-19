import React, { useState } from 'react';
import ContenedorPrincipal from '../componentes/layout/ContenedorPrincipal';
import Encabezado from '../componentes/encabezado/Encabezado';
import { useTema } from '../contextos/TemaContext';
import './Configuracion.css';

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
      <main className="panel-contenido">
        <div className="configuracion-panel panel-cristal">
          <h2 className="configuracion-titulo">Ajustes del Sistema</h2>
          
          <form className="formulario-config" onSubmit={guardarAjustes}>
            <div className="grupo-form">
              <label className="switch-contenedor">
                <span className="etiqueta">Tema Oscuro</span>
                <input 
                  type="checkbox" 
                  checked={temaOscuro} 
                  onChange={(e) => setTemaOscuro(e.target.checked)} 
                />
                <span className="switch-deslizador"></span>
              </label>
            </div>
            
            <div className="grupo-form">
              <label className="switch-contenedor">
                <span className="etiqueta">Notificaciones de Alerta</span>
                <input 
                  type="checkbox" 
                  checked={notificaciones} 
                  onChange={(e) => setNotificaciones(e.target.checked)} 
                />
                <span className="switch-deslizador"></span>
              </label>
            </div>
            
            <div className="grupo-form">
              <label className="etiqueta-bloque">
                Umbral Crítico de CPU (%)
                <span className="valor-rango">{umbralCpu}%</span>
              </label>
              <input 
                type="range" 
                min="50" 
                max="99" 
                value={umbralCpu} 
                onChange={(e) => setUmbralCpu(e.target.value)} 
                className="input-rango"
              />
            </div>
            
            <button type="submit" className="boton-primario">
              Guardar Cambios
            </button>
          </form>
        </div>
      </main>
    </ContenedorPrincipal>
  );
};

export default Configuracion;
