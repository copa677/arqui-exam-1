# Script para levantar TODO el ecosistema (Backend + Frontend)
# Ejecución: ./start_full_system.ps1

# 1. Levantar el Backend usando el script anterior
powershell -File "./start_backend.ps1"

# 2. Levantar el Frontend (React + Vite)
Write-Host "Iniciando Frontend (React)..." -ForegroundColor Cyan
# Usamos cmd /c para evitar que Windows intente abrir el script de npm en un editor
Start-Process cmd -ArgumentList "/c npm run dev" -WorkingDirectory "frontend"
Write-Host "[OK] Frontend iniciado. Revisa tu navegador en http://localhost:5173" -ForegroundColor Green

Write-Host "----------------------------------------------------" -ForegroundColor Green
Write-Host "¡Sistema completo en ejecución!" -ForegroundColor Green
