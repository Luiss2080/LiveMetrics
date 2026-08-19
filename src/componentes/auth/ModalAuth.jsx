import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import './ModalAuth.css';

const ModalAuth = () => {
  const [esLogin, setEsLogin] = useState(true);
  const [cargando, setCargando] = useState(false);
  const [form, setForm] = useState({ nombre: '', email: '', password: '' });
  const navigate = useNavigate();

  const manejarCambio = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const manejarSubmit = async (e) => {
    e.preventDefault();
    setCargando(true);
    
    const endpoint = esLogin ? 'http://localhost:3001/api/login' : 'http://localhost:3001/api/register';
    
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Error en la autenticación');
      }

      if (esLogin) {
        localStorage.setItem('livemetrics-auth', data.token);
        localStorage.setItem('livemetrics-user', JSON.stringify(data.usuario));
        toast.success(`Bienvenido ${data.usuario.nombre}`, { position: 'bottom-center' });
        navigate('/dashboard');
      } else {
        toast.success('Cuenta creada exitosamente. Por favor, inicia sesión.', { position: 'bottom-center' });
        setEsLogin(true); // Cambiar a pestaña de login
        setForm({ ...form, password: '' });
      }
    } catch (error) {
      toast.error(error.message, { position: 'bottom-center' });
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="modal-auth-contenedor panel-cristal">
      <div className="tabs-auth">
        <button 
          className={`tab-btn ${esLogin ? 'activo' : ''}`} 
          onClick={() => setEsLogin(true)}
          type="button"
        >
          Iniciar Sesión
        </button>
        <button 
          className={`tab-btn ${!esLogin ? 'activo' : ''}`} 
          onClick={() => setEsLogin(false)}
          type="button"
        >
          Registrarse
        </button>
      </div>

      <form onSubmit={manejarSubmit} className="auth-form">
        {!esLogin && (
          <div className="grupo-input">
            <label>Nombre Completo</label>
            <input 
              type="text" 
              name="nombre"
              placeholder="Ej: Juan Pérez"
              value={form.nombre}
              onChange={manejarCambio}
              required={!esLogin}
            />
          </div>
        )}

        <div className="grupo-input">
          <label>Email</label>
          <input 
            type="email" 
            name="email"
            placeholder="admin@livemetrics.com"
            value={form.email}
            onChange={manejarCambio}
            required
          />
        </div>
        
        <div className="grupo-input">
          <label>Contraseña</label>
          <input 
            type="password" 
            name="password"
            placeholder="••••••••"
            value={form.password}
            onChange={manejarCambio}
            required
          />
        </div>
        
        <button type="submit" className="boton-primario boton-auth" disabled={cargando}>
          {cargando ? 'Procesando...' : (esLogin ? 'Acceder al Dashboard' : 'Crear Cuenta')}
        </button>
      </form>
    </div>
  );
};

export default ModalAuth;
