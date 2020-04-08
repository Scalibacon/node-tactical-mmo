const UserDAO = require('../dao/UserDAO');

module.exports.create = async function(req, res){
    const { username, password, email } = req.body;

    const result = UserDAO.createUser(username, password, email);

    if(result.error){
        return res.status(400).json({ error: result.error, message: result.message });
    }

    return res.json({ success: true, message: "Usuário criado com sucesso"});
}

module.exports.list = async function(req, res){
    const result = await UserDAO.listUsers();
    
    if(result.error){
        return res.status(400).json({ error: result.error, message: result.message });
    }

    return res.json(result);    
}

module.exports.profile = async function(req, res){
    const id = req.session.identifier;
    const result = await UserDAO.getUserProfile(id);

    if(result.error){
        return res.status(400).json({ error: result.error, message: result.message });
    }

    return res.json(result);
}