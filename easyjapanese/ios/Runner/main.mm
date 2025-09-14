#import <UIKit/UIKit.h>
#import "AppDelegate.h"
#include "platform/BasePlatform.h"

int main(int argc,const char* argv[])
{
    cc::BasePlatform* platform = cc::BasePlatform::getPlatform();
    if (platform->init()) {
       return -1;
    }
    platform->run(argc, argv);
    
  @autoreleasepool {
      return UIApplicationMain(argc, (char**)argv, nil, NSStringFromClass([AppDelegate class]));
  }
}
