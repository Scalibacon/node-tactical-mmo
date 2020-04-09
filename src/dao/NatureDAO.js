const connection = require('../database/connection');
const natures = require('../constants/natures.json');

module.exports.listNatures = async function(){
    if(!natures){
        console.log('NatureDAO falhou ao listar natures');
        return { error: "Erro", message: "Erro ao listar natures" };        
    }
    return natures; 
}

module.exports.getNature = async function(name){
    const [nature] = natures.filter(nat => nat.name === name);

    if(!nature){
        console.log('NatureDAO falhou ao buscar nature');
        return { error: "Erro", message: "Erro ao buscar nature" };
    }
    return nature;    
}

module.exports.createBaseStats = function(name){
    const [nature] = natures.filter(nat => nat.name === name);    

    if(!nature){
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

