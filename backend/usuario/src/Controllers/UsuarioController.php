<?php

namespace App\Controllers;

use App\Models\Usuario;

class UsuarioController {
    public function getUsuarios() {
        echo Usuario::where('activo', true)->with('rol')->get()->toJson();
    }

    public function getUsuario($id) {
        $usuario = Usuario::where('id', $id)->where('activo', true)->with('rol')->first();
        if (!$usuario) {
            http_response_code(404);
            echo json_encode(['error' => 'Usuario no encontrado o inactivo']);
            return;
        }
        echo $usuario->toJson();
    }

    public function createUsuario() {
        $input = file_get_contents('php://input');
        $data = json_decode($input, true);

        if (is_null($data)) {
            http_response_code(400);
            echo json_encode(['error' => 'Cuerpo JSON inválido o vacío']);
            return;
        }

        // Verificar que el correo sea único
        if (isset($data['correo'])) {
            $existente = Usuario::where('correo', $data['correo'])->first();
            if ($existente) {
                http_response_code(409); // 409 Conflict
                echo json_encode(['error' => 'El correo ingresado ya se encuentra en uso por otro usuario.']);
                return;
            }
        }

        try {
            $data['activo'] = true;
            $usuario = Usuario::create($data);
            http_response_code(201);
            echo $usuario->toJson();
        } catch (\Exception $e) {
            http_response_code(400);
            echo json_encode(['error' => 'Error al crear usuario: ' . $e->getMessage()]);
        }
    }

    public function updateUsuario($id) {
        $data = json_decode(file_get_contents('php://input'), true);
        
        // Limpiar password si viene vacío para no sobreescribir la actual
        if (isset($data['password']) && empty(trim($data['password']))) {
            unset($data['password']);
        }

        // Verificar que el nuevo correo no pertenezca a otro usuario
        if (isset($data['correo'])) {
            $existente = Usuario::where('correo', $data['correo'])->where('id', '!=', $id)->first();
            if ($existente) {
                http_response_code(409); // 409 Conflict
                echo json_encode(['error' => 'El correo ingresado ya se encuentra en uso por otro usuario.']);
                return;
            }
        }

        $usuario = Usuario::where('id', $id)->where('activo', true)->first();
        if (!$usuario) {
            http_response_code(404);
            echo json_encode(['error' => 'Usuario no encontrado o inactivo']);
            return;
        }
        $usuario->update($data);
        echo $usuario->toJson();
    }

    public function deleteUsuario($id) {
        $usuario = Usuario::where('id', $id)->where('activo', true)->first();
        if (!$usuario) {
            http_response_code(404);
            echo json_encode(['error' => 'Usuario no encontrado o inactivo']);
            return;
        }
        
        // Eliminación Lógica Manual
        $usuario->activo = false;
        $usuario->save();
        
        echo json_encode(['message' => 'Usuario desactivado exitosamente (eliminación lógica)']);
    }
}
