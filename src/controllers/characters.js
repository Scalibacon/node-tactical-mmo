const connection = require('../database/connection');
const userHaveCharacter = require('../utils/userHaveCharacter');

module.exports.listNatures = async function(req, res){
    try {
        const natures = await connection('nature').select('*');
        return res.json(natures);
    } catch(err){
        console.log(err);
        return res.status(400).json({ error: "Erro", message: "Erro ao listar natures" });
    }
}

module.exports.createCharacter = async function(req, res){
    const id_user = req.session.identifier;    
    
    if(await userHaveCharacter(id_user)){
        return res.status(400).json({error: "Erro", message: "Você já possui um personagem"});
    }

    const id = id_user + "0";
    const { name, gender, nature } = req.body;   
    const effort = id;
    const main = true;

    const { max_hp, max_energy, strenght, power, defense, resistance,
            speed, technique, luck } = await getBaseStats(nature);

    try {
        await connection('character').insert({
            id, id_user, main, name, gender, max_hp, max_energy, strenght, power,
            defense, resistance, speed, technique, luck, effort, nature
        });
        return res.json({ id });
    } catch(err){
        console.log(err);
       return res.status(400).json({error: "Erro", message: "Erro ao criar personagem"});
    }
}

async function getBaseStats(nature_name){
    const connection = require('../database/connection');

    try {
        const nature = await connection('nature')
            .select('*')   
            .where('name', nature_name)
            .first();

        return {
            max_hp: Math.round( 10 * (nature.hp * 0.01 + 1) ),
            max_energy: Math.round( 10 * (nature.hp * 0.01 + 1) ),
            strenght: Math.round( 5 * (nature.strenght * 0.01 + 1) ),
            power: Math.round( 5 * (nature.power * 0.01 + 1) ),
            defense: Math.round( 5 * (nature.defense * 0.01 + 1) ),
            resistance: Math.round( 5 * (nature.resistance * 0.01 + 1) ),
            speed: Math.round( 5 * (nature.speed * 0.01 + 1) ),
            technique: Math.round( 5 * (nature.technique * 0.01 + 1) ),
            luck: 1,
        }
    } catch(err){
        console.log(err);
        return false;
    }
}