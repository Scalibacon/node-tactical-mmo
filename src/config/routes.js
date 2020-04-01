const express = require('express');
const { celebrate, Joi, Segments } = require('celebrate');

const { index } = require('../controllers/pages');

const routes = express.Router();

routes.get('/', index);

module.exports = routes;