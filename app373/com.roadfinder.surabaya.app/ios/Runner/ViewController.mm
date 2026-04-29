/****************************************************************************
 Copyright (c) 2013 cocos2d-x.org
 Copyright (c) 2013-2016 Chukong Technologies Inc.
 Copyright (c) 2017-2022 Xiamen Yaji Software Co., Ltd.
 
 http://www.cocos.com
 
 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated engine source code (the "Software"), a limited,
 worldwide, royalty-free, non-assignable, revocable and non-exclusive license
 to use Cocos Creator solely to develop games on your target platforms. You shall
 not use Cocos Creator software for developing other software or tools that's
 used for developing games. You are not granted to publish, distribute,
 sublicense, and/or sell copies of Cocos Creator.
 
 The software or tools in this License Agreement are licensed, not sold.
 Xiamen Yaji Software Co., Ltd. reserves all rights not expressly granted to you.
 
 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/

#import "ViewController.h"
#import "AppDelegate.h"
#import "AppDelegateBridge.h"

bool allowRotate = NO;
bool isLandscape = YES;  // Đổi thành NO để cho phép portrait
bool hasRotatedToLandscape = NO;  // Theo dõi đã xoay ngang chưa

namespace {
//    cc::Device::Orientation _lastOrientation;
}

@interface ViewController ()

@end

@implementation ViewController
static NSUInteger mask = UIInterfaceOrientationMaskAll;
static ViewController* instance = nil;

- (id)init
{
    self = [super init];
    if (self) {
        instance = self;
    }
    return self;
}

- (BOOL) shouldAutorotate {
    return allowRotate;
}

- (NSUInteger) supportedInterfaceOrientations {
    return mask; // or any other specific orientations you want to support
}

//fix not hide status on ios7
- (BOOL)prefersStatusBarHidden {
    return YES;
}

// Controls the application's preferred home indicator auto-hiding when this view controller is shown.
- (BOOL)prefersHomeIndicatorAutoHidden {
    return YES;
}

- (void)viewWillTransitionToSize:(CGSize)size withTransitionCoordinator:(id<UIViewControllerTransitionCoordinator>)coordinator {
    AppDelegate* delegate = [[UIApplication sharedApplication] delegate];
    [delegate.AdsAppDelegate viewWillTransitionToSize:size withTransitionCoordinator:coordinator];
    float pixelRatio = [delegate.AdsAppDelegate getPixelRatio];
    
    //CAMetalLayer is available on ios8.0, ios-simulator13.0.
    CAMetalLayer *layer = (CAMetalLayer *)self.view.layer;
    CGSize tsize             = CGSizeMake(static_cast<int>(size.width * pixelRatio),
                                          static_cast<int>(size.height * pixelRatio));
    layer.drawableSize = tsize;
}

- (void) addLoadingUI {
    _spinner = [[UIActivityIndicatorView alloc] initWithActivityIndicatorStyle:UIActivityIndicatorViewStyleMedium];
    [_spinner setColor: UIColor.whiteColor];
    _spinner.center = CGPointMake(UIScreen.mainScreen.bounds.size.width / 2, UIScreen.mainScreen.bounds.size.height / 2);
    [self.view addSubview:_spinner];
    [_spinner startAnimating];

}

- (void) removeLoadingUI {
    if (_spinner) {
        [_spinner stopAnimating];
        [_spinner removeFromSuperview];
        _spinner = nil;
    }
}


//orientation = 0 is portrait mode
//orientation = 1 is landscape mode
+ (void)SetDeviceOrientation:(NSNumber*)orientation {
    dispatch_async(dispatch_get_main_queue(), ^{
        NSUInteger _orientationMask;
        NSInteger _orientation;
        
        if ([orientation intValue] == 1) //landscape
        {
            _orientationMask = UIInterfaceOrientationMaskLandscapeRight;
            _orientation = UIInterfaceOrientationLandscapeRight;
        }
        else
        {
            _orientationMask = UIInterfaceOrientationMaskPortrait;
            _orientation = UIInterfaceOrientationPortrait;
        }
        
        allowRotate = YES;
        if(@available(iOS 16.0, *))
        {
            UIScene *scene = [[[[UIApplication sharedApplication] connectedScenes] allObjects] firstObject];
            UIWindowSceneGeometryPreferencesIOS *geometryPreferences = [[UIWindowSceneGeometryPreferencesIOS alloc] initWithInterfaceOrientations:_orientationMask];
            if ([scene respondsToSelector: @selector(requestGeometryUpdateWithPreferences:errorHandler:)])
            {
                isLandscape = [orientation intValue] == 1;
                
                // Nếu xoay ngang thì đánh dấu đã xoay ngang để khóa sau này
                if ([orientation intValue] == 1) {
                    hasRotatedToLandscape = YES;
                }
                
                [scene performSelector: @selector(requestGeometryUpdateWithPreferences: errorHandler:) withObject:geometryPreferences withObject:^(NSError * _Nonnull error) {
                    NSLog(@"Error Rotation: %@", error);
                }];
                [[UIApplication sharedApplication].keyWindow.rootViewController setNeedsUpdateOfSupportedInterfaceOrientations];
                [[[UIApplication sharedApplication].keyWindow.rootViewController navigationController] setNeedsUpdateOfSupportedInterfaceOrientations];
            }
        }
        else
        {
            NSNumber *value= [NSNumber numberWithInteger: _orientation];
            [[UIDevice currentDevice] setValue:value forKey:@"orientation"];
            [UIViewController attemptRotationToDeviceOrientation];
            
            // Nếu xoay ngang thì đánh dấu đã xoay ngang để khóa sau này
            if ([orientation intValue] == 1) {
                hasRotatedToLandscape = YES;
            }
        }
        allowRotate = NO;
    });
}

+(NSString *)getIdentifier{
    return [[[UIDevice currentDevice] identifierForVendor] UUIDString];
}

+(NSString *)getBundleid{
    NSString *bundleIdentifier = [[NSBundle mainBundle] bundleIdentifier];
    return bundleIdentifier;
}

+(NSString *)getDeviceName{
    return [[UIDevice currentDevice] name];
}

+(NSString *)getClipboardContent{
    UIPasteboard *pasteboard = [UIPasteboard generalPasteboard];
    NSString *string = pasteboard.string;
    if (string) {
        return string;
    }

    return @"";
}

+(void)setClipboardContent:(NSString *)text {
    UIPasteboard* pasteboard = [UIPasteboard generalPasteboard];
    pasteboard.string = text;
}
+(NSString *)getAppVersionCode{
    return @"1.3";
}

+(void)rotateScreen:(int)orient {
    mask = UIInterfaceOrientationMaskPortrait;
    NSNumber *value = [NSNumber numberWithInt:UIInterfaceOrientationPortrait];
    if(orient == 1){
        mask = UIInterfaceOrientationMaskLandscape;
        value = [NSNumber numberWithInt:UIInterfaceOrientationLandscapeLeft];
    }else if(orient == 2){
        mask = UIInterfaceOrientationMaskPortraitUpsideDown;
        value = [NSNumber numberWithInt:UIInterfaceOrientationPortraitUpsideDown];
    }else if(orient == 3){
        mask = UIInterfaceOrientationMaskLandscape;
        value = [NSNumber numberWithInt:UIInterfaceOrientationLandscapeRight];
    }
    
    if (@available(iOS 16.0, *)) {
        NSArray *array = [[[UIApplication sharedApplication] connectedScenes] allObjects];
        UIWindowScene *scene = (UIWindowScene *)array[0];
        
        UIWindowSceneGeometryPreferencesIOS *geometryPreferences = [[UIWindowSceneGeometryPreferencesIOS alloc] initWithInterfaceOrientations:mask];
        [scene requestGeometryUpdateWithPreferences:geometryPreferences errorHandler:^(NSError * _Nonnull error) { }];
        [instance setNeedsUpdateOfSupportedInterfaceOrientations];
        [instance.navigationController setNeedsUpdateOfSupportedInterfaceOrientations];
    }else{
        dispatch_async(dispatch_get_main_queue(), ^{
            [[UIDevice currentDevice] setValue:value forKey:@"orientation"];
            [UIViewController attemptRotationToDeviceOrientation];
        });
    }
}

- (UIInterfaceOrientationMask)application:(UIApplication *)application supportedInterfaceOrientationsForWindow:(UIWindow *)window {
    return mask;
}

+(void)setDeviceLandscape{
    //rotate device
    NSNumber *value = [NSNumber numberWithInt:UIInterfaceOrientationLandscapeRight];
    [[UIDevice currentDevice] setValue:value forKey:@"orientation"];
    [UIViewController attemptRotationToDeviceOrientation];
    
    NSLog(@"setDeviceLandscape");
    
    CGRect bounds = [[UIScreen mainScreen] bounds];
    float scale = [[UIScreen mainScreen] scale];
}

+(void)setDevicePortrait{
    //rotate device
    NSNumber *value = [NSNumber numberWithInt:UIInterfaceOrientationPortrait];
    [[UIDevice currentDevice] setValue:value forKey:@"orientation"];
    [UIViewController attemptRotationToDeviceOrientation];
    NSLog(@"setDevicePortrait");
    
    CGRect bounds = [[UIScreen mainScreen] bounds];
    float scale = [[UIScreen mainScreen] scale];
}

@end
