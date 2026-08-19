import React from 'react';
import { Cpu, MemoryStick, Activity, Users } from 'lucide-react';
import { formatearNumeroGrande, formatearPorcentaje } from '../../utilidades/formateadores';
import { motion } from 'framer-motion';
import './GrupoTarjetas.css';

const GrupoTarjetas = ({ metricas }) => {
  const tarjetas = [
    {
      id: 'cpu',
      titulo: 'CPU Usage',
      valor: formatearPorcentaje(metricas?.cpu || 0),
      subtitulo: 'Core Processor',
      icono: <Cpu size={24} />,
      color: 'blue'
    },
    {
      id: 'ram',
      titulo: 'RAM Memory',
      valor: formatearPorcentaje(metricas?.ram || 0),
      subtitulo: 'System Memory',
      icono: <MemoryStick size={24} />,
      color: 'purple'
    },
    {
      id: 'req',
      titulo: 'Requests/s',
      valor: formatearNumeroGrande(metricas?.peticiones || 0),
      subtitulo: 'Server Traffic',
      icono: <Activity size={24} />,
      color: 'green'
    },
    {
      id: 'usr',
      titulo: 'Active Users',
      valor: formatearNumeroGrande(metricas?.usuarios || 0),
      subtitulo: 'Live Sessions',
      icono: <Users size={24} />,
      color: 'yellow'
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <div className="seccion-assets">
      <h3 className="titulo-seccion">Your Assets</h3>
      <motion.div 
        className="grupo-tarjetas"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {tarjetas.map((t) => (
          <motion.div 
            key={t.id} 
            className={`tarjeta-asset color-${t.color}`}
            variants={item}
            whileHover={{ y: -5, boxShadow: '0 15px 30px rgba(0,0,0,0.1)' }}
          >
            <div className="tarjeta-asset-header">
              <span className="tarjeta-asset-valor">{t.valor}</span>
              <button className="boton-opciones-tarjeta">⋮</button>
            </div>
            <div className="tarjeta-asset-titulo">{t.titulo}</div>
            
            <div className="tarjeta-asset-footer">
              <div className="icono-asset">{t.icono}</div>
              <div className="badge-porcentaje">
                {t.id === 'cpu' || t.id === 'ram' ? (metricas?.[t.id] > 80 ? '⚠️ High' : '✅ Normal') : '+0.15%'}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default GrupoTarjetas;
