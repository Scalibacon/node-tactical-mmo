const NatureDAO = require('../dao/NatureDAO');

module.exports = async function(nature_name){
    const nature = await NatureDAO.getNature(nature_name);

    if(nature.error){
        return false;
    }

    return {
        hp: Math.round( 8 * (nature.hp * 0.01 + 1) ),
        energy: Math.round( 8 * (nature.energy * 0.01 + 1) ),
        strenght: Math.round( 3 * (nature.strenght * 0.01 + 1) ),
        power: Math.round( 3 * (nature.power * 0.01 + 1) ),
        defense: Math.round( 3 * (nature.defense * 0.01 + 1) ),
        resistance: Math.round( 3 * (nature.resistance * 0.01 + 1) ),
        speed: Math.round( 3 * (nature.speed * 0.01 + 1) ),
        technique: Math.round( 3 * (nature.technique * 0.01 + 1) ),
        luck: 1,
    }   
}