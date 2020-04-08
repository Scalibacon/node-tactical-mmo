const md5 = require('md5');
const connection = require('../database/connection');
const generateID = require('../utils/generateID');

module.exports.createUser = async function(username, password, email){
    const user = await connection('user').where('username', username).select('id').first();

    if(user){
        return { error: "Conflict", message: "Usuário já cadastrado" };
    }

    try {
        const id = generateID();

        await connection('user').insert({
            id,
            username,
            email,
            password : md5(password)
        });

        return true;
    } catch (err){
        console.log(err);
        return false
    }
}

module.exports.listUsers = async function(){
    try {
        const users = await connection('user').select('*');
        return users;
    } catch(err){
        console.log(err);
        return { error: "Erro", message: "Erro ao listar usuários" };
    }
}

module.exports.getUserProfile = async function(id){
    try {
        const profile = await connection('user').select('*').where('id', id).first();

        return profile;
    } catch(err){
        console.log(err);
        return { error: "Erro", message: "Erro ao buscar perfil" };
    }
}

module.exports.getGamingUser = async function(id){
    try {
        const result = await connection('user AS U')
            .select(["u.id", "u.username", "u.map", "u.x", "u.y", "c.name", "c.gender", "c.job"])
            .innerJoin("character AS c", "u.id", "c.id_user")
            .where({"u.id": id, "c.main": true})
            .first();
        return result;
    } catch (err){
        console.log(err);
        return {error: "Error", message: "Posição não encontrada"};
    }
}