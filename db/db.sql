CREATE DATABASE IF NOT EXISTS crud;   -- Crear la base de datos si no existe
USE crud;

CREATE TABLE IF NOT EXISTS personas (
	id_persona INT AUTO_INCREMENT PRIMARY KEY,      -- Identificador único autoincremental
    nombre VARCHAR(100),							-- Cadena para el nombre
    apellido VARCHAR(100),							-- Cadena para el apellido
    tipo_identificacion VARCHAR(50),				-- Tipo de documento: CC, TI, CE, etc.
    nuip INT,										-- Número único de identificación (ej: cédula)
    email VARCHAR(100),								-- Correo electrónico del usuario
    clave VARCHAR(500),								-- Contraseña encriptada
    salario DECIMAL(10,2),							-- Valor numérico decimal para salario
    activo BOOLEAN DEFAULT TRUE,					-- Valor booleano: 1 (activo), 0 (inactivo)
    fecha_registro DATE DEFAULT (CURRENT_DATE),		-- Fecha en la que se registra a la persona
    imagen LONGBLOB									-- Imagen en binario (para subir una foto)
);

CREATE TABLE mascotas (
    id_mascota INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL, -- máximo 50 caracteres
    especie ENUM('Perro', 'Gato', 'Ave', 'Pez', 'Reptil', 'Otro') NOT NULL,
    raza VARCHAR(50) DEFAULT 'Desconocida', -- opcional pero con valor por defecto
    edad INT UNSIGNED NOT NULL CHECK (edad BETWEEN 0 AND 30), -- edad entre 0 y 30 años
    peso DECIMAL(4,2) NOT NULL CHECK (peso BETWEEN 0.10 AND 100.00), -- peso entre 0.10kg y 100.00kg
    sexo ENUM('Macho', 'Hembra') NOT NULL,
    color VARCHAR(30) NOT NULL,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    imagen LONGBLOB
);

CREATE TABLE carros (
    id_carro INT AUTO_INCREMENT PRIMARY KEY,
    marca VARCHAR(100) NOT NULL,
    modelo VARCHAR(100) NOT NULL,
    año INT NOT NULL,
    precio DECIMAL(10, 2) NOT NULL,
	fecha_registro DATE DEFAULT (CURRENT_DATE),
    imagen LONGBLOB
);

CREATE TABLE juguetes (
    id_juguete INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10,2) NOT NULL,
    stock INT DEFAULT 0,
    marca VARCHAR(100),
    edad_recomendada VARCHAR(50),
    categoria VARCHAR(100),
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

SELECT * FROM crud.personas;  -- Ver los registros actuales de la tabla personas

SELECT * FROM crud.mascotas;  -- Ver los registros actuales de la tabla mascotas

SELECT * FROM crud.carros;  -- Ver los registros actuales de la tabla carros

SELECT * FROM crud.juguetes;  -- Ver los registros actuales de la tabla juguetes

INSERT INTO personas (nombre, apellido, tipo_identificacion, nuip, email, clave, salario, activo, imagen)
VALUES ('Juan', 'Pérez', 'CC', 123456789, 'juan.perez@email.com', 'contraseña_encriptada_aqui', 2500.00, TRUE, NULL);

INSERT INTO mascotas (nombre, especie, raza, edad, peso, sexo, color, imagen)
VALUES ('Rex', 'Perro', 'Pastor Alemán', 5, 30.50, 'Macho', 'Negro', NULL);

INSERT INTO carros (marca, modelo, año, precio, imagen)
VALUES ('Toyota', 'Corolla', 2020, 20000.00, NULL);

INSERT INTO juguetes (nombre, descripcion, precio, stock, marca, edad_recomendada, categoria)
VALUES ('Camión de Bomberos', 'Camión de bomberos de juguete con luces y sonidos.', 499.99,20, 'PlayWorld', '3-7 años', 'Vehículos');