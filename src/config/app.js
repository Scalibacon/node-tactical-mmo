const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const routes = require('./routes');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'src/views');

app.use(session({
    secret: 'taticmmo',
    resave: false,
    saveUninitialized: false
}))

app.use(express.static('src/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
app.use(routes);
app.use(errors());

module.exports = app;