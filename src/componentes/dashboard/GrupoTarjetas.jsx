import React from 'react';
import { Cpu, MemoryStick, Activity, Users } from 'lucide-react';
import { formatearNumeroGrande, formatearPorcentaje } from '../../utilidades/formateadores';
import { porcentajeMemoria } from '../../utilidades/metricas';
import { motion } from 'framer-motion';

const GrupoTarjetas = ({ metricas }) => {
  const tarjetas = [
    {
      id: 'cpu',
      titulo: 'CPU Usage',
      valor: formatearPorcentaje(metricas?.cpu || 0),
      icono: <Cpu size={24} />,
      bgColor: 'bg-pastel-blue',
      alto: metricas?.cpu > 80,
      badge: metricas?.cpu > 80 ? 'text-accent-danger' : 'text-accent-success'
    },
    {
      id: 'ram',
      titulo: 'RAM Memory',
      valor: formatearPorcentaje(porcentajeMemoria(metricas)),
      icono: <MemoryStick size={24} />,
      bgColor: 'bg-pastel-purple',
      alto: porcentajeMemoria(metricas) > 80,
      badge: porcentajeMemoria(metricas) > 80 ? 'text-accent-danger' : 'text-accent-success'
    },
    {
      id: 'req',
      titulo: 'Requests/s',
      valor: formatearNumeroGrande(metricas?.peticiones || 0),
      icono: <Activity size={24} />,
      bgColor: 'bg-pastel-green',
      badge: 'text-accent-success'
    },
    {
      id: 'usr',
      titulo: 'Active Users',
      valor: formatearNumeroGrande(metricas?.usuarios || 0),
      icono: <Users size={24} />,
      bgColor: 'bg-pastel-yellow',
      badge: 'text-accent-success'
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <div className="mb-12">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h2 className="text-2xl font-extrabold text-text-main tracking-tight">Portfolio</h2>
        </div>
        <div>
          <h3 className="text-xl font-bold text-text-main">Your Assets</h3>
        </div>
      </div>
      
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {tarjetas.map((t) => (
          <motion.div 
            key={t.id} 
            className={`${t.bgColor} rounded-2xl p-6 flex flex-col relative transition-all duration-200 cursor-pointer hover:-translate-y-1 hover:shadow-lg`}
            variants={item}
          >
            <div className="flex justify-between items-start mb-2">
              <span className="text-3xl font-extrabold text-text-main tracking-tight">{t.valor}</span>
              <button
                type="button"
                aria-label={`Más opciones para ${t.titulo}`}
                className="bg-transparent border-none text-text-muted text-xl cursor-pointer hover:text-text-main"
              >
                ⋮
              </button>
            </div>
            <div className="text-sm font-medium text-text-muted mb-8">{t.titulo}</div>
            
            <div className="flex justify-between items-center mt-auto">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-text-main">
                {t.icono}
              </div>
              <div className="bg-white/60 px-3 py-1 rounded-full text-xs font-bold text-text-main">
                <span className={t.badge}>
                  {t.alto ? '⚠️ High' : '+0.14%'}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default GrupoTarjetas;
