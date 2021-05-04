const express = require('express');
const morgan = require('morgan'); 
//'morgan' es para registrar o ver por consola peticiones que estan llegando desde el navegador o app clientes
const path = require('path');
require("dotenv");

const { mongoose } = require('./database');

const app = express();

//Settings
app.set('port', process.env.PORT || 4000);

// Middlewares estos son para funciones 
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/api/tasks',require('./routes/task.routes'));

// Static files
console.log(path.join(__dirname, 'public'));
app.use(express.static(path.join(__dirname, 'public')));

// Stating the server
app.listen(app.get('port'), () =>{
    console.log(`Server on port ${app.get('port')}`);
});
