@echo off
echo ====================================================
echo    Iniciando Entorno LiveMetrics...
echo ====================================================
echo.

echo Verificando e instalando dependencias (esto puede tardar unos momentos)...
call npm install

echo.
echo ====================================================
echo    Iniciando Servidor Backend y Frontend...
echo ====================================================
echo.

:: Usamos npx concurrently para correr ambos procesos en la misma terminal del IDE
:: Esto evita que se abran ventanas externas de CMD y permite cerrar ambos con Ctrl+C
npx concurrently "npm run server" "npm run dev" --names "BACKEND,FRONTEND" --prefix-colors "blue,green"
