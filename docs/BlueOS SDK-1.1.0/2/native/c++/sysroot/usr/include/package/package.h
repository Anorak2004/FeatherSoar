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

#ifndef CORE_NATIVEFEATURES_INCLUDE_NATIVE_PACKAGE_PACKAGE_H_
#define CORE_NATIVEFEATURES_INCLUDE_NATIVE_PACKAGE_PACKAGE_H_

/**
 * @version: 2
 * @desc : Obtains the signature digests.
 */
char* BPackage_getSignatureDigests(const char* package);

#endif  // CORE_NATIVEFEATURES_INCLUDE_NATIVE_PACKAGE_PACKAGE_H_
