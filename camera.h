// camera.h
#ifndef CAMERA_H
#define CAMERA_H

#include <uEye.h>
#include <nan.h>

#define MAX_SEQ_BUFFERS 256

namespace ids {

class Camera : public node::ObjectWrap {
 public:
  static void Init(v8::Local<v8::Object> exports);

  HIDS hCam;

  // memory and sequence buffers
  INT lSeqMemId[MAX_SEQ_BUFFERS];   // camera memory - buffer ID
  char* pcSeqImgMem[MAX_SEQ_BUFFERS]; // camera memory - pointer to buffer
  int nSeqNumId[MAX_SEQ_BUFFERS];   // varibale to hold the number of the sequence buffer Id

  INT sizeX;
  INT sizeY;
  INT sequenceLength;

 private:
  explicit Camera();
  ~Camera();

  static void New(const Nan::FunctionCallbackInfo<v8::Value>& args);

  static void InitCamera(const Nan::FunctionCallbackInfo<v8::Value>& args);
  static void ExitCamera(const Nan::FunctionCallbackInfo<v8::Value>& args);
  static void GetMaxImageSize(const Nan::FunctionCallbackInfo<v8::Value>& args);
  static void SetColorMode(const Nan::FunctionCallbackInfo<v8::Value>& args);
  static void AllocSequence(const Nan::FunctionCallbackInfo<v8::Value>& args);

  static void AOIImageSetSize(const Nan::FunctionCallbackInfo<v8::Value>& args);
  static void SetDisplayMode(const Nan::FunctionCallbackInfo<v8::Value>& args);
  static void SetFrameRate(const Nan::FunctionCallbackInfo<v8::Value>& args);

  static void GetManualFocus(const Nan::FunctionCallbackInfo<v8::Value>& args);
  static void SetFocus(const Nan::FunctionCallbackInfo<v8::Value>& args);
  static void GetExposureRange(const Nan::FunctionCallbackInfo<v8::Value>& args);
  static void SetExposure(const Nan::FunctionCallbackInfo<v8::Value>& args);

  static void FullManualMode(const Nan::FunctionCallbackInfo<v8::Value>& args);
  // static void SetAutoParameter(const Nan::FunctionCallbackInfo<v8::Value>& args);
  static void CaptureVideo(const Nan::FunctionCallbackInfo<v8::Value>& args);
  static void EnableEvent(const Nan::FunctionCallbackInfo<v8::Value>& args);
  static void WaitEvent(const Nan::FunctionCallbackInfo<v8::Value>& args);

  static void GetCurrentSequence(const Nan::FunctionCallbackInfo<v8::Value>& args);
  static void LockSeqBuf(const Nan::FunctionCallbackInfo<v8::Value>& args);
  static void UnlockSeqBuf(const Nan::FunctionCallbackInfo<v8::Value>& args);
  static void SaveToFile(const Nan::FunctionCallbackInfo<v8::Value>& args);
  static void GetSeqBuf(const Nan::FunctionCallbackInfo<v8::Value>& args);

  static void FreezeVideo(const Nan::FunctionCallbackInfo<v8::Value>& args);
  static void GetActiveImageMem(const Nan::FunctionCallbackInfo<v8::Value>& args);
  static void SetImageMem(const Nan::FunctionCallbackInfo<v8::Value>& args);

  static Nan::Persistent<v8::Function> constructor;
};

}  // namespace ids

#endif
