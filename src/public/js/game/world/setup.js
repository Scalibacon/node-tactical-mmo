import { connectToWorld } from './world-socket.js';
import { prepareToDraw } from './world.js';
import * as spriter from './draw/spriter.js';

(() => {
    spriter.loadSheets();
    prepareToDraw();
    connectToWorld();
})();