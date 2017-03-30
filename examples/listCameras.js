const Camera = require('./lib/camera');
const co = require('co');

const cam = new Camera();

co(function* () {
    const count = yield cam.getNumberOfCameras();
    console.log(`Found ${count} cameras`);

    const cameras = yield cam.listCameras(count);
    console.log('Cameras', cameras);
});
