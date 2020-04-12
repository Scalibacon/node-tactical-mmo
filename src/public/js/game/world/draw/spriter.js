import * as resources from '../../utils/resources.js';
import { Sprite } from '../draw/Sprite.js';

function loadSheets(){
    resources.load([
        '/assets/world/tiles/tilemap0.png',
        '/assets/world/char/Aprendizm.png',
        '/assets/world/char/Aprendizf.png',

        '/assets/world/npcs/npcs.png',

        '/assets/icons/sheet.png'
    ]);
    resources.onReady(() => console.log('Imagens carregadas'));
}

function manageCharSprite(job, gender){
    const url = `/assets/world/char/${job}${gender}.png`;
    let sprites = {};
    let sw = 24, sh = 41, cw = sw * 1.2, ch = sh * 1.2;

    for(let i = 0; i < 4; i++){
        const sx = 1;
        const sy = i * (sh + 1) + 1;
        sprites[i] = new Sprite(resources.get(url), sx, sy, sw, sh, [1,0,1,2], cw, ch)
    }

    return sprites;
}

function manageNpcSprite(type, dir){
    const url = '/assets/world/npcs/npcs.png';
    const sw = 27, sh = 43, cw = sw * 1.1, ch = sh * 1.1;

    const sx = (1 * type) + (type * sw);
    const sy = (1 * dir) + (dir * sh) + 1;

    const sprite = new Sprite(resources.get(url), sx, sy, sw, sh, [0], cw, ch);

    return sprite;
}

function getIcon(which){
    const img = resources.get('/assets/icons/sheet.png');
    let sx, sy, sw, sh;

    switch(which){
        case 'yes-button':
            sx = 0;
            sy = 0;
            sw = 76;
            sh = 41
            break;
        case 'no-button':
            sx = 0;
            sy = 42;
            sw = 76; 
            sh = 41;
            break;
        case 'select-arrow':
            sx = 80;
            sy = 2;
            sw = 24;
            sh = 32;
            break;
    }

    return {img, sx, sy, sw, sh}
}

export {loadSheets, manageCharSprite, manageNpcSprite, getIcon};