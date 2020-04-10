import { connectToWorld } from './world-socket.js';
import { prepareToDraw } from './world.js';

(() => {
    prepareToDraw();
    connectToWorld();
})();