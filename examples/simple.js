const Camera = require('../lib/camera');
const co = require('co');
const fs = require('fs');
const path = require('path');

const cam = new Camera();

co(function* () {
    console.log('Initialize cam');
    yield cam.init();

    const sensorInfo = yield cam.getSensorInfo();
    const maxImageSize = yield cam.getMaxImageSize(sensorInfo);

    yield cam.setColorMode(cam.def.IS_CM_BGR8_PACKED);

    yield cam.aoiImageSetSize(maxImageSize);
    yield cam.setDisplayMode(cam.def.IS_SET_DM_DIB);
    yield cam.setFrameRate(6);

    for (let i = 0; i < 10; i++) {
        const seq = yield cam.allocImageMem(maxImageSize, 24);
        yield cam.addToSequence(seq);
    }

    console.log('Start capturing');
    yield cam.captureVideo(cam.def.IS_WAIT);
    console.log('Capture video');

    yield cam.enableEvent(cam.def.IS_SET_EVENT_FRAME);

    yield cam.nextImage((res, done) => {
        console.log('Image stored to out/test.bgr');
        fs.writeFileSync(path.join(__dirname, '../out/test.bgr'), res.pixels);

        return done();
    });

    yield cam.exit();
}).catch(() => {
    cam.exit().then(() => {
        process.exit();
    });
});
