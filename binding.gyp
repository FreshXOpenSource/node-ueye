{
  "targets": [
    {
      "target_name": "addon",
      "sources": [ "src/addon.cc", "src/camera.cc" ],
      "cflags": ["-Wall", "-std=c++11"],
      "cflags_cc!": [ "-fno-rtti" ],
      "include_dirs" : ["<!(node -e \"require('nan')\")"],
      "libraries": [
        "-lueye_api"
      ]
    }
  ]
}
