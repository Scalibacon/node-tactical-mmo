const express = require('express');
const { celebrate, Joi, Segments } = require('celebrate');

const { index, home, mainCharacter, game } = require('../controllers/pages');
const { login, logout } = require('../controllers/sessions');
const { create, list, profile, getPosition } = require('../controllers/users');
const { listNatures, createCharacter, getCharacters } = require('../controllers/characters');

const routes = express.Router();

/* RENDER */
routes.get('/', index);
routes.get('/home', home);
routes.get('/main-character', mainCharacter);
routes.get('/game', game);

/* API */
routes.post('/sessions', celebrate({
    [Segments.BODY] : Joi.object().keys({
        username: Joi.string().required(),
        password: Joi.string().required()
    })
}), login);

routes.delete('/sessions', logout);

routes.post('/users', celebrate({
    [Segments.BODY] : Joi.object().keys({
        username: Joi.string().required(),
        email: Joi.string().required().email(),
        password: Joi.string().required().min(5)
    })
}), create);

routes.get('/users', list);
routes.get('/profile', profile);
routes.get('/natures', listNatures);
routes.get('/characters', getCharacters);

routes.post('/create-character', celebrate({
    [Segments.BODY] : Joi.object().keys({
        name: Joi.string().required(),
        gender: Joi.string().required(),
        nature: Joi.string().required()
    })
}), createCharacter);

module.exports = routes;