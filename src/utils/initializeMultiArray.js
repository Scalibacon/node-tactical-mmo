module.exports = function(lines, columns){
    let arr = [];

    for(let i = 0; i < lines; i++){
        arr[i] = [];
        for(let j = 0; j < columns; j++){
            arr[i][j] = null;
        }
    }

    return arr;
}