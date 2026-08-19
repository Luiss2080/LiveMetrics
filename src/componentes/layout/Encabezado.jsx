import React, { useState, useEffect } from 'react';
import { Search, Bell } from 'lucide-react';

const Encabezado = () => {
  const [usuario, setUsuario] = useState({ nombre: 'Admin' });

  useEffect(() => {
    const usrStr = localStorage.getItem('livemetrics-user');
    if (usrStr) {
      setUsuario(JSON.parse(usrStr));
    }
  }, []);

  return (
    <header className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-4xl font-extrabold text-text-main tracking-tight m-0">Overview</h1>
      </div>

      <div className="flex items-center gap-4">
        <button className="w-10 h-10 rounded-full bg-background border-none flex items-center justify-center text-text-muted cursor-pointer relative transition-all duration-200 hover:bg-slate-200 hover:text-text-main">
          <Search size={18} />
        </button>
        <button className="w-10 h-10 rounded-full bg-background border-none flex items-center justify-center text-text-muted cursor-pointer relative transition-all duration-200 hover:bg-slate-200 hover:text-text-main">
          <Bell size={18} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-accent-danger rounded-full border-2 border-card"></span>
        </button>
        
        <div className="flex items-center gap-3 bg-background py-1 pr-4 pl-1 rounded-[30px] cursor-pointer transition-all duration-200 hover:bg-slate-200">
          <div className="w-[34px] h-[34px] rounded-full overflow-hidden bg-white">
            <img 
              src="https://api.dicebear.com/7.x/notionists/svg?seed=Felix&backgroundColor=e8f2ff" 
              alt="Avatar" 
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-sm font-semibold text-text-main">{usuario.nombre}</span>
        </div>
      </div>
    </header>
  );
};

export default Encabezado;
