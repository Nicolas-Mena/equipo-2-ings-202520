Jose
josemj__
En canal de voz

juje — 13/11/2024 13:42
Tipo de archivo adjunto: archive
pelu es marica.zip
13.76 MB
juje — 01/03/2025 21:24
https://discord.gg/2eFtE2hN
juje — 10/10/2025 19:20
https://www.youtube.com/watch?v=4_MMY2yiOWY
YouTube
Programando con estilo
Cómo instalar postgreSQL en Windows 11 - 10
Imagen
Jose — 20:30

-- ===========================================================
--  SCRIPT DE CREACIÓN DE BASE DE DATOS Y TABLAS
--  Proyecto: Inventario EPS
--  Motor: PostgreSQL
-- ===========================================================
Expandir
script.txt
7 KB
juje — 20:41
-- ===========================================================
--  SCRIPT DE CREACION DE BASE DE DATOS Y TABLAS
--  Proyecto: Inventario EPS
--  Motor: PostgreSQL
-- ===========================================================
Expandir
message.txt
7 KB
Jose — 20:55
UPDATE inventario
    SET cantidad_disponible = $1, fecha_actualizacion = CURRENT_TIMESTAMP
    WHERE eps_id = $2 AND medicamento_id = $3
    RETURNING *;
juje — 21:48
cuidado que me tilteo
Jose — 21:48
estaba rajando
de que el profe era bien
juje — 21:48
uy pa
Jose — 21:49
jasjajajajjajaja
juje — 21:49
gas
Jose — 21:49
ese mk si no guevon
juje — 21:50
negrata de mierda
juje — 22:19
????
PARCE
estas viendo eso gvon
Jose — 22:19
estamos llevados
juje — 22:19
nea
eso es un proyecto completo
deciselo vos
porfavor
Jose — 22:19
si
ya me encargo
???
juje — 22:24
parce
Jose — 22:25
papi
estamos jodidios
juje — 22:25
el cree que es pasarle una base de datos
Jose — 22:25
JAJAJAJAJAJJ
juje — 22:25
parce decile la verdad
Jose — 22:25
mano
AJAJJAJAJAJAJAJAJJAJAJAJ
que silencio más duro
juje — 22:28
parce eso era lo que habia que decile
Jose — 22:31
nice
juje — 22:34
no le gusto
﻿
juje
peludito98
 
 
 
Chocobo
-- ===========================================================
--  SCRIPT DE CREACION DE BASE DE DATOS Y TABLAS
--  Proyecto: Inventario EPS
--  Motor: PostgreSQL
-- ===========================================================

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

CREATE INDEX IF NOT EXISTS idx_inventario_eps_id ON inventario (eps_id);
CREATE INDEX IF NOT EXISTS idx_inventario_medicamento_id ON inventario (medicamento_id);

-- ===========================================================
--  DATOS INICIALES
-- ===========================================================

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
('Acetaminofen', 'Analgesico y antipiretico'),
('Ibuprofeno', 'Antiinflamatorio no esteroideo'),
('Naproxeno', 'Antiinflamatorio no esteroideo'),
('Diclofenaco', 'Analgesico y antiinflamatorio'),
('Acido acetilsalicilico (Aspirina)', 'Analgesico y antiplaquetario'),
('Metamizol sodico (Dipirona)', 'Analgesico y antipiretico'),

('Amoxicilina', 'Antibiotico betalactamico'),
('Amoxicilina + acido clavulanico', 'Antibiotico betalactamico con inhibidor de betalactamasas'),
('Ampicilina', 'Antibiotico betalactamico'),
('Azitromicina', 'Antibiotico macrolido'),
('Claritromicina', 'Antibiotico macrolido'),
('Ciprofloxacino', 'Antibiotico fluoroquinolona'),
('Cefalexina', 'Antibiotico cefalosporina de primera generacion'),
('Ceftriaxona', 'Antibiotico cefalosporina de tercera generacion'),
('Metronidazol', 'Antibiotico y antiparasitario'),
('Doxiciclina', 'Antibiotico tetraciclina'),
('Sulfametoxazol + trimetoprima', 'Antibacteriano combinado'),
('Clindamicina', 'Antibiotico lincosamida'),
('Gentamicina', 'Antibiotico aminoglucosido'),

('Enalapril', 'Inhibidor de la ECA para la hipertension'),
('Losartan', 'Antagonista del receptor de angiotensina II'),
('Amlodipino', 'Bloqueador de canales de calcio'),
('Atenolol', 'Betabloqueador'),
('Hidroclorotiazida', 'Diuretico tiazidico'),
('Furosemida', 'Diuretico de asa'),
('Captopril', 'Inhibidor de la ECA'),
('Propranolol', 'Betabloqueador no selectivo'),
('Espironolactona', 'Antagonista de aldosterona'),
('Carvedilol', 'Betabloqueador con accion vasodilatadora'),

('Metformina', 'Biguanida utilizada en diabetes tipo 2'),
('Glibenclamida', 'Sulfonilurea hipoglucemiante'),
('Insulina NPH', 'Insulina de accion intermedia'),
('Insulina rapida (regular)', 'Insulina de accion rapida'),

('Diazepam', 'Ansiolitico benzodiacepinico'),
('Alprazolam', 'Ansiolitico benzodiacepinico'),
('Clonazepam', 'Ansiolitico y anticonvulsivante'),
('Sertralina', 'Antidepresivo ISRS'),
('Fluoxetina', 'Antidepresivo ISRS'),
('Amitriptilina', 'Antidepresivo triciclico'),
('Carbamazepina', 'Anticonvulsivante'),
('Acido valproico', 'Anticonvulsivante'),

('Omeprazol', 'Inhibidor de la bomba de protones'),
('Ranitidina', 'Antagonista H2 (en desuso)'),
('Loperamida', 'Antidiarreico'),
('Domperidona', 'Antiemetico y procinetico'),
('Metoclopramida', 'Antiemetico'),
('Sales de rehidratacion oral', 'Solucion oral para deshidratacion'),

('Loratadina', 'Antihistaminico'),
('Cetirizina', 'Antihistaminico'),
('Salbutamol', 'Broncodilatador'),
('Bromhexina', 'Mucolitico y expectorante'),
('Budesonida', 'Corticosteroide inhalado'),
('Beclometasona', 'Corticosteroide inhalado'),
('Ipratropio', 'Broncodilatador anticolinergico'),

('Fluconazol', 'Antifungico'),
('Nistatina', 'Antifungico'),
('Albendazol', 'Antiparasitario'),
('Mebendazol', 'Antiparasitario'),
('Ivermectina', 'Antiparasitario'),
('Aciclovir', 'Antiviral contra herpes'),
('Ketoconazol', 'Antifungico');

-- ===========================================================
--  INICIALIZACION DE INVENTARIO
-- ===========================================================

INSERT INTO inventario (eps_id, medicamento_id, cantidad_disponible)
SELECT e.eps_id, m.medicamento_id, 0
FROM eps e, medicamentos m;

-- ===========================================================
--  FIN DEL SCRIPT
-- ===========================================================