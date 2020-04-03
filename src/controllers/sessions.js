const md5 = require('md5');
const connection = require('../database/connection');

module.exports.login = async function(req, res){
    console.log(req.body)
    const { username, password } = req.body;

    try {
        const id = await connection('user')
            .select('id')
            .where({
                username,
                password: md5(password)
            })
            .first();

        if(!id){
            return res.json({ error: "Bad Request", message: "Usuário e/ou senha incorreto" });
        }

        req.session.id = id;
        req.session.username = username;
        req.session.password = password; /* talvez seja melhor tirar */

        return res.json(id);
    } catch (err){
        console.log(err);
        return res.status(500).json({ error: "Erro", message: "Erro ao logar" });
    }
}

module.exports.autenticate = async function(req, res){
    const { id, username, password } = req.session;

    try {
        const user = await connection('user')
        .select('*')
        .where({
            id,
            username,
            password: md5(password)
        })
        .first();

        if(!user){
            /* ou retorn false */
            return res.status(401).json({ error: "Unauthorized", message: "Acesso negado" });
        }

        /* ou retorna true */
        return res.json({ user })

    } catch(err){
        console.log(err);
        return res.status(500).json({ error: "Erro", message: "Erro ao autenticar" });
    }
}