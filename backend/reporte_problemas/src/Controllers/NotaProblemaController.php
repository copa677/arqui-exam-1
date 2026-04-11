<?php

namespace App\Controllers;

use App\Models\NotaProblema;

class NotaProblemaController {
    public function index() {
        echo NotaProblema::where('activo', true)->with('reportador', 'detalles')->get()->toJson();
    }

    public function show($id) {
        $nota = NotaProblema::where('id', $id)->where('activo', true)->with('reportador', 'detalles')->first();
        if (!$nota) {
            http_response_code(404);
            echo json_encode(['error' => 'Nota de problema no encontrada o inactiva']);
            return;
        }
        echo $nota->toJson();
    }

    public function store() {
        $data = json_decode(file_get_contents('php://input'), true);
        try {
            $data['activo'] = true;
            $data['fecha_envio'] = $data['fecha_envio'] ?? date('Y-m-d H:i:s');
            $nota = NotaProblema::create($data);
            http_response_code(201);
            echo $nota->toJson();
        } catch (\Exception $e) {
            http_response_code(400);
            echo json_encode(['error' => 'Error al crear nota de problema: ' . $e->getMessage()]);
        }
    }

    public function update($id) {
        $data = json_decode(file_get_contents('php://input'), true);
        $nota = NotaProblema::where('id', $id)->where('activo', true)->first();
        if (!$nota) {
            http_response_code(404);
            echo json_encode(['error' => 'Nota de problema no encontrada o inactiva']);
            return;
        }
        $nota->update($data);
        echo $nota->toJson();
    }

    public function destroy($id) {
        $nota = NotaProblema::where('id', $id)->where('activo', true)->first();
        if (!$nota) {
            http_response_code(404);
            echo json_encode(['error' => 'Nota de problema no encontrada o inactiva']);
            return;
        }
        $nota->activo = false;
        $nota->save();
        echo json_encode(['message' => 'Nota de problema desactivada']);
    }
}
