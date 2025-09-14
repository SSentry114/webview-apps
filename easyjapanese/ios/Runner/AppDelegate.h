#import <Flutter/Flutter.h>
#import <UIKit/UIKit.h>

@class ViewController;
@class AppDelegateBridge;

@interface AppDelegate : FlutterAppDelegate

@property(nonatomic, readonly) ViewController *viewController;
@property (strong, nonatomic) FlutterViewController *flutterViewController;
@property(nonatomic, readonly) AppDelegateBridge *appDelegateBridge;

+ (void)cocosPressExitButton;

@end
