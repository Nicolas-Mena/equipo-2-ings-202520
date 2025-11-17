-- ============================================================================
-- PASO 1: RECREAR LA BASE DE DATOS
-- Ejecutar este bloque primero, de forma independiente
-- ============================================================================
DROP DATABASE IF EXISTS inventario_eps;
CREATE DATABASE inventario_eps;
-- ============================================================================
-- PASO 2: CREAR ESTRUCTURA COMPLETA DENTRO DE inventario_eps
-- Conéctate primero a la base inventario_eps antes de ejecutar esto
-- ============================================================================

-- ============================================================================
-- TABLA: eps
-- ============================================================================
CREATE TABLE eps (
    eps_id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    nit VARCHAR(20) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- TABLA: medicamentos
-- ============================================================================
CREATE TABLE medicamentos (
    medicamento_id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) UNIQUE NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- TABLA: medicamentos_eps
-- ============================================================================
CREATE TABLE medicamentos_eps (
    medicamento_eps_id SERIAL PRIMARY KEY,
    eps_id INT NOT NULL,
    medicamento_id INT NOT NULL,
    descripcion TEXT,
    imagen_url TEXT,
    cantidad_disponible INT DEFAULT 0 CHECK (cantidad_disponible >= 0),
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT fk_eps
        FOREIGN KEY (eps_id) REFERENCES eps(eps_id)
        ON DELETE CASCADE,
    
    CONSTRAINT fk_medicamento
        FOREIGN KEY (medicamento_id) REFERENCES medicamentos(medicamento_id)
        ON DELETE CASCADE,
    
    CONSTRAINT unique_eps_medicamento
        UNIQUE (eps_id, medicamento_id)
);

-- ============================================================================
-- TABLA OPCIONAL: usuarios
-- ============================================================================
CREATE TABLE usuarios (
    usuario_id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- VISTA: estadisticas_generales
-- ============================================================================
CREATE OR REPLACE VIEW estadisticas_generales AS
SELECT
    COUNT(DISTINCT e.eps_id) AS total_eps,
    COUNT(DISTINCT m.medicamento_id) AS total_medicamentos,
    ROUND(AVG(me.cantidad_disponible)::numeric, 2) AS disponibilidad_promedio
FROM eps e
LEFT JOIN medicamentos_eps me ON e.eps_id = me.eps_id
LEFT JOIN medicamentos m ON me.medicamento_id = m.medicamento_id;

-- ============================================================================
-- FUNCIÓN Y TRIGGER: actualización automática de fecha
-- ============================================================================
CREATE OR REPLACE FUNCTION update_fecha_actualizacion()
RETURNS TRIGGER AS $$
BEGIN
    NEW.fecha_actualizacion := CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_update_fecha_actualizacion
BEFORE UPDATE ON medicamentos_eps
FOR EACH ROW
EXECUTE FUNCTION update_fecha_actualizacion();

-- ============================================================================
-- FIN
-- ============================================================================
