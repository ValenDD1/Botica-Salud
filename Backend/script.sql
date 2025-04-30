-- tablas para crear 

CREATE TABLE atencion_cliente (
    id BIGINT(20) AUTO_INCREMENT PRIMARY KEY,
    nombre_victima VARCHAR(100) NOT NULL,
    queja VARCHAR(50) NOT NULL,
    detalles TEXT NOT NULL,
    tipo_queja VARCHAR(50) NOT NULL,
    fecha_caso TIMESTAMP NOT NULL DEFAULT current_timestamp(),
    estado TINYINT(1) NOT NULL DEFAULT 0
);

CREATE TABLE usuarios (
    id INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nombre_usuario VARCHAR(50) NOT NULL,
    correo VARCHAR(100) NOT NULL,
    contrasena VARCHAR(255) NOT NULL,
    estado TINYINT(1) NOT NULL DEFAULT 0
);

CREATE TABLE inventarios (
    id BIGINT(20) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nombre_proveedor VARCHAR(20) NOT NULL,
    producto VARCHAR(20) NOT NULL,
    stock INT(20) NOT NULL,
    precio_compra DECIMAL(10,2) NOT NULL,
    precio_venta DECIMAL(10,2) NOT NULL,
    fecha TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    marca VARCHAR(30) NOT NULL
);

CREATE TABLE ventas (
    id BIGINT(20) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nombre_cliente VARCHAR(50) NOT NULL,
    dni VARCHAR(20) ,
    productos LONGTEXT NOT NULL,
    cantidad INT(11) NOT NULL,
    total DECIMAL(10,2) NOT NULL
);