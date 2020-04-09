export function drawMapTiles(map, ctx){
    const layout = map.layout;
    
    for(let i = 0; i < layout.length; i++){
        for(let j = 0; j < layout[i].length; j++){
            ctx.fillStyle = `rgb(${255 - layout[i][j].tile*80},255,255)`;
            ctx.fillRect(j * 50, i * 50, 50, 50);
        }
    }
}