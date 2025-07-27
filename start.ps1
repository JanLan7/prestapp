# Script de PowerShell para iniciar el proyecto completo
Write-Host "🚀 Iniciando sistema de alquileres..." -ForegroundColor Green

# Verificar si existe Node.js
if (!(Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Node.js no está instalado. Por favor instálalo desde https://nodejs.org/" -ForegroundColor Red
    exit 1
}

# Función para verificar si las dependencias están instaladas
function Test-Dependencies {
    param($path, $name)
    if (!(Test-Path "$path\node_modules")) {
        Write-Host "📦 Instalando dependencias de $name..." -ForegroundColor Yellow
        Set-Location $path
        npm install
        if ($LASTEXITCODE -ne 0) {
            Write-Host "❌ Error instalando dependencias de $name" -ForegroundColor Red
            exit 1
        }
    }
}

# Verificar e instalar dependencias
Write-Host "🔍 Verificando dependencias..." -ForegroundColor Yellow
Test-Dependencies ".\server" "servidor"
Test-Dependencies ".\cliente" "cliente"

# Iniciar servidor en background
Write-Host "🔧 Iniciando servidor backend..." -ForegroundColor Cyan
Start-Process -WindowStyle Hidden -FilePath "powershell" -ArgumentList "-Command", "cd '$(Get-Location)\server'; npm start"

# Esperar un momento para que el servidor inicie
Start-Sleep -Seconds 3

# Iniciar cliente
Write-Host "🌐 Iniciando cliente frontend..." -ForegroundColor Cyan
Set-Location ".\cliente"
npm run dev

Write-Host "✅ Sistema iniciado correctamente" -ForegroundColor Green
Write-Host "📝 Frontend: http://localhost:5173" -ForegroundColor White
Write-Host "🔧 Backend: http://localhost:5000" -ForegroundColor White
