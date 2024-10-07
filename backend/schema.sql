CREATE TABLE IF NOT EXISTS donaciones (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100),
    email VARCHAR(100),
    dni VARCHAR(10),
    causa VARCHAR(200),
    tipo VARCHAR(50)
);

-- MODIFICAR ESTO PARA HACERLO COMO LLEGARIA DESDE EL FRONT
INSERT INTO donaciones (nombre, email, dni, causa, tipo) VALUES
('Ana Pérez', 'ana.perez@gmail.com', '12345678', 'Apoyo a la educación infantil', 'Monetaria');

CREATE TABLE IF NOT EXISTS recibir-donacion (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(255),
    email VARCHAR(255),
    dni VARCHAR(20),
    causa TEXT,
    tipo_donacion VARCHAR(50),
    otro_tipo_donacion VARCHAR(255),
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

