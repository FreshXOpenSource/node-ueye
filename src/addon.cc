// addon.cc
#include <nan.h>
#include "camera.h"

namespace ids {

using v8::Local;
using v8::Object;

void InitAll(Local<Object> exports) {
  Camera::Init(exports);
}

NODE_MODULE(addon, InitAll)

}  // namespace ids
