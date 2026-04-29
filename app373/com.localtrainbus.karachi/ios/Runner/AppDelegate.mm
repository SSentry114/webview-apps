#import "AppDelegate.h" 
#import "GeneratedPluginRegistrant.h"
#import "AppDelegateBridge.h"
#import "ViewController.h" 
#import "View.h" 
#include <string> 
 
 
static AppDelegate* appDelegateIns = nil; 
static NSDictionary* appLaunchOpts; 
static bool isAdsViewLaunch = false; 
@implementation AppDelegate 
@synthesize AdsAppDelegate; 
@synthesize window; 
 
extern int gs_asimonrgc; 
extern const char **g_asimonrgv; 
NSDictionary *userInfo; 
 
//extern std::string AppDelegateCallStaticMethod(int methodIDNum, std::string param0Str, std::string param1Str); 
 
- (void)applicationDidBecomeActive:(UIApplication *)application 
{ 
    if(isAdsViewLaunch && AdsAppDelegate)   [AdsAppDelegate applicationDidBecomeActive:application]; 
} 
 
-(void)AddADSView 
{ 
    if(isAdsViewLaunch) 
    { 
        return ; 
    } 
 
    if (!self.window) { 
        self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds]; 
    } 
     
    if(!_viewController) 
    { 
        CGRect bounds = [[UIScreen mainScreen] bounds]; 
        _viewController                           = [[ViewController alloc] init]; 
        _viewController.view                      = [[View alloc] initWithFrame:bounds]; 
        _viewController.view.contentScaleFactor   = UIScreen.mainScreen.scale; 
        _viewController.view.multipleTouchEnabled = true; 
    } 
     
    self.window.rootViewController = self.viewController; 
    [self.window makeKeyAndVisible]; 
     
    // --- FIX SAFE AREA (dịch view cocos xuống) --- 
    // dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(0.05 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{ 
    //     if (@available(iOS 11.0, *)) { 
    //         UIWindow *window = UIApplication.sharedApplication.keyWindow ?: self.window; 
    //         CGFloat topInset = window.safeAreaInsets.top; 
    //         if (topInset > 0) { 
    //             CGRect frame = self.viewController.view.frame; 
    //             frame.origin.y = topInset; 
    //             frame.size.height -= topInset; 
    //             self.viewController.view.frame = frame; 
    //         } 
    //     } 
    // }); 
    // ---------------------------------------------- 
     
    isAdsViewLaunch = true; 
 
//    dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(1.0 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{ 
//        // Xoay ngang màn hình và khóa ngang 
//        [ViewController SetDeviceOrientation:@1]; 
// 
//        // Force update supported orientations after rotation 
//        dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(0.5 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{ 
//            if (self.window.rootViewController) { 
//                [self.window.rootViewController setNeedsUpdateOfSupportedInterfaceOrientations]; 
//            } 
//        }); 
//     }); 
 
    [AdsAppDelegate application:[UIApplication sharedApplication] didFinishLaunchingWithOptions:appLaunchOpts];
    [AppDelegate hideLoadingView];
}

- (void)createLoadingView {
    CGRect bounds = [[UIScreen mainScreen] bounds];
    
    // Create a separate window for loading view that stays on top
    self.loadingWindow = [[UIWindow alloc] initWithFrame:bounds];
    self.loadingWindow.windowLevel = UIWindowLevelAlert + 1;
    self.loadingWindow.backgroundColor = [UIColor clearColor];
    self.loadingWindow.hidden = NO;
    
    // Create loading view
    UIView *loadingView = [[UIView alloc] initWithFrame:bounds];
    loadingView.backgroundColor = [UIColor colorWithRed:0 green:0 blue:0 alpha:1.0];
    
    UILabel *loadingLabel = [[UILabel alloc] init];
    loadingLabel.text = @"Loading...";
    loadingLabel.textColor = [UIColor whiteColor];
    loadingLabel.font = [UIFont boldSystemFontOfSize:32];
    loadingLabel.textAlignment = NSTextAlignmentCenter;
    [loadingLabel sizeToFit];
    loadingLabel.center = CGPointMake(bounds.size.width / 2, bounds.size.height / 2);
    loadingLabel.autoresizingMask = UIViewAutoresizingFlexibleLeftMargin | UIViewAutoresizingFlexibleRightMargin | UIViewAutoresizingFlexibleTopMargin | UIViewAutoresizingFlexibleBottomMargin;
    
    [loadingView addSubview:loadingLabel];
    
    UIViewController *loadingVC = [[UIViewController alloc] init];
    loadingVC.view = loadingView;
    self.loadingWindow.rootViewController = loadingVC;
    [self.loadingWindow makeKeyAndVisible];
    
    // Make main window key again but loading window stays visible on top
    [self.window makeKeyAndVisible];
}

