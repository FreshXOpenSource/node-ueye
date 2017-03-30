const Camera = require('../lib/camera');
const ref = require('ref');

const cam = new Camera();

cam.init().then(() => {
    const saturation = ref.alloc('int', 0);
    const minSaturation = ref.alloc('int', 0);
    const maxSaturation = ref.alloc('int', 0);

    let nRet = cam.binding.is_Saturation(cam.hCam, cam.def.SATURATION_CMD_GET_VALUE, saturation, ref.sizeof.int);
    nRet = nRet || cam.binding.is_Saturation(cam.hCam, cam.def.SATURATION_CMD_GET_MIN_VALUE, minSaturation, ref.sizeof.int);
    nRet = nRet || cam.binding.is_Saturation(cam.hCam, cam.def.SATURATION_CMD_GET_MAX_VALUE, maxSaturation, ref.sizeof.int);

    console.log(`Saturation min/max/current (errcode): ${minSaturation.deref()}/${maxSaturation.deref()}/${saturation.deref()} (${nRet})`);

    cam.exit().then(() => {
    });
});
