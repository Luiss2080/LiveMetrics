# 📊 LiveMetrics - Estructura del Proyecto

## 📁 Estructura Detallada de Archivos

```
LiveMetrics/
├── server/
│   └── index.js                    # Servidor Socket.io para datos en tiempo real
│
├── src/
│   ├── componentes/                # Todos los componentes de UI
│   │   ├── encabezado/
│   │   │   ├── Encabezado.jsx     # Componente del encabezado principal
│   │   │   └── Encabezado.css     # Estilos del encabezado
│   │   │
│   │   ├── estado/
│   │   │   ├── IndicadorConexion.jsx   # Indicador de estado de conexión
│   │   │   └── IndicadorConexion.css   # Estilos del indicador
│   │   │
│   │   ├── graficos/
│   │   │   ├── GraficoLineas.jsx      # Gráfico de líneas (Chart.js)
│   │   │   ├── GraficoLineas.css      # Estilos del gráfico de líneas
│   │   │   ├── GraficoBarras.jsx      # Gráfico de barras (D3.js)
│   │   │   └── GraficoBarras.css      # Estilos del gráfico de barras
│   │   │
│   │   ├── layout/
│   │   │   ├── ContenedorPrincipal.jsx    # Contenedor principal
│   │   │   └── ContenedorPrincipal.css    # Estilos del contenedor
│   │   │
│   │   └── tarjetas/
│   │       ├── TarjetaEstadistica.jsx     # Tarjeta individual de estadística
│   │       ├── TarjetaEstadistica.css     # Estilos de tarjeta individual
│   │       ├── GrupoTarjetas.jsx          # Grupo de tarjetas
│   │       └── GrupoTarjetas.css          # Estilos del grupo de tarjetas
│   │
│   ├── configuracion/              # Archivos de configuración
│   │   ├── graficosConfig.js       # Configuración de Chart.js
│   │   └── d3Config.js             # Configuración de D3.js
│   │
│   ├── estilos/                    # Estilos globales y utilidades
│   │   ├── variables.css           # Variables CSS (colores, espaciado, etc.)
│   │   ├── global.css              # Estilos globales base
│   │   └── utilidades.css          # Clases de utilidad
│   │
│   ├── hooks/                      # Custom hooks de React
│   │   ├── useMetricas.js          # Hook para manejar métricas
│   │   └── useConexion.js          # Hook para estado de conexión
│   │
│   ├── servicios/                  # Servicios y lógica de negocio
│   │   └── socketServicio.js       # Servicio de Socket.io
│   │
│   ├── utilidades/                 # Funciones de utilidad
│   │   ├── formateadores.js        # Funciones para formatear datos
│   │   └── generadores.js          # Generadores de datos
│   │
│   ├── vistas/                     # Vistas/Páginas principales
│   │   └── PanelPrincipal.jsx      # Vista principal del dashboard
│   │
│   ├── App.jsx                     # Componente raíz
│   └── main.jsx                    # Punto de entrada
│
├── index.html
├── vite.config.js
├── package.json
└── README.md
```

## 🗂️ Descripción de Carpetas

### `/componentes`
Componentes reutilizables de la interfaz, organizados por categoría:
- **encabezado**: Componentes del header
- **estado**: Indicadores de estado (conexión, loading, etc.)
- **graficos**: Visualizaciones con Chart.js y D3.js
- **layout**: Componentes de estructura y maquetación
- **tarjetas**: Tarjetas de estadísticas y métricas

### `/configuracion`
Archivos de configuración centralizados:
- Configuración de gráficos (opciones, colores, estilos)
- Configuración de D3.js
- Constantes de la aplicación

### `/estilos`
Estilos CSS modulares:
- **variables.css**: Variables CSS reutilizables
- **global.css**: Reset y estilos base
- **utilidades.css**: Clases de utilidad (flex, spacing, etc.)

### `/hooks`
Custom hooks de React para lógica reutilizable:
- Manejo de métricas en tiempo real
- Estado de conexión
- Lógica de negocio separada de UI

### `/servicios`
Servicios y APIs:
- Servicio de Socket.io centralizado
- Llamadas a APIs (futuro)
- Lógica de comunicación con backend

### `/utilidades`
Funciones de utilidad puras:
- Formateadores de números, fechas, texto
- Generadores de datos
- Helpers generales

### `/vistas`
Páginas/vistas principales de la aplicación:
- Cada vista combina múltiples componentes
- Lógica de composición de la UI

## 🎯 Ventajas de esta Estructura

### ✅ Mantenibilidad
- Cada archivo tiene una única responsabilidad
- Fácil de encontrar y modificar código específico
- Cambios aislados sin afectar otros módulos

### ✅ Escalabilidad
- Fácil agregar nuevos componentes
- Estructura clara para nuevos desarrolladores
- Preparado para crecer

### ✅ Reutilización
- Componentes independientes
- Hooks personalizados compartidos
- Utilidades reutilizables

### ✅ Organización
- Nombres en español descriptivos
- Agrupación lógica por funcionalidad
- Separación clara de responsabilidades

## 🚀 Comandos

```bash
# Iniciar servidor de métricas
npm run server

# Iniciar aplicación React
npm run dev

# Build para producción
npm run build
```

## 📝 Convenciones de Nombres

- **Componentes**: PascalCase (Ej: `TarjetaEstadistica.jsx`)
- **Archivos CSS**: PascalCase igual al componente (Ej: `TarjetaEstadistica.css`)
- **Servicios/Hooks**: camelCase (Ej: `socketServicio.js`, `useMetricas.js`)
- **Utilidades**: camelCase (Ej: `formateadores.js`)
- **Carpetas**: camelCase en español (Ej: `componentes/`, `graficos/`)
