import { useState, useEffect } from 'react';
import { socket } from '../servicios/socketServicio';

export const useConexion = () => {
  const [estaConectado, setEstaConectado] = useState(socket.connected);

  useEffect(() => {
    const onConectar = () => {
      setEstaConectado(true);
    };

    const onDesconectar = () => {
      setEstaConectado(false);
    };

    socket.on('connect', onConectar);
    socket.on('disconnect', onDesconectar);

    return () => {
      socket.off('connect', onConectar);
      socket.off('disconnect', onDesconectar);
    };
  }, []);

  return estaConectado;
};
