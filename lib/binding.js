var FFI = require('ffi'),
    ArrayType = require('ref-array'),
    Struct = require('ref-struct'),
    ref = require('ref'),
    fs = require('fs');

var voidPtr = ref.refType(ref.types.void);

exports.CONSTANTS = {
};

var wchar_t = exports.wchar_t = voidPtr;
var wchar_tPtr = exports.wchar_tPtr = ref.refType(wchar_t);
var __locale_t = exports.__locale_t = voidPtr;
var __locale_tPtr = exports.__locale_tPtr = ref.refType(__locale_t);
var mbstate_t = exports.mbstate_t = voidPtr;
var mbstate_tPtr = exports.mbstate_tPtr = ref.refType(mbstate_t);
var __FILE = exports.__FILE = voidPtr;
var __FILEPtr = exports.__FILEPtr = ref.refType(__FILE);
var size_t = exports.size_t = voidPtr;
var size_tPtr = exports.size_tPtr = ref.refType(size_t);
var __va_list = exports.__va_list = Struct({
  __ap: voidPtr,
});
var __va_listPtr = exports.__va_listPtr = ref.refType(__va_list);
var INT = exports.INT = Struct({
  int32_t: ref.types.int32,
});
var INTPtr = exports.INTPtr = ref.refType(INT);
var BOOL = exports.BOOL = Struct({
  int32_t: ref.types.int32,
});
var BOOLPtr = exports.BOOLPtr = ref.refType(BOOL);
var HWND = exports.HWND = voidPtr;
var HWNDPtr = exports.HWNDPtr = ref.refType(HWND);
var HANDLE = exports.HANDLE = voidPtr;
var HANDLEPtr = exports.HANDLEPtr = ref.refType(HANDLE);
var HIDS = exports.HIDS = Struct({
  DWORD: ref.types.uint32,
});
var HIDSPtr = exports.HIDSPtr = ref.refType(HIDS);
var PBOARDINFO = exports.PBOARDINFO = voidPtr;
var PBOARDINFOPtr = exports.PBOARDINFOPtr = ref.refType(PBOARDINFO);
var PSENSORINFO = exports.PSENSORINFO = voidPtr;
var PSENSORINFOPtr = exports.PSENSORINFOPtr = ref.refType(PSENSORINFO);
var PREVISIONINFO = exports.PREVISIONINFO = voidPtr;
var PREVISIONINFOPtr = exports.PREVISIONINFOPtr = ref.refType(PREVISIONINFO);
var PUEYE_CAMERA_LIST = exports.PUEYE_CAMERA_LIST = voidPtr;
var PUEYE_CAMERA_LISTPtr = exports.PUEYE_CAMERA_LISTPtr = ref.refType(PUEYE_CAMERA_LIST);
var UEYE_AUTO_INFO = exports.UEYE_AUTO_INFO = voidPtr;
var UEYE_AUTO_INFOPtr = exports.UEYE_AUTO_INFOPtr = ref.refType(UEYE_AUTO_INFO);
var DWORD = exports.DWORD = Struct({
  uint32_t: ref.types.uint32,
});
var DWORDPtr = exports.DWORDPtr = ref.refType(DWORD);
var WORD = exports.WORD = Struct({
  uint16_t: ref.types.ushort,
});
var WORDPtr = exports.WORDPtr = ref.refType(WORD);
var BYTE = exports.BYTE = voidPtr;
var BYTEPtr = exports.BYTEPtr = ref.refType(BYTE);
var KNEEPOINTARRAY = exports.KNEEPOINTARRAY = voidPtr;
var KNEEPOINTARRAYPtr = exports.KNEEPOINTARRAYPtr = ref.refType(KNEEPOINTARRAY);
var KNEEPOINTINFO = exports.KNEEPOINTINFO = voidPtr;
var KNEEPOINTINFOPtr = exports.KNEEPOINTINFOPtr = ref.refType(KNEEPOINTINFO);
var UINT = exports.UINT = Struct({
  uint32_t: ref.types.uint32,
});
var UINTPtr = exports.UINTPtr = ref.refType(UINT);
var SENSORSCALERINFO = exports.SENSORSCALERINFO = voidPtr;
var SENSORSCALERINFOPtr = exports.SENSORSCALERINFOPtr = ref.refType(SENSORSCALERINFO);
var UEYEIMAGEINFO = exports.UEYEIMAGEINFO = voidPtr;
var UEYEIMAGEINFOPtr = exports.UEYEIMAGEINFOPtr = ref.refType(UEYEIMAGEINFO);
var CHAR = exports.CHAR = voidPtr;
var CHARPtr = exports.CHARPtr = ref.refType(CHAR);

var localExists = fs.existsSync('./build/libueyefx.so');

