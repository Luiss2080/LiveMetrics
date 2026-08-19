import React from 'react';
import { motion } from 'framer-motion';
import ModalAuth from '../componentes/auth/ModalAuth';
import './Login.css';

const Login = () => {
  return (
    <motion.div 
      className="login-contenedor"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="decoracion-fondo circulo-1"></div>
      <div className="decoracion-fondo circulo-2"></div>
      
      <motion.div 
        style={{ textAlign: 'center', marginBottom: 'var(--espaciado-lg)', zIndex: 10 }}
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1, type: "spring" }}
      >
        <img src="/logo.jpg" alt="LiveMetrics Logo" style={{ width: '80px', height: '80px', borderRadius: '20px', marginBottom: '1rem', boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)' }} />
        <h1 className="texto-gradiente" style={{ fontSize: '3.5rem', margin: 0, letterSpacing: '-1px' }}>LiveMetrics</h1>
        <p className="texto-secundario" style={{ fontSize: '1.2rem', marginTop: '0.5rem' }}>Sistema Integral de Monitoreo</p>
      </motion.div>

      <ModalAuth />
    </motion.div>
  );
};

export default Login;
