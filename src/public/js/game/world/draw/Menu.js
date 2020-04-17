import { getIcon } from '../draw/spriter.js';
import { subscribe, popObserver } from '../input.js';
import { SubAllies } from './SubAllies.js';

const options = ["Itens", "Aliados", "Quests", "Mapa", "Infos", "Sair"];

function Menu(){
    this.destroy = false;
    this.total_subs = 0;

    this.selectedOption = 2;
    this.submenu = null;

    subscribe(key => {
        selectOption(key, this);
    });
    this.total_subs++;

    subscribe(key => {
        moveToOptionAbove(key, this);
    });
    this.total_subs++;

    subscribe(key => {
        moveToOptionBelow(key, this);
    });
    this.total_subs++;
}

Menu.prototype.update = function(millis){
    if(this.submenu && this.submenu.destroy){
        delete this.submenu;
    }
}

Menu.prototype.render = function(ctx){
    const canvasW = ctx.canvas.clientWidth;
    const canvasH = ctx.canvas.clientHeight;    

    const { img, sx, sy, sw, sh } = getIcon("main-menu");

    const cx = canvasW/2 - sw/2;
    const cy = canvasH/2 - sh/2;
    ctx.drawImage(img, sx, sy, sw, sh, cx, cy, sw, sh);

    this.drawArrow(ctx, cx, cy, sh);

    if(this.submenu){
        this.submenu.render(ctx);
    }
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
    if(key !== 'ARROWUP' || menu.submenu){
        return;
    }

    menu.selectedOption--;
    if(menu.selectedOption < 0){
        menu.selectedOption = options.length - 1;
    }
}

function moveToOptionBelow(key, menu){
    if(key !== 'ARROWDOWN' || menu.submenu){
        return;
    }

    menu.selectedOption++;
    if(menu.selectedOption > options.length - 1){
        menu.selectedOption = 0;
    }
}

function selectOption(key, menu){
    if(key !== "E" || menu.submenu){
        return;
    }

    switch(options[menu.selectedOption]){
        case "Aliados":
            menu.submenu = new SubAllies();
            break;
        case "Sair":
            window.location.replace('/home');
            break;
    }
    console.log( options[menu.selectedOption] );
}


export { Menu };