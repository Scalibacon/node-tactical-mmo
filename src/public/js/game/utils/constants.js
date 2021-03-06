const cell_size = 60;

const dir = {
    down: 0,
    right: 1,
    up: 2,
    left: 3
}

function getDir(value){
    for(let prop in dir){
        if(dir[prop] === value){
            return prop;
        }
    }
    return false;
}

export {cell_size, dir, getDir};