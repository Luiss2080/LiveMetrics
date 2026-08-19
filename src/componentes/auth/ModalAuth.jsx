import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, LogIn, UserPlus } from 'lucide-react';

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
      className="w-full max-w-[440px] flex flex-col z-10 p-0 overflow-hidden bg-white rounded-3xl shadow-2xl border border-black/5"
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, type: "spring", bounce: 0.3 }}
    >
      <div className="flex w-full border-b border-black/5 bg-slate-50">
        <button 
          className={`flex-1 flex items-center justify-center gap-2 p-5 bg-transparent border-none font-semibold text-[0.95rem] cursor-pointer transition-all duration-300 border-b-2 ${esLogin ? 'text-accent-primary border-accent-primary bg-white' : 'text-text-muted border-transparent hover:text-text-main hover:bg-slate-100'}`}
          onClick={() => setEsLogin(true)}
          type="button"
        >
          <LogIn size={18} /> Iniciar Sesión
        </button>
        <button 
          className={`flex-1 flex items-center justify-center gap-2 p-5 bg-transparent border-none font-semibold text-[0.95rem] cursor-pointer transition-all duration-300 border-b-2 ${!esLogin ? 'text-accent-primary border-accent-primary bg-white' : 'text-text-muted border-transparent hover:text-text-main hover:bg-slate-100'}`}
          onClick={() => setEsLogin(false)}
          type="button"
        >
          <UserPlus size={18} /> Registrarse
        </button>
      </div>

      <div className="overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.form 
            key={esLogin ? 'login' : 'register'}
            initial={{ opacity: 0, x: esLogin ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: esLogin ? 20 : -20 }}
            transition={{ duration: 0.2 }}
            onSubmit={manejarSubmit} 
            className="p-8 flex flex-col gap-6"
          >
            {!esLogin && (
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-text-main">Nombre Completo</label>
                <div className="relative flex items-center">
                  <User size={18} className="absolute left-4 text-text-muted" />
                  <input 
                    type="text" 
                    name="nombre"
                    placeholder="Ej: Juan Pérez"
                    value={form.nombre}
                    onChange={manejarCambio}
                    required={!esLogin}
                    className="w-full p-4 pl-12 rounded-xl border border-black/10 bg-slate-50 text-text-main font-sans text-base transition-all duration-200 focus:outline-none focus:border-accent-primary focus:bg-white focus:ring-4 focus:ring-accent-primary/20"
                  />
                </div>
              </div>
            )}

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-text-main">Correo Electrónico</label>
              <div className="relative flex items-center">
                <Mail size={18} className="absolute left-4 text-text-muted" />
                <input 
                  type="email" 
                  name="email"
                  placeholder="admin@livemetrics.com"
                  value={form.email}
                  onChange={manejarCambio}
                  required
                  className="w-full p-4 pl-12 rounded-xl border border-black/10 bg-slate-50 text-text-main font-sans text-base transition-all duration-200 focus:outline-none focus:border-accent-primary focus:bg-white focus:ring-4 focus:ring-accent-primary/20"
                />
              </div>
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-text-main">Contraseña</label>
              <div className="relative flex items-center">
                <Lock size={18} className="absolute left-4 text-text-muted" />
                <input 
                  type="password" 
                  name="password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={manejarCambio}
                  required
                  className="w-full p-4 pl-12 rounded-xl border border-black/10 bg-slate-50 text-text-main font-sans text-base transition-all duration-200 focus:outline-none focus:border-accent-primary focus:bg-white focus:ring-4 focus:ring-accent-primary/20"
                />
              </div>
            </div>
            
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit" 
              disabled={cargando}
              className={`mt-2 p-4 text-lg font-bold rounded-xl text-white transition-all shadow-lg ${cargando ? 'bg-text-muted cursor-not-allowed opacity-70 shadow-none' : 'bg-accent-primary hover:bg-blue-600 shadow-blue-500/30'}`}
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
