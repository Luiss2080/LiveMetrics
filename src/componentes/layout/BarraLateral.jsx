import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, History, Settings, LogOut, Layers } from 'lucide-react';

const BarraLateral = () => {
  return (
    <aside className="w-[250px] bg-sidebar-bg rounded-xl flex flex-col p-8 text-sidebar-text max-md:w-full max-md:h-auto max-md:rounded-lg max-md:p-4 max-md:flex-row max-md:items-center max-md:justify-between">
      <div className="flex items-center gap-4 mb-12 px-2 max-md:mb-0">
        <div className="bg-pastel-yellow w-10 h-10 rounded-md flex items-center justify-center">
          <Layers size={24} className="text-sidebar-bg" />
        </div>
        <span className="text-xl font-bold text-white tracking-tight max-md:hidden">LiveMetrics</span>
      </div>
      
      <nav className="flex flex-col gap-2 flex-1 max-md:flex-row max-md:justify-center">
        <NavLink 
          to="/" 
          className={({ isActive }) => 
            `flex items-center gap-4 p-4 rounded-xl font-medium text-base transition-all duration-300 ${isActive ? 'bg-sidebar-active text-sidebar-activeText font-semibold shadow-md' : 'text-sidebar-text hover:text-white hover:bg-white/5'}`
          }
          end
        >
          <LayoutDashboard size={20} />
          <span className="max-md:hidden">Overview</span>
        </NavLink>
        
        <NavLink 
          to="/historial" 
          className={({ isActive }) => 
            `flex items-center gap-4 p-4 rounded-xl font-medium text-base transition-all duration-300 ${isActive ? 'bg-sidebar-active text-sidebar-activeText font-semibold shadow-md' : 'text-sidebar-text hover:text-white hover:bg-white/5'}`
          }
        >
          <History size={20} />
          <span className="max-md:hidden">Historial</span>
        </NavLink>
        
        <NavLink 
          to="/configuracion" 
          className={({ isActive }) => 
            `flex items-center gap-4 p-4 rounded-xl font-medium text-base transition-all duration-300 ${isActive ? 'bg-sidebar-active text-sidebar-activeText font-semibold shadow-md' : 'text-sidebar-text hover:text-white hover:bg-white/5'}`
          }
        >
          <Settings size={20} />
          <span className="max-md:hidden">Ajustes</span>
        </NavLink>
      </nav>

      <div className="mt-auto border-t border-white/5 pt-4 max-md:border-none max-md:pt-0 max-md:mt-0">
        <NavLink 
          to="/login" 
          className="flex items-center gap-4 p-4 rounded-xl font-medium text-base text-sidebar-text hover:text-white hover:bg-white/5 transition-all duration-300"
          onClick={() => { localStorage.removeItem('livemetrics-auth'); localStorage.removeItem('livemetrics-user'); }}
        >
          <LogOut size={20} />
          <span className="max-md:hidden">Salir</span>
        </NavLink>
      </div>
    </aside>
  );
};

export default BarraLateral;
