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

#ifndef CORE_NATIVEFEATURES_INCLUDE_NATIVE_NETWORK_DOWNLOAD_H_
#define CORE_NATIVEFEATURES_INCLUDE_NATIVE_NETWORK_DOWNLOAD_H_

/**
 * @version: 2
 * @desc : Indicates the result code.
 */
enum { 
  BNETWORK_DOWNLOAD_OK = 0,
  BNETWORK_DOWNLOAD_ERROR = -1
};

/**
 * @version: 2
 * @desc : Defines the config of download request.
 */
typedef struct BNetwork_DownloadConfig {
  const char* url = nullptr;
  const char* header = nullptr;
  const char* description = nullptr;
  const char* filename = nullptr;
} BNetwork_DownloadConfig;

/**
 * @version: 2
 * @desc : Result callback that indicates download request has succeeded.
 */
typedef void (*onDownloadRequestSucceeded)(const char* token,
                                           BNetwork_DownloadConfig* config,
                                           void* user_data);
										   
/**
 * @version: 2
 * @desc : Result callback that indicates download request has failed.
 */
typedef void (*onDownloadRequestFailed)(int errCode,
                                        BNetwork_DownloadConfig* config,
                                        void* user_data);

/**
 * @version: 2
 * @desc : Result callback that indicates download request has completed.
 */
typedef void (*onDownloadRequestCompleted)(int opCode,
                                           BNetwork_DownloadConfig* config,
                                           void* user_data);

/**
 * @version: 2
 * @desc : Result callback that indicates download operation has succeeded.
 */
typedef void (*onDownloadSucceeded)(const char* uri,
                                    void* user_data);
									
/**
 * @version: 2
 * @desc : Result callback that indicates download operation has failed.
 */
typedef void (*onDownloadFailed)(int errCode, void* user_data);

/**
 * @version: 2
 * @desc : Result callback that indicates download aborting operation has succeeded.
 */
typedef void (*onAbortDownloadSucceeded)(void* user_data);

/**
 * @version: 2
 * @desc : Result callback that indicates download aborting operation has failed.
 */
typedef void (*onAbortDownloadFailed)(int errCode,
                                      void* user_data);

/**
 * @version: 2
 * @desc : Callbacks that indicates the result of download request.
 */
typedef struct BNetwork_DownloadRequestCallbacks {
  onDownloadRequestSucceeded succeeded_cb = nullptr;
  onDownloadRequestFailed failed_cb = nullptr;
  onDownloadRequestCompleted completed_cb = nullptr;
} BNetwork_DownloadRequestCallbacks;

/**
 * @version: 2
 * @desc : Callbacks that indicates the result of download operation.
 */
typedef struct BNetwork_DownloadCallbacks {
  onDownloadSucceeded succeeded_cb = nullptr;
  onDownloadFailed failed_cb = nullptr;
} BNetwork_DownloadCallbacks;

/**
 * @version: 2
 * @desc : Callbacks that indicates the result of download aborting operation.
 */
typedef struct BNetwork_AbortDownloadCallbacks {
  onAbortDownloadSucceeded succeeded_cb = nullptr;
  onAbortDownloadFailed failed_cb = nullptr;
} BNetwork_AbortDownloadCallbacks;

/**
 * @version: 2
 * @desc : Initiates the download request.
 */
int BNetwork_download(BNetwork_DownloadConfig* config,
                        BNetwork_DownloadRequestCallbacks callbacks,
                        void* user_data);

/**
 * @version: 2
 * @desc : Registers the download result listener.
 */
int BNetwork_registerDownloadListener(const char* token,
                                        BNetwork_DownloadCallbacks callbacks,
                                        void* user_data);

/**
 * @version: 2
 * @desc : Initiates the download aborting request.
 */
int BNetwork_abortDownload(const char* token,
                             BNetwork_AbortDownloadCallbacks callbacks,
                             void* user_data);

#endif  // CORE_NATIVEFEATURES_INCLUDE_NATIVE_NETWORK_DOWNLOAD_H_
