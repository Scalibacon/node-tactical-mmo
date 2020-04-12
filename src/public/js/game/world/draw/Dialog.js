import { subscribe } from '../input.js';
import { socket } from '../world-socket.js';
import { getIcon } from '../draw/spriter.js';

const maxChars = 145, txtIcons = ["yes-button", "no-button"];

function Dialog(server_dialog){
    this.current = 0;    
    this.arrWords = server_dialog.dialog.words;
    this.confirmation = server_dialog.dialog.confirmation;
    this.yes = server_dialog.dialog.yes;
    this.no = server_dialog.dialog.no;
    this.timeShowing = 0;
    this.destroy = false;

    this.selectedItem = 0;

    subscribe(e => {
        nextWord(e, this)
    });
}

Dialog.prototype.update = function(millis){
    this.timeShowing += millis;

    if(this.current >= this.arrWords.length){
        this.destroy = true;
        socket.emit('stopTalking');
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

            if(this.selectedItem === i){
                drawArrow(ctx, btnX, btnY, sh);
            }
        }
    }
}

Dialog.prototype.selectNextItem = function(){
    
}

function drawArrow(ctx, x, y, height){
    const { img, sx, sy, sw, sh } = getIcon("select-arrow");
    const arrowX = x - sw - 10;
    const arrowY = y + (height / 2) - (sh / 2)
    ctx.drawImage(img, sx, sy, sw, sh, arrowX, arrowY, sw, sh);
}

function nextWord(key, dialog){
    if(key !== "e" || dialog.timeShowing < 300){
        return;
    }
    dialog.current++;
    dialog.timeShowing = 0;
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