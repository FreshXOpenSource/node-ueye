#include <uEye.h>
#include <stdlib.h>
#include <iostream>
#include <string>
#include <sstream>

using namespace std;

extern "C" IDSEXP fx_Calibrate (HIDS hCam, int *focus, double *exposure) {
    double on = 1.0;
    double off = 1.0;
    IDSEXP nRet = 0;

    nRet = is_SetAutoParameter(hCam, IS_SET_ENABLE_AUTO_SENSOR_GAIN_SHUTTER, &on, NULL);
    if(nRet != IS_SUCCESS) return nRet;
 
    nRet = is_Focus(hCam, FOC_CMD_SET_ENABLE_AUTOFOCUS, NULL, 0);
    if(nRet != IS_SUCCESS) return nRet;

    nRet = is_WaitEvent(hCam, IS_SET_EVENT_FRAME, 1000);
    if(nRet != IS_SUCCESS) return nRet;

    nRet = is_Focus(hCam, FOC_CMD_GET_MANUAL_FOCUS, focus, sizeof(int));
    if(nRet != IS_SUCCESS) return nRet;

    nRet = is_Exposure(hCam, IS_EXPOSURE_CMD_GET_EXPOSURE, exposure, sizeof(double));
    if(nRet != IS_SUCCESS) return nRet;

    nRet = is_SetAutoParameter(hCam, IS_SET_ENABLE_AUTO_SENSOR_GAIN_SHUTTER, &off, NULL);
    if(nRet != IS_SUCCESS) return nRet;

    nRet = is_Focus(hCam, FOC_CMD_SET_DISABLE_AUTOFOCUS, NULL, 0);
    if(nRet != IS_SUCCESS) return nRet;

    nRet = is_Focus(hCam, FOC_CMD_SET_MANUAL_FOCUS, focus, sizeof(int));
    if(nRet != IS_SUCCESS) return nRet;

    nRet = is_Exposure(hCam, IS_EXPOSURE_CMD_SET_EXPOSURE, exposure, sizeof(double));
    if(nRet != IS_SUCCESS) return nRet;

    return is_WaitEvent(hCam, IS_SET_EVENT_FRAME, 1000);
}
