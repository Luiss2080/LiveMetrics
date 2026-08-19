import React from 'react';
import { motion } from 'framer-motion';
import ModalAuth from '../componentes/auth/ModalAuth';

const Login = () => {
  return (
    <motion.div 
      className="min-h-screen flex flex-col justify-center items-center relative overflow-hidden bg-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="text-center mb-12 z-10 flex flex-col items-center"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1, type: "spring" }}
      >
        <img 
          src="/logo.jpg" 
          alt="LiveMetrics Logo" 
          className="w-20 h-20 rounded-2xl mb-4 shadow-[0_0_20px_rgba(59,130,246,0.3)]"
        />
        <h1 className="text-5xl font-extrabold text-text-main tracking-tight m-0">LiveMetrics</h1>
        <p className="text-lg text-text-muted mt-2 font-medium">Sistema Integral de Monitoreo</p>
      </motion.div>

      <ModalAuth />
    </motion.div>
  );
};

export default Login;
