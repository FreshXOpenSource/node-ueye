const Camera = require('../lib/camera');
const co = require('co');
const path = require('path');

const cam = new Camera();

co(function* () {
    console.log('Initialize cam');
    yield cam.init();
    console.log('Initialized');

    const sensorInfo = yield cam.getSensorInfo();
    const maxImageSize = yield cam.getMaxImageSize(sensorInfo);
    console.log('MaxImageSize', maxImageSize);

    yield cam.setColorMode(cam.def.IS_CM_BGR8_PACKED);

    yield cam.aoiImageSetSize(maxImageSize);
    yield cam.setDisplayMode(cam.def.IS_SET_DM_DIB);

    const seq = yield cam.allocImageMem(maxImageSize, 24);
    yield cam.setImageMem(seq);

    console.log('New framerate:', yield cam.setFrameRate(3));

    console.log('Start capturing');
    yield cam.freezeVideo(cam.def.IS_WAIT);

    console.log('Captured!');

    const res = yield cam.getImageMem();

    yield cam.imageFile({
        pwchFileName: path.join(__dirname, '../out/test.jpg'),
        nFileType: cam.def.IS_IMG_JPG,
        ppcImageMem: res.mem,
        pnImageID: res.id,
        nQuality: 0,
    });

    yield cam.exit();
}).catch((ex) => {
    console.error('Exception:', ex);

    cam.exit().then(() => {
        process.exit();
    });
});
