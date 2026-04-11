<?php

require __DIR__ . '/../vendor/autoload.php';

use App\Config\Database;
use App\Controllers\FacultadController;
use App\Controllers\ModuloController;
use App\Controllers\AmbienteController;

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
    // Facultades
    $r->addRoute('GET', '/facultades', [FacultadController::class, 'index']);
    $r->addRoute('GET', '/facultades/{id:\d+}', [FacultadController::class, 'show']);
    $r->addRoute('POST', '/facultades', [FacultadController::class, 'store']);
    $r->addRoute('PUT', '/facultades/{id:\d+}', [FacultadController::class, 'update']);
    $r->addRoute('DELETE', '/facultades/{id:\d+}', [FacultadController::class, 'destroy']);

    // Modulos
    $r->addRoute('GET', '/modulos', [ModuloController::class, 'index']);
    $r->addRoute('GET', '/modulos/{id:\d+}', [ModuloController::class, 'show']);
    $r->addRoute('POST', '/modulos', [ModuloController::class, 'store']);
    $r->addRoute('PUT', '/modulos/{id:\d+}', [ModuloController::class, 'update']);
    $r->addRoute('DELETE', '/modulos/{id:\d+}', [ModuloController::class, 'destroy']);

    // Ambientes
    $r->addRoute('GET', '/ambientes', [AmbienteController::class, 'index']);
    $r->addRoute('GET', '/ambientes/{id:\d+}', [AmbienteController::class, 'show']);
    $r->addRoute('POST', '/ambientes', [AmbienteController::class, 'store']);
    $r->addRoute('PUT', '/ambientes/{id:\d+}', [AmbienteController::class, 'update']);
    $r->addRoute('DELETE', '/ambientes/{id:\d+}', [AmbienteController::class, 'destroy']);
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
        echo json_encode(['error' => 'Ruta no encontrada en Ubicacion']);
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
