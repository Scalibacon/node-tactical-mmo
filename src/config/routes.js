const express = require('express');
const { celebrate, Joi, Segments } = require('celebrate');

const { index } = require('../controllers/pages');
const { login } = require('../controllers/sessions');
const { create, list } = require('../controllers/users');

const routes = express.Router();

/* RENDER */
routes.get('/', index);

/* API */
routes.post('/sessions', celebrate({
    [Segments.BODY] : Joi.object().keys({
        username: Joi.string().required(),
        password: Joi.string().required()
    })
}), login);

routes.post('/users', celebrate({
    [Segments.BODY] : Joi.object().keys({
        username: Joi.string().required(),
        email: Joi.string().required().email(),
        password: Joi.string().required().min(5)
    })
}), create);

routes.get('/users', list);

module.exports = routes;