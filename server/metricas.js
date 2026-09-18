// Generador de metricas simuladas. Contrato del evento `metricas:actualizacion`:
// { tiempo, cpu, memoria, peticiones, usuarios, disco, red }
export const generarFluctuacion = (valorActual, min, max, variacion, aleatorio = Math.random) => {
  // Posibilidad de un pico repentino (10% de probabilidad)
  if (aleatorio() < 0.1) {
    return Math.min(max, valorActual + variacion * 3);
  }
  const cambio = aleatorio() * variacion * 2 - variacion;
  let nuevoValor = valorActual + cambio;

  if (nuevoValor < min) nuevoValor = min;
  if (nuevoValor > max) nuevoValor = max;

  return Number(nuevoValor.toFixed(1));
};

export const crearGeneradorMetricas = (aleatorio = Math.random) => {
  let cpu = 30;
  let memoria = 40;
  let peticiones = 100;
  let usuarios = 50;
  let disco = 65; // Porcentaje de disco
  let red = 20; // Latencia en ms

  return () => {
    cpu = generarFluctuacion(cpu, 5, 100, 15, aleatorio);
    memoria = generarFluctuacion(memoria, 20, 95, 5, aleatorio);
    peticiones = generarFluctuacion(peticiones, 50, 1000, 50, aleatorio);
    usuarios = generarFluctuacion(usuarios, 10, 500, 10, aleatorio);
    disco = generarFluctuacion(disco, 60, 95, 1, aleatorio); // El disco varia muy poco
    red = generarFluctuacion(red, 10, 500, 20, aleatorio); // La latencia puede tener picos

    return {
      tiempo: new Date().toISOString(),
      cpu,
      memoria,
      peticiones,
      usuarios: Math.floor(usuarios),
      disco,
      red: Math.floor(red),
    };
  };
};
