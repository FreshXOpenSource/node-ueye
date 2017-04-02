cmake_minimum_required (VERSION 2.8.11)
project (cam)

add_library (ueyefx SHARED src/ueye.cc)

target_link_libraries (ueyefx ueye_api)
