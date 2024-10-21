CREATE TABLE IF NOT EXISTS donaciones (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100),
    email VARCHAR(100),
    dni VARCHAR(10),
    causa VARCHAR(200),
    tipo VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS recibirdonacion (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100),
    email VARCHAR(100),
    dni VARCHAR(10),
    causa VARCHAR(200),
    tipo VARCHAR(50)
);



