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
    if(nRet != IS_SUCCESS) return 1000 + nRet;

    nRet = is_EnableEvent(hCam, IS_SET_EVENT_AUTOFOCUS_FINISHED);
    if(nRet != IS_SUCCESS) return 3000 + nRet;

    nRet = is_Focus(hCam, FOC_CMD_SET_ENABLE_AUTOFOCUS_ONCE, NULL, 0);
    if(nRet != IS_SUCCESS) return 2000 + nRet;

    // INT nValue = 0;
    // nRet = is_Focus(hCam, FOC_CMD_GET_AUTOFOCUS_STATUS, (void*)&nValue, sizeof(nValue));
    // cout << "FocusStatus: " << nValue << endl;

    nRet = is_WaitEvent(hCam, IS_SET_EVENT_AUTOFOCUS_FINISHED, 10000);
    if(nRet != IS_SUCCESS) return 4000 + nRet;

    nRet = is_DisableEvent(hCam, IS_SET_EVENT_AUTOFOCUS_FINISHED);
    if(nRet != IS_SUCCESS) return 5000 + nRet;

    nRet = is_Focus(hCam, FOC_CMD_GET_MANUAL_FOCUS, focus, sizeof(int));
    if(nRet != IS_SUCCESS) return 6000 + nRet;

    nRet = is_Exposure(hCam, IS_EXPOSURE_CMD_GET_EXPOSURE, exposure, sizeof(double));
    if(nRet != IS_SUCCESS) return 7000 + nRet;

    nRet = is_SetAutoParameter(hCam, IS_SET_ENABLE_AUTO_SENSOR_GAIN_SHUTTER, &off, NULL);
    if(nRet != IS_SUCCESS) return 8000 + nRet;

    nRet = is_Focus(hCam, FOC_CMD_SET_MANUAL_FOCUS, focus, sizeof(int));
    if(nRet != IS_SUCCESS) return 9000 + nRet;

    nRet = is_Exposure(hCam, IS_EXPOSURE_CMD_SET_EXPOSURE, exposure, sizeof(double));
    if(nRet != IS_SUCCESS) return 10000 + nRet;

    nRet = is_WaitEvent(hCam, IS_SET_EVENT_FRAME, 5000);
    if(nRet != IS_SUCCESS) return 11000 + nRet;

    return nRet;
}
