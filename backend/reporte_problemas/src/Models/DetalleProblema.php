<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DetalleProblema extends Model {
    protected $table = 'detalle_problema';
    protected $fillable = [
        'descripcion', 
        'estado_actual', 
        'ambiente_id', 
        'nota_id', 
        'tipo_incidencia_id', 
        'activo'
    ];
    public $timestamps = false; // El diagrama no especifica fechas automáticas en detalle

    public function nota() {
        return $this->belongsTo('App\Models\NotaProblema', 'nota_id');
    }

    public function tipoIncidencia() {
        return $this->belongsTo('App\Models\TipoIncidencia', 'tipo_incidencia_id');
    }
}
