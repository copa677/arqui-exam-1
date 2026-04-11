<?php

namespace App\Controllers;

use App\Models\DetalleProblema;

class DetalleProblemaController {
    public function index() {
        echo DetalleProblema::where('activo', true)->with('nota', 'tipoIncidencia')->get()->toJson();
    }

    public function show($id) {
        $detalle = DetalleProblema::where('id', $id)->where('activo', true)->with('nota', 'tipoIncidencia')->first();
        if (!$detalle) {
            http_response_code(404);
            echo json_encode(['error' => 'Detalle de problema no encontrado o inactivo']);
            return;
        }
        echo $detalle->toJson();
    }

    public function store() {
        $data = json_decode(file_get_contents('php://input'), true);
        try {
            $data['activo'] = true;
            $data['estado_actual'] = $data['estado_actual'] ?? 'Pendiente';
            $detalle = DetalleProblema::create($data);
            http_response_code(201);
            echo $detalle->toJson();
        } catch (\Exception $e) {
            http_response_code(400);
            echo json_encode(['error' => 'Error al crear detalle de problema: ' . $e->getMessage()]);
        }
    }

    public function update($id) {
        $data = json_decode(file_get_contents('php://input'), true);
        $detalle = DetalleProblema::where('id', $id)->where('activo', true)->first();
        if (!$detalle) {
            http_response_code(404);
            echo json_encode(['error' => 'Detalle de problema no encontrado o inactivo']);
            return;
        }
        $detalle->update($data);
        echo $detalle->toJson();
    }

    public function destroy($id) {
        $detalle = DetalleProblema::where('id', $id)->where('activo', true)->first();
        if (!$detalle) {
            http_response_code(404);
            echo json_encode(['error' => 'Detalle de problema no encontrado o inactivo']);
            return;
        }
        $detalle->activo = false;
        $detalle->save();
        echo json_encode(['message' => 'Detalle de problema desactivado']);
    }
}
