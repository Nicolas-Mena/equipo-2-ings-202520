
-- ===========================================================
--  SCRIPT DE CREACIÓN DE BASE DE DATOS Y TABLAS
--  Proyecto: Inventario EPS
--  Motor: PostgreSQL
-- ===========================================================

-- Recrear la base de datos (opcional, solo si es local)
-- ⚠️ Si ya existe y tiene datos importantes, comenta estas dos líneas
DROP DATABASE IF EXISTS inventario_eps;
CREATE DATABASE inventario_eps;
\c inventario_eps;

-- ===========================================================
--  TABLA: EPS
-- ===========================================================
DROP TABLE IF EXISTS inventario CASCADE;
DROP TABLE IF EXISTS medicamentos CASCADE;
DROP TABLE IF EXISTS eps CASCADE;

CREATE TABLE eps (
    eps_id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    nit VARCHAR(20) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

-- ===========================================================
--  TABLA: MEDICAMENTOS
-- ===========================================================
CREATE TABLE medicamentos (
    medicamento_id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT
);

-- ===========================================================
--  TABLA: INVENTARIO
-- ===========================================================
CREATE TABLE inventario (
    inventario_id SERIAL PRIMARY KEY,
    eps_id INT NOT NULL,
    medicamento_id INT NOT NULL,
    cantidad_disponible INT DEFAULT 0 CHECK (cantidad_disponible >= 0),
    fecha_actualizacion TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_eps
        FOREIGN KEY (eps_id)
        REFERENCES eps (eps_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT fk_medicamento
        FOREIGN KEY (medicamento_id)
        REFERENCES medicamentos (medicamento_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

-- ===========================================================
--  ÍNDICES
-- ===========================================================
CREATE INDEX IF NOT EXISTS idx_inventario_eps_id ON inventario (eps_id);
CREATE INDEX IF NOT EXISTS idx_inventario_medicamento_id ON inventario (medicamento_id);

-- ===========================================================
--  DATOS INICIALES
-- ===========================================================

-- EPS disponibles
INSERT INTO eps (nombre, nit, email, password) VALUES
('Sura EPS', '800111111', 'contacto@sura.com', 'sura123'),
('Salud Total', '900222222', 'info@saludtotal.com', 'salud123'),
('Nueva EPS', '901333333', 'info@nuevaeps.com', 'nueva123'),
('Coomeva EPS', '890444444', 'contacto@coomeva.com', 'coomeva123'),
('Sanitas EPS', '890555555', 'info@sanitas.com', 'sanitas123'),
('Compensar EPS', '800666666', 'info@compensar.com', 'compensar123');

-- ===========================================================
--  MEDICAMENTOS
-- ===========================================================

INSERT INTO medicamentos (nombre, descripcion) VALUES
-- Analgésicos / Antiinflamatorios
('Acetaminofén', 'Analgésico y antipirético'),
('Ibuprofeno', 'Antiinflamatorio no esteroideo'),
('Naproxeno', 'Antiinflamatorio no esteroideo'),
('Diclofenaco', 'Analgésico y antiinflamatorio'),
('Ácido acetilsalicílico (Aspirina)', 'Analgésico y antiplaquetario'),
('Metamizol sódico (Dipirona)', 'Analgésico y antipirético'),

-- Antibióticos
('Amoxicilina', 'Antibiótico betalactámico'),
('Amoxicilina + ácido clavulánico', 'Antibiótico betalactámico con inhibidor de betalactamasas'),
('Ampicilina', 'Antibiótico betalactámico'),
('Azitromicina', 'Antibiótico macrólido'),
('Claritromicina', 'Antibiótico macrólido'),
('Ciprofloxacino', 'Antibiótico fluoroquinolona'),
('Cefalexina', 'Antibiótico cefalosporina de primera generación'),
('Ceftriaxona', 'Antibiótico cefalosporina de tercera generación'),
('Metronidazol', 'Antibiótico y antiparasitario'),
('Doxiciclina', 'Antibiótico tetraciclina'),
('Sulfametoxazol + trimetoprima', 'Antibacteriano combinado'),
('Clindamicina', 'Antibiótico lincosamida'),
('Gentamicina', 'Antibiótico aminoglucósido'),

-- Antihipertensivos
('Enalapril', 'Inhibidor de la ECA para la hipertensión'),
('Losartán', 'Antagonista del receptor de angiotensina II'),
('Amlodipino', 'Bloqueador de canales de calcio'),
('Atenolol', 'Betabloqueador'),
('Hidroclorotiazida', 'Diurético tiazídico'),
('Furosemida', 'Diurético de asa'),
('Captopril', 'Inhibidor de la ECA'),
('Propranolol', 'Betabloqueador no selectivo'),
('Espironolactona', 'Antagonista de aldosterona'),
('Carvedilol', 'Betabloqueador con acción vasodilatadora'),

-- Antidiabéticos
('Metformina', 'Biguanida utilizada en diabetes tipo 2'),
('Glibenclamida', 'Sulfonilurea hipoglucemiante'),
('Insulina NPH', 'Insulina de acción intermedia'),
('Insulina rápida (regular)', 'Insulina de acción rápida'),

-- Psicofármacos
('Diazepam', 'Ansiolítico benzodiacepínico'),
('Alprazolam', 'Ansiolítico benzodiacepínico'),
('Clonazepam', 'Ansiolítico y anticonvulsivante'),
('Sertralina', 'Antidepresivo ISRS'),
('Fluoxetina', 'Antidepresivo ISRS'),
('Amitriptilina', 'Antidepresivo tricíclico'),
('Carbamazepina', 'Anticonvulsivante'),
('Ácido valproico', 'Anticonvulsivante'),

-- Gastrointestinales
('Omeprazol', 'Inhibidor de la bomba de protones'),
('Ranitidina', 'Antagonista H2 (en desuso)'),
('Loperamida', 'Antidiarreico'),
('Domperidona', 'Antiemético y procinético'),
('Metoclopramida', 'Antiemético'),
('Sales de rehidratación oral', 'Solución oral para deshidratación'),

-- Respiratorios y alérgicos
('Loratadina', 'Antihistamínico'),
('Cetirizina', 'Antihistamínico'),
('Salbutamol', 'Broncodilatador'),
('Bromhexina', 'Mucolítico y expectorante'),
('Budesonida', 'Corticosteroide inhalado'),
('Beclometasona', 'Corticosteroide inhalado'),
('Ipratropio', 'Broncodilatador anticolinérgico'),

-- Antifúngicos y antiparasitarios
('Fluconazol', 'Antifúngico'),
('Nistatina', 'Antifúngico'),
('Albendazol', 'Antiparasitario'),
('Mebendazol', 'Antiparasitario'),
('Ivermectina', 'Antiparasitario'),
('Aciclovir', 'Antiviral contra herpes'),
('Ketoconazol', 'Antifúngico');

-- ===========================================================
--  INICIALIZACIÓN DE INVENTARIO
-- ===========================================================
-- Se asigna cantidad 0 a todos los medicamentos por cada EPS
-- Las EPS pueden actualizar estas cantidades después

INSERT INTO inventario (eps_id, medicamento_id, cantidad_disponible)
SELECT e.eps_id, m.medicamento_id, 0
FROM eps e, medicamentos m;

-- ===========================================================
--  FIN DEL SCRIPT
-- ===========================================================