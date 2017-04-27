const Camera = require('../lib/camera');
const co = require('co');

const cam = new Camera();

co(function* () {
    yield cam.init();
    console.log('PixelClocks:', yield cam.pixelClockList());
    yield cam.setPixelClock(9);
    console.log('Current PixelClock:', yield cam.getPixelClock());

    yield cam.exit();
});
