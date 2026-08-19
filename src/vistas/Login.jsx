import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [cargando, setCargando] = useState(false);
  const navigate = useNavigate();

  const manejarSubmit = (e) => {
    e.preventDefault();
    setCargando(true);
    
    // Simular llamada a API
    setTimeout(() => {
      // Guardamos un flag simulado en localstorage
      localStorage.setItem('livemetrics-auth', 'true');
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className="login-contenedor">
      <div className="decoracion-fondo circulo-1"></div>
      <div className="decoracion-fondo circulo-2"></div>
      
      <div className="login-panel panel-cristal">
        <div className="login-encabezado">
          <h1 className="texto-gradiente">LiveMetrics</h1>
          <p className="texto-secundario">Ingreso al Sistema de Telemetría</p>
        </div>
        
        <form onSubmit={manejarSubmit} className="login-form">
          <div className="grupo-input">
            <label>Usuario / Email</label>
            <input 
              type="text" 
              placeholder="admin@livemetrics.com"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              required
            />
          </div>
          
          <div className="grupo-input">
            <label>Contraseña</label>
            <input 
              type="password" 
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <button type="submit" className="boton-primario boton-login" disabled={cargando}>
            {cargando ? 'Verificando...' : 'Acceder al Dashboard'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
