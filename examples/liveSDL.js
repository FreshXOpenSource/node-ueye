const SDL = require('node-sdl2'); // eslint-disable-line import/no-extraneous-dependencies
const Camera = require('../lib/camera');
const co = require('co');

const SDLrender = require('node-sdl2/dep/SDL_render'); // eslint-disable-line import/no-extraneous-dependencies
const SDLrect = require('node-sdl2/dep/SDL_rect'); // eslint-disable-line import/no-extraneous-dependencies

const context = {};
const App = SDL.app;
const Window = SDL.window;
const win = new Window({ fullscreen: true });

const cam = new Camera();


process.on('SIGINT', () => {
    console.log('Stop requested!');
    console.log('Stop camera');
    cam.exit(cam.NO_QUEUE).then(() => {
        console.log('Camera stopped. Destroy App.');
        console.log('Bye, bye');
        App.quit();
    });
});

win.title = 'WallyEye 1.0';
win.background = 0xFFFFFF;

const render = win.render;
const size = render.outputSize;

co(function* () {
    yield cam.init();

    const sensorInfo = yield cam.getSensorInfo();
    const maxImageSize = yield cam.getMaxImageSize(sensorInfo);

    yield cam.setColorMode(cam.def.IS_CM_BGR8_PACKED);
    yield cam.aoiImageSetSize(maxImageSize);
    yield cam.setDisplayMode(cam.def.IS_SET_DM_DIB);
    const newFrameRate = yield cam.setFrameRate(5);

    for (let i = 0; i < 10; i++) {
        const seq = yield cam.allocImageMem(maxImageSize, 24);
        yield cam.addToSequence(seq);
    }

    console.log('Enable capturing. Frame-rate:', newFrameRate);
    yield cam.captureVideo(cam.def.IS_WAIT);
    yield cam.enableEvent(cam.def.IS_SET_EVENT_FRAME);

    context.texture = SDLrender.SDL_CreateTexture(render._render, 390076419 /* SDL_PIXELFORMAT_BGR24 */, 1 /* SDL_TEXTUREACCESS_STREAMING */, maxImageSize.s32Width, maxImageSize.s32Height);

    const nextImage = function () {
        cam.nextImage((res, done) => {
            console.log('Display Image');
            SDLrender.SDL_UpdateTexture(context.texture, null, res.pixels, 3 * maxImageSize.s32Width);

            return done();
        }).then(() => {
            SDLrender.SDL_RenderCopyEx(render._render, context.texture, null, SDLrect.SDL_Rect({
                x: 0,
                y: 0,
                w: size.w,
                h: size.h,
            }).ref(), 0, null, 0);

            render.present();
            setTimeout(nextImage, 100);
        });
    };

    nextImage();
});
