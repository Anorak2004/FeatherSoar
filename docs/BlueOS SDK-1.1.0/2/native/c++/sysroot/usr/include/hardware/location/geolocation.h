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

#ifndef CORE_NATIVEFEATURES_INCLUDE_NATIVE_GEOLOCATION_GEOLOCATION_H_
#define CORE_NATIVEFEATURES_INCLUDE_NATIVE_GEOLOCATION_GEOLOCATION_H_

/**
 * @version: 2
 * @desc : Indicates the result code.
 */
enum {
  BGEOLOCATION_OPERATION_OK = 0,
  BGEOLOCATION_ERROR = -1
};

/**
 * @version: 2
 * @desc : Defines the geolocation request info.
 */
typedef struct BGeolocation_RequestInfo {
  const char *coord_type;
  int timeout;
} BGeolocation_RequestInfo;

/**
 * @version: 2
 * @desc : Defines the location data including longitude, latitude, etc.
 */
typedef struct BGeolocation_LocationData {
  double longitude;
  double latitude;
  float accuracy;
  double time;
} BGeolocation_LocationData;

/**
 * @version: 2
 * @desc : Defines the result callback of location obtaining.
 */
typedef void (*onLocationResult)(int code, BGeolocation_LocationData data,
                                 void *user_data);

/**
 * @version: 2
 * @desc : Defines the listener of location changing.
 */
typedef void (*onLocationChanged)(BGeolocation_LocationData data,
                                  void *user_data);

/**
 * @version: 2
 * @desc : Defines the result callback of location obtaining.
 */
typedef struct BGeolocation_LocationCallback {
  onLocationResult location_result;
} BGeolocation_LocationCallback;

/**
 * @version: 2
 * @desc : Defines the listener of location changing.
 */
typedef struct BGeolocation_LocationListener {
  onLocationChanged location_changed;
} BGeolocation_LocationListener;

/**
 * @version: 2
 * @desc : Obtains location data.
 *         Location data will return by result callback BGeolocation_LocationCallback.
 *         LOCATION permission is necessary.
 */
int BGeolocation_getLocation(
    BGeolocation_RequestInfo info, BGeolocation_LocationCallback callback,
    void *user_data);

/**
 * @version: 2
 * @desc : Subscribes listener of location changing.
 *         LOCATION permission is necessary.
 */
int BGeolocation_subscribeLocation(
    BGeolocation_LocationListener listerner, void *user_data);

/**
 * @version: 2
 * @desc : Unsubscribes listener of location changing.
 */
int BGeolocation_unsubscribeLocation(
    BGeolocation_LocationListener listerner, void *user_data);

/**
 * @version: 2
 * @desc : Obtains supported coord types.
 */
int BGeolocation_getSupportedCoordTypes(
    char ***coordTypes, int *coordTypesCnt);

#endif  // CORE_NATIVEFEATURES_INCLUDE_NATIVE_GEOLOCATION_GEOLOCATION_H_
