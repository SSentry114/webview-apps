#import <Flutter/Flutter.h>
#import <UIKit/UIKit.h>

@class ViewController;

@class AppDelegateBridge;   // forward declare

@interface AppDelegate : FlutterAppDelegate

@property(nonatomic, strong) ViewController *viewController;
@property(nonatomic, strong) AppDelegateBridge *AdsAppDelegate;
@property (strong, nonatomic) FlutterViewController *flutterViewController;
@property (strong, nonatomic) UIWindow *loadingWindow;

+ (void)hideLoadingView;

@end