exports.libueye = new FFI.Library(localExists ? './build/libueyefx' : 'libueye_api', {
  fx_Calibrate: [ref.types.int32, [
    ref.types.uint32,
    ref.refType(ref.types.uint32),
    ref.refType(ref.types.double),
  ]],
  access: [ref.types.int32, [
    ref.refType(ref.types.uchar),
    ref.types.int32,
  ]],
  faccessat: [ref.types.int32, [
    ref.types.int32,
    ref.refType(ref.types.uchar),
    ref.types.int32,
    ref.types.int32,
  ]],
  lseek: [ref.types.long, [
    ref.types.int32,
    ref.types.long,
    ref.types.int32,
  ]],
  close: [ref.types.int32, [
    ref.types.int32,
  ]],
  read: [ref.types.int32, [
    ref.types.int32,
    voidPtr,
    ref.types.uint32,
  ]],
  write: [ref.types.int32, [
    ref.types.int32,
    voidPtr,
    ref.types.uint32,
  ]],
  pread: [ref.types.int32, [
    ref.types.int32,
    voidPtr,
    ref.types.uint32,
    ref.types.long,
  ]],
  pwrite: [ref.types.int32, [
    ref.types.int32,
    voidPtr,
    ref.types.uint32,
    ref.types.long,
  ]],
  pipe: [ref.types.int32, [
    ref.types.int32,
  ]],
  alarm: [ref.types.uint32, [
    ref.types.uint32,
  ]],
  sleep: [ref.types.uint32, [
    ref.types.uint32,
  ]],
  ualarm: [ref.types.uint32, [
    ref.types.uint32,
    ref.types.uint32,
  ]],
  usleep: [ref.types.int32, [
    ref.types.uint32,
  ]],
  pause: [ref.types.int32, [
  ]],
  chown: [ref.types.int32, [
    ref.refType(ref.types.uchar),
    ref.types.uint32,
    ref.types.uint32,
  ]],
  fchown: [ref.types.int32, [
    ref.types.int32,
    ref.types.uint32,
    ref.types.uint32,
  ]],
  lchown: [ref.types.int32, [
    ref.refType(ref.types.uchar),
    ref.types.uint32,
    ref.types.uint32,
  ]],
  fchownat: [ref.types.int32, [
    ref.types.int32,
    ref.refType(ref.types.uchar),
    ref.types.uint32,
    ref.types.uint32,
    ref.types.int32,
  ]],
  chdir: [ref.types.int32, [
    ref.refType(ref.types.uchar),
  ]],
  fchdir: [ref.types.int32, [
    ref.types.int32,
  ]],
  getcwd: [ref.refType(ref.types.uchar), [
    ref.refType(ref.types.uchar),
    ref.types.uint32,
  ]],
  getwd: [ref.refType(ref.types.uchar), [
    ref.refType(ref.types.uchar),
  ]],
  dup: [ref.types.int32, [
    ref.types.int32,
  ]],
  dup2: [ref.types.int32, [
    ref.types.int32,
    ref.types.int32,
  ]],
  execle: [ref.types.int32, [
    ref.refType(ref.types.uchar),
    ref.refType(ref.types.uchar),
  ]],
  execl: [ref.types.int32, [
    ref.refType(ref.types.uchar),
    ref.refType(ref.types.uchar),
  ]],
  execlp: [ref.types.int32, [
    ref.refType(ref.types.uchar),
    ref.refType(ref.types.uchar),
  ]],
  nice: [ref.types.int32, [
    ref.types.int32,
  ]],
  _exit: [ref.types.void, [
    ref.types.int32,
  ]],
  pathconf: [ref.types.long, [
    ref.refType(ref.types.uchar),
    ref.types.int32,
  ]],
  fpathconf: [ref.types.long, [
    ref.types.int32,
    ref.types.int32,
  ]],
  sysconf: [ref.types.long, [
    ref.types.int32,
  ]],
  confstr: [ref.types.uint32, [
    ref.types.int32,
    ref.refType(ref.types.uchar),
    ref.types.uint32,
  ]],
  getpid: [ref.types.int32, [
  ]],
  getppid: [ref.types.int32, [
  ]],
  getpgrp: [ref.types.int32, [
  ]],
  __getpgid: [ref.types.int32, [
    ref.types.int32,
  ]],
  getpgid: [ref.types.int32, [
    ref.types.int32,
  ]],
  setpgid: [ref.types.int32, [
    ref.types.int32,
    ref.types.int32,
  ]],
  setpgrp: [ref.types.int32, [
  ]],
  setsid: [ref.types.int32, [
  ]],
  getsid: [ref.types.int32, [
    ref.types.int32,
  ]],
  getuid: [ref.types.uint32, [
  ]],
  geteuid: [ref.types.uint32, [
  ]],
  getgid: [ref.types.uint32, [
  ]],
  getegid: [ref.types.uint32, [
  ]],
  setuid: [ref.types.int32, [
    ref.types.uint32,
  ]],
  setreuid: [ref.types.int32, [
    ref.types.uint32,
    ref.types.uint32,
  ]],
  seteuid: [ref.types.int32, [
    ref.types.uint32,
  ]],
  setgid: [ref.types.int32, [
    ref.types.uint32,
  ]],
  setregid: [ref.types.int32, [
    ref.types.uint32,
    ref.types.uint32,
  ]],
  setegid: [ref.types.int32, [
    ref.types.uint32,
  ]],
  fork: [ref.types.int32, [
  ]],
  vfork: [ref.types.int32, [
  ]],
  ttyname: [ref.refType(ref.types.uchar), [
    ref.types.int32,
  ]],
  ttyname_r: [ref.types.int32, [
    ref.types.int32,
    ref.refType(ref.types.uchar),
    ref.types.uint32,
  ]],
  isatty: [ref.types.int32, [
    ref.types.int32,
  ]],
  ttyslot: [ref.types.int32, [
  ]],
  link: [ref.types.int32, [
    ref.refType(ref.types.uchar),
    ref.refType(ref.types.uchar),
  ]],
  linkat: [ref.types.int32, [
    ref.types.int32,
    ref.refType(ref.types.uchar),
    ref.types.int32,
    ref.refType(ref.types.uchar),
    ref.types.int32,
  ]],
  symlink: [ref.types.int32, [
    ref.refType(ref.types.uchar),
    ref.refType(ref.types.uchar),
  ]],
  readlink: [ref.types.int32, [
    ref.refType(ref.types.uchar),
    ref.refType(ref.types.uchar),
    ref.types.uint32,
  ]],
  symlinkat: [ref.types.int32, [
    ref.refType(ref.types.uchar),
    ref.types.int32,
    ref.refType(ref.types.uchar),
  ]],
  readlinkat: [ref.types.int32, [
    ref.types.int32,
    ref.refType(ref.types.uchar),
    ref.refType(ref.types.uchar),
    ref.types.uint32,
  ]],
  unlink: [ref.types.int32, [
    ref.refType(ref.types.uchar),
  ]],
  unlinkat: [ref.types.int32, [
    ref.types.int32,
    ref.refType(ref.types.uchar),
    ref.types.int32,
  ]],
  rmdir: [ref.types.int32, [
    ref.refType(ref.types.uchar),
  ]],
  tcgetpgrp: [ref.types.int32, [
    ref.types.int32,
  ]],
  tcsetpgrp: [ref.types.int32, [
    ref.types.int32,
    ref.types.int32,
  ]],
  getlogin: [ref.refType(ref.types.uchar), [
  ]],
  getlogin_r: [ref.types.int32, [
    ref.refType(ref.types.uchar),
    ref.types.uint32,
  ]],
  setlogin: [ref.types.int32, [
    ref.refType(ref.types.uchar),
  ]],
  getopt: [ref.types.int32, [
    ref.types.int32,
    voidPtr,
    ref.refType(ref.types.uchar),
  ]],
  gethostname: [ref.types.int32, [
    ref.refType(ref.types.uchar),
    ref.types.uint32,
  ]],
  sethostname: [ref.types.int32, [
    ref.refType(ref.types.uchar),
    ref.types.uint32,
  ]],
  sethostid: [ref.types.int32, [
    ref.types.long,
  ]],
  getdomainname: [ref.types.int32, [
    ref.refType(ref.types.uchar),
    ref.types.uint32,
  ]],
  setdomainname: [ref.types.int32, [
    ref.refType(ref.types.uchar),
    ref.types.uint32,
  ]],
  vhangup: [ref.types.int32, [
  ]],
  revoke: [ref.types.int32, [
    ref.refType(ref.types.uchar),
  ]],
  profil: [ref.types.int32, [
    ref.refType(ref.types.ushort),
    ref.types.uint32,
    ref.types.uint32,
    ref.types.uint32,
  ]],
  acct: [ref.types.int32, [
    ref.refType(ref.types.uchar),
  ]],
  getusershell: [ref.refType(ref.types.uchar), [
  ]],
  endusershell: [ref.types.void, [
  ]],
  setusershell: [ref.types.void, [
  ]],
  daemon: [ref.types.int32, [
    ref.types.int32,
    ref.types.int32,
  ]],
  chroot: [ref.types.int32, [
    ref.refType(ref.types.uchar),
  ]],
  getpass: [ref.refType(ref.types.uchar), [
    ref.refType(ref.types.uchar),
  ]],
  fsync: [ref.types.int32, [
    ref.types.int32,
  ]],
  gethostid: [ref.types.long, [
  ]],
  sync: [ref.types.void, [
  ]],
  getpagesize: [ref.types.int32, [
  ]],
  getdtablesize: [ref.types.int32, [
  ]],
  truncate: [ref.types.int32, [
    ref.refType(ref.types.uchar),
    ref.types.long,
  ]],
  ftruncate: [ref.types.int32, [
    ref.types.int32,
    ref.types.long,
  ]],
  brk: [ref.types.int32, [
    voidPtr,
  ]],
  sbrk: [voidPtr, [
    ref.types.int32,
  ]],
  syscall: [ref.types.long, [
    ref.types.long,
  ]],
  lockf: [ref.types.int32, [
    ref.types.int32,
    ref.types.int32,
    ref.types.long,
  ]],
  fdatasync: [ref.types.int32, [
    ref.types.int32,
  ]],
  wcscpy: [wchar_t, [
    wchar_tPtr,
    wchar_tPtr,
  ]],
  wcsncpy: [wchar_tPtr, [
    wchar_tPtr,
    wchar_tPtr,
    ref.types.uint32,
  ]],
  wcscat: [wchar_tPtr, [
    wchar_tPtr,
    wchar_tPtr,
  ]],
  wcsncat: [wchar_tPtr, [
    wchar_tPtr,
    wchar_tPtr,
    ref.types.uint32,
  ]],
  wcscmp: [ref.types.int32, [
    wchar_tPtr,
    wchar_tPtr,
  ]],
  wcsncmp: [ref.types.int32, [
    wchar_tPtr,
    wchar_tPtr,
    ref.types.uint32,
  ]],
  wcscasecmp: [ref.types.int32, [
    wchar_tPtr,
    wchar_tPtr,
  ]],
  wcsncasecmp: [ref.types.int32, [
    wchar_tPtr,
    wchar_tPtr,
    ref.types.uint32,
  ]],
  wcscasecmp_l: [ref.types.int32, [
    wchar_tPtr,
    wchar_tPtr,
    __locale_t,
  ]],
  wcsncasecmp_l: [ref.types.int32, [
    wchar_tPtr,
    wchar_tPtr,
    ref.types.uint32,
    __locale_t,
  ]],
  wcscoll: [ref.types.int32, [
    wchar_tPtr,
    wchar_tPtr,
  ]],
  wcsxfrm: [ref.types.uint32, [
    wchar_tPtr,
    wchar_tPtr,
    ref.types.uint32,
  ]],
  wcscoll_l: [ref.types.int32, [
    wchar_tPtr,
    wchar_tPtr,
    __locale_t,
  ]],
  wcsxfrm_l: [ref.types.uint32, [
    wchar_tPtr,
    wchar_tPtr,
    ref.types.uint32,
    __locale_t,
  ]],
  wcsdup: [wchar_tPtr, [
    wchar_tPtr,
  ]],
  wcschr: [wchar_tPtr, [
    wchar_tPtr,
    ref.types.uint32,
  ]],
  wcsrchr: [wchar_tPtr, [
    wchar_tPtr,
    ref.types.uint32,
  ]],
  wcscspn: [ref.types.uint32, [
    wchar_tPtr,
    wchar_tPtr,
  ]],
  wcsspn: [ref.types.uint32, [
    wchar_tPtr,
    wchar_tPtr,
  ]],
  wcspbrk: [wchar_tPtr, [
    wchar_tPtr,
    wchar_tPtr,
  ]],
  wcsstr: [wchar_tPtr, [
    wchar_tPtr,
    wchar_tPtr,
  ]],
  wcstok: [wchar_tPtr, [
    wchar_tPtr,
    wchar_tPtr,
    voidPtr,
  ]],
  wcslen: [ref.types.uint32, [
    wchar_tPtr,
  ]],
  wcsnlen: [ref.types.uint32, [
    wchar_tPtr,
    ref.types.uint32,
  ]],
  wmemchr: [wchar_tPtr, [
    wchar_tPtr,
    ref.types.uint32,
    ref.types.uint32,
  ]],
  wmemcmp: [ref.types.int32, [
    wchar_tPtr,
    wchar_tPtr,
    ref.types.uint32,
  ]],
  wmemcpy: [wchar_tPtr, [
    wchar_tPtr,
    wchar_tPtr,
    ref.types.uint32,
  ]],
  wmemmove: [wchar_tPtr, [
    wchar_tPtr,
    wchar_tPtr,
    ref.types.uint32,
  ]],
  wmemset: [wchar_tPtr, [
    wchar_tPtr,
    ref.types.uint32,
    ref.types.uint32,
  ]],
  btowc: [ref.types.uint32, [
    ref.types.int32,
  ]],
  wctob: [ref.types.int32, [
    ref.types.uint32,
  ]],
  mbsinit: [ref.types.int32, [
    mbstate_t,
  ]],
  mbrtowc: [ref.types.uint32, [
    wchar_tPtr,
    ref.refType(ref.types.uchar),
    ref.types.uint32,
    mbstate_tPtr,
  ]],
  wcrtomb: [ref.types.uint32, [
    ref.refType(ref.types.uchar),
    ref.types.uint32,
    mbstate_tPtr,
  ]],
  __mbrlen: [ref.types.uint32, [
    ref.refType(ref.types.uchar),
    ref.types.uint32,
    mbstate_tPtr,
  ]],
  mbrlen: [ref.types.uint32, [
    ref.refType(ref.types.uchar),
    ref.types.uint32,
    mbstate_tPtr,
  ]],
  mbsrtowcs: [ref.types.uint32, [
    wchar_tPtr,
    voidPtr,
    ref.types.uint32,
    mbstate_tPtr,
  ]],
  wcsrtombs: [ref.types.uint32, [
    ref.refType(ref.types.uchar),
    voidPtr,
    ref.types.uint32,
    mbstate_tPtr,
  ]],
  mbsnrtowcs: [ref.types.uint32, [
    wchar_tPtr,
    voidPtr,
    ref.types.uint32,
    ref.types.uint32,
    mbstate_tPtr,
  ]],
  wcsnrtombs: [ref.types.uint32, [
    ref.refType(ref.types.uchar),
    voidPtr,
    ref.types.uint32,
    ref.types.uint32,
    mbstate_tPtr,
  ]],
  wcstod: [ref.types.double, [
    wchar_tPtr,
    voidPtr,
  ]],
  wcstof: [ref.types.float, [
    wchar_tPtr,
    voidPtr,
  ]],
  wcstol: [ref.types.long, [
    wchar_tPtr,
    voidPtr,
    ref.types.int32,
  ]],
  wcstoul: [ref.types.ulong, [
    wchar_tPtr,
    voidPtr,
    ref.types.int32,
  ]],
  wcstoll: [ref.types.longlong, [
    wchar_tPtr,
    voidPtr,
    ref.types.int32,
  ]],
  wcstoull: [ref.types.ulonglong, [
    wchar_tPtr,
    voidPtr,
    ref.types.int32,
  ]],
  wcpcpy: [wchar_tPtr, [
    wchar_tPtr,
    wchar_tPtr,
  ]],
  wcpncpy: [wchar_tPtr, [
    wchar_tPtr,
    wchar_tPtr,
    ref.types.uint32,
  ]],
  open_wmemstream: [__FILE, [
    voidPtr,
    size_t,
  ]],
  fwide: [ref.types.int32, [
    __FILEPtr,
    ref.types.int32,
  ]],
  fwprintf: [ref.types.int32, [
    __FILEPtr,
    wchar_tPtr,
  ]],
  wprintf: [ref.types.int32, [
    wchar_tPtr,
  ]],
  swprintf: [ref.types.int32, [
    wchar_tPtr,
    ref.types.uint32,
    wchar_tPtr,
  ]],
  vfwprintf: [ref.types.int32, [
    __FILEPtr,
    wchar_tPtr,
    __va_list,
  ]],
  vwprintf: [ref.types.int32, [
    wchar_tPtr,
    __va_list,
  ]],
  vswprintf: [ref.types.int32, [
    wchar_tPtr,
    ref.types.uint32,
    wchar_tPtr,
    __va_list,
  ]],
  fwscanf: [ref.types.int32, [
    __FILEPtr,
    wchar_tPtr,
  ]],
  wscanf: [ref.types.int32, [
    wchar_tPtr,
  ]],
  swscanf: [ref.types.int32, [
    wchar_tPtr,
    wchar_tPtr,
  ]],
  fwscanf: [ref.types.int32, [
    __FILEPtr,
    wchar_tPtr,
  ]],
  wscanf: [ref.types.int32, [
    wchar_tPtr,
  ]],
  swscanf: [ref.types.int32, [
    wchar_tPtr,
    wchar_tPtr,
  ]],
  vfwscanf: [ref.types.int32, [
    __FILEPtr,
    wchar_tPtr,
    __va_list,
  ]],
  vwscanf: [ref.types.int32, [
    wchar_tPtr,
    __va_list,
  ]],
  vswscanf: [ref.types.int32, [
    wchar_tPtr,
    wchar_tPtr,
    __va_list,
  ]],
  vfwscanf: [ref.types.int32, [
    __FILEPtr,
    wchar_tPtr,
    __va_list,
  ]],
  vwscanf: [ref.types.int32, [
    wchar_tPtr,
    __va_list,
  ]],
  vswscanf: [ref.types.int32, [
    wchar_tPtr,
    wchar_tPtr,
    __va_list,
  ]],
  fgetwc: [ref.types.uint32, [
    __FILEPtr,
  ]],
  getwc: [ref.types.uint32, [
    __FILEPtr,
  ]],
  getwchar: [ref.types.uint32, [
  ]],
  fputwc: [ref.types.uint32, [
    ref.types.uint32,
    __FILEPtr,
  ]],
  putwc: [ref.types.uint32, [
    ref.types.uint32,
    __FILEPtr,
  ]],
  putwchar: [ref.types.uint32, [
    ref.types.uint32,
  ]],
  fgetws: [wchar_tPtr, [
    wchar_tPtr,
    ref.types.int32,
    __FILEPtr,
  ]],
  fputws: [ref.types.int32, [
    wchar_tPtr,
    __FILEPtr,
  ]],
  ungetwc: [ref.types.uint32, [
    ref.types.uint32,
    __FILEPtr,
  ]],
  wcsftime: [ref.types.uint32, [
    wchar_tPtr,
    ref.types.uint32,
    wchar_tPtr,
    voidPtr,
  ]],
  is_CaptureStatus: [ref.types.int32, [
    ref.types.uint32,
    ref.types.uint32,
    voidPtr,
    ref.types.uint32,
  ]],
  is_WaitEvent: [ref.types.int32, [
    ref.types.uint32,
    ref.types.int32,
    ref.types.int32,
  ]],
  is_SetSaturation: [ref.types.int32, [
    ref.types.uint32,
    ref.types.int32,
    ref.types.int32,
  ]],
  is_PrepareStealVideo: [ref.types.int32, [
    ref.types.uint32,
    ref.types.int32,
    ref.types.uint32,
  ]],
  is_GetNumberOfDevices: [ref.types.int32, [
  ]],
  is_StopLiveVideo: [ref.types.int32, [
    ref.types.uint32,
    ref.types.int32,
  ]],
  is_FreezeVideo: [ref.types.int32, [
    ref.types.uint32,
    ref.types.int32,
  ]],
  is_CaptureVideo: [ref.types.int32, [
    ref.types.uint32,
    ref.types.int32,
  ]],
  is_IsVideoFinish: [ref.types.int32, [
    ref.types.uint32,
    INTPtr,
  ]],
  is_HasVideoStarted: [ref.types.int32, [
    ref.types.uint32,
    BOOLPtr,
  ]],
  is_AllocImageMem: [ref.types.int32, [
    ref.types.uint32,
    ref.types.int32,
    ref.types.int32,
    ref.types.int32,
    voidPtr,
    ref.refType(ref.types.int32),
  ]],
  is_SetImageMem: [ref.types.int32, [
    ref.types.uint32,
    ref.refType(ref.types.uchar),
    ref.types.int32,
  ]],
  is_FreeImageMem: [ref.types.int32, [
    ref.types.uint32,
    ref.refType(ref.types.uchar),
    ref.types.int32,
  ]],
  is_GetImageMem: [ref.types.int32, [
    ref.types.uint32,
    voidPtr,
  ]],
  is_GetActiveImageMem: [ref.types.int32, [
    ref.types.uint32,
    voidPtr,
    ref.refType(ref.types.int32),
  ]],
  is_InquireImageMem: [ref.types.int32, [
    ref.types.uint32,
    ref.refType(ref.types.uchar),
    ref.types.int32,
    ref.refType(ref.types.int32),
    ref.refType(ref.types.int32),
    ref.refType(ref.types.int32),
    ref.refType(ref.types.int32),
  ]],
  is_GetImageMemPitch: [ref.types.int32, [
    ref.types.uint32,
    INTPtr,
  ]],
  is_SetAllocatedImageMem: [ref.types.int32, [
    ref.types.uint32,
    ref.types.int32,
    ref.types.int32,
    ref.types.int32,
    ref.refType(ref.types.uchar),
    ref.refType(ref.types.int32),
  ]],
  is_CopyImageMem: [ref.types.int32, [
    ref.types.uint32,
    ref.refType(ref.types.uchar),
    ref.types.int32,
    ref.refType(ref.types.uchar),
  ]],
  is_CopyImageMemLines: [ref.types.int32, [
    ref.types.uint32,
    ref.refType(ref.types.uchar),
    ref.types.int32,
    ref.types.int32,
    ref.refType(ref.types.uchar),
  ]],
  is_AddToSequence: [ref.types.int32, [
    ref.types.uint32,
    ref.refType(ref.types.uchar),
    ref.types.int32,
  ]],
  is_ClearSequence: [ref.types.int32, [
    ref.types.uint32,
  ]],
  is_GetActSeqBuf: [ref.types.int32, [
    ref.types.uint32,
    INTPtr,
    voidPtr,
    voidPtr,
  ]],
  is_LockSeqBuf: [ref.types.int32, [
    ref.types.uint32,
    ref.types.int32,
    ref.refType(ref.types.uchar),
  ]],
  is_UnlockSeqBuf: [ref.types.int32, [
    ref.types.uint32,
    ref.types.int32,
    ref.refType(ref.types.uchar),
  ]],
  is_GetError: [ref.types.int32, [
    ref.types.uint32,
    INTPtr,
    voidPtr,
  ]],
  is_SetErrorReport: [ref.types.int32, [
    ref.types.uint32,
    ref.types.int32,
  ]],
  is_SetColorMode: [ref.types.int32, [
    ref.types.uint32,
    ref.types.int32,
  ]],
  is_GetColorDepth: [ref.types.int32, [
    ref.types.uint32,
    INTPtr,
    INTPtr,
  ]],
  is_RenderBitmap: [ref.types.int32, [
    ref.types.uint32,
    ref.types.int32,
    HWND,
    ref.types.int32,
  ]],
  is_SetDisplayMode: [ref.types.int32, [
    ref.types.uint32,
    ref.types.int32,
  ]],
  is_SetDisplayPos: [ref.types.int32, [
    ref.types.uint32,
    ref.types.int32,
    ref.types.int32,
  ]],
  is_SetHwnd: [ref.types.int32, [
    ref.types.uint32,
    HWND,
  ]],
  is_GetVsyncCount: [ref.types.int32, [
    ref.types.uint32,
    ref.refType(ref.types.long),
    ref.refType(ref.types.long),
  ]],
  is_GetDLLVersion: [ref.types.int32, [
  ]],
  is_InitEvent: [ref.types.int32, [
    ref.types.uint32,
    HANDLE,
    ref.types.int32,
  ]],
  is_ExitEvent: [ref.types.int32, [
    ref.types.uint32,
    ref.types.int32,
  ]],
  is_EnableEvent: [ref.types.int32, [
    ref.types.uint32,
    ref.types.int32,
  ]],
  is_DisableEvent: [ref.types.int32, [
    ref.types.uint32,
    ref.types.int32,
  ]],
  is_SetExternalTrigger: [ref.types.int32, [
    ref.types.uint32,
    ref.types.int32,
  ]],
  is_SetTriggerCounter: [ref.types.int32, [
    ref.types.uint32,
    ref.types.int32,
  ]],
  is_SetRopEffect: [ref.types.int32, [
    ref.types.uint32,
    ref.types.int32,
    ref.types.int32,
    ref.types.int32,
  ]],
  is_InitCamera: [ref.types.int32, [
    HIDSPtr,
    HWND,
  ]],
  is_ExitCamera: [ref.types.int32, [
    ref.types.uint32,
  ]],
  is_GetCameraInfo: [ref.types.int32, [
    ref.types.uint32,
    PBOARDINFO,
  ]],
  is_CameraStatus: [ref.types.uint32, [
    ref.types.uint32,
    ref.types.int32,
    ref.types.uint32,
  ]],
  is_GetCameraType: [ref.types.int32, [
    ref.types.uint32,
  ]],
  is_GetNumberOfCameras: [ref.types.int32, [
    INTPtr,
  ]],
  is_GetUsedBandwidth: [ref.types.int32, [
    ref.types.uint32,
  ]],
  is_GetFrameTimeRange: [ref.types.int32, [
    ref.types.uint32,
    ref.refType(ref.types.double),
    ref.refType(ref.types.double),
    ref.refType(ref.types.double),
  ]],
  is_SetFrameRate: [ref.types.int32, [
    ref.types.uint32,
    ref.types.double,
    ref.refType(ref.types.double),
  ]],
  is_GetFramesPerSecond: [ref.types.int32, [
    ref.types.uint32,
    ref.refType(ref.types.double),
  ]],
  is_GetSensorInfo: [ref.types.int32, [
    ref.types.uint32,
    PSENSORINFO,
  ]],
  is_GetRevisionInfo: [ref.types.int32, [
    ref.types.uint32,
    PREVISIONINFO,
  ]],
  is_EnableAutoExit: [ref.types.int32, [
    ref.types.uint32,
    ref.types.int32,
  ]],
  is_EnableMessage: [ref.types.int32, [
    ref.types.uint32,
    ref.types.int32,
    HWND,
  ]],
  is_SetHardwareGain: [ref.types.int32, [
    ref.types.uint32,
    ref.types.int32,
    ref.types.int32,
    ref.types.int32,
    ref.types.int32,
  ]],
  is_SetWhiteBalance: [ref.types.int32, [
    ref.types.uint32,
    ref.types.int32,
  ]],
  is_SetWhiteBalanceMultipliers: [ref.types.int32, [
    ref.types.uint32,
    ref.types.double,
    ref.types.double,
    ref.types.double,
  ]],
  is_GetWhiteBalanceMultipliers: [ref.types.int32, [
    ref.types.uint32,
    ref.refType(ref.types.double),
    ref.refType(ref.types.double),
    ref.refType(ref.types.double),
  ]],
  is_SetColorCorrection: [ref.types.int32, [
    ref.types.uint32,
    ref.types.int32,
    ref.refType(ref.types.double),
  ]],
  is_SetSubSampling: [ref.types.int32, [
    ref.types.uint32,
    ref.types.int32,
  ]],
  is_ForceTrigger: [ref.types.int32, [
    ref.types.uint32,
  ]],
  is_GetBusSpeed: [ref.types.int32, [
    ref.types.uint32,
  ]],
  is_SetBinning: [ref.types.int32, [
    ref.types.uint32,
    ref.types.int32,
  ]],
  is_ResetToDefault: [ref.types.int32, [
    ref.types.uint32,
  ]],
  is_SetCameraID: [ref.types.int32, [
    ref.types.uint32,
    ref.types.int32,
  ]],
  is_SetBayerConversion: [ref.types.int32, [
    ref.types.uint32,
    ref.types.int32,
  ]],
  is_SetHardwareGamma: [ref.types.int32, [
    ref.types.uint32,
    ref.types.int32,
  ]],
  is_GetCameraList: [ref.types.int32, [
    PUEYE_CAMERA_LIST,
  ]],
  is_SetAutoParameter: [ref.types.int32, [
    ref.types.uint32,
    ref.types.int32,
    ref.refType(ref.types.double),
    ref.refType(ref.types.double),
  ]],
  is_GetAutoInfo: [ref.types.int32, [
    ref.types.uint32,
    UEYE_AUTO_INFO,
  ]],
  is_GetImageHistogram: [ref.types.int32, [
    ref.types.uint32,
    ref.types.int32,
    ref.types.int32,
    DWORDPtr,
  ]],
  is_SetTriggerDelay: [ref.types.int32, [
    ref.types.uint32,
    ref.types.int32,
  ]],
  is_SetGainBoost: [ref.types.int32, [
    ref.types.uint32,
    ref.types.int32,
  ]],
  is_SetGlobalShutter: [ref.types.int32, [
    ref.types.uint32,
    ref.types.int32,
  ]],
  is_SetExtendedRegister: [ref.types.int32, [
    ref.types.uint32,
    ref.types.int32,
    ref.types.ushort,
  ]],
  is_GetExtendedRegister: [ref.types.int32, [
    ref.types.uint32,
    ref.types.int32,
    WORDPtr,
  ]],
  is_SetHWGainFactor: [ref.types.int32, [
    ref.types.uint32,
    ref.types.int32,
    ref.types.int32,
  ]],
  is_Renumerate: [ref.types.int32, [
    ref.types.uint32,
    ref.types.int32,
  ]],
  is_WriteI2C: [ref.types.int32, [
    ref.types.uint32,
    ref.types.int32,
    ref.types.int32,
    BYTE,
    ref.types.int32,
  ]],
  is_ReadI2C: [ref.types.int32, [
    ref.types.uint32,
    ref.types.int32,
    ref.types.int32,
    BYTEPtr,
    ref.types.int32,
  ]],
  is_GetHdrMode: [ref.types.int32, [
    ref.types.uint32,
    INTPtr,
  ]],
  is_EnableHdr: [ref.types.int32, [
    ref.types.uint32,
    ref.types.int32,
  ]],
  is_SetHdrKneepoints: [ref.types.int32, [
    ref.types.uint32,
    KNEEPOINTARRAY,
    ref.types.int32,
  ]],
  is_GetHdrKneepoints: [ref.types.int32, [
    ref.types.uint32,
    KNEEPOINTARRAYPtr,
    ref.types.int32,
  ]],
  is_GetHdrKneepointInfo: [ref.types.int32, [
    ref.types.uint32,
    KNEEPOINTINFO,
    ref.types.int32,
  ]],
  is_SetOptimalCameraTiming: [ref.types.int32, [
    ref.types.uint32,
    ref.types.int32,
    ref.types.int32,
    INTPtr,
    ref.refType(ref.types.double),
  ]],
  is_GetSupportedTestImages: [ref.types.int32, [
    ref.types.uint32,
    INTPtr,
  ]],
  is_GetTestImageValueRange: [ref.types.int32, [
    ref.types.uint32,
    ref.types.int32,
    INTPtr,
    INTPtr,
  ]],
  is_SetSensorTestImage: [ref.types.int32, [
    ref.types.uint32,
    ref.types.int32,
    ref.types.int32,
  ]],
  is_GetColorConverter: [ref.types.int32, [
    ref.types.uint32,
    ref.types.int32,
    INTPtr,
    INTPtr,
    INTPtr,
  ]],
  is_SetColorConverter: [ref.types.int32, [
    ref.types.uint32,
    ref.types.int32,
    ref.types.int32,
  ]],
  is_WaitForNextImage: [ref.types.int32, [
    ref.types.uint32,
    ref.types.uint32,
    voidPtr,
    INTPtr,
  ]],
  is_InitImageQueue: [ref.types.int32, [
    ref.types.uint32,
    ref.types.int32,
  ]],
  is_ExitImageQueue: [ref.types.int32, [
    ref.types.uint32,
  ]],
  is_SetTimeout: [ref.types.int32, [
    ref.types.uint32,
    ref.types.uint32,
    ref.types.uint32,
  ]],
  is_GetTimeout: [ref.types.int32, [
    ref.types.uint32,
    ref.types.uint32,
    UINTPtr,
  ]],
  is_GetDuration: [ref.types.int32, [
    ref.types.uint32,
    ref.types.uint32,
    INTPtr,
  ]],
  is_GetSensorScalerInfo: [ref.types.int32, [
    ref.types.uint32,
    SENSORSCALERINFO,
    ref.types.int32,
  ]],
  is_SetSensorScaler: [ref.types.int32, [
    ref.types.uint32,
    ref.types.uint32,
    ref.types.double,
  ]],
  is_GetImageInfo: [ref.types.int32, [
    ref.types.uint32,
    ref.types.int32,
    UEYEIMAGEINFO,
    ref.types.int32,
  ]],
  is_ImageFormat: [ref.types.int32, [
    ref.types.uint32,
    ref.types.uint32,
    voidPtr,
    ref.types.uint32,
  ]],
  is_FaceDetection: [ref.types.int32, [
    ref.types.uint32,
    ref.types.uint32,
    voidPtr,
    ref.types.uint32,
  ]],
  is_Focus: [ref.types.int32, [
    ref.types.uint32,
    ref.types.uint32,
    voidPtr,
    ref.types.uint32,
  ]],
  is_ImageStabilization: [ref.types.int32, [
    ref.types.uint32,
    ref.types.uint32,
    voidPtr,
    ref.types.uint32,
  ]],
  is_ScenePreset: [ref.types.int32, [
    ref.types.uint32,
    ref.types.uint32,
    voidPtr,
    ref.types.uint32,
  ]],
  is_Zoom: [ref.types.int32, [
    ref.types.uint32,
    ref.types.uint32,
    voidPtr,
    ref.types.uint32,
  ]],
  is_Sharpness: [ref.types.int32, [
    ref.types.uint32,
    ref.types.uint32,
    voidPtr,
    ref.types.uint32,
  ]],
  is_Saturation: [ref.types.int32, [
    ref.types.uint32,
    ref.types.uint32,
    voidPtr,
    ref.types.uint32,
  ]],
  is_TriggerDebounce: [ref.types.int32, [
    ref.types.uint32,
    ref.types.uint32,
    voidPtr,
    ref.types.uint32,
  ]],
  is_ColorTemperature: [ref.types.int32, [
    ref.types.uint32,
    ref.types.uint32,
    voidPtr,
    ref.types.uint32,
  ]],
  is_DirectRenderer: [ref.types.int32, [
    ref.types.uint32,
    ref.types.uint32,
    voidPtr,
    ref.types.uint32,
  ]],
  is_HotPixel: [ref.types.int32, [
    ref.types.uint32,
    ref.types.uint32,
    voidPtr,
    ref.types.uint32,
  ]],
  is_AOI: [ref.types.int32, [
    ref.types.uint32,
    ref.types.uint32,
    voidPtr,
    ref.types.uint32,
  ]],
  is_Transfer: [ref.types.int32, [
    ref.types.uint32,
    ref.types.uint32,
    voidPtr,
    ref.types.uint32,
  ]],
  is_BootBoost: [ref.types.int32, [
    ref.types.uint32,
    ref.types.uint32,
    voidPtr,
    ref.types.uint32,
  ]],
  is_DeviceFeature: [ref.types.int32, [
    ref.types.uint32,
    ref.types.uint32,
    voidPtr,
    ref.types.uint32,
  ]],
  is_Exposure: [ref.types.int32, [
    ref.types.uint32,
    ref.types.uint32,
    voidPtr,
    ref.types.uint32,
  ]],
  is_Trigger: [ref.types.int32, [
    ref.types.uint32,
    ref.types.uint32,
    voidPtr,
    ref.types.uint32,
  ]],
  is_DeviceInfo: [ref.types.int32, [
    ref.types.uint32,
    ref.types.uint32,
    voidPtr,
    ref.types.uint32,
  ]],
  is_Callback: [ref.types.int32, [
    ref.types.uint32,
    ref.types.uint32,
    voidPtr,
    ref.types.uint32,
  ]],
  is_OptimalCameraTiming: [ref.types.int32, [
    ref.types.uint32,
    ref.types.uint32,
    voidPtr,
    ref.types.uint32,
  ]],
  is_SetStarterFirmware: [ref.types.int32, [
    ref.types.uint32,
    CHAR,
    ref.types.uint32,
  ]],
  is_SetPacketFilter: [ref.types.int32, [
    ref.types.int32,
    ref.types.uint32,
  ]],
  is_GetComportNumber: [ref.types.int32, [
    ref.types.uint32,
    UINTPtr,
  ]],
  is_Configuration: [ref.types.int32, [
    ref.types.uint32,
    voidPtr,
    ref.types.uint32,
  ]],
  is_IO: [ref.types.int32, [
    ref.types.uint32,
    ref.types.uint32,
    voidPtr,
    ref.types.uint32,
  ]],
  is_AutoParameter: [ref.types.int32, [
    ref.types.uint32,
    ref.types.uint32,
    voidPtr,
    ref.types.uint32,
  ]],
  is_Convert: [ref.types.int32, [
    ref.types.uint32,
    ref.types.uint32,
    voidPtr,
    ref.types.uint32,
  ]],
  is_ParameterSet: [ref.types.int32, [
    ref.types.uint32,
    ref.types.uint32,
    voidPtr,
    ref.types.uint32,
  ]],
  is_EdgeEnhancement: [ref.types.int32, [
    ref.types.uint32,
    ref.types.uint32,
    voidPtr,
    ref.types.uint32,
  ]],
  is_PixelClock: [ref.types.int32, [
    ref.types.uint32,
    ref.types.uint32,
    voidPtr,
    ref.types.uint32,
  ]],
  is_ImageFile: [ref.types.int32, [
    ref.types.uint32,
    ref.types.uint32,
    voidPtr,
    ref.types.uint32,
  ]],
  is_Blacklevel: [ref.types.int32, [
    ref.types.uint32,
    ref.types.uint32,
    voidPtr,
    ref.types.uint32,
  ]],
  is_ImageBuffer: [ref.types.int32, [
    ref.types.uint32,
    ref.types.uint32,
    voidPtr,
    ref.types.uint32,
  ]],
  is_Measure: [ref.types.int32, [
    ref.types.uint32,
    ref.types.uint32,
    voidPtr,
    ref.types.uint32,
  ]],
  is_LUT: [ref.types.int32, [
    ref.types.uint32,
    ref.types.uint32,
    voidPtr,
    ref.types.uint32,
  ]],
  is_Gamma: [ref.types.int32, [
    ref.types.uint32,
    ref.types.uint32,
    voidPtr,
    ref.types.uint32,
  ]],
  is_Memory: [ref.types.int32, [
    ref.types.uint32,
    ref.types.uint32,
    voidPtr,
    ref.types.uint32,
  ]],
  is_Multicast: [ref.types.int32, [
    ref.types.uint32,
    ref.types.uint32,
    voidPtr,
    ref.types.uint32,
  ]],
  is_Sequencer: [ref.types.int32, [
    ref.types.uint32,
    ref.types.uint32,
    voidPtr,
    ref.types.uint32,
  ]],
  is_PersistentMemory: [ref.types.int32, [
    ref.types.uint32,
    ref.types.uint32,
    voidPtr,
    ref.types.uint32,
  ]],
});

