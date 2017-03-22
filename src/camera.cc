#include <stdlib.h>
#include <iostream>
#include <string>
#include <sstream>
#include "camera.h"
#include "cameraWorker.h"
#include <uv.h>

namespace ids {

using namespace std;

Nan::Persistent<v8::Function> Camera::constructor;

Camera::Camera() {
}

Camera::~Camera() {
}

void Camera::Init(v8::Local<v8::Object> exports) {
    Nan::HandleScope scope;

    // Prepare constructor template
    v8::Local<v8::FunctionTemplate> tpl = Nan::New<v8::FunctionTemplate>(New);
    tpl->SetClassName(Nan::New("Camera").ToLocalChecked());
    tpl->InstanceTemplate()->SetInternalFieldCount(1);

    // Prototype
    Nan::SetPrototypeMethod(tpl, "initCamera", InitCamera);
    Nan::SetPrototypeMethod(tpl, "exitCamera", ExitCamera);
    Nan::SetPrototypeMethod(tpl, "getMaxImageSize", GetMaxImageSize);
    Nan::SetPrototypeMethod(tpl, "setColorMode", SetColorMode);
    Nan::SetPrototypeMethod(tpl, "allocSequence", AllocSequence);

    Nan::SetPrototypeMethod(tpl, "aoiImageSetSize", AOIImageSetSize);
    Nan::SetPrototypeMethod(tpl, "setDisplayMode", SetDisplayMode);
    Nan::SetPrototypeMethod(tpl, "setFrameRate", SetFrameRate);

    Nan::SetPrototypeMethod(tpl, "getManualFocus", GetManualFocus);
    Nan::SetPrototypeMethod(tpl, "getExposureRange", GetExposureRange);

    Nan::SetPrototypeMethod(tpl, "fullManualMode", FullManualMode);

    Nan::SetPrototypeMethod(tpl, "setFocus", SetFocus);
    Nan::SetPrototypeMethod(tpl, "setExposure", SetExposure);

    // Nan::SetPrototypeMethod(tpk, "setAutoParameter", SetAutoParameter);
    Nan::SetPrototypeMethod(tpl, "captureVideo", CaptureVideo);
    Nan::SetPrototypeMethod(tpl, "enableEvent", EnableEvent);
    Nan::SetPrototypeMethod(tpl, "waitEvent", WaitEvent);

    Nan::SetPrototypeMethod(tpl, "getCurrentSequence", GetCurrentSequence);

    Nan::SetPrototypeMethod(tpl, "lockSeqBuf", LockSeqBuf);
    Nan::SetPrototypeMethod(tpl, "unlockSeqBuf", UnlockSeqBuf);
    Nan::SetPrototypeMethod(tpl, "saveToFile", SaveToFile);
    Nan::SetPrototypeMethod(tpl, "getSeqBuf", GetSeqBuf);

    Nan::SetPrototypeMethod(tpl, "freezeVideo", FreezeVideo);
    Nan::SetPrototypeMethod(tpl, "getActiveImageMem", GetActiveImageMem);
    Nan::SetPrototypeMethod(tpl, "setImageMem", SetImageMem);

    constructor.Reset(tpl->GetFunction());
    exports->Set(Nan::New("Camera").ToLocalChecked(), tpl->GetFunction());
}

void Camera::New(const Nan::FunctionCallbackInfo<v8::Value>& info) {
    if (info.IsConstructCall()) {
        // Invoked as constructor: `new Camera(...)`
        // double value = args[0]->IsUndefined() ? 0 : args[0]->NumberValue();
        Camera* obj = new Camera();
        obj->Wrap(info.This());
        info.GetReturnValue().Set(info.This());
    } else {
      // Invoked as plain function `Camera(...)`, turn into construct call.
      const int argc = 0;
      v8::Local<v8::Value> argv[argc] = {}; // { args[0] };
      v8::Local<v8::Function> cons = Nan::New<v8::Function>(constructor);
      info.GetReturnValue().Set(cons->NewInstance(argc, argv));
    }
}

/*
 * getMaxImageSize
 */

class ImageSize {
  public:
    INT sizeX;
    INT sizeY;
};

static INT GetMaxImageSizeAsync(CameraWorker<NoArgument, ImageSize> *worker, Camera *camera, NoArgument *args) {
    INT nSizeX;
    INT nSizeY;

    // Check if the camera supports an arbitrary AOI
    // Only the ueye xs does not support an arbitrary AOI
    INT nAOISupported = 0;
    BOOL bAOISupported = TRUE;
    if (is_ImageFormat(camera->hCam,
        IMGFRMT_CMD_GET_ARBITRARY_AOI_SUPPORTED,
        (void*)&nAOISupported,
        sizeof(nAOISupported)) == IS_SUCCESS)
    {
        bAOISupported = (nAOISupported != 0);
    }

    if (bAOISupported)
    {
        // All other sensors
        // Get maximum image size
        SENSORINFO sInfo;
        is_GetSensorInfo (camera->hCam, &sInfo);
        nSizeX = sInfo.nMaxWidth;
        nSizeY = sInfo.nMaxHeight;
    }
    else
    {
        // Only ueye xs
        // Get image size of the current format
        IS_SIZE_2D imageSize;
        is_AOI(camera->hCam, IS_AOI_IMAGE_GET_SIZE, (void*)&imageSize, sizeof(imageSize));

        nSizeX = imageSize.s32Width;
        nSizeY = imageSize.s32Height;
    }

    worker->result.sizeX = nSizeX;
    worker->result.sizeY = nSizeY;

    camera->sizeX = nSizeX;
    camera->sizeY = nSizeY;

    return 0;
}

static v8::Local<v8::Value> GetMaxImageSizeDone(CameraWorker<NoArgument, ImageSize> *worker, Camera *camera, ImageSize *result) {
    v8::Local<v8::Object> object = Nan::New<v8::Object>();
    object->Set(Nan::New("sizeX").ToLocalChecked(), Nan::New(result->sizeX));
    object->Set(Nan::New("sizeY").ToLocalChecked(), Nan::New(result->sizeY));
    return object;
}

void Camera::GetMaxImageSize(const Nan::FunctionCallbackInfo<v8::Value>& info) {
    Nan::HandleScope scope;
    v8::Local<v8::Function> callback = v8::Local<v8::Function>::Cast(info[0]);
    Camera *camera = ObjectWrap::Unwrap<Camera>(info.Holder());

    auto *cameraWorker = new CameraWorker<NoArgument, ImageSize>(new Nan::Callback(callback), camera, &GetMaxImageSizeAsync, &GetMaxImageSizeDone);
    Nan::AsyncQueueWorker(cameraWorker);
}

/*
 * AOIImageSetSize
 */

static INT AOIImageSetSizeAsync(CameraWorker<ImageSize, NoArgument> *worker, Camera *camera, ImageSize *args) {
    IS_SIZE_2D imageSize;
    imageSize.s32Width = args->sizeX;
    imageSize.s32Height = args->sizeY;

    return is_AOI(camera->hCam, IS_AOI_IMAGE_SET_SIZE, (void*)&imageSize, sizeof(imageSize));
}

void Camera::AOIImageSetSize(const Nan::FunctionCallbackInfo<v8::Value>& info) {
    Nan::HandleScope scope;
    v8::Local<v8::Function> callback = v8::Local<v8::Function>::Cast(info[1]);
    Camera *camera = ObjectWrap::Unwrap<Camera>(info.Holder());

    auto *cameraWorker = new CameraWorker<ImageSize, NoArgument>(new Nan::Callback(callback), camera, &AOIImageSetSizeAsync, NULL);

    v8::Local<v8::Object> options = info[0]->ToObject();
    cameraWorker->options.sizeX = Nan::Get(options, Nan::New("sizeX").ToLocalChecked()).ToLocalChecked()->Int32Value();
    cameraWorker->options.sizeY = Nan::Get(options, Nan::New("sizeY").ToLocalChecked()).ToLocalChecked()->Int32Value();

    Nan::AsyncQueueWorker(cameraWorker);
}

/*
 * SaveToFile
 */

class SaveToFileOptions {
  public:
    string path;
    int sequence;
    int fileType;
};

static INT SaveToFileAsync(CameraWorker<SaveToFileOptions, NoArgument> *worker, Camera *camera, SaveToFileOptions *options) {
    // SAVE Image as bmp
    IMAGE_FILE_PARAMS ImageFileParams;

    wstring wstr(options->path.length() , L' ');
    copy(options->path.begin(), options->path.end(), wstr.begin());

    ImageFileParams.pwchFileName    = const_cast<wchar_t*>(wstr.c_str());
    ImageFileParams.pnImageID       = (UINT*)&camera->lSeqMemId[options->sequence]; // valid ID
    ImageFileParams.ppcImageMem     = &camera->pcSeqImgMem[options->sequence]; // valid buffer
    ImageFileParams.nFileType       = options->fileType;
    ImageFileParams.nQuality        = 0;

    return is_ImageFile(camera->hCam, IS_IMAGE_FILE_CMD_SAVE, (void*)&ImageFileParams, sizeof(ImageFileParams));
}

void Camera::SaveToFile(const Nan::FunctionCallbackInfo<v8::Value>& info) {
    Nan::HandleScope scope;
    v8::Local<v8::Function> callback = v8::Local<v8::Function>::Cast(info[1]);
    Camera *camera = ObjectWrap::Unwrap<Camera>(info.Holder());

    auto *cameraWorker = new CameraWorker<SaveToFileOptions, NoArgument>(new Nan::Callback(callback), camera, &SaveToFileAsync, NULL);

    v8::Local<v8::Object> options = info[0]->ToObject();

    v8::String::Utf8Value path(Nan::Get(options, Nan::New("path").ToLocalChecked()).ToLocalChecked()->ToString());

    cameraWorker->options.path = std::string(*path);
    cameraWorker->options.sequence = Nan::Get(options, Nan::New("sequence").ToLocalChecked()).ToLocalChecked()->Int32Value();
    cameraWorker->options.fileType = Nan::Get(options, Nan::New("fileType").ToLocalChecked()).ToLocalChecked()->Int32Value();

    Nan::AsyncQueueWorker(cameraWorker);
}

/*
 * is_SetDisplayMode
 */
static INT SetDisplayModeAsync(CameraWorker<INT, NoArgument> *worker, Camera *camera, INT *displayMode) {
    return is_SetDisplayMode(camera->hCam, *displayMode);
}

void Camera::SetDisplayMode(const Nan::FunctionCallbackInfo<v8::Value>& info) {
    Nan::HandleScope scope;
    v8::Local<v8::Function> callback = v8::Local<v8::Function>::Cast(info[1]);
    Camera *camera = ObjectWrap::Unwrap<Camera>(info.Holder());

    auto *cameraWorker = new CameraWorker<INT, NoArgument>(new Nan::Callback(callback), camera, &SetDisplayModeAsync, NULL);

    cameraWorker->options = info[0]->Int32Value();

    Nan::AsyncQueueWorker(cameraWorker);
}

/*
 * is_SetImageMem
 */
static INT SetImageMemAsync(CameraWorker<INT, NoArgument> *worker, Camera *camera, INT *seq) {
    return is_SetImageMem( camera->hCam, camera->pcSeqImgMem[*seq], camera->nSeqNumId[*seq]);
}

void Camera::SetImageMem(const Nan::FunctionCallbackInfo<v8::Value>& info) {
    Nan::HandleScope scope;
    v8::Local<v8::Function> callback = v8::Local<v8::Function>::Cast(info[1]);
    Camera *camera = ObjectWrap::Unwrap<Camera>(info.Holder());

    auto *cameraWorker = new CameraWorker<INT, NoArgument>(new Nan::Callback(callback), camera, &SetImageMemAsync, NULL);

    cameraWorker->options = info[0]->Int32Value();

    Nan::AsyncQueueWorker(cameraWorker);
}

/*
 * is_LockSeqBuf
 */
static INT LockSeqBufAsync(CameraWorker<INT, NoArgument> *worker, Camera *camera, INT *seq) {
    return is_LockSeqBuf( camera->hCam, camera->nSeqNumId[*seq], camera->pcSeqImgMem[*seq] );
}

void Camera::LockSeqBuf(const Nan::FunctionCallbackInfo<v8::Value>& info) {
    Nan::HandleScope scope;
    v8::Local<v8::Function> callback = v8::Local<v8::Function>::Cast(info[1]);
    Camera *camera = ObjectWrap::Unwrap<Camera>(info.Holder());

    auto *cameraWorker = new CameraWorker<INT, NoArgument>(new Nan::Callback(callback), camera, &LockSeqBufAsync, NULL);

    cameraWorker->options = info[0]->Int32Value();

    Nan::AsyncQueueWorker(cameraWorker);
}

/*
 * is_UnlockSeqBuf
 */
static INT UnlockSeqBufAsync(CameraWorker<INT, NoArgument> *worker, Camera *camera, INT *seq) {
    return is_UnlockSeqBuf( camera->hCam, camera->nSeqNumId[*seq], camera->pcSeqImgMem[*seq] );
}

void Camera::UnlockSeqBuf(const Nan::FunctionCallbackInfo<v8::Value>& info) {
    Nan::HandleScope scope;
    v8::Local<v8::Function> callback = v8::Local<v8::Function>::Cast(info[1]);
    Camera *camera = ObjectWrap::Unwrap<Camera>(info.Holder());

    auto *cameraWorker = new CameraWorker<INT, NoArgument>(new Nan::Callback(callback), camera, &UnlockSeqBufAsync, NULL);

    cameraWorker->options = info[0]->Int32Value();

    Nan::AsyncQueueWorker(cameraWorker);
}

/*
 * is_getActiveImageMem
 */

class GetActiveImageMemResult {
  public:
    char *mem;
    int id;
};

static INT GetActiveImageMemAsync(CameraWorker<NoArgument, GetActiveImageMemResult> *worker, Camera *camera, NoArgument *args) {
    return is_GetActiveImageMem(camera->hCam, &worker->result.mem, &worker->result.id);
}

static v8::Local<v8::Value> GetActiveImageMemDone(CameraWorker<NoArgument, GetActiveImageMemResult> *worker, Camera *camera, GetActiveImageMemResult *result) {
    v8::Local<v8::Object> object = Nan::New<v8::Object>();
    object->Set(Nan::New("buffer").ToLocalChecked(), Nan::CopyBuffer(result->mem, camera->sizeX * camera->sizeY * 3).ToLocalChecked());
    object->Set(Nan::New("id").ToLocalChecked(), Nan::New(result->id));
    return object;
}

void Camera::GetActiveImageMem(const Nan::FunctionCallbackInfo<v8::Value>& info) {
    Nan::HandleScope scope;
    v8::Local<v8::Function> callback = v8::Local<v8::Function>::Cast(info[0]);
    Camera *camera = ObjectWrap::Unwrap<Camera>(info.Holder());

    auto *cameraWorker = new CameraWorker<NoArgument, GetActiveImageMemResult>(new Nan::Callback(callback), camera, &GetActiveImageMemAsync, &GetActiveImageMemDone);

    Nan::AsyncQueueWorker(cameraWorker);
}

/*
 * getSeqBuf
 */

static INT GetSeqBufAsync(CameraWorker<INT, char*> *worker, Camera *camera, INT *seq) {
    worker->result = camera->pcSeqImgMem[*seq]; // valid buffer
    return 0;
}

static v8::Local<v8::Value> GetSeqBufDone(CameraWorker<INT, char*> *worker, Camera *camera, char **result) {
    return Nan::CopyBuffer(*result, camera->sizeX * camera->sizeY * 3).ToLocalChecked();
}

void Camera::GetSeqBuf(const Nan::FunctionCallbackInfo<v8::Value>& info) {
    Nan::HandleScope scope;
    v8::Local<v8::Function> callback = v8::Local<v8::Function>::Cast(info[1]);
    Camera *camera = ObjectWrap::Unwrap<Camera>(info.Holder());

    auto *cameraWorker = new CameraWorker<INT, char*>(new Nan::Callback(callback), camera, &GetSeqBufAsync, &GetSeqBufDone);

    cameraWorker->options = info[0]->Int32Value();

    Nan::AsyncQueueWorker(cameraWorker);
}

/*
 * is_freezeVideo
 */
static INT FreezeVideoAsync(CameraWorker<INT, NoArgument> *worker, Camera *camera, INT *flag) {
    return is_FreezeVideo( camera->hCam, *flag );
}

void Camera::FreezeVideo(const Nan::FunctionCallbackInfo<v8::Value>& info) {
    Nan::HandleScope scope;
    v8::Local<v8::Function> callback = v8::Local<v8::Function>::Cast(info[1]);
    Camera *camera = ObjectWrap::Unwrap<Camera>(info.Holder());

    auto *cameraWorker = new CameraWorker<INT, NoArgument>(new Nan::Callback(callback), camera, &FreezeVideoAsync, NULL);

    cameraWorker->options = info[0]->Int32Value();

    Nan::AsyncQueueWorker(cameraWorker);
}

/*
 * is_captureVideo
 */
static INT CaptureVideoAsync(CameraWorker<INT, NoArgument> *worker, Camera *camera, INT *flag) {
    return is_CaptureVideo( camera->hCam, *flag );
}

void Camera::CaptureVideo(const Nan::FunctionCallbackInfo<v8::Value>& info) {
    Nan::HandleScope scope;
    v8::Local<v8::Function> callback = v8::Local<v8::Function>::Cast(info[1]);
    Camera *camera = ObjectWrap::Unwrap<Camera>(info.Holder());

    auto *cameraWorker = new CameraWorker<INT, NoArgument>(new Nan::Callback(callback), camera, &CaptureVideoAsync, NULL);

    cameraWorker->options = info[0]->Int32Value();

    Nan::AsyncQueueWorker(cameraWorker);
}

/*
 * is_enableEvent
 */
static INT EnableEventAsync(CameraWorker<INT, NoArgument> *worker, Camera *camera, INT *flag) {
    return is_EnableEvent( camera->hCam, *flag );
}

void Camera::EnableEvent(const Nan::FunctionCallbackInfo<v8::Value>& info) {
    Nan::HandleScope scope;
    v8::Local<v8::Function> callback = v8::Local<v8::Function>::Cast(info[1]);
    Camera *camera = ObjectWrap::Unwrap<Camera>(info.Holder());

    auto *cameraWorker = new CameraWorker<INT, NoArgument>(new Nan::Callback(callback), camera, &EnableEventAsync, NULL);

    cameraWorker->options = info[0]->Int32Value();

    Nan::AsyncQueueWorker(cameraWorker);
}

/*
 * is_waitEvent
 */

class WaitEventOptions {
  public:
    int flags;
    int timeout;
};

static INT WaitEventAsync(CameraWorker<WaitEventOptions, NoArgument> *worker, Camera *camera, WaitEventOptions *args) {
    return is_WaitEvent(camera->hCam, args->flags, args->timeout);
}

void Camera::WaitEvent(const Nan::FunctionCallbackInfo<v8::Value>& info) {
    Nan::HandleScope scope;
    v8::Local<v8::Function> callback = v8::Local<v8::Function>::Cast(info[2]);
    Camera *camera = ObjectWrap::Unwrap<Camera>(info.Holder());

    auto *cameraWorker = new CameraWorker<WaitEventOptions, NoArgument>(new Nan::Callback(callback), camera, &WaitEventAsync, NULL);

    cameraWorker->options.flags = info[0]->Int32Value();
    cameraWorker->options.timeout = info[1]->Int32Value();

    Nan::AsyncQueueWorker(cameraWorker);
}



/*
 * SetFocus
 */
static INT SetFocusAsync(CameraWorker<INT, NoArgument> *worker, Camera *camera, INT *focus) {
    return is_Focus(camera->hCam, FOC_CMD_SET_MANUAL_FOCUS, (void*) focus, sizeof(*focus));
}

void Camera::SetFocus(const Nan::FunctionCallbackInfo<v8::Value>& info) {
    Nan::HandleScope scope;
    v8::Local<v8::Function> callback = v8::Local<v8::Function>::Cast(info[1]);
    Camera *camera = ObjectWrap::Unwrap<Camera>(info.Holder());

    auto *cameraWorker = new CameraWorker<INT, NoArgument>(new Nan::Callback(callback), camera, &SetFocusAsync, NULL);

    cameraWorker->options = info[0]->Int32Value();

    Nan::AsyncQueueWorker(cameraWorker);
}

/*
 * SetExposure
 */
static INT SetExposureAsync(CameraWorker<double, NoArgument> *worker, Camera *camera, double *exposure) {
    return is_Exposure(camera->hCam, IS_EXPOSURE_CMD_SET_EXPOSURE, (void*)exposure, sizeof(*exposure));
}

void Camera::SetExposure(const Nan::FunctionCallbackInfo<v8::Value>& info) {
    Nan::HandleScope scope;
    v8::Local<v8::Function> callback = v8::Local<v8::Function>::Cast(info[1]);
    Camera *camera = ObjectWrap::Unwrap<Camera>(info.Holder());

    auto *cameraWorker = new CameraWorker<double, NoArgument>(new Nan::Callback(callback), camera, &SetExposureAsync, NULL);

    cameraWorker->options = info[0]->NumberValue();

    Nan::AsyncQueueWorker(cameraWorker);
}

/*
 * is_SetFrameRate
 */
static INT SetFrameRateAsync(CameraWorker<double, double> *worker, Camera *camera, double *frameRate) {
    return is_SetFrameRate(camera->hCam, *frameRate, &worker->result);
}

static v8::Local<v8::Value> SetFrameRateDone(CameraWorker<double, double> *worker, Camera *camera, double *result) {
    return Nan::New(*result);
}

void Camera::SetFrameRate(const Nan::FunctionCallbackInfo<v8::Value>& info) {
    Nan::HandleScope scope;
    v8::Local<v8::Function> callback = v8::Local<v8::Function>::Cast(info[1]);
    Camera *camera = ObjectWrap::Unwrap<Camera>(info.Holder());

    auto *cameraWorker = new CameraWorker<double, double>(new Nan::Callback(callback), camera, &SetFrameRateAsync, &SetFrameRateDone);

    cameraWorker->options = info[0]->NumberValue();

    Nan::AsyncQueueWorker(cameraWorker);
}

/*
 * GetManualFocus
 */

class ManualFocusResult {
  public:
    UINT min;
    UINT max;
    UINT inc;
    UINT value;
};

static INT GetManualFocusAsync(CameraWorker<NoArgument, ManualFocusResult> *worker, Camera *camera, NoArgument *args) {
    int nRet = is_Focus(camera->hCam, FOC_CMD_GET_MANUAL_FOCUS_MIN, (void*)&worker->result.min, sizeof(worker->result.min));

    if(nRet != IS_SUCCESS) {
        return nRet;
    }
    
    nRet = is_Focus(camera->hCam, FOC_CMD_GET_MANUAL_FOCUS_MAX, (void*)&worker->result.max, sizeof(worker->result.max));

    if(nRet != IS_SUCCESS) {
        return nRet;
    }

    nRet = is_Focus(camera->hCam, FOC_CMD_GET_MANUAL_FOCUS_INC, (void*)&worker->result.inc, sizeof(worker->result.inc));

    if(nRet != IS_SUCCESS) {
        return nRet;
    }

    nRet = is_Focus(camera->hCam, FOC_CMD_GET_MANUAL_FOCUS, (void*)&worker->result.value, sizeof(worker->result.value));

    return nRet;
}

static v8::Local<v8::Value> GetManualFocusDone(CameraWorker<NoArgument, ManualFocusResult> *worker, Camera *camera, ManualFocusResult *result) {
    v8::Local<v8::Object> object = Nan::New<v8::Object>();
    object->Set(Nan::New("min").ToLocalChecked(), Nan::New(result->min));
    object->Set(Nan::New("max").ToLocalChecked(), Nan::New(result->max));
    object->Set(Nan::New("inc").ToLocalChecked(), Nan::New(result->inc));
    object->Set(Nan::New("value").ToLocalChecked(), Nan::New(result->value));
    return object;
}

void Camera::GetManualFocus(const Nan::FunctionCallbackInfo<v8::Value>& info) {
    Nan::HandleScope scope;
    v8::Local<v8::Function> callback = v8::Local<v8::Function>::Cast(info[0]);
    Camera *camera = ObjectWrap::Unwrap<Camera>(info.Holder());

    auto *cameraWorker = new CameraWorker<NoArgument, ManualFocusResult>(new Nan::Callback(callback), camera, &GetManualFocusAsync, &GetManualFocusDone);

    Nan::AsyncQueueWorker(cameraWorker);
}

/*
 * GetExposureRange
 */

class ExposureRangeResult {
  public:
    double range[3];
    double value;
};

static INT GetExposureRangeAsync(CameraWorker<NoArgument, ExposureRangeResult> *worker, Camera *camera, NoArgument *args) {
    int nRet = is_Exposure(camera->hCam, IS_EXPOSURE_CMD_GET_EXPOSURE_RANGE, (void*)&worker->result.range, sizeof(worker->result.range));

    if(nRet != IS_SUCCESS) {
        return nRet;
    }
    
    nRet = is_Exposure(camera->hCam, IS_EXPOSURE_CMD_GET_EXPOSURE, (void*)&worker->result.value, sizeof(worker->result.value));

    return nRet;
}

static v8::Local<v8::Value> GetExposureRangeDone(CameraWorker<NoArgument, ExposureRangeResult> *worker, Camera *camera, ExposureRangeResult *result) {
    v8::Local<v8::Object> object = Nan::New<v8::Object>();
    object->Set(Nan::New("min").ToLocalChecked(), Nan::New(result->range[0]));
    object->Set(Nan::New("max").ToLocalChecked(), Nan::New(result->range[1]));
    object->Set(Nan::New("inc").ToLocalChecked(), Nan::New(result->range[2]));
    object->Set(Nan::New("value").ToLocalChecked(), Nan::New(result->value));
    return object;
}

void Camera::GetExposureRange(const Nan::FunctionCallbackInfo<v8::Value>& info) {
    Nan::HandleScope scope;
    v8::Local<v8::Function> callback = v8::Local<v8::Function>::Cast(info[0]);
    Camera *camera = ObjectWrap::Unwrap<Camera>(info.Holder());

    auto *cameraWorker = new CameraWorker<NoArgument, ExposureRangeResult>(new Nan::Callback(callback), camera, &GetExposureRangeAsync, &GetExposureRangeDone);

    Nan::AsyncQueueWorker(cameraWorker);
}

/*
 * GetCurrentSequence
 */

static INT GetCurrentSequenceAsync(CameraWorker<NoArgument, int> *worker, Camera *camera, NoArgument *args) {
    INT nNum;
    char *pcMem, *pcMemLast;
    int nRet = is_GetActSeqBuf(camera->hCam, &nNum, &pcMem, &pcMemLast);
    if(nRet != IS_SUCCESS) {
        return nRet;
    }

    int n;
    for( n=0 ; n<camera->sequenceLength ; n++)
    {
        if( pcMemLast == camera->pcSeqImgMem[n] )
            break;
    }
    if(n == camera->sequenceLength) {
        return -1;
    }

    worker->result = n;

    return 0;
}

static v8::Local<v8::Value> GetCurrentSequenceDone(CameraWorker<NoArgument, int> *worker, Camera *camera, int *result) {
    return Nan::New(*result);    
}


void Camera::GetCurrentSequence(const Nan::FunctionCallbackInfo<v8::Value>& info) {
    Nan::HandleScope scope;
    v8::Local<v8::Function> callback = v8::Local<v8::Function>::Cast(info[0]);
    Camera *camera = ObjectWrap::Unwrap<Camera>(info.Holder());

    auto *cameraWorker = new CameraWorker<NoArgument, int>(new Nan::Callback(callback), camera, &GetCurrentSequenceAsync, &GetCurrentSequenceDone);

    Nan::AsyncQueueWorker(cameraWorker);
}

/*
 * is_SetColorMode
 */

static INT SetColorModeAsync(CameraWorker<int, NoArgument> *worker, Camera *camera, int *colorMode) {
    return is_SetColorMode(camera->hCam, *colorMode);
}

void Camera::SetColorMode(const Nan::FunctionCallbackInfo<v8::Value>& info) {
    Nan::HandleScope scope;
    v8::Local<v8::Function> callback = v8::Local<v8::Function>::Cast(info[1]);
    Camera *camera = ObjectWrap::Unwrap<Camera>(info.Holder());

    auto *cameraWorker = new CameraWorker<int, NoArgument>(new Nan::Callback(callback), camera, &SetColorModeAsync, NULL);

    cameraWorker->options = info[0]->Int32Value();

    Nan::AsyncQueueWorker(cameraWorker);
}

/*
 * allocSequence
 */

class AllocSequenceOptions {
  public:
    INT bitsPerPixel;
    INT length;
};

static INT AllocSequenceAsync(CameraWorker<AllocSequenceOptions, NoArgument> *worker, Camera *camera, AllocSequenceOptions *options) {
   camera->sequenceLength = options->length;
   INT m_Ret;

   for(int i=0; i<options->length  ; i++ )
   {
       // allocate buffer memory
       m_Ret = is_AllocImageMem(camera->hCam,
           camera->sizeX,
           camera->sizeY,
           options->bitsPerPixel,
           &camera->pcSeqImgMem[i],
           &camera->lSeqMemId[i]);

       if( m_Ret != IS_SUCCESS )
       {
           return m_Ret;
       }

       // put memory into seq buffer
       m_Ret = is_AddToSequence( camera->hCam, camera->pcSeqImgMem[i], camera->lSeqMemId[i] );
       camera->nSeqNumId[i] = i+1; // store sequence buffer number Id
       if( m_Ret != IS_SUCCESS )
       {
           // free latest buffer
           is_FreeImageMem( camera->hCam, camera->pcSeqImgMem[i], camera->lSeqMemId[i] );
           return m_Ret;
       }
   }

   return 0;
}

void Camera::AllocSequence(const Nan::FunctionCallbackInfo<v8::Value>& info) {
    Nan::HandleScope scope;
    v8::Local<v8::Function> callback = v8::Local<v8::Function>::Cast(info[1]);
    Camera *camera = ObjectWrap::Unwrap<Camera>(info.Holder());

    auto *cameraWorker = new CameraWorker<AllocSequenceOptions, NoArgument>(new Nan::Callback(callback), camera, &AllocSequenceAsync, NULL);

    v8::Local<v8::Object> options = info[0]->ToObject();

    cameraWorker->options.bitsPerPixel = Nan::Get(options, Nan::New("bitsPerPixel").ToLocalChecked()).ToLocalChecked()->Int32Value();
    cameraWorker->options.length = Nan::Get(options, Nan::New("length").ToLocalChecked()).ToLocalChecked()->Int32Value();

    Nan::AsyncQueueWorker(cameraWorker);
}

/*
 * is_InitCamera
 */

static INT InitCameraAsync(CameraWorker<NoArgument, bool> *worker, Camera *camera, NoArgument *args) {
    camera->hCam = (HIDS) 0;
    INT ret = is_InitCamera(&camera->hCam, NULL);

    worker->result = (ret == 0);
    return ret;
}

static v8::Local<v8::Value> InitCameraDone(CameraWorker<NoArgument, bool> *worker, Camera *camera, bool *result) {
    return Nan::New(*result);
}

void Camera::InitCamera(const Nan::FunctionCallbackInfo<v8::Value>& info) {
    Nan::HandleScope scope;
    v8::Local<v8::Function> callback = v8::Local<v8::Function>::Cast(info[0]);
    Camera *camera = ObjectWrap::Unwrap<Camera>(info.Holder());

    auto *cameraWorker = new CameraWorker<NoArgument, bool>(new Nan::Callback(callback), camera, &InitCameraAsync, &InitCameraDone);
    Nan::AsyncQueueWorker(cameraWorker);
}

/*
 * FullManualMode
 */

class FullManualResult {
  public:
    int whiteBalance;
    int sensorWhiteBalance;
    int frameRate;
    int sensorFrameRate;
    int gain;
    int sensorGain;
    int shutter;
    int sensorShutter;
    int sensorGainShutter;
};

static INT FullManualModeAsync(CameraWorker<NoArgument, FullManualResult> *worker, Camera *camera, NoArgument *args) {
    double dNull = 0;
    double dDisabled = 0;
    double dEnabled = 1;

    worker->result.whiteBalance = is_SetAutoParameter(camera->hCam, IS_SET_ENABLE_AUTO_WHITEBALANCE, &dDisabled, &dNull);
    worker->result.sensorWhiteBalance = is_SetAutoParameter(camera->hCam, IS_SET_ENABLE_AUTO_SENSOR_WHITEBALANCE, &dDisabled, &dNull);
    worker->result.frameRate = is_SetAutoParameter(camera->hCam, IS_SET_ENABLE_AUTO_FRAMERATE, &dDisabled, &dNull);
    worker->result.sensorFrameRate = is_SetAutoParameter(camera->hCam, IS_SET_ENABLE_AUTO_SENSOR_FRAMERATE, &dDisabled, &dNull);
    worker->result.gain = is_SetAutoParameter(camera->hCam, IS_SET_ENABLE_AUTO_GAIN, &dDisabled, &dNull);
    worker->result.sensorGain = is_SetAutoParameter(camera->hCam, IS_SET_ENABLE_AUTO_SENSOR_GAIN, &dDisabled, &dNull);
    worker->result.shutter = is_SetAutoParameter(camera->hCam, IS_SET_ENABLE_AUTO_SHUTTER, &dDisabled, &dNull);
    worker->result.sensorShutter = is_SetAutoParameter(camera->hCam, IS_SET_ENABLE_AUTO_SENSOR_SHUTTER, &dDisabled, &dNull);
    worker->result.sensorGainShutter = is_SetAutoParameter(camera->hCam, IS_SET_ENABLE_AUTO_SENSOR_GAIN_SHUTTER, &dDisabled, &dNull);

    return 0;
}

static v8::Local<v8::Value> FullManualModeDone(CameraWorker<NoArgument, FullManualResult> *worker, Camera *camera, FullManualResult *result) {
    v8::Local<v8::Object> object = Nan::New<v8::Object>();
    object->Set(Nan::New("whiteBalance").ToLocalChecked(), Nan::New(result->whiteBalance));
    object->Set(Nan::New("sensorWhiteBalance").ToLocalChecked(), Nan::New(result->sensorWhiteBalance));
    object->Set(Nan::New("frameRate").ToLocalChecked(), Nan::New(result->frameRate));
    object->Set(Nan::New("sensorFrameRate").ToLocalChecked(), Nan::New(result->sensorFrameRate));
    object->Set(Nan::New("gain").ToLocalChecked(), Nan::New(result->gain));
    object->Set(Nan::New("sensorGain").ToLocalChecked(), Nan::New(result->sensorGain));
    object->Set(Nan::New("shutter").ToLocalChecked(), Nan::New(result->shutter));
    object->Set(Nan::New("sensorShutter").ToLocalChecked(), Nan::New(result->sensorShutter));
    object->Set(Nan::New("sensorGainShutter").ToLocalChecked(), Nan::New(result->sensorGainShutter));
    return object;
}



void Camera::FullManualMode(const Nan::FunctionCallbackInfo<v8::Value>& info) {
    Nan::HandleScope scope;
    v8::Local<v8::Function> callback = v8::Local<v8::Function>::Cast(info[0]);
    Camera *camera = ObjectWrap::Unwrap<Camera>(info.Holder());

    auto *cameraWorker = new CameraWorker<NoArgument, FullManualResult>(new Nan::Callback(callback), camera, &FullManualModeAsync, &FullManualModeDone);
    Nan::AsyncQueueWorker(cameraWorker);
}

/*
 * is_ExitCamera
 */

static INT ExitCameraAsync(CameraWorker<NoArgument, NoArgument> *worker, Camera *camera, NoArgument *args) {
    if(camera->hCam != 0) {
        INT ret = is_ExitCamera( camera->hCam );
        camera->hCam = 0;
        return ret;
    }

    return -1;
}

void Camera::ExitCamera(const Nan::FunctionCallbackInfo<v8::Value>& info) {
    Nan::HandleScope scope;
    v8::Local<v8::Function> callback = v8::Local<v8::Function>::Cast(info[0]);
    Camera *camera = ObjectWrap::Unwrap<Camera>(info.Holder());

    auto *cameraWorker = new CameraWorker<NoArgument, NoArgument>(new Nan::Callback(callback), camera, &ExitCameraAsync, NULL);
    Nan::AsyncQueueWorker(cameraWorker);
}

}  // namespace ids
