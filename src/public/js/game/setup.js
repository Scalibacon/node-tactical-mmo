import { connectToWorld } from './world-socket.js'
import { prepareToDraw } from './draw/world/world.js';

(() => {
    prepareToDraw();
    connectToWorld();
})();