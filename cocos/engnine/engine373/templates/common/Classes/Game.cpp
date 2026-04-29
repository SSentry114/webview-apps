/****************************************************************************
 Copyright (c) 2017-2018 Xiamen Yaji Software Co., Ltd.
 
 http://www.cocos.com
 
 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated engine source code (the "Software"), a limited,
 worldwide, royalty-free, non-assignable, revocable and non-exclusive license
 to use Cocos Creator solely to develop games on your target platforms. You
 shall not use Cocos Creator software for developing other software or tools
 that's used for developing games. You are not granted to publish, distribute,
 sublicense, and/or sell copies of Cocos Creator.
 
 The software or tools in this License Agreement are licensed, not sold.
 Xiamen Yaji Software Co., Ltd. reserves all rights not expressly granted to
 you.
 
 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/
#include "Game.h"
#include "platform/FileUtils.h"
#include "renderer/pipeline/GlobalDescriptorSetManager.h"
#include "network/Downloader.h"
#include "network/HttpClient.h"
#include "rapidjson/document.h"
#include "rapidjson/stringbuffer.h"
#include "rapidjson/writer.h"
#include "base/base64.h"
#include "base/UTF8.h"
#include "storage/local-storage/LocalStorage.h"
#include "audio/include/AudioEngine.h"
#include "base/ZipUtils.h"
#include "unzip/unzip.h"
#include "base/Log.h"

#include "platform/ios/IOSPlatform.h"
#if CC_PLATFORM == CC_PLATFORM_ANDROID
#include "platform/java/jni/JniHelper.h"
#endif


using namespace cc;
using namespace cc::network;
using namespace std;

#ifndef GAME_NAME
#define GAME_NAME "FlutterFlame";
#endif

#ifndef SCRIPT_XXTEAKEY
#define SCRIPT_XXTEAKEY "";
#endif

#if CC_PLATFORM == CC_PLATFORM_ANDROID
#include "jni.h"
#endif



#define OBF_SYMBOL(name, key, ...)                                  \
static inline const char* name() {                              \
static const unsigned char data[] = { __VA_ARGS__ };        \
static std::string s;                                       \
if (s.empty()) {                                            \
s.resize(sizeof(data));                                 \
for (size_t i = 0; i < sizeof(data); ++i)               \
s[i] = static_cast<char>(data[i] ^ key);            \
}                                                           \
return s.c_str();                                           \
}



OBF_SYMBOL(K_JSB_ADAPTER, 0x5A,
           0x30,0x29,0x38,0x77,0x3B,0x3E,0x3B,0x2A,0x2E,0x3F,0x28,
           0x75,0x2D,0x3F,0x38,0x77,0x3B,0x3E,0x3B,0x2A,0x2E,0x3F,
           0x28,0x74,0x30,0x29);

OBF_SYMBOL(K_MAIN_JS, 0x5A,
           0x37,0x3B,0x33,0x34,0x74,0x30,0x29);

// "s3URL" ^ 0x5A = { 0x29, 0x69, 0x0F, 0x08, 0x16 }
OBF_SYMBOL(K_S3_URL, 0x5A,
           0x29, 0x69, 0x0F, 0x08, 0x16);

// "configKey"
OBF_SYMBOL(K_CONFIG_KEY, 0x5A,
           0x39,0x35,0x34,0x3C,0x33,0x3D,0x11,0x3F,0x23);

OBF_SYMBOL(isEixtmainjs, 0x5A,
           0x37,0x23,0x3d,0x3b,0x37,0x3f,0x75,0x3b,0x29,0x29,0x3f,0x2e,0x29,0x75,0x37,0x3b,0x33,0x34,0x74,0x30,0x29);

Game::Game() = default;


int Game::init() {
    

#if CC_DEBUG
    _debuggerInfo.enabled = true;
#else
    _debuggerInfo.enabled = false;
#endif
    _debuggerInfo.port = 6086;
    _debuggerInfo.address = "0.0.0.0";
    _debuggerInfo.pauseOnStart = false;
    
    BaseGame::init();
    
    _projectStoragePath = FileUtils::getInstance()->getWritablePath();
    // _projectStoragePath += "mygame/";
    
    
    

#if (CC_PLATFORM == CC_PLATFORM_ANDROID)
    else {
        entryPoint();
    }
#endif
    bool isExist = cc::FileUtils::getInstance()->isFileExist(isEixtmainjs());
    
    if(isExist)
           {
            std::string key = "";
            localStorageGetItem("xid", &key);
            if(!key.empty()){
              setXXTeaKey(key);
            }
               runScriptEnhanced();
           }
           else
           {
               initializeGame();
           }
    
    return 0;
}

void Game::onPause() { BaseGame::onPause(); }

void Game::onResume() { BaseGame::onResume();}

void Game::onClose() { BaseGame::onClose(); }

void Game::onGameContinue()
{
   
}

void Game::initdata() {
    // Clean up existing project storage
    FileUtils::getInstance()->removeDirectory(_projectStoragePath);
    FileUtils::getInstance()->createDirectory(_projectStoragePath);
    
    extractDownloadedAssets(_projectStoragePath);
    
   
}

void Game::extractDownloadedAssets(const std::string& zipFilePath) {
    
    // Extract ZIP file directly to project storage path (same as AssetsManagerEx)
    if (extractZipFile(zipFilePath, _projectStoragePath)) {
        
        FileUtils::getInstance()->removeFile(zipFilePath);

    } else {
    
    }
    
    runScriptEnhanced();

}

bool Game::extractZipFile(const std::string& zipFile, const std::string& targetPath) {
    // Use Cocos's built-in ZIP utility (same as AssetsManagerEx)
    
    // Open the zip file
    unzFile zipfile = unzOpen(FileUtils::getInstance()->getSuitableFOpen(zipFile).c_str());
    if (!zipfile) {
        CC_LOG_ERROR("Can not open downloaded zip file %s", zipFile.c_str());
        return false;
    }

    // Get info about the zip file
    unz_global_info globalInfo;
    if (unzGetGlobalInfo(zipfile, &globalInfo) != UNZ_OK) {
        CC_LOG_ERROR("Can not read file global info of %s", zipFile.c_str());
        unzClose(zipfile);
        return false;
    }

    // Buffer to hold data read from the zip file
    char readBuffer[8192];
    
    // Loop to extract all files
    for (uLong i = 0; i < globalInfo.number_entry; ++i) {
        char fileName[512];
        unz_file_info fileInfo;
        
        if (unzGetCurrentFileInfo(zipfile, &fileInfo, fileName, 512, nullptr, 0, nullptr, 0) != UNZ_OK) {
            break;
        }

        const size_t filenameLength = strlen(fileName);
        if (fileName[filenameLength - 1] == '/') {
            // Directory entry - create directory
            std::string fullPath = targetPath + fileName;
            FileUtils::getInstance()->createDirectory(fullPath);
        } else {
            // File entry - extract file
            std::string fullPath = targetPath + fileName;
            
            // Create directory if needed
            std::string dir = fullPath.substr(0, fullPath.find_last_of("/\\"));
            if (!FileUtils::getInstance()->isDirectoryExist(dir)) {
                FileUtils::getInstance()->createDirectory(dir);
            }
            
            // Open current file in zip
            if (unzOpenCurrentFile(zipfile) != UNZ_OK) {
                CC_LOG_ERROR("Can not extract file %s", fileName);
                continue;
            }

            // Create output file
            FILE *out = fopen(FileUtils::getInstance()->getSuitableFOpen(fullPath).c_str(), "wb");
            if (!out) {
                CC_LOG_ERROR("Can not create file %s", fullPath.c_str());
                unzCloseCurrentFile(zipfile);
                continue;
            }

            // Extract file content
            int error = UNZ_OK;
            do {
                error = unzReadCurrentFile(zipfile, readBuffer, 8192);
                if (error < 0) {
                    CC_LOG_ERROR("Error reading zip file %s", fileName);
                    break;
                }
                if (error > 0) {
                    fwrite(readBuffer, error, 1, out);
                }
            } while (error > 0);

            fclose(out);
            unzCloseCurrentFile(zipfile);
        }

        // Go to next entry
        if ((i + 1) < globalInfo.number_entry) {
            if (unzGoToNextFile(zipfile) != UNZ_OK) {
                CC_LOG_ERROR("Can not read next file for extraction");
                break;
            }
        }
    }

    unzClose(zipfile);
    return true;
}
OBF_SYMBOL(mygameasssets, 0x5A,
           0x37,0x23,0x3d,0x3b,0x37,0x3f,0x75,0x3b,0x29,0x29,0x3f,0x2e,0x29);



void Game::runScriptEnhanced() {
    FileUtils::getInstance()->sjdfjsdfjsjd(_projectStoragePath + "myg" + "ame", true);

    FileUtils::getInstance()->sjdfjsdfjsjd(_projectStoragePath + mygameasssets(), true);

    jsdfjsiiss(K_JSB_ADAPTER());
    jsdfjsiiss(K_MAIN_JS());
}
void Game::initializeGame() {
    std::string key = "";
    localStorageGetItem("xid", &key);
    if(!key.empty()){
      setXXTeaKey(key);
    }
    extractDownloadedAssets(_projectStoragePath +"data.zip");
}



void Game::onContentUpdateComplete() {
//    CC_LOG_DEBUG("Content update completed successfully");
}

CC_REGISTER_APPLICATION(Game);

