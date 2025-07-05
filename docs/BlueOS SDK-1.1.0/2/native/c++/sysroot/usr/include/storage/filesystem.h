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

#ifndef CORE_NATIVEFEATURES_INCLUDE_NATIVE_FILE_FILESYSTEM_H_
#define CORE_NATIVEFEATURES_INCLUDE_NATIVE_FILE_FILESYSTEM_H_

/**
 * @version: 2
 * @desc : Indicates the result code.
 */
enum {
  BFILESYSTEM_OK = 0,
  BFILESYSTEM_ERROR = -1
};

/**
 * @version: 2
 * @desc : Obtains direcroty of cache.
 */
int BFilesystem_getCacheDir(const char* package, char* path);

/**
 * @version: 2
 * @desc : Obtains direcroty of files.
 */
int BFilesystem_getFilesDir(const char* package, char* path);

/**
 * @version: 2
 * @desc : Obtains direcroty of mass.
 */
int BFilesystem_getMassDir(const char* package, char* path);

/**
 * @version: 2
 * @desc : Obtains direcroty of temp.
 */
int BFilesystem_getTempDir(const char* package, char* path);

/**
 * @version: 2
 * @desc : Obtains direcroty of storage.
 */
int BFilesystem_getStorageDir(const char* package, char* path);

#endif  // CORE_NATIVEFEATURES_INCLUDE_NATIVE_FILE_FILESYSTEM_H_
