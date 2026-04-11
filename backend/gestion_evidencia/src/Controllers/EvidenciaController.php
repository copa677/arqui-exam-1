<?php

namespace App\Controllers;

use App\Models\Evidencia;

class EvidenciaController {
    public function index() {
        echo Evidencia::where('activo', true)->get()->toJson();
    }

    public function show($id) {
        $evidencia = Evidencia::where('id', $id)->where('activo', true)->first();
        if (!$evidencia) {
            http_response_code(404);
            echo json_encode(['error' => 'Evidencia no encontrada']);
            return;
        }
        echo $evidencia->toJson();
    }

    public function store() {
        $data = json_decode(file_get_contents('php://input'), true);
        try {
            $data['activo'] = true;
            $evidencia = Evidencia::create($data);
            http_response_code(201);
            echo $evidencia->toJson();
        } catch (\Exception $e) {
            http_response_code(400);
            echo json_encode(['error' => 'Error al guardar evidencia: ' . $e->getMessage()]);
        }
    }

    public function update($id) {
        $data = json_decode(file_get_contents('php://input'), true);
        $evidencia = Evidencia::where('id', $id)->where('activo', true)->first();
        if (!$evidencia) {
            http_response_code(404);
            echo json_encode(['error' => 'Registro no encontrado']);
            return;
        }
        $evidencia->update($data);
        echo $evidencia->toJson();
    }

    public function destroy($id) {
        $evidencia = Evidencia::where('id', $id)->where('activo', true)->first();
        if ($evidencia) {
            $evidencia->activo = false;
            $evidencia->save();
        }
        echo json_encode(['message' => 'Evidencia desactivada']);
    }
}
