// import { Sprite } from './Sprite.js';
import * as resources from '../resources.js';

const manage = {
    Aprendizm: function(){
        
    }
}

function loadSpritesheets(func){
    resources.load([
        '/assets/sprites/world/Aprendizm.png'
    ]);

    if(func){
        resources.onReady(func);
    }
}

function isReady(){
    return resources.isReady();
}

export { manage, loadSpritesheets, isReady };