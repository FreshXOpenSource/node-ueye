// cameraWorker.h
#ifndef CAMERAWORKER_H
#define CAMERAWORKER_H

#include <typeinfo>
#include <uEye.h>
#include <nan.h>

namespace ids {

class NoArgument {
};

class Camera;

template < typename OPTIONS_T, typename RESULT_T > 
class CameraWorker : public Nan::AsyncWorker {
 typedef INT (*WorkerFunction)(CameraWorker<OPTIONS_T, RESULT_T> *, Camera *, OPTIONS_T *);
 typedef v8::Local<v8::Value> (*DoneFunction)(CameraWorker<OPTIONS_T, RESULT_T> *, Camera *, RESULT_T *);

 public:
  CameraWorker(Nan::Callback *callback, Camera *camera, WorkerFunction workerFunction, DoneFunction doneFunction)
    : AsyncWorker(callback), camera(camera), workerFunction(workerFunction), doneFunction(doneFunction) {
  }

  void Execute() {
    nRet = workerFunction(this, camera, &options);
  }

  void HandleOKCallback() {
    Nan::HandleScope scope;

    if(doneFunction == NULL) {
        v8::Local<v8::Value> argv[] = {
            Nan::New(nRet),
            Nan::Undefined()
        };

        callback->Call(2, argv);
    } else {
        v8::Local<v8::Value> argv[] = {
            Nan::New(nRet),
            doneFunction(this, camera, &result)
        };
    
        callback->Call(2, argv);
    }
  }

  ~CameraWorker() {
  }

  OPTIONS_T options;
  RESULT_T result;
  INT nRet;

 private:
  Camera *camera;
  WorkerFunction workerFunction;
  DoneFunction doneFunction;
};

}  // namespace ids

#endif
