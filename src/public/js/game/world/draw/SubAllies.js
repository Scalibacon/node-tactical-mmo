import { subscribe, popObserver } from '../input.js';
import drawBorder from '../../utils/drawBorder.js';
import { socket } from '../world-socket.js';

function SubAllies(){
    this.allies;
    this.selectedAlly = 0;

    this.total_subs = 0;
    this.destroy = false;

    subscribe(e => {
        closeSubmenu(e, this);
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

    socket.emit('getActiveAllies');    
}

SubAllies.prototype.render = function(ctx){
    const canvasW = ctx.canvas.clientWidth;
    const canvasH = ctx.canvas.clientHeight;
    ctx.fillStyle = "rgba(200,200,200,1)";
    ctx.fillRect(0, 0, canvasW, canvasH);

    if(!this.allies)
        return;

    this.drawLeft(ctx);
    this.drawCenter(ctx);
    this.drawRight(ctx);
}

SubAllies.prototype.drawRight = function(ctx){
    const containerH = ctx.canvas.clientHeight;
    const containerW = ctx.canvas.clientWidth - 450 - 204;
    const containerX = 200 + 4 + 450;
    ctx.fillStyle = "rgba(102, 51, 153, 0.75)";
    ctx.fillRect(containerX, 0, containerW, containerH);

    const ally = this.allies[this.selectedAlly];
    let wordX = containerX + 30;
    let wordY = 40;        
    ctx.font = "bold 18px Arial";
    // console.log(ally)
    ctx.fillStyle = "white";

    ctx.fillText(`HP: ${ally.total_stats.max_hp}`, wordX, wordY, 150);
    wordX += 105;
    ctx.fillText(`Energia: ${ally.total_stats.max_energy}`, wordX, wordY, 150);    
    wordX += 155;
    ctx.fillText(`Sorte: ${ally.total_stats.luck}`, wordX, wordY, 150);
    wordX = containerX + 30;
    wordY += 50;

    ctx.fillText(`Força: ${ally.total_stats.strenght}`, wordX, wordY, 150);
    wordX += 105;
    ctx.fillText(`Defesa: ${ally.total_stats.defense}`, wordX, wordY, 150);    
    wordX += 155;
    ctx.fillText(`Velocidade: ${ally.total_stats.speed}`, wordX, wordY, 150);
    wordX = containerX + 30;
    wordY += 50;

    ctx.fillText(`Poder: ${ally.total_stats.power}`, wordX, wordY, 150);
    wordX += 105;
    ctx.fillText(`Resistência: ${ally.total_stats.resistance}`, wordX, wordY, 150);
    wordX += 155;
    ctx.fillText(`Técnica: ${ally.total_stats.technique}`, wordX, wordY, 150);
    wordX = containerX + 30;
    wordY += 50;

    ctx.fillStyle = "rgba(102, 51, 153, 1)"
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(containerX, wordY);
    ctx.lineTo(containerX + containerW, wordY);
    ctx.stroke();
    wordY += 50;

    ctx.fillStyle = "white";
    if(!ally.weapon)
        ctx.fillText(`Arma: Punhos`, wordX, wordY, 150);
    else 
        ctx.fillText(`Arma: ${ally.weapon.name}`, wordX, wordY, 150);
}

SubAllies.prototype.drawCenter = function(ctx){
    const containerH = ctx.canvas.clientHeight;
    const containerW = 450;
    const containerX = 200 + 4;
    ctx.fillStyle = "rgba(102, 51, 153, 0.5)";
    ctx.fillRect(containerX, 0, containerW, containerH);

    const titleX = containerX + containerW/2 - (24 * 3)/2;
    ctx.font = "bold 24px Arial";
    ctx.fillStyle = "black";
    ctx.fillText('Aliados', titleX, 40, containerW/2);

    for(let i in this.allies){
        const ally = this.allies[i];
        const thickness = 4
        const w = containerW - thickness * 2;
        const h = 60;
        const x = containerX + thickness;
        const y = 80 + (h + thickness * 2) * i;
        const bcollor = parseInt(i) === this.selectedAlly ? 'yellow' : "rgba(102, 51, 153, 1)";
        drawBorder(ctx, x, y, w, h, thickness, bcollor)
        ctx.fillStyle = "rgba(161, 95, 227, 1)";
        ctx.fillRect(x, y, w, h);

        const imgW = 50, imgH = imgW;
        const imgX = x + 5;
        const imgY = y + 5;
        ctx.fillStyle = "orange";
        ctx.fillRect(imgX, imgY, imgW, imgH);

        let wordX = imgX + imgW + 10;
        const wordY = imgY + imgH/2 + 5;        
        ctx.font = "bold 14px Arial";

        ctx.fillStyle = "white";
        ctx.fillText(ally.name, wordX, wordY, 150);
        wordX += 150 + 5
        ctx.fillText(ally.job, wordX, wordY, 150);
        wordX += 150 + 5
        ctx.fillText(`Level ${ally.level}`, wordX, wordY, 150);        
    }
}

SubAllies.prototype.drawLeft = function(ctx){
    const containerH = ctx.canvas.clientHeight;
    const containerW = 200;
    const defaultX = 30;
    const ally = this.allies[this.selectedAlly];
    
    ctx.fillStyle = "rgba(102, 51, 153, 1)";
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(201, 0);
    ctx.lineTo(201, containerH);
    ctx.stroke();

    ctx.fillStyle = "rgba(102, 51, 153, 0.75)";
    ctx.fillRect(0, 0, containerW, containerH);
    const imgW = 100, imgH = imgW;
    const imgX = containerW/2 - imgW/2;
    const imgY = 35;
    ctx.fillStyle = "orange";
    ctx.fillRect(imgX, imgY, imgW, imgH);    
    const nameY = imgY + imgH + 30;
    ctx.font = "bold 20px Arial";
    ctx.fillStyle = "black";
    ctx.fillText(ally.name, defaultX, nameY, containerW - 20);
    
    ctx.font = "bold 16px Arial";
    const hpY = nameY + 40;
    ctx.fillText(`HP: ${ally.total_stats.max_hp-ally.lost_hp}/${ally.total_stats.max_hp}`, defaultX, hpY, containerW - 20);
    const energyY = hpY + 40;
    ctx.fillText(`Energia: ${ally.total_stats.max_energy-ally.lost_energy}/${ally.total_stats.max_energy}`, defaultX, energyY, containerW - 20);
    const jobY = energyY + 40;
    ctx.fillText(ally.job, defaultX, jobY, containerW - 20);
    const natureY = jobY + 40;
    ctx.fillText(ally.nature, defaultX, natureY, containerW - 20);
    const levelY = natureY + 40;
    ctx.fillText(`Level ${ally.level}`, defaultX, levelY, containerW - 20);
    const expY = levelY + 40;
    ctx.fillText(`Experiência: ${ally.experience}/100`, defaultX, expY, containerW - 20);
    const hungerY = expY + 40;
    ctx.fillText(`Fome: ${ally.hunger}/100`, defaultX, hungerY, containerW - 20);
    const statusY = hungerY + 40;
    ctx.fillText(`${ally.status}`, defaultX, statusY, containerW - 20);
    const typeY = statusY + 40;
    ctx.fillText(`${ally.type}`, defaultX, typeY, containerW - 20);
    const weightY = typeY + 40;
    ctx.fillText(`Peso: ${ally.weight}`, defaultX, weightY, containerW - 20);
}

SubAllies.prototype.removeSubscription = function(){
    for(let i = 0; i < this.total_subs; i++){
        popObserver();
    }
}

function closeSubmenu(key, submenu){
    if(key !== "ESCAPE"){
        return;
    }

    submenu.removeSubscription();
    submenu.destroy = true;
}

function moveToOptionAbove(key, submenu){
    if(key !== 'ARROWUP' || !submenu.allies){
        return;
    }

    submenu.selectedAlly++;
    if(submenu.selectedAlly >= submenu.allies.length){
        submenu.selectedAlly = 0;
    }
}

function moveToOptionBelow(key, submenu){
    if(key !== 'ARROWDOWN' || !submenu.allies){
        return;
    }

    submenu.selectedAlly--;
    if(submenu.selectedAlly < 0){
        submenu.selectedAlly = submenu.allies.length - 1;
    }
}

export { SubAllies };