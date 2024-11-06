const express = require('express');

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/login.html');
});


app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/bienvenido.html');
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});








