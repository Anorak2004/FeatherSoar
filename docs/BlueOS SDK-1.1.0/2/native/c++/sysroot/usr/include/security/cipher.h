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

#ifndef CORE_NATIVEFEATURES_INCLUDE_NATIVE_CIPHER_CIPHER_H_
#define CORE_NATIVEFEATURES_INCLUDE_NATIVE_CIPHER_CIPHER_H_

/**
 * @version: 2
 * @desc : Indicates the result code.
 */
enum {
  BCIPHER_OK = 0,
  BCIPHER_ERROR = -1
};

/**
 * @version: 2
 * @desc : Indicates the code of cipher padding type.
 */
enum BCipher_Padding {
  BCIPHER_PADDING_DEFAULT = 0
};

/**
 * @version: 2
 * @desc : Provides capability of rsa encrypt.
 */
int BCipher_rsaEncrypt(const char* plain_text, size_t plain_len, char* key,
                       BCipher_Padding transformation, char** cipher_text,
                       size_t* cipher_len);

/**
 * @version: 2
 * @desc : Provides capability of rsa decrypt.
 */
int BCipher_rsaDecrypt(const char* cipher_text, size_t cipher_len, char* key,
                       BCipher_Padding transformation, char** plain_text,
                       size_t* plain_len);

/**
 * @version: 2
 * @desc : Provides capability of base64 encode.
 */
int BCipher_base64Encode(const char* text, size_t text_len, char** digest, size_t* disgest_len);

/**
 * @version: 2
 * @desc : Provides capability of base64 decode.
 */
int BCipher_base64Decode(const char* digest, size_t digest_len, char** text, size_t* text_len);

/**
 * @version: 2
 * @desc : Releases the memory of cipher operation data.
 */
int BCipher_free(void** value);

#endif  // CORE_NATIVEFEATURES_INCLUDE_NATIVE_CIPHER_CIPHER_H_
