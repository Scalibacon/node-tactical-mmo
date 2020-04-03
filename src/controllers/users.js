const md5 = require('md5');
const connection = require('../database/connection');
const generateID = require('../utils/generateID');

module.exports.create = async function(req, res){
    const { username, password, email } = req.body;
    
    const user = await connection('user').where('username', username).select('id').first();

    if(user){
        return res.status(409).json({ error: "Conflict", message: "Usuário já cadastrado" });
    }

    try {
        const id = generateID();

        await connection('user').insert({
            id,
            username,
            email,
            password : md5(password)
        });

        res.json({success: true, message: 'Usuário criado com sucesso'});

    } catch (err){
        console.log(err);
        return res.status(500).json({ error: "Erro", message: "Erro ao criar usuário" });
    }
}

module.exports.list = async function(req, res){
    try {
        const users = await connection('user').select('*');

        return res.json(users);
    } catch(err){
        console.log(err);
        return res.status(500).json({ error: "Erro", message: "Erro ao listar usuários" });
    }
}