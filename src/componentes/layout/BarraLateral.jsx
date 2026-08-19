import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, History, Settings, LogOut, Layers } from 'lucide-react';
import './BarraLateral.css';

const BarraLateral = () => {
  return (
    <aside className="barra-lateral">
      <div className="barra-logo">
        <div className="logo-icono">
          <Layers size={24} color="#1a1d21" />
        </div>
        <span className="logo-texto">LiveMetrics</span>
      </div>
      
      <nav className="barra-enlaces">
        <NavLink 
          to="/" 
          className={({ isActive }) => isActive ? 'enlace-lateral activo' : 'enlace-lateral'}
          end
        >
          <LayoutDashboard size={20} />
          <span>Overview</span>
        </NavLink>
        
        <NavLink 
          to="/historial" 
          className={({ isActive }) => isActive ? 'enlace-lateral activo' : 'enlace-lateral'}
        >
          <History size={20} />
          <span>Historial</span>
        </NavLink>
        
        <NavLink 
          to="/configuracion" 
          className={({ isActive }) => isActive ? 'enlace-lateral activo' : 'enlace-lateral'}
        >
          <Settings size={20} />
          <span>Ajustes</span>
        </NavLink>
      </nav>

      <div className="barra-footer">
        <NavLink 
          to="/login" 
          className="enlace-lateral"
          onClick={() => { localStorage.removeItem('livemetrics-auth'); localStorage.removeItem('livemetrics-user'); }}
        >
          <LogOut size={20} />
          <span>Salir</span>
        </NavLink>
      </div>
    </aside>
  );
};

export default BarraLateral;
