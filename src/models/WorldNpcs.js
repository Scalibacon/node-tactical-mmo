const npcsJSON = require('../constants/npcs.json');

function Npc(id, name, x, y, type, dir, map){
    this.id = id;
    this.name = name;
    this.x = x;
    this.y = y;
    this.type = type;
    this.dir = dir;
    this.map = map;
}

module.exports.loadNpcs = function(mapID){
    let npcs = [];
    const map_npcs = npcsJSON.filter(npc => npc.map === mapID);
    for(let i in map_npcs){
        npc = map_npcs[i];
        npcs.push(new Npc(npc.id, npc.name, npc.x, npc.y, npc.type, npc.dir, npc.map));
    }

    return npcs;
}