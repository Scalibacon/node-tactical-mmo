const connection = require('../database/connection');

module.exports = async function(id_user){
    const char = await connection('character').where('id_user', id_user).select('*').first();

    if(char){
        return true;
    } else {
        return false;
    }
}