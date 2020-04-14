import { getIcon } from '../draw/spriter.js';
import { subscribe, popObserver } from '../input.js';

const options = ["Itens", "Aliados", "Quests", "Mapa", "Infos"];

function Menu(){
    this.destroy = false;
    this.total_subs = 0;

    this.selectedOption = 2;

    subscribe(e => {
        selectOption(e, this);
    });
    this.total_subs++;

    subscribe(e => {
        moveToOptionAbove(e, this);
    });
    this.total_subs++;

    subscribe(e => {
        moveToOptionBelow(e, this);
    });
    this.total_subs++;
}

Menu.prototype.update = function(millis){

}

Menu.prototype.render = function(ctx){
    const canvasW = ctx.canvas.clientWidth;
    const canvasH = ctx.canvas.clientHeight;    

    const { img, sx, sy, sw, sh } = getIcon("main-menu");

    const cx = canvasW/2 - sw/2;
    const cy = canvasH/2 - sh/2;
    ctx.drawImage(img, sx, sy, sw, sh, cx, cy, sw, sh);

    this.drawArrow(ctx, cx, cy, sh);
}

Menu.prototype.drawArrow = function(ctx, menuX, menuY, menuH){
    const { img, sx, sy, sw, sh } = getIcon("select-arrow");

    const x = menuX + 20;
    const y = menuY + 27 + (this.selectedOption) * 41 + (this.selectedOption * 3);

    ctx.drawImage(img, sx, sy, sw, sh, x, y, sw/1.33, sh/1.33);
}

Menu.prototype.removeSubscription = function(){
    for(let i = 0; i < this.total_subs; i++){
        popObserver();
    }
}

function moveToOptionAbove(key, menu){
    if(key !== 'ARROWUP'){
        return;
    }

    menu.selectedOption--;
    if(menu.selectedOption < 0){
        menu.selectedOption = options.length - 1;
    }
}

function moveToOptionBelow(key, menu){
    if(key !== 'ARROWDOWN'){
        return;
    }

    menu.selectedOption++;
    if(menu.selectedOption > options.length - 1){
        menu.selectedOption = 0;
    }
}

function selectOption(key, menu){
    if(key !== "E"){
        return;
    }
    console.log( options[menu.selectedOption] );
}

export { Menu };