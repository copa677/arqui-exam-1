<?php

namespace App\Controllers;

use App\Models\Modulo;

class ModuloController {
    public function index() {
        echo Modulo::where('activo', true)->with('facultad', 'ambientes')->get()->toJson();
    }

    public function show($id) {
        $modulo = Modulo::where('id', $id)->where('activo', true)->with('facultad', 'ambientes')->first();
        if (!$modulo) {
            http_response_code(404);
            echo json_encode(['error' => 'Modulo no encontrado o inactivo']);
            return;
        }
        echo $modulo->toJson();
    }

    public function store() {
        $data = json_decode(file_get_contents('php://input'), true);
        try {
            $data['activo'] = true;
            $modulo = Modulo::create($data);
            http_response_code(201);
            echo $modulo->toJson();
        } catch (\Exception $e) {
            http_response_code(400);
            echo json_encode(['error' => 'Error al crear modulo: ' . $e->getMessage()]);
        }
    }

    public function update($id) {
        $data = json_decode(file_get_contents('php://input'), true);
        $modulo = Modulo::where('id', $id)->where('activo', true)->first();
        if (!$modulo) {
            http_response_code(404);
            echo json_encode(['error' => 'Modulo no encontrado o inactivo']);
            return;
        }
        $modulo->update($data);
        echo $modulo->toJson();
    }

    public function destroy($id) {
        $modulo = Modulo::where('id', $id)->where('activo', true)->first();
        if (!$modulo) {
            http_response_code(404);
            echo json_encode(['error' => 'Modulo no encontrado o inactivo']);
            return;
        }
        
        $modulo->activo = false;
        $modulo->save();
        
        echo json_encode(['message' => 'Modulo desactivado exitosamente']);
    }
}
