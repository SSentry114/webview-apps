#import <UIKit/UIKit.h>
#import "AppDelegate.h"
#include "platform/BasePlatform.h"
#include <string>

int gs_asimonrgc;
const char **g_asimonrgv;

int main(int argc,const char* argv[])
{
    gs_asimonrgc = argc;
   @autoreleasepool {
       g_asimonrgv = argv;
       int ret = UIApplicationMain(argc, (char**)argv, nil, NSStringFromClass([AppDelegate class]));
       return ret;
   }
}

