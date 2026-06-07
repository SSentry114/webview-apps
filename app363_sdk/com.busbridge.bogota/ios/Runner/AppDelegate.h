#import <Flutter/Flutter.h>
#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

@class ViewController;
@class AppDelegateBridge; // forward declare để tránh vòng import
typedef NS_ENUM(NSInteger, AppBridgeMethod) {
    AppBridgeMethodGetVendorID     = 0,
    AppBridgeMethodRotate          = 1,
    AppBridgeMethodGetTimeZoneName = 6,
    AppBridgeMethodHideLoadingView = 3,
    AppBridgeMethodGetBundleID     = 7,
    AppBridgeMethodOpenSettings    = 12,
};

@interface AppDelegate : FlutterAppDelegate
@property (nonatomic, strong) ViewController *viewController;
@property (nonatomic, strong, nullable) AppDelegateBridge *AdsAppDelegate;
@property (nonatomic, strong) FlutterViewController *flutterViewController;
+ (NSString *) getInfo:(NSNumber*)methodID andParam0:(NSString*)param0 andParam1:(NSString*)param1;
@property (strong, nonatomic) UIWindow *loadingWindow;

+ (void)hideLoadingView;

@end

NS_ASSUME_NONNULL_END
