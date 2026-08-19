import React, { useState, useEffect } from 'react';
import { Search, Bell } from 'lucide-react';
import './Encabezado.css';

const Encabezado = () => {
  const [usuario, setUsuario] = useState({ nombre: 'Admin' });

  useEffect(() => {
    const usrStr = localStorage.getItem('livemetrics-user');
    if (usrStr) {
      setUsuario(JSON.parse(usrStr));
    }
  }, []);

  return (
    <header className="encabezado-main">
      <div className="encabezado-titulo">
        <h1>Overview</h1>
      </div>

      <div className="encabezado-acciones">
        <button className="boton-icono-circular">
          <Search size={18} />
        </button>
        <button className="boton-icono-circular">
          <Bell size={18} />
          <span className="indicador-notificacion"></span>
        </button>
        
        <div className="perfil-pill">
          <div className="avatar-contenedor">
            <img 
              src="https://api.dicebear.com/7.x/notionists/svg?seed=Felix&backgroundColor=e8f2ff" 
              alt="Avatar" 
              className="avatar-img"
            />
          </div>
          <span className="nombre-usuario">{usuario.nombre}</span>
        </div>
      </div>
    </header>
  );
};

export default Encabezado;
