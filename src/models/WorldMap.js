const initializeMultiArray = require('../utils/initializeMultiArray');

const loadMapLayout = {};

loadMapLayout["0"] = function(){
    const lines = 35, columns = 40;
    const layout = initializeMultiArray(lines, columns);

    for(let i = 0; i < lines; i++){
        for(let j = 0; j < columns; j++){
            if(i % 3 === 0 || j % 3 === 0){
                layout[i][j] = {tile: 1};
                continue;
            }

            layout[i][j] = {tile: 0};            
        }
    }   
    
    return layout;
}

module.exports = {loadMapLayout};