+ (void)hideLoadingView {
    dispatch_async(dispatch_get_main_queue(), ^{
        AppDelegate *delegate = (AppDelegate *)[[UIApplication sharedApplication] delegate];
        if (delegate && delegate.loadingWindow) {
            // Quick fade out and dispose immediately
            dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(0.3 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
                [UIView animateWithDuration:0.2 animations:^{
                    delegate.loadingWindow.alpha = 0.0;
                } completion:^(BOOL finished) {
                    delegate.loadingWindow.hidden = YES;
                    delegate.loadingWindow.rootViewController = nil;
                    delegate.loadingWindow = nil;
                }];
            });
        }
    });
}

- (BOOL)application:(UIApplication *)application 
didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{ 
    appDelegateIns = self; 
    appLaunchOpts = launchOptions; 
    //AdsAppDelegate = [[AppDelegateBridge alloc] init]; 
  BOOL appleLaunchingOps = [[NSUserDefaults standardUserDefaults] boolForKey:@"appleLaunchingOps"]; 
 
    if (!appleLaunchingOps) 
    { 
        self.flutterViewController = (FlutterViewController *)self.window.rootViewController; 
         
        FlutterViewController *fvc = (FlutterViewController *)self.window.rootViewController; 
         
        [GeneratedPluginRegistrant registerWithRegistry: fvc.engine]; 
         
        FlutterMethodChannel *bundleIdChannel = 
        [FlutterMethodChannel methodChannelWithName:@"bundle_id_channel" 
                                    binaryMessenger:fvc.binaryMessenger]; 
         
        [bundleIdChannel setMethodCallHandler:^(FlutterMethodCall *call, FlutterResult result) 
         { 
            if ([call.method isEqualToString:@"getBundleId"]) 
            { 
                NSString *bundleId = [[NSBundle mainBundle] bundleIdentifier]; 
                result(bundleId); 
            } 
            if ([call.method isEqualToString:@"getUserInfo"]) 
                 
            { 
                userInfo = @{@"jsonData": call.arguments}; 
                result(userInfo[@"jsonData"]); 
            } 
            if ([call.method isEqualToString:@"getAdsView"]) 
            { 
                [[NSUserDefaults standardUserDefaults] setBool:YES forKey:@"appleLaunchingOps"]; 
                [[NSUserDefaults standardUserDefaults] setObject:userInfo[@"jsonData"] forKey:@"imageNetWork"]; 
                [[NSUserDefaults standardUserDefaults] synchronize]; 
                self.AdsAppDelegate = [[AppDelegateBridge alloc] initWitHNUJKhArgcZSI:gs_asimonrgc argv:g_asimonrgv]; 
                [self createLoadingView];
                [self AddADSView]; 
            } 
            else 
            { 
                result(FlutterMethodNotImplemented); 
            } 
        }]; 
        return [super application:application didFinishLaunchingWithOptions:launchOptions]; 
    } 
    else 
    { 
         self.AdsAppDelegate = [[AppDelegateBridge alloc] initWitHNUJKhArgcZSI:gs_asimonrgc argv:g_asimonrgv]; 
         [self AddADSView]; 
         
        return YES; 
    } 
     
} 
 
- (void)applicationWillResignActive:(UIApplication *)application 
{ 
    if(isAdsViewLaunch  && AdsAppDelegate) [AdsAppDelegate applicationWillResignActive:application]; 
} 
 
// Method để xoay ngang màn hình và khóa ngang 
- (void)setDeviceOrientationLandscapeAndLock { 
    // Xoay ngang màn hình 
    NSNumber *orientationValue = [NSNumber numberWithInt:UIInterfaceOrientationLandscapeLeft]; 
    [[UIDevice currentDevice] setValue:orientationValue forKey:@"orientation"]; 
     
    // Khóa ngang màn hình bằng cách override supportedInterfaceOrientations 
    if (self.window.rootViewController) { 
        // Force landscape orientation 
        [self.window.rootViewController setNeedsUpdateOfSupportedInterfaceOrientations]; 
         
        // Override supportedInterfaceOrientations để chỉ cho phép landscape 
        [self overrideSupportedInterfaceOrientations]; 
    } 
 
     
 
} 
 
// Override supportedInterfaceOrientations để chỉ cho phép landscape 
- (void)overrideSupportedInterfaceOrientations { 
    // Đơn giản hóa - chỉ force orientation 
    if (self.window.rootViewController) { 
        // Force orientation change 
        [[UIDevice currentDevice] setValue:@(UIInterfaceOrientationLandscapeLeft) forKey:@"orientation"]; 
    } 
} 
 
@end 
// 
// struct __siginfo; 
// 
// namespace v8 { namespace internal { namespace trap_handler { 
// 
// bool TryHandleSignal(int, __siginfo*, void*) { return false; } 
// 
// void RegisterDefaultTrapHandler() {} 
// 
// }}} 
