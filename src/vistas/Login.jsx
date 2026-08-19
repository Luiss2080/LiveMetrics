import React from 'react';
import ModalAuth from '../componentes/auth/ModalAuth';
import './Login.css';

const Login = () => {
  return (
    <div className="login-contenedor">
      <div className="decoracion-fondo circulo-1"></div>
      <div className="decoracion-fondo circulo-2"></div>
      
      <div style={{ textAlign: 'center', marginBottom: 'var(--espaciado-lg)', zIndex: 10 }}>
        <h1 className="texto-gradiente" style={{ fontSize: '3rem', margin: 0 }}>LiveMetrics</h1>
        <p className="texto-secundario">Sistema Integral de Monitoreo</p>
      </div>

      <ModalAuth />
    </div>
  );
};

export default Login;
