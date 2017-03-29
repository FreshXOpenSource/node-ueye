const Camera = require('../lib/camera');
const co = require('co');
const fs = require('fs');

const cam = new Camera();

co(function *() {
    console.log('Initialize cam');
    yield cam.init();
    console.log('Initialized');

    const sensorInfo = yield cam.getSensorInfo();
    const maxImageSize = yield cam.getMaxImageSize(sensorInfo);
    console.log('MaxImageSize', maxImageSize);

    yield cam.focus(cam.def.FOC_CMD_SET_ENABLE_AUTOFOCUS);

    const minFocus = yield cam.focus(cam.def.FOC_CMD_GET_MANUAL_FOCUS_MIN, 'uint32');
    const maxFocus = yield cam.focus(cam.def.FOC_CMD_GET_MANUAL_FOCUS_MAX, 'uint32');
    const incFocus = yield cam.focus(cam.def.FOC_CMD_GET_MANUAL_FOCUS_INC, 'uint32');
    const focus = yield cam.focus(cam.def.FOC_CMD_GET_MANUAL_FOCUS, 'uint32');

    console.log(`Focus (min/max/inc/current): ${minFocus}/${maxFocus}/${incFocus}/${focus}`);

    const minExp = yield cam.exposure(cam.def.IS_EXPOSURE_CMD_GET_EXPOSURE_RANGE_MIN, 'double');
    const maxExp = yield cam.exposure(cam.def.IS_EXPOSURE_CMD_GET_EXPOSURE_RANGE_MAX, 'double');
    const incExp = yield cam.exposure(cam.def.IS_EXPOSURE_CMD_GET_EXPOSURE_RANGE_INC, 'double');
    const exp = yield cam.exposure(cam.def.IS_EXPOSURE_CMD_GET_EXPOSURE, 'double');

    console.log(`Exposure (min/max/inc/current): ${minExp}/${maxExp}/${incExp}/${exp}`);

    yield cam.exit();
}).catch(() => {
    cam.exit().then(()=>{
        process.exit();
    });
});
