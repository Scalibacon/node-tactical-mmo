const CharacterDAO = require('../dao/CharacterDAO');
const NatureDAO = require('../dao/NatureDAO');
const userHaveCharacter = require('../utils/userHaveCharacter');

module.exports.listNatures = async function(req, res){
    const result = await NatureDAO.listNatures();

    if(result.error){
        return res.status(400).json({ error: result.error, message: result.message });
    }

    return res.json(result);    
}

module.exports.createCharacter = async function(req, res){
    const id_user = req.session.identifier;    
    const haveChars = await userHaveCharacter(id_user);

    if(haveChars){
        return res.status(400).json({error: "Erro", message: "Você já possui um personagem"});
    }

    const { name, gender, nature } = req.body;
    const main = true; 

    const result = await CharacterDAO.create(id_user, main, name, gender, nature);
    if(result){
        return res.json({success: true});
    } else {
        return res.status(400).json({error: "Erro", message: "Erro ao criar personagem"});
    }
}

module.exports.getCharacters = async function(req, res){
    const id_user = req.session.identifier;
    const chars = await CharacterDAO.getUserCharacters(id_user);

    if(chars){
        return res.json(chars);
    } else {
        return res.status(400).json({error: "Erro", message: "Erro ao buscar personagens"});
    } 
}