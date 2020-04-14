const npcsJSON = require('../constants/npcs.json');
const wordsJSON = require('../constants/npcs-words.json');

function Npc(id, name, x, y, type, dir, map){
    this.id = id;
    this.name = name;
    this.x = x;
    this.y = y;
    this.type = type;
    this.dir = dir;
    this.map = map;
}

Npc.prototype.talk = function(char){
    const npcWords = getNpcWords(this.id);
    if(!npcWords){
        return false;
    }

    for(let i in npcWords.progress){
        if(char.progress[i]){
            return {type: "Talk", dialog: npcWords.progress[i], i, progress: i, npc: this.id}
        }
    }
    
    return {type: "Talk", dialog: npcWords.progress['default'], progress: 'default', npc: this.id}
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

function getNpcWords(id){
    for(let i in wordsJSON){
        const word = wordsJSON[i];
        if(word.id === id){
            return word;            
        }
    }
    return false;
}

module.exports.processCharDialog = function(char, npcID, progress){
    console.log(`${char.name} respondeu sim para o NPC ${npcID} no progresso ${progress}`);
}