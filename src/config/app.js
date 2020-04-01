const express = require('express');
const { errors } = require('celebrate');
const routes = require('./routes');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'src/views');

app.use(express.static('src/public'));

app.use(express.json());
app.use(routes);
app.use(errors());

module.exports = app;