import { isPressed } from './input.js';
import { dir } from '../utils/constants.js'

export function listenAction(socket){
    if(isPressed('e')){
        socket.emit('interact');
    } else
    if(isPressed('ArrowUp') || isPressed('w')){
        socket.emit('moveChar', {dir: dir.up});
    } else 
    if(isPressed('ArrowDown') || isPressed('s')){
        socket.emit('moveChar', {dir: dir.down});
    } else
    if(isPressed('ArrowLeft') || isPressed('a')){
        socket.emit('moveChar', {dir: dir.left});
    } else
    if(isPressed('ArrowRight') || isPressed('d')){
        socket.emit('moveChar', {dir: dir.right});
    }
}