import express from 'express';
import router from './routes/index.js';
import db from './config/db.js';
// const express = require('express');

const app = express();

//connect DB
db.authenticate()
    .then(()=> console.log('Base de datos conectada'))
    .catch(error => console.log(error));

//Habilitar Pug
app.set('view engine', 'pug');

app.use((req, res, next)=>{
    const year = new Date();

    res.locals.actualYear = year.getFullYear();

    res.locals.nombreSitio = 'Agencia de Viajes'
    next();
});

// Agregar body parse para leer los datos del formulario

app.use(express.urlencoded({extended: true}))

// Definir la carpeta public
app.use(express.static('public'));

app.use('/viajes', express.static('public'));

//Agregar router
app.use('/', router)

// Definir el puerto
const port = process.env.PORT || 4000; 


app.listen(port, ()=>{
    console.log(`El servidor esta funcionando en el puerto ${port}`);
})