const express = require('express');
const colors = require('colors');  // Requerir la librería colors

const app = express();
const PORT = 3000;

// Configurar EJS como motor de plantillas
app.set('view engine', 'ejs');

// Servir archivos estáticos como CSS, imágenes, JS, etc.
app.use(express.static('public'));

// Ruta raíz para mostrar el login (usando EJS)
app.get('/', (req, res) => {
    console.log('Página de inicio de sesión cargada'.yellow);  // Mensaje en amarillo
    res.render('login', { title: 'Iniciar Sesión', message: '¡Bienvenido! Inicia sesión para continuar.' });
});

// Ruta para la pantalla de bienvenida
app.get('/login', (req, res) => {
    console.log('Página de bienvenida cargada'.green);  // Mensaje en verde
    res.render('bienvenido', { title: 'Bienvenido', message: '¡Has iniciado sesión correctamente!' });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`.blue);  // Mensaje en azul
});









