const connection = require('../database/connection');
const createBaseStats = require('../utils/createBaseStats');
const Stats = require('../models/Stats');

module.exports.create = async function(id_user, main, name, gender, nature){
    const id = id_user + "0";

    const { hp, energy, strenght, power, defense, resistance,
        speed, technique, luck } = await createBaseStats(nature);

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

module.exports.getUserCharacters = async function(id_user){
    try {
        const chars = await connection('character AS char')
            .select(['char.*', 'job.type', 'job.weight'])
            .innerJoin('job', 'job.name', 'char.job')          
            .where('id_user', id_user)

        for(let i in chars){
            chars[i].effort = await getCharEffort(chars[i].id);
            chars[i].base_stats = await getBaseStats(chars[i].id)
            chars[i].total_stats = Stats.getTotalStats(chars[i]);
        }

        return chars;
    } catch(err){
        console.log(err);
        return false;
    }   
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
        await connection('effort').insert({
            id: char_id
        })
        return true;
    } catch (err){
        console.log(err);
        return false;
    }
}
