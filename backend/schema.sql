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
