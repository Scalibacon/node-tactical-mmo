import { isPressed } from './input.js';
import { dir } from '../utils/constants.js';
let dialog_lock = 0;

export function listenAction(socket, state){
    if(state.active_menu){
        dialog_lock = 250;
        return;
    }     
    
    if(dialog_lock > 0)
        dialog_lock -= 16; 

    if(isPressed('e') && dialog_lock <= 0){
        socket.emit('interact');              
    } else
    if(isPressed('ArrowUp') || isPressed('w')){
        socket.emit('moveChar', {dir: dir.up});
    } else 
    if(isPressed('ArrowDown') || isPressed('s')){
        socket.emit('moveChar', {dir: dir.down});
    } else
    if(isPressed('ArrowLeft')  || isPressed('a')){
        socket.emit('moveChar', {dir: dir.left});
    } else
    if(isPressed('ArrowRight') || isPressed('d')){
        socket.emit('moveChar', {dir: dir.right});
    }
}