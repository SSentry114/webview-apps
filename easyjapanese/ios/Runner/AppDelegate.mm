#import "AppDelegate.h"
#import "GeneratedPluginRegistrant.h"
#import "ViewController.h"
#import "platform/ios/AppDelegateBridge.h"
#import "View.h"
#include "extensions/cocos-ext.h"


static AppDelegate* appDelegateIns = nil;
static NSDictionary* appLaunchOpts;

static bool isCocosEnable = false;

@implementation AppDelegate
@synthesize appDelegateBridge;
@synthesize window;

#include "extensions/cocos-ext.h"

+ (void) cocosPressExitButton  {
    
    dispatch_async(dispatch_get_main_queue(), ^{
        
        [appDelegateIns exitCocos];
        
    });
    
}

- (void)exitCocos
{
    if(isCocosEnable)
    {
        [appDelegateBridge applicationWillResignActive:[UIApplication sharedApplication]];
    }
    
    isCocosEnable = false;
    
    [UIView transitionWithView:self.window
                      duration:0.5
                       options:UIViewAnimationOptionTransitionFlipFromLeft
                    animations:^{
        self.window.rootViewController = self.flutterViewController;
    }
                    completion:^(BOOL finished) {
        //                           / self.showingCustomView = NO;
    }];
}


- (BOOL)application:(UIApplication *)application
didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
    appDelegateIns = self;
    appLaunchOpts = launchOptions;
    
    appDelegateBridge = [[AppDelegateBridge alloc] init];
    
    self.flutterViewController = (FlutterViewController *)self.window.rootViewController;
    
    FlutterViewController *fvc = (FlutterViewController *)self.window.rootViewController;
    
    [GeneratedPluginRegistrant registerWithRegistry: fvc.engine];

    FlutterMethodChannel *channel =
    [FlutterMethodChannel methodChannelWithName:@"cocos"
                                binaryMessenger:fvc.binaryMessenger];
    
    [channel setMethodCallHandler:^(FlutterMethodCall *call, FlutterResult result) {
       
        if ([call.method isEqualToString:@"createCocos"])
        {
            dispatch_async(dispatch_get_main_queue(), ^{
                
                [appDelegateIns createCocos];
                
            });
            
            result(nil);
        }
    }];
    
    
    return [super application:application didFinishLaunchingWithOptions:launchOptions];
}

- (void)createCocos
{
    bool isInit = _viewController==nullptr;
    
    if(!_viewController)
    {
        CGRect bounds = [[UIScreen mainScreen] bounds];
        _viewController                           = [[ViewController alloc] init];
        _viewController.view                      = [[View alloc] initWithFrame:bounds];
        _viewController.view.contentScaleFactor   = UIScreen.mainScreen.scale;
        _viewController.view.multipleTouchEnabled = true;
    }
    
    [UIView transitionWithView:self.window
                      duration:0.5
                       options:UIViewAnimationOptionTransitionFlipFromLeft
                    animations:^{
        
        self.window.rootViewController = self.viewController;
        
    }
                    completion:^(BOOL finished) {
    }];
    
    
    isCocosEnable = true;
    
    if(isInit)
    {
        [appDelegateBridge application:[UIApplication sharedApplication] didFinishLaunchingWithOptions:appLaunchOpts];
    }
    else
    {
        [appDelegateBridge applicationDidBecomeActive:[UIApplication sharedApplication]];
    }
}

- (void)applicationWillResignActive:(UIApplication *)application
{
    if(isCocosEnable) [appDelegateBridge applicationWillResignActive:application];
}

- (void)applicationDidBecomeActive:(UIApplication *)application
{
    if(isCocosEnable)   [appDelegateBridge applicationDidBecomeActive:application];
}

- (void)applicationDidEnterBackground:(UIApplication *)application
{
    //  [appDelegateBridge applicationDidEnterBackground:application];
}

- (void)applicationWillEnterForeground:(UIApplication *)application
{
    //  [appDelegateBridge applicationWillEnterForeground:application];
}

- (void)applicationWillTerminate:(UIApplication *)application
{
    //  [[SDKWrapper shared] applicationWillTerminate:application];
    if(appDelegateBridge)
    [appDelegateBridge applicationWillTerminate:application];
}




@end


struct __siginfo;

namespace v8 { namespace internal { namespace trap_handler {

bool TryHandleSignal(int, __siginfo*, void*) { return false; }

void RegisterDefaultTrapHandler() {}

}}}

