import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { TemaProvider } from './contextos/TemaContext';
import PanelPrincipal from './vistas/PanelPrincipal';
import Historial from './vistas/Historial';
import Configuracion from './vistas/Configuracion';
import Login from './vistas/Login';
import PantallaCarga from './componentes/estado/PantallaCarga';
import RutaProtegida from './componentes/auth/RutaProtegida';

function App() {
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    // Simular carga de recursos iniciales por 2 segundos
    const timer = setTimeout(() => {
      setCargando(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (cargando) {
    return <PantallaCarga />;
  }

  return (
    <TemaProvider>
      <Toaster />
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<RutaProtegida><PanelPrincipal /></RutaProtegida>} />
          <Route path="/historial" element={<RutaProtegida><Historial /></RutaProtegida>} />
          <Route path="/configuracion" element={<RutaProtegida><Configuracion /></RutaProtegida>} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </TemaProvider>
  );
}

export default App;
