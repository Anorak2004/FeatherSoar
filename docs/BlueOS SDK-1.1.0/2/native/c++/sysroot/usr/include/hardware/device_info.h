/*
 * Copyright 2023 vivo
 *
 * Licensed under the Apache License, Version 2.0 (the License);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an AS IS BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

#ifndef CORE_NATIVEFEATURES_INCLUDE_NATIVE_DEVICE_DEVICE_H_
#define CORE_NATIVEFEATURES_INCLUDE_NATIVE_DEVICE_DEVICE_H_

/**
 * @version: 2
 * @desc : Indicates the result code.
 */
enum { 
  BDEVICE_OK = 0,
  BDEVICE_ERROR = -1
};

/**
 * @version: 2
 * @desc : Defines device info including os version, device name, screen size, etc.
 */
typedef struct BDevice_DeviceInfo {
  char* brand;
  char* manufacturer;
  char* model;
  char* product;
  char* os_type;
  char* os_version_name;
  int os_version_code;
  char* platform_version_name;
  int platform_version_code;
  char* language;
  char* device_name;
  char* hardware_version;
  char* software_version;
  char* region;
  int screen_width;
  int screen_height;
  int window_width;
  int window_height;
  int status_bar_height;
  int screen_density;
  char* vendor_os_name;
  char* vendor_os_version;
  char* device_type;
  int screen_refresh_rate;
} BDevice_DeviceInfo;

/**
 * @version: 2
 * @desc : Obtains device info defined by struct BDevice_DeviceInfo.
 */ 
int BDevice_getInfo(BDevice_DeviceInfo* info);

/**
 * @version: 2
 * @desc : Obtains device id.
 *         DEVICE_INFO permission is necessary.
 */
int BDevice_getDeviceId(char** device_id);

/**
 * @version: 2
 * @desc : Obtains user id.
 *         DEVICE_INFO permission is necessary.
 */
int BDevice_getUserId(char** user_id);

/**
 * @version: 2
 * @desc : Obtains MAC address.
 *         DEVICE_INFO permission is necessary.
 */
int BDevice_getMac(char** mac);

/**
 * @version: 2
 * @desc : Obtains advertising id.
 *         DEVICE_INFO permission is necessary.
 */
int BDevice_getAdvertisingId(char** advertising_id);

/**
 * @version: 2
 * @desc : Obtains serail id.
 *         DEVICE_INFO permission is necessary.
 */
int BDevice_getSerial(char** serial_id);

/**
 * @version: 2
 * @desc : Obtains total storage size.
 */
int BDevice_getTotalStorage(int* total_storage);

/**
 * @version: 2
 * @desc : Obtains available storage size.
 */
int BDevice_getAvailableStorage(int* available_storage);

/**
 * @version: 2
 * @desc : Obtains device ICCID.
 */
int BDevice_getDeviceICCID(char** device_iccid);

/**
 * @version: 2
 * @desc : Obtains cpu info.
 */
int BDevice_getCpuInfo(char** cpu_info);

#endif  // CORE_NATIVEFEATURES_INCLUDE_NATIVE_DEVICE_DEVICE_H_
