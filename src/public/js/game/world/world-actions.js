import { isPressed } from './input.js';

export function listenAction(socket){
    if(isPressed('ArrowUp')){
        socket.emit('moveChar', {dir: 'up'});
    } else 
    if(isPressed('ArrowDown')){
        socket.emit('moveChar', {dir: 'down'});
    } else
    if(isPressed('ArrowLeft')){
        socket.emit('moveChar', {dir: 'left'});
    } else
    if(isPressed('ArrowRight')){
        socket.emit('moveChar', {dir: 'right'});
    }
}