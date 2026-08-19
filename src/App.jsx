import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PanelPrincipal from './vistas/PanelPrincipal';
import Historial from './vistas/Historial';
import Configuracion from './vistas/Configuracion';
import PantallaCarga from './componentes/estado/PantallaCarga';

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
    <Router>
      <Routes>
        <Route path="/" element={<PanelPrincipal />} />
        <Route path="/historial" element={<Historial />} />
        <Route path="/configuracion" element={<Configuracion />} />
      </Routes>
    </Router>
  );
}

export default App;
