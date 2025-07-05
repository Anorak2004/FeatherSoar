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

#ifndef CORE_NATIVEFEATURES_INCLUDE_NATIVE_NETWORK_FETCH_H_
#define CORE_NATIVEFEATURES_INCLUDE_NATIVE_NETWORK_FETCH_H_
#include <stddef.h>
#include <stdint.h>

typedef struct BNetwork_FetchResponse BNetwork_FetchResponse;

/**
 * @version: 2
 * @desc : Indicates the result code.
 */
enum {
  BNETWORK_FETCH_OK = 0,
  BNETWORK_FETCH_ERROR = -1
};

/**
 * @version: 2
 * @desc : Defines the config of fetch request.
 */
typedef struct BNetwork_FetchConfig {
  const char *url = nullptr;
  const char *header = nullptr;
  const char *method = nullptr;
  const char *data = nullptr;
  size_t data_size;
} BNetwork_FetchConfig;

/**
 * @version: 2
 * @desc : Result callback that indicates fetch request has succeeded.
 */
typedef void (*onFetchSucceeded)(void *session,
                                 BNetwork_FetchResponse *response);

/**
 * @version: 2
 * @desc : Result callback that indicates fetch request has failed.
 */
typedef void (*onFetchFailed)(void *session, int errCode,
                              BNetwork_FetchResponse *response);

/**
 * @version: 2
 * @desc : Result callback that indicates fetch request has completed.
 */
typedef void (*onFetchCompleted)(void *session, int opCode,
                                 BNetwork_FetchResponse *response);

/**
 * @version: 2
 * @desc : Callbacks that indicates the result of fetch request.
 */
typedef struct BNetwork_FetchCallbacks {
  onFetchSucceeded succeeded_cb = nullptr;
  onFetchFailed failed_cb = nullptr;
  onFetchCompleted completed_cb = nullptr;
} BNetwork_FetchCallbacks;

/**
 * @version: 2
 * @desc : Defines the data of fetch response.
 */
typedef struct BNetwork_FetchResponse {
  int http_code;
  uint8_t *header = nullptr;
  size_t header_size;
  uint8_t *data = nullptr;
  size_t data_size;
  void *user_data = nullptr;
  BNetwork_FetchConfig *config = nullptr;
} BNetwork_FetchResponse;

/**
 * @version: 2
 * @desc : Creates the session instance for fetch request.
 */
int BNetwork_fetchCreateSession(void **session);

/**
 * @version: 2
 * @desc : Destroys the session instance for fetch request.
 */
int BNetwork_fetchDestroySession(void *session);

/**
 * @version: 2
 * @desc : Initiates the fetch request.
 */
int BNetwork_fetch(void *session, BNetwork_FetchConfig *config,
                     BNetwork_FetchCallbacks callbacks, void *user_data);

#endif  // CORE_NATIVEFEATURES_INCLUDE_NATIVE_NETWORK_FETCH_H_
