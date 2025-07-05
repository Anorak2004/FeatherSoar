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

#ifndef CORE_NATIVEFEATURES_INCLUDE_NATIVE_NETWORK_NETWORK_H_
#define CORE_NATIVEFEATURES_INCLUDE_NATIVE_NETWORK_NETWORK_H_

/**
 * @version: 2
 * @desc : Indicates the result code.
 */
enum {
  BNETWORK_OK = 0,
  BNETWORK_ERROR = -1
};

/**
 * @version: 2
 * @desc : Indicates the code of network state.
 */
enum BNetwork_State {
  BNETWORK_2G = 0,
  BNETWORK_3G,
  BNETWORK_4G,
  BNETWORK_5G,
  BNETWORK_BT,
  BNETWORK_WIFI,
  BNETWORK_UNKNOWN
};

/**
 * @version: 2
 * @desc : Defines the listener of network state changing.
 */
typedef void (*onNetworkChange)(BNetwork_State type, void* user_data);

/**
 * @version: 2
 * @desc : Defines the listener of network state changing.
 */
typedef struct BNetwork_StateListener {
  onNetworkChange state_listener;
} BNetwork_StateListener;

/**
 * @version: 2
 * @desc : Obtains the network state.
 */
BNetwork_State BNetwork_getType();

/**
 * @version: 2
 * @desc : Subscribes listener of network state changing.
 */
int BNetwork_subscribe(BNetwork_StateListener listener, void* user_data);

/**
 * @version: 2
 * @desc : Unsubscribes listener of network state changing.
 */
int BNetwork_unsubscribe(int listener_id);

#endif  // CORE_NATIVEFEATURES_INCLUDE_NATIVE_NETWORK_NETWORK_H_
