# 📚 Sistema de Gestión de Libros Full Stack (CRUD Tarea 08)

Este proyecto implica una Gestión de Libros utilizando una arquitectura backend con Node.js/Express y MySQL para la BD. Está diseñado para ser la base de una aplicación Full Stack que maneja operaciones CRUD completas sobre la tabla libros.

## ⚙️ Procedimientos de Configuración
Sigue estos pasos para poner en marcha el proyecto:

### 1. 👝 Clonar Repositorio
Abre tu terminal y descarga el proyecto:
```
git clone (https://github.com/sandro060606/Tarea-08-Backend-CRUD.git)
```

### 2. ⛏️ Configuración de la Base de Datos (MySQL)
Debes crear la base de datos y la tabla principal (libros). Ejecuta las siguientes consultas en tu gestor de MySQL:
```sql
CREATE DATABASE bibliotecadb;

USE bibliotecadb;

CREATE TABLE libros(
id 		INT AUTO_INCREMENT PRIMARY KEY,
titulo		VARCHAR(100) NOT NULL,
autor		VARCHAR(100) NOT NULL,
isbn		VARCHAR(17) NOT NULL, -- CODIGO UNICO PARA LIBROS
stock		INT NOT NULL
)ENGINE=INNODB;

INSERT INTO libros (titulo, autor, isbn, stock) VALUES
('Cien años de soledad', 'Gabriel García Márquez', '978-84-376-0494-7', 8),
('1984', 'George Orwell', '978-84-9989-094-0', 12),
('Don Quijote de la Mancha', 'Miguel de Cervantes', '978-84-670-6395-9', 5),
('Rayuela', 'Julio Cortázar', '978-84-663-3825-9', 9),
('Orgullo y Prejuicio', 'Jane Austen', '978-84-18456-42-0', 15);

SELECT * FROM libros;
```
### 3. 🔑 Crear y Configurar el Archivo .env
Este archivo contiene las credenciales de la base de datos y la configuración del servidor. Crea un archivo llamado .env en la raíz del proyecto y rellena los valores:

```
DB_HOST=localhost
DB_USER=[RELLENAR: Usuario de MySQL, ej: root]
DB_PASSWORD=[RELLENAR: Contraseña de MySQL o Si no tienes deja sin rellenar]
DB_DATABASE=[RELLENAR: El nombre de tu BD, ej: bibliotecadb]
DB_PORT=3306
```

### 4. 📋 Instalar Dependencias
Abre la terminal en la carpeta de tu proyecto y ejecuta el siguiente comando para instalar las librerías de Node.js (Express, mysql2, dotenv, etc.):

```
npm install
```

### 5. ▶️ Ejecutar el Servidor
Inicia el servidor Node.js con nodemon:

```
nodemon server
```

### 6. 🌐 Acceder a la Interfaz
Dado que este proyecto es solo el Backend (API REST). Para interactuar con los datos, utiliza herramientas como Postman o Thunder Client (en VS Code).

```
API Base URL: http://localhost:3000/api/libros
```
## 🧪 Endpoints de la API
La aplicación expone una API RESTful completa para la gestión de la tabla libros bajo el prefijo /api/libros.

### 1. Gestión de Libros (CRUD Completo)

```
🔍 Listar Libros
Método: GET
Descripción: Recupera todos los registros de libros

🔍 Obtener Libro por ID
Método: GET
Descripción: Recupera los detalles de un libro específico usando su ID.

➕ Registrar Libr (POST)
Método: POST
Descripción: Crea un nuevo registro de libro. Requiere JSON con titulo, autor, isbn, y stock.

✏️ Actualizar Libro Existente
Método: PUT
Descripción: Modifica los datos de un libro específico por su ID. Permite la actualización parcial de campos.

🗑️ Eliminar Libro
Método: PUT
Descripción: Elimina permanentemente el registro de un libro por su ID.
```