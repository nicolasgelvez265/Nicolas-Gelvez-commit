const express = require('express');
const mysql = require('mysql2');  // Requerir mysql2 para la conexión a MySQL
const colors = require('colors');  // Requerir la librería colors
const bodyParser = require('body-parser');  // Para parsear los datos del formulario

const app = express();
const PORT = 3000;

// Configurar EJS como motor de plantillas
app.set('view engine', 'ejs');

// Configurar body-parser para manejar datos POST
app.use(bodyParser.urlencoded({ extended: true }));

// Servir archivos estáticos como CSS, imágenes, JS, etc.
app.use(express.static('public'));

// Configuración de la conexión a la base de datos MySQL
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1116859958',  // Reemplaza con tu contraseña de MySQL
    database: 'jefe'
});

// Verificar la conexión a la base de datos
connection.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos: '.red, err.stack);
        return;
    }
    console.log('Conectado a la base de datos MySQL'.green);
});

// Ruta raíz para mostrar el login (usando EJS)
app.get('/', (req, res) => {
    console.log('Página de inicio de sesión cargada'.yellow);  // Mensaje en amarillo
    res.render('login', { title: 'Iniciar Sesión', message: '¡Bienvenido! Inicia sesión para continuar.' });
});

// Ruta para procesar el login
app.post('/login', (req, res) => {
    const { nombre, cedula } = req.body;  // Extraer los datos del formulario

    // Verificar si la cédula es proporcionada
    if (!cedula) {
        return res.render('login', { 
            title: 'Iniciar Sesión', 
            message: 'Por favor, ingresa tu cédula.'
        });
    }

    // Construir la consulta para buscar el primer o segundo nombre y la cédula
    const nombreQuery = `SELECT * FROM usuarios WHERE 
        (primer_nombre = ? OR segundo_nombre = ?)
        AND cedula = ?`;

    // Los parámetros de la consulta: tomamos el nombre ingresado y la cédula
    const queryParams = [nombre, nombre, cedula];

    connection.query(nombreQuery, queryParams, (err, results) => {
        if (err) {
            console.error('Error al obtener datos de la base de datos: '.red, err);
            res.send('Error al obtener datos');
            return;
        }

        console.log('Datos del usuario obtenidos:', results);

        if (results.length > 0) {
            // Si los datos son correctos, mostrar la página de bienvenida con los datos del usuario
            const user = results[0];  // Tomamos el primer resultado
            console.log('Página de bienvenida cargada'.green);  // Mensaje en verde
            res.render('bienvenido', { 
                title: 'Bienvenido', 
                message: `¡Bienvenido, ${user.primer_nombre}! Has iniciado sesión correctamente.`,
                user: user  // Pasamos los datos del usuario a la vista
            });
        } else {
            // Si no se encuentra el usuario, redirigir al login con un mensaje de error
            console.log('Datos incorrectos'.red);
            res.render('login', { 
                title: 'Iniciar Sesión', 
                message: 'Nombre o cédula incorrectos. Intenta nuevamente.'
            });
        }
    });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`.blue);  // Mensaje en azul
});













