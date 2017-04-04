const Camera = require('../lib/camera');
const co = require('co');
const ref = require('ref');

const cam = new Camera();

co(function* () {
    console.log('Initialize cam');
    yield cam.init();
    console.log('Initialized');

    const sensorInfo = yield cam.getSensorInfo();
    const maxImageSize = yield cam.getMaxImageSize(sensorInfo);

    yield cam.setFrameRate(6);

    for (let i = 0; i < 10; i++) {
        const seq = yield cam.allocImageMem(maxImageSize, 24);
        yield cam.addToSequence(seq);
    }

    yield cam.focus(cam.def.FOC_CMD_SET_DISABLE_AUTOFOCUS);

    yield cam.captureVideo(cam.def.IS_WAIT);
    yield cam.enableEvent(cam.def.IS_SET_EVENT_FRAME);

    console.log('Try to calibrate');
    const calibration = yield cam.calibrate();

    console.log(`Calibration (focus/exposure): ${calibration.focus}/${calibration.exposure}`);

    yield cam.exit();
}).catch((err) => {
    console.log(`Error: ${err}`);
    cam.exit().then(() => {
        process.exit();
    });
});
