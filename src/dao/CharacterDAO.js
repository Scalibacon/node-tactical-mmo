const connection = require('../database/connection');
const { getTotalStats } = require('../utils/stats');
const jobs = require('../constants/jobs.json');
const NatureDAO = require('../dao/NatureDAO');

module.exports.create = async function(id_user, main, name, gender, nature){
    const id = id_user + "0";

    const { hp, energy, strenght, power, defense, resistance,
        speed, technique, luck } = NatureDAO.createBaseStats(nature);

    try {
        await createCharEffort(id);

        await connection('base_stats').insert({ id, hp, energy, strenght, 
            power, defense, resistance, speed, technique, luck
        });

        await connection('character').insert({
            id, id_user, main, name, gender, base_stats: id, effort: id, nature
        });

        return true;
    } catch(err){
        console.log(err);
        return false;
    }
}

module.exports.getUserCharacters = async function(id_user, active){
    try {
        let chars;
        if(active === true || active === false){
            chars = await connection('character')
                .select('*')
                .where({
                    id_user: id_user,
                    active: active            
                });
        } else {
            chars = await connection('character').select('*').where('id_user', id_user);
        }
        await loadCharsInfo(chars); 
        return chars;
    } catch(err){
        console.log(err);
        return false;
    }   
}

async function loadCharsInfo(chars){
    for(let i in chars){
        chars[i] = getCharJob(chars[i]);
        chars[i].effort = await getCharEffort(chars[i].id);
        chars[i].base_stats = await getBaseStats(chars[i].id)
        chars[i].total_stats = getTotalStats(chars[i]);
    }
    return chars;
}

function getCharJob(char){
    const [job] = jobs.filter(job => job.name === char.job);

    if(!job){
        return char;
    }

    char.weight = job.weight;
    char.type = job.type;

    return char;
}

async function getBaseStats(char_id){
    try {
        const base_stats = await connection('base_stats')
            .select('*')   
            .where('id', char_id)
            .first();

        return base_stats;
    } catch(err){
        console.log(err);
        return false;
    }
};

async function getCharEffort(char_id){
    try {
        const effort = await connection('effort')
            .select('*')
            .where('id', char_id)
            .first();

        return effort;            
    } catch (err){
        console.log(err);
        return false;
    }
}

async function createCharEffort(char_id){
    try {
        await connection('effort').insert({ id: char_id });
        return true;
    } catch (err){
        console.log(err);
        return false;
    }
}