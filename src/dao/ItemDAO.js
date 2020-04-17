const connection = require('../database/connection');
const itemsJSON = require('../constants/items.json');

module.exports.getUserItens = async function(userID){
    try {
        let items = await connection('user_item AS ui')
                        .select(['ui.id_item AS id', 'i.name', 'ui.quantity'])
                        .innerJoin('item AS i', 'ui.id_item', 'i.id')
                        .where('id_user', userID)
                        .orderBy('name');
        items = getItemsInfo(items);
        return items;       
    } catch(err){
        console.log(err);
        return false;
    }
}

module.exports.giveItemToUser = async function(userID, itemID, qty = 1){
    try {
        const own = await connection('user_item').select('*')
            .where({id_user: userID,id_item: itemID}).first();

        if(!own){
            await connection('user_item').insert({id_user: userID, id_item: itemID, quantity: qty});
        } else {
            await connection('user_item').where({id_user: userID, id_item: itemID}).increment('quantity', qty);
        }

        return true;        
    } catch(err){
        console.log(err);
        return false;
    }
}

function getItemsInfo(items){
    for(let i in items){
        let item = items[i];
        const [itemJSON] = itemsJSON.filter(it => it.id == item.id);
        item.name = itemJSON.name;
        item.type = itemJSON.type;
        item.description = itemJSON.description;
        item.damage = itemJSON.damage;
        item.atk_bonus = itemJSON.atk_bonus;
    }

    return items;
}