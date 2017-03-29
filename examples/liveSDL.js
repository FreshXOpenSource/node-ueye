#!/usr/bin/env node

const SDL = require('node-sdl2');
const Camera = require('../lib/camera');
const async = require('async');
const ref = require('ref');
const co = require('co');

const SDL_render = require('node-sdl2/dep/SDL_render');
const SDL_rect = require('node-sdl2/dep/SDL_rect');

const context = {};
const App = SDL.app;
const Window = SDL.window;
const win = new Window({fullscreen: true});

const cam = new Camera();

let exiting = false;

process.on('SIGINT', () => {
    console.log('SIGINT');
    exiting = true;
    cam.exit(cam.NO_QUEUE).then(() => { 
        App.quit();
        process.exit();
    });
});

win.title = 'WallyEye 1.0';
win.background = 0xFFFFFF;

const render = win.render;
const size = render.outputSize;

co(function* (){
    yield cam.init();
    
    const sensorInfo = yield cam.getSensorInfo();
    const maxImageSize = yield cam.getMaxImageSize(sensorInfo);
    
    yield cam.setColorMode(cam.def.IS_CM_BGR8_PACKED);
    yield cam.aoiImageSetSize(maxImageSize);
    yield cam.setDisplayMode(cam.def.IS_SET_DM_DIB);
    const newFrameRate = yield cam.setFrameRate(3);
 
    for(let i = 0; i < 10; i++) {
        const seq = yield cam.allocImageMem(maxImageSize, 24);
        yield cam.addToSequence(seq);
    }
  
    console.log('Enable capturing. Frame-rate:', newFrameRate); 
    yield cam.captureVideo(cam.def.IS_WAIT);
    yield cam.enableEvent(cam.def.IS_SET_EVENT_FRAME);

    context.texture = SDL_render.SDL_CreateTexture(render._render, 390076419 /* SDL_PIXELFORMAT_BGR24 */, 1 /* SDL_TEXTUREACCESS_STREAMING */, maxImageSize.s32Width, maxImageSize.s32Height);
        
    const nextImage = function () {
        cam.nextImage((res, done) => {
            console.log('Display Image');
            SDL_render.SDL_UpdateTexture(context.texture, null, res.pixels, 3 * maxImageSize.s32Width);

            return done();
        }, () => {
            SDL_render.SDL_RenderCopyEx(render._render, context.texture, null, SDL_rect.SDL_Rect({
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
