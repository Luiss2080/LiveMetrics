import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, LogIn, UserPlus } from 'lucide-react';
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
    <motion.div 
      className="modal-auth-contenedor panel-cristal"
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, type: "spring", bounce: 0.3 }}
    >
      <div className="tabs-auth">
        <button 
          className={`tab-btn ${esLogin ? 'activo' : ''}`} 
          onClick={() => setEsLogin(true)}
          type="button"
        >
          <LogIn size={18} /> Iniciar Sesión
        </button>
        <button 
          className={`tab-btn ${!esLogin ? 'activo' : ''}`} 
          onClick={() => setEsLogin(false)}
          type="button"
        >
          <UserPlus size={18} /> Registrarse
        </button>
      </div>

      <div className="auth-form-wrapper">
        <AnimatePresence mode="wait">
          <motion.form 
            key={esLogin ? 'login' : 'register'}
            initial={{ opacity: 0, x: esLogin ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: esLogin ? 20 : -20 }}
            transition={{ duration: 0.2 }}
            onSubmit={manejarSubmit} 
            className="auth-form"
          >
            {!esLogin && (
              <div className="grupo-input-moderno">
                <label>Nombre Completo</label>
                <div className="input-con-icono">
                  <User size={18} className="icono-input" />
                  <input 
                    type="text" 
                    name="nombre"
                    placeholder="Ej: Juan Pérez"
                    value={form.nombre}
                    onChange={manejarCambio}
                    required={!esLogin}
                  />
                </div>
              </div>
            )}

            <div className="grupo-input-moderno">
              <label>Correo Electrónico</label>
              <div className="input-con-icono">
                <Mail size={18} className="icono-input" />
                <input 
                  type="email" 
                  name="email"
                  placeholder="admin@livemetrics.com"
                  value={form.email}
                  onChange={manejarCambio}
                  required
                />
              </div>
            </div>
            
            <div className="grupo-input-moderno">
              <label>Contraseña</label>
              <div className="input-con-icono">
                <Lock size={18} className="icono-input" />
                <input 
                  type="password" 
                  name="password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={manejarCambio}
                  required
                />
              </div>
            </div>
            
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit" 
              className="boton-primario boton-auth" 
              disabled={cargando}
            >
              {cargando ? 'Procesando...' : (esLogin ? 'Acceder al Dashboard' : 'Crear Cuenta')}
            </motion.button>
          </motion.form>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default ModalAuth;
