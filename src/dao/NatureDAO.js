const connection = require('../database/connection');

module.exports.listNatures = async function(){
    try {
        const natures = await connection('nature').select('*');
        return natures;
    } catch(err){
        console.log(err);
        return { error: "Erro", message: "Erro ao listar natures" };
    }
}

module.exports.getNature = async function(name){
    try {
        const nature = await connection('nature')
            .select('*')   
            .where('name', name)
            .first();

        return nature;
    } catch(err){
        console.log(err);
        return { error: "Erro", message: "Erro ao buscar nature" };
    }


}

