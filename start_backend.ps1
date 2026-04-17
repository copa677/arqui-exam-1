# Script de automatización para levantar los Microservicios de PHP
# Ejecución: ./start_backend.ps1

Write-Host "--- Iniciando Ecosistema de Microservicios UAGRM ---" -ForegroundColor Cyan

# 1. API Gateway (Puerto 3000)
Start-Process php -ArgumentList "-S localhost:3000 -t public" -WorkingDirectory "backend/apigateway" -WindowStyle Minimized
Write-Host "[OK] API Gateway iniciado en puerto 3000" -ForegroundColor Green

# 2. Microservicio Usuario (Puerto 3001)
Start-Process php -ArgumentList "-S localhost:3001 -t public" -WorkingDirectory "backend/usuario" -WindowStyle Minimized
Write-Host "[OK] Microservicio Usuario iniciado en puerto 3001" -ForegroundColor Green

# 3. Microservicio Ubicación (Puerto 3002)
Start-Process php -ArgumentList "-S localhost:3002 -t public" -WorkingDirectory "backend/ubicacion" -WindowStyle Minimized
Write-Host "[OK] Microservicio Ubicación iniciado en puerto 3002" -ForegroundColor Green

# 4. Microservicio Reporte de Problemas (Puerto 3003)
Start-Process php -ArgumentList "-S localhost:3003 -t public" -WorkingDirectory "backend/reporte_problemas" -WindowStyle Minimized
Write-Host "[OK] Microservicio Reporte iniciado en puerto 3003" -ForegroundColor Green

# 5. Microservicio Gestión y Evidencia (Puerto 3004)
Start-Process php -ArgumentList "-S localhost:3004 -t public" -WorkingDirectory "backend/gestion_evidencia" -WindowStyle Minimized
Write-Host "[OK] Microservicio Gestión iniciado en puerto 3004" -ForegroundColor Green

Write-Host "----------------------------------------------------" -ForegroundColor Cyan
Write-Host "Todos los servicios backend están corriendo en segundo plano." -ForegroundColor yellow
Write-Host "Puedes cerrarlos cerrando las ventanas de PHP o usando 'Stop-Process -Name php'." -ForegroundColor Gray
