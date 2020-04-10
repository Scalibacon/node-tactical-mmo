import * as resources from '../../utils/resources.js';

function loadSheets(){
    resources.load([
        '/assets/world/tiles/tilemap0.png'
    ]);
    resources.onReady(() => console.log('Imagens carregadas'));
}

export {loadSheets};