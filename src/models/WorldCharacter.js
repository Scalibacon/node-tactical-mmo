function WorldCharacter(game_user){
    this.id = game_user.id;
    this.username = game_user.username;
    this.map = parseInt(game_user.map);
    this.x = parseInt(game_user.x);
    this.y = parseInt(game_user.y);
    this.name = game_user.name;
    this.gender = game_user.gender;
    this.job = game_user.job;
    this.dir = 'down';
    this.state = 'idle';
}

WorldCharacter.prototype.move = function(dir, layout){  
    if(this.state !== 'idle'){
        return false;
    }

    const action = actions[dir];
    if(action){
        return action(this, layout);
    } 

    return false;
}

const actions = {
    up: function(char, layout){
        //validar no layout
        char.state = 'walking';
        char.y--;
        restoreCharState(char);

        return true;
    },

    down: function(char, layout){
        //validar no layout
        char.state = 'walking';
        char.y++;
        restoreCharState(char);

        return true;
    },

    right: function(char, layout){
        //validar no layout
        char.state = 'walking';
        char.x++;
        restoreCharState(char);

        return true;
    },

    left: function(char, layout){
        //validar no layout
        char.state = 'walking';
        char.x--;
        restoreCharState(char);

        return true;
    }
}

function restoreCharState(char){
    setTimeout(() => {
        char.state = 'idle';
    },300);
}

module.exports.create = function(game_user){
    return new WorldCharacter(game_user);
}

