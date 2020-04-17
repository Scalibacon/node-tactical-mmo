const npcsJSON = require('../constants/npcs.json');
const wordsJSON = require('../constants/npcs-words.json');
const { updateProgress } = require('../dao/UserDAO');
const { giveItemToUser } = require('../dao/ItemDAO');

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

module.exports.processCharDialog = async function(char, npcID, progress, resp){
    const reaction = reactions[npcID];
    if(reaction){
        return await reaction(char, progress, resp);
    }
}

const reactions = {
    ["02"] : async function(char, progress, resp){
        if(progress == 0 && resp === "yes"){
            await progressUp(char, 1, 0);
        } else 
        if(progress == 2){            
            await progressUp(char, 3, 2);
            giveItemToUser(char.user_id, 2, 3);
            return "Você recebeu Poção de bolso vermelha x3"
        }
    },
    ["01"] : async function(char, progress, resp){
        if(progress == 1){
            await progressUp(char, 2, 1);
        }
    }
}

async function progressUp(char, after, before){
    if(!isNaN(before)){
        delete char.progress[before];
    } 
    char.progress[after] = true;
    
    await updateProgress(char.user_id, char.progress);
}