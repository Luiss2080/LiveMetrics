import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, History, Settings } from 'lucide-react';
import './BarraLateral.css';

const BarraLateral = () => {
  return (
    <aside className="barra-lateral panel-cristal">
      <div className="barra-logo" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '1rem', marginTop: '1rem' }}>
        <img src="/logo.jpg" alt="Logo" style={{ width: '40px', height: '40px', borderRadius: '10px', boxShadow: '0 0 10px rgba(59, 130, 246, 0.5)' }} />
      </div>
      <div className="barra-enlaces">
        <h2 className="texto-gradiente">LM</h2>
      </div>
      
      <nav className="menu-navegacion">
        <NavLink 
          to="/" 
          className={({ isActive }) => isActive ? "item-menu activo" : "item-menu"}
          end
        >
          <LayoutDashboard size={24} />
          <span>Dashboard</span>
        </NavLink>
        
        <NavLink 
          to="/historial" 
          className={({ isActive }) => isActive ? "item-menu activo" : "item-menu"}
        >
          <History size={24} />
          <span>Historial</span>
        </NavLink>
        
        <NavLink 
          to="/configuracion" 
          className={({ isActive }) => isActive ? "item-menu activo" : "item-menu"}
        >
          <Settings size={24} />
          <span>Ajustes</span>
        </NavLink>
      </nav>
    </aside>
  );
};

export default BarraLateral;
