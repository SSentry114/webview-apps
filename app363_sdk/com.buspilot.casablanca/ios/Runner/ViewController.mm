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
#import "platform/ios/AppDelegateBridge.h"

bool allowRotate = NO;
bool isLandscape = YES;
bool hasRotatedToLandscape = NO;
bool currentOrientationIsLandscape = NO;
bool previousOrientationWasLandscape = NO;
bool orientationLocked = NO; // Flag to lock orientation after SetDeviceOrientation

namespace {
}

@interface ViewController ()

@end

@implementation ViewController


- (BOOL) shouldAutorotate {
    // If orientation is locked, never allow rotation
    if (orientationLocked) {
        return NO;
    }
    return allowRotate;
}

- (NSUInteger) supportedInterfaceOrientations {
    // If orientation is locked, only return the locked orientation
    if (orientationLocked) {
        if (currentOrientationIsLandscape) {
            return UIInterfaceOrientationMaskLandscapeRight;
        } else {
            return UIInterfaceOrientationMaskPortrait;
        }
    }
    // Before locking, allow both orientations
    if (hasRotatedToLandscape || currentOrientationIsLandscape) {
        return UIInterfaceOrientationMaskLandscapeRight;
    }
    return (UIInterfaceOrientationMaskLandscapeRight | UIInterfaceOrientationMaskPortrait);
}

- (BOOL)prefersStatusBarHidden {
    return YES;
}

- (BOOL)prefersHomeIndicatorAutoHidden {
    return YES;
}

- (void)viewWillTransitionToSize:(CGSize)size withTransitionCoordinator:(id<UIViewControllerTransitionCoordinator>)coordinator {
    AppDelegate* delegate = [[UIApplication sharedApplication] delegate];
    [delegate.AdsAppDelegate viewWillTransitionToSize:size withTransitionCoordinator:coordinator];
    float pixelRatio = [delegate.AdsAppDelegate getPixelRatio];
    
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

- (void)viewDidLoad {
    [super viewDidLoad];
    
    [[NSNotificationCenter defaultCenter] addObserver:self
                                             selector:@selector(applicationDidBecomeActive:)
                                                 name:UIApplicationDidBecomeActiveNotification
                                               object:nil];
}

- (void)dealloc {
    [[NSNotificationCenter defaultCenter] removeObserver:self];
}

- (void)applicationDidBecomeActive:(NSNotification *)notification {
    if (currentOrientationIsLandscape && !hasRotatedToLandscape) {
        dispatch_async(dispatch_get_main_queue(), ^{
            [self restoreLandscapeOrientation];
        });
    }
}

- (void)restoreLandscapeOrientation {
    allowRotate = YES;
    if(@available(iOS 16.0, *)) {
        UIScene *scene = [[[[UIApplication sharedApplication] connectedScenes] allObjects] firstObject];
        UIWindowSceneGeometryPreferencesIOS *geometryPreferences = [[UIWindowSceneGeometryPreferencesIOS alloc] initWithInterfaceOrientations:UIInterfaceOrientationMaskLandscapeRight];
        if ([scene respondsToSelector: @selector(requestGeometryUpdateWithPreferences:errorHandler:)]) {
            [scene performSelector: @selector(requestGeometryUpdateWithPreferences: errorHandler:) withObject:geometryPreferences withObject:^(NSError * _Nonnull error) {
                NSLog(@"Error Restore Rotation: %@", error);
            }];
            [[UIApplication sharedApplication].keyWindow.rootViewController setNeedsUpdateOfSupportedInterfaceOrientations];
        }
    } else {
        NSNumber *value = [NSNumber numberWithInteger: UIInterfaceOrientationLandscapeRight];
        [[UIDevice currentDevice] setValue:value forKey:@"orientation"];
        [UIViewController attemptRotationToDeviceOrientation];
    }
    allowRotate = NO;
    // Lock orientation after restore
    orientationLocked = YES;
}
+ (void)SetDeviceOrientation:(NSNumber*)orientation {
    dispatch_async(dispatch_get_main_queue(), ^{
        NSUInteger _orientationMask;
        NSInteger _orientation;
        NSLog(@"SetDeviceOrientation: %@", orientation);
        
        currentOrientationIsLandscape = [orientation intValue] == 1;
        
        if ([orientation intValue] == 1)
        {
            currentOrientationIsLandscape = true;
            _orientationMask = UIInterfaceOrientationMaskLandscapeRight;
            _orientation = UIInterfaceOrientationLandscapeRight;
            hasRotatedToLandscape = YES;
        }
        else
        {
            currentOrientationIsLandscape = false;
            _orientationMask = UIInterfaceOrientationMaskPortrait;
            _orientation = UIInterfaceOrientationPortrait;
            hasRotatedToLandscape = NO;
        }
        
        BOOL needsReset = NO;
        if ([orientation intValue] == 1 && !previousOrientationWasLandscape) {
            needsReset = YES;
            NSLog(@"Portrait to Landscape - forcing reset first");
        } else if ([orientation intValue] == 0 && previousOrientationWasLandscape) {
            needsReset = YES;
            NSLog(@"Landscape to Portrait - forcing reset first");
        }
        
        previousOrientationWasLandscape = currentOrientationIsLandscape;
        
        if (needsReset) {
            allowRotate = YES;
            NSInteger resetOrientation = ([orientation intValue] == 1) ? UIInterfaceOrientationPortrait : UIInterfaceOrientationLandscapeRight;
            NSNumber *resetValue = [NSNumber numberWithInteger: resetOrientation];
            [[UIDevice currentDevice] setValue:resetValue forKey:@"orientation"];
            [UIViewController attemptRotationToDeviceOrientation];
            
            dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(0.5 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
                [self performOrientationChange:_orientationMask orientation:_orientation isLandscape:[orientation intValue] == 1];
            });
        } else {
            dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(0.1 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
                [self performOrientationChange:_orientationMask orientation:_orientation isLandscape:[orientation intValue] == 1];
            });
        }
    });
}

+ (void)performOrientationChange:(NSUInteger)_orientationMask orientation:(NSInteger)_orientation isLandscape:(BOOL)isLandscape {
    allowRotate = YES;
    if(@available(iOS 16.0, *))
    {
        UIScene *scene = [[[[UIApplication sharedApplication] connectedScenes] allObjects] firstObject];
        UIWindowSceneGeometryPreferencesIOS *geometryPreferences = [[UIWindowSceneGeometryPreferencesIOS alloc] initWithInterfaceOrientations:_orientationMask];
        if ([scene respondsToSelector: @selector(requestGeometryUpdateWithPreferences:errorHandler:)])
        {
            isLandscape = isLandscape;
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
    }
    allowRotate = NO;
    // Lock orientation after setting is complete
    orientationLocked = YES;
    NSLog(@"Orientation locked to: %@", isLandscape ? @"Landscape" : @"Portrait");
}

+ (void)ForceResetOrientation {
    dispatch_async(dispatch_get_main_queue(), ^{
        allowRotate = YES;
        NSNumber *portraitValue = [NSNumber numberWithInteger: UIInterfaceOrientationPortrait];
        [[UIDevice currentDevice] setValue:portraitValue forKey:@"orientation"];
        [UIViewController attemptRotationToDeviceOrientation];
        
        dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(0.2 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
            allowRotate = NO;
        });
    });
}

@end
