import { subscribe, popObserver } from '../input.js';
import { socket } from '../world-socket.js';
import { getIcon } from '../draw/spriter.js';

const maxChars = 145, txtIcons = ["yes-button", "no-button"];

function Dialog(server_dialog){
    this.current = 0;    
    this.arrWords = server_dialog.dialog.words;
    this.confirmation = server_dialog.dialog.confirmation;
    this.yes = server_dialog.dialog.yes;
    this.no = server_dialog.dialog.no;
    this.destroy = false;
    this.total_subs = 0;

    this.npcID = server_dialog.npc;
    this.progress = server_dialog.progress;

    this.selectedOption = 0;    

    subscribe(key => {
        nextWord(key, this)
    });
    this.total_subs++;

    subscribe(key => {
        moveToOptionAbove(key, this)
    });
    this.total_subs++;

    subscribe(key => {
        moveToOptionBelow(key, this)
    });
    this.total_subs++;
}

Dialog.prototype.update = function(millis){
    if(this.current >= this.arrWords.length){
        this.destroy = true;
        socket.emit('finishDialog', {npcID: this.npcID, progress: this.progress, resp: 'finish'});
    }
}

Dialog.prototype.render = function(ctx){
    const canvasW = ctx.canvas.clientWidth;
    const canvasH = ctx.canvas.clientHeight;
    const dialogW = canvasW;
    const dialogH = 100;
    const dialogX = 0;
    const dialogY = canvasH - dialogH;

    ctx.fillStyle = "rgba(27,27,27,0.75)";
    ctx.fillRect(dialogX, dialogY, dialogW, dialogH);    

    const lines = breakLine( this.arrWords[this.current] );

    ctx.fillStyle = "rgba(255,255,255,1)";
    ctx.font = "16px Arial";

    for(let i in lines){
        const y = dialogY + (parseInt(i) + 1) * 20;
        ctx.fillText(lines[i], dialogX + 5, y, canvasW);
    }  
    
    if(this.current === this.arrWords.length - 1 && this.confirmation){
        for(let i = 0; i < 2; i++){
            const { img, sx, sy, sw, sh } = getIcon(txtIcons[i]);
            let btnX = canvasW - sw - 20;
            let btnY = dialogY - sh - (sh * i) - (10 * (i + 1));

            ctx.drawImage(img, sx, sy, sw, sh, btnX, btnY, sw, sh);

            if(this.selectedOption === i){
                drawArrow(ctx, btnX, btnY, sh);
            }
        }
    }
}

Dialog.prototype.removeSubscription = function(){
    for(let i = 0; i < this.total_subs; i++){
        popObserver();
    }
}

function moveToOptionAbove(key, dialog){
    if(key !== "ARROWUP"){
        return;
    }

    dialog.selectedOption--;
    if(dialog.selectedOption < 0){
        dialog.selectedOption = 1;
    }
}

function moveToOptionBelow(key, dialog){
    if(key !== "ARROWDOWN"){
        return;
    }

    dialog.selectedOption++;
    if(dialog.selectedOption > 1){
        dialog.selectedOption = 0;
    }
}

function drawArrow(ctx, x, y, height){
    const { img, sx, sy, sw, sh } = getIcon("select-arrow");
    const arrowX = x - sw - 10;
    const arrowY = y + (height / 2) - (sh / 2)
    ctx.drawImage(img, sx, sy, sw, sh, arrowX, arrowY, sw, sh);
}

function nextWord(key, dialog){
    if(key !== "E"){
        return;
    }

    if(dialog.current === dialog.arrWords.length - 1 && dialog.confirmation){
        if(dialog.selectedOption === 0){
            dialog.arrWords[dialog.current] = dialog.yes;
            socket.emit('finishDialog', {npcID: dialog.npcID, progress: dialog.progress, resp: 'yes'});
        } else {
            dialog.arrWords[dialog.current] = dialog.no;
            socket.emit('finishDialog', {npcID: dialog.npcID, progress: dialog.progress, resp: 'no'});
        }
        dialog.confirmation = false;
        return;
    }

    dialog.current++;
}

function breakLine(str){
    let done = [];
    let finished = false;

    while(!finished){
        if(str.length <= maxChars){
            done.push(str);
            finished = true;
            break;
        }

        const divided = str.substring(0, maxChars);
        const spaceIndex = divided.lastIndexOf(" ");

        const right = divided.substring(0, spaceIndex);
        done.push(right);

        str = str.substring(spaceIndex+1, str.length);
        
    }

   return done;
}

export { Dialog }