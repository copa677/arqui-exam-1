<?php

require __DIR__ . '/../vendor/autoload.php';

use App\Config\Database;
use App\Controllers\AsignacionController;
use App\Controllers\HistorialEstadoController;
use App\Controllers\EvidenciaController;

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Inicializar Base de Datos
Database::boot();

$dispatcher = FastRoute\simpleDispatcher(function(FastRoute\RouteCollector $r) {
    // Asignaciones
    $r->addRoute('GET', '/asignaciones', [AsignacionController::class, 'index']);
    $r->addRoute('GET', '/asignaciones/{id:\d+}', [AsignacionController::class, 'show']);
    $r->addRoute('POST', '/asignaciones', [AsignacionController::class, 'store']);
    // No hay rutas de Update/Delete según requerimientos

    // Historial de Estados
    $r->addRoute('GET', '/historial', [HistorialEstadoController::class, 'index']);
    $r->addRoute('GET', '/historial/{id:\d+}', [HistorialEstadoController::class, 'show']);
    $r->addRoute('POST', '/historial', [HistorialEstadoController::class, 'store']);
    $r->addRoute('PUT', '/historial/{id:\d+}', [HistorialEstadoController::class, 'update']);
    $r->addRoute('DELETE', '/historial/{id:\d+}', [HistorialEstadoController::class, 'destroy']);

    // Evidencias
    $r->addRoute('GET', '/evidencias', [EvidenciaController::class, 'index']);
    $r->addRoute('GET', '/evidencias/{id:\d+}', [EvidenciaController::class, 'show']);
    $r->addRoute('POST', '/evidencias', [EvidenciaController::class, 'store']);
    $r->addRoute('PUT', '/evidencias/{id:\d+}', [EvidenciaController::class, 'update']);
    $r->addRoute('DELETE', '/evidencias/{id:\d+}', [EvidenciaController::class, 'destroy']);
});

$httpMethod = $_SERVER['REQUEST_METHOD'];
$uri = $_SERVER['REQUEST_URI'];

if (false !== $pos = strpos($uri, '?')) {
    $uri = substr($uri, 0, $pos);
}
$uri = rawurldecode($uri);

$routeInfo = $dispatcher->dispatch($httpMethod, $uri);

switch ($routeInfo[0]) {
    case FastRoute\Dispatcher::NOT_FOUND:
        http_response_code(404);
        echo json_encode(['error' => 'Ruta no encontrada en Gestión y Evidencia']);
        break;
    case FastRoute\Dispatcher::METHOD_NOT_ALLOWED:
        http_response_code(405);
        echo json_encode(['error' => 'Método no permitido']);
        break;
    case FastRoute\Dispatcher::FOUND:
        $handler = $routeInfo[1];
        $vars = $routeInfo[2];
        
        $controller = new $handler[0]();
        $method = $handler[1];
        call_user_func_array([$controller, $method], $vars);
        break;
}
