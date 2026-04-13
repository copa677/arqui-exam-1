-- Script de creación de base de datos para PostgreSQL

-- Tabla: rol
CREATE TABLE IF NOT EXISTS "rol" (
    "id" SERIAL PRIMARY KEY,
    "nombre_rol" VARCHAR(50) NOT NULL,
    "activo" BOOLEAN DEFAULT TRUE
);

-- Tabla: usuarios
CREATE TABLE IF NOT EXISTS "usuarios" (
    "id" SERIAL PRIMARY KEY,
    "nombres" VARCHAR(100) NOT NULL,
    "apellidos" VARCHAR(100) NOT NULL,
    "telefono" VARCHAR(20),
    "correo" VARCHAR(100) UNIQUE NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "rol_id" INTEGER REFERENCES "rol"("id") ON DELETE SET NULL,
    "facultad_id" INTEGER,
    "activo" BOOLEAN DEFAULT TRUE
);

-- MS UBICAION
-- Tabla: facultad
CREATE TABLE IF NOT EXISTS "facultad" (
    "id" SERIAL PRIMARY KEY,
    "nombre" VARCHAR(150) NOT NULL,
    "abreviatura" VARCHAR(10),
    "activo" BOOLEAN DEFAULT TRUE
);

-- Tabla: modulo
CREATE TABLE IF NOT EXISTS "modulo" (
    "id" SERIAL PRIMARY KEY,
    "numero_modulo" VARCHAR(20) NOT NULL,
    "facultad_id" INTEGER REFERENCES "facultad"("id") ON DELETE CASCADE,
    "activo" BOOLEAN DEFAULT TRUE
);

-- Tabla: ambiente
CREATE TABLE IF NOT EXISTS "ambiente" (
    "id" SERIAL PRIMARY KEY,
    "nombre_ambiente" VARCHAR(100) NOT NULL,
    "piso" INTEGER,
    "modulo_id" INTEGER REFERENCES "modulo"("id") ON DELETE CASCADE,
    "activo" BOOLEAN DEFAULT TRUE
);

-- MICROSERVICIO: REPORTE DE PROBLEMAS
-- Tabla: reportador
CREATE TABLE IF NOT EXISTS "reportador" (
    "id" SERIAL PRIMARY KEY,
    "nombres" VARCHAR(100) NOT NULL,
    "apellidos" VARCHAR(100) NOT NULL,
    "correo" VARCHAR(100) NOT NULL,
    "tipo_reportador" VARCHAR(50) NOT NULL, -- Estudiante, Docente, Administrativo
    "activo" BOOLEAN DEFAULT TRUE
);

-- Tabla: tipo_incidencia
CREATE TABLE IF NOT EXISTS "tipo_incidencia" (
    "id" SERIAL PRIMARY KEY,
    "nombre_tipo" VARCHAR(100) NOT NULL, -- Eléctrico, Mobiliario, Paredes, etc.
    "activo" BOOLEAN DEFAULT TRUE
);

-- Tabla: nota_problemas
CREATE TABLE IF NOT EXISTS "nota_problemas" (
    "id" SERIAL PRIMARY KEY,
    "fecha_envio" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "reportador_id" INTEGER REFERENCES "reportador"("id") ON DELETE SET NULL,
    "activo" BOOLEAN DEFAULT TRUE
);

-- Tabla: detalle_problema
CREATE TABLE IF NOT EXISTS "detalle_problema" (
    "id" SERIAL PRIMARY KEY,
    "descripcion" TEXT NOT NULL,
    "estado_actual" VARCHAR(50) NOT NULL DEFAULT 'Pendiente',
    "ambiente_id" INTEGER, -- Atributo de referencia (Ubicación)
    "nota_id" INTEGER REFERENCES "nota_problemas"("id") ON DELETE CASCADE,
    "tipo_incidencia_id" INTEGER REFERENCES "tipo_incidencia"("id") ON DELETE SET NULL,
    "activo" BOOLEAN DEFAULT TRUE
);

-- Datos iniciales
INSERT INTO "rol" (nombre_rol) VALUES ('Decano'), ('Encargado de Mantenimiento'), ('Estudiante');
INSERT INTO "tipo_incidencia" (nombre_tipo) VALUES ('Eléctrico'), ('Mobiliario'), ('Sanitario'), ('Infraestructura');

-- MICROSERVICIO: GESTIÓN Y EVIDENCIA
-- Tabla: asignacion
CREATE TABLE IF NOT EXISTS "asignacion" (
    "id" SERIAL PRIMARY KEY,
    "fecha_asignacion" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "detalle_problema_id" INTEGER, -- Atributo de referencia (Reporte de Problemas)
    "usuario_id" INTEGER,           -- Atributo de referencia (Usuarios - Técnico)
    "activo" BOOLEAN DEFAULT TRUE
);

-- Tabla: historial_estados
CREATE TABLE IF NOT EXISTS "historial_estados" (
    "id" SERIAL PRIMARY KEY,
    "tipo" VARCHAR(50) NOT NULL,    -- Ej: Cambio de Estado, Comentario
    "estado" VARCHAR(50) NOT NULL,  -- Ej: Asignado, En Proceso, Resuelto
    "fecha_cambio" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "comentario_tecnico" TEXT,
    "asignacion_id" INTEGER REFERENCES "asignacion"("id") ON DELETE CASCADE,
    "activo" BOOLEAN DEFAULT TRUE
);

-- Tabla: evidencia
CREATE TABLE IF NOT EXISTS "evidencia" (
    "id" SERIAL PRIMARY KEY,
    "url_archivo" VARCHAR(255) NOT NULL,
    "momento" VARCHAR(20) NOT NULL, -- Antes, Despues
    "asignacion_id" INTEGER REFERENCES "asignacion"("id") ON DELETE CASCADE,
    "activo" BOOLEAN DEFAULT TRUE
);
