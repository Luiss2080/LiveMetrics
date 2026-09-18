import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { CLAVE_TOKEN, CLAVE_USUARIO, validarSesion } from '../../servicios/sesionServicio';

// Solo muestra `children` si el backend confirma que el token guardado es valido.
const RutaProtegida = ({ children }) => {
  const [estado, setEstado] = useState('verificando'); // 'verificando' | 'valida' | 'invalida'

  useEffect(() => {
    let activo = true;
    validarSesion(localStorage.getItem(CLAVE_TOKEN)).then((usuario) => {
      if (!activo) return;
      if (usuario) {
        setEstado('valida');
      } else {
        localStorage.removeItem(CLAVE_TOKEN);
        localStorage.removeItem(CLAVE_USUARIO);
        setEstado('invalida');
      }
    });
    return () => {
      activo = false;
    };
  }, []);

  if (estado === 'verificando') return null;
  return estado === 'valida' ? children : <Navigate to="/login" replace />;
};

export default RutaProtegida;
