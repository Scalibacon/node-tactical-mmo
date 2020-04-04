const connection = require('../database/connection');

module.exports.listNatures = async function(req, res){
    try {
        console.log('natures')
        const natures = await connection('nature').select('*');
        return res.json(natures);
    } catch(err){
        console.log(err);
        return res.status(400).json({ error: "Erro", message: "Erro ao listar natures" });
    }
}