<?php

namespace App\Controllers;

use App\Models\Reportador;

class ReportadorController {
    public function index() {
        echo Reportador::where('activo', true)->get()->toJson();
    }

    public function show($id) {
        $reportador = Reportador::where('id', $id)->where('activo', true)->first();
        if (!$reportador) {
            http_response_code(404);
            echo json_encode(['error' => 'Reportador no encontrado o inactivo']);
            return;
        }
        echo $reportador->toJson();
    }

    public function store() {
        $data = json_decode(file_get_contents('php://input'), true);
        try {
            $data['activo'] = true;
            $reportador = Reportador::create($data);
            http_response_code(201);
            echo $reportador->toJson();
        } catch (\Exception $e) {
            http_response_code(400);
            echo json_encode(['error' => 'Error al crear reportador: ' . $e->getMessage()]);
        }
    }

    public function update($id) {
        $data = json_decode(file_get_contents('php://input'), true);
        $reportador = Reportador::where('id', $id)->where('activo', true)->first();
        if (!$reportador) {
            http_response_code(404);
            echo json_encode(['error' => 'Reportador no encontrado o inactivo']);
            return;
        }
        $reportador->update($data);
        echo $reportador->toJson();
    }

    public function destroy($id) {
        $reportador = Reportador::where('id', $id)->where('activo', true)->first();
        if (!$reportador) {
            http_response_code(404);
            echo json_encode(['error' => 'Reportador no encontrado o inactivo']);
            return;
        }
        $reportador->activo = false;
        $reportador->save();
        echo json_encode(['message' => 'Reportador desactivado']);
    }
}
