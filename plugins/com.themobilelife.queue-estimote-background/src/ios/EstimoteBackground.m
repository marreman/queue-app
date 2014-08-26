//
//  EstimoteBackground.m
//  queue-estimote-background
//
//  Created by Akekarat Pattrasitidecha on 8/25/14.
//
//

#import "EstimoteBackground.h"

#import <Firebase/Firebase.h>

#define RANGE_CLOSE_METER (0.3f)

typedef enum : NSUInteger {
    EBBEACON_START_STATE,
    EBBEACON_QUEUE_STATE,
    EBBEACON_QUEUE_WAITINGDATA_STATE,
    EBBEACON_END_STATE
} EBBeaconState;

@interface EstimoteBackground () <ESTBeaconManagerDelegate, CLLocationManagerDelegate>


//@property (nonatomic, strong) ESTBeacon         *beacon;
//@property (nonatomic, strong) ESTBeaconManager  *beaconManager;
//@property (nonatomic, strong) ESTBeaconRegion   *beaconRegion;


//@property (nonatomic, strong) CLLocationManager* locationManager;

@property (readwrite) UIBackgroundTaskIdentifier bgTask;

@property (nonatomic, strong) Firebase* rootFirebase;

@property (readwrite) EBBeaconState beaconState;

@property (nonatomic, strong) NSString* queueSessionKey;

@property (nonatomic, strong) NSString* currentBeaconID;
@property (nonatomic, strong) NSNumber* startTime;

@end

@implementation EstimoteBackground


- (void) cordovaInitEstimote:(CDVInvokedUrlCommand *)command {
    
    NSLog(@"cordovaInitEstimote");
    
    self.beaconState = EBBEACON_START_STATE;
    
    
    
    self.rootFirebase = [[Firebase alloc] initWithUrl:@"https://queue-app.firebaseio.com/"];
    
    Firebase* firebaseDeviceID = [self.rootFirebase childByAutoId];
    
    NSLog(@"firebaseDeviceID = %@", firebaseDeviceID);
    
    
//    NSString* uuid1 = [self uuidString];
    __block NSString* uuid = [self uniqueAppInstanceIdentifier];
    
    
    NSLog(@"uuid = %@", uuid);
    
    
    
    
//    [self.rootFirebase observeEventType:FEventTypeValue withBlock:^(FDataSnapshot *snapshot) {
////        NSLog(@"%@", snapshot.value);
////        NSLog(@"%@", snapshot.value[@"users"]);
////        NSLog(@"%@", snapshot.value[@"users"][uuid]);
//        
//        
//        
////        {// add gender
////            
////            Firebase* userFirebase = [[Firebase alloc] initWithUrl:@"https://queue-app.firebaseio.com/users"];
////            
////            Firebase* uuidFirebase = [userFirebase childByAppendingPath:uuid];
////            
////            [uuidFirebase setValue:@{@"gender":@"male"}];
////        }
//        
//        
//        
//        
//    } withCancelBlock:^(NSError *error) {
//        NSLog(@"error %@", error.description);
//    }];
    
    
    
    
    
    
    
    NSUUID *proximityUUID = [[NSUUID alloc] initWithUUIDString:@"B9407F30-F5F8-466E-AFF9-25556B57FE6D"];
    self.currentRegion = [[ESTBeaconRegion alloc] initWithProximityUUID:proximityUUID
                                                            identifier:@"RegionIdentifier"];

    
    self.currentRegion.notifyEntryStateOnDisplay = YES;
    
    // start discovery
    [self.beaconManager startEstimoteBeaconsDiscoveryForRegion:self.currentRegion];
    
    
    [self.beaconManager startMonitoringForRegion:self.currentRegion];
    [self.beaconManager startRangingBeaconsInRegion:self.currentRegion];
    [self.beaconManager requestStateForRegion:self.currentRegion];
    
    
    
    self.bgTask = [[UIApplication sharedApplication] beginBackgroundTaskWithExpirationHandler:^{
        
        [[UIApplication sharedApplication] endBackgroundTask:self.bgTask];
    }];
    
    [self performSelector:@selector(endBGTask) withObject:nil afterDelay:3600];
    
    
    // Create an instance of CDVPluginResult, with an OK status code.
    // Set the return message as the Dictionary object (jsonObj)...
    // ... to be serialized as JSON in the browser
    CDVPluginResult *pluginResult = [ CDVPluginResult
                                     resultWithStatus    : CDVCommandStatus_OK
                                     messageAsDictionary : @{}
                                     ];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void) endBGTask{
    [[UIApplication sharedApplication] endBackgroundTask:self.bgTask];
}


/// copy from phonegap code
- (NSString*)uniqueAppInstanceIdentifier
{
    NSUserDefaults* userDefaults = [NSUserDefaults standardUserDefaults];
    static NSString* UUID_KEY = @"CDVUUID";
    
    NSString* app_uuid = [userDefaults stringForKey:UUID_KEY];
    
    if (app_uuid == nil) {
        CFUUIDRef uuidRef = CFUUIDCreate(kCFAllocatorDefault);
        CFStringRef uuidString = CFUUIDCreateString(kCFAllocatorDefault, uuidRef);
        
        app_uuid = [NSString stringWithString:(__bridge NSString*)uuidString];
        [userDefaults setObject:app_uuid forKey:UUID_KEY];
        [userDefaults synchronize];
        
        CFRelease(uuidString);
        CFRelease(uuidRef);
    }
    
    return app_uuid;
}



#pragma mark - CLLocationManager delegate

- (void)locationManager:(CLLocationManager *)manager didDetermineState:(CLRegionState)state forRegion:(CLRegion *)region
{
}

- (void)locationManager:(CLLocationManager *)manager didRangeBeacons:(NSArray *)beacons inRegion:(CLBeaconRegion *)region
{
}



#pragma mark - ESTBeaconManager delegate

- (void)beaconManager:(ESTBeaconManager *)manager didEnterRegion:(ESTBeaconRegion *)region
{
}

- (void)beaconManager:(ESTBeaconManager *)manager didExitRegion:(ESTBeaconRegion *)region
{
}

- (void)beaconManager:(ESTBeaconManager *)manager didRangeBeacons:(NSArray *)beacons inRegion:(ESTBeaconRegion *)region
{
    
    
    for(ESTBeacon* beacon in beacons){
        
        
        if(self.beaconState == EBBEACON_START_STATE){
            [self updateStartTime: beacon];
            
            self.beaconState = EBBEACON_QUEUE_STATE;
        }
        
        NSLog(@"major: %@, distance: %@, proximity: %d", beacon.major, beacon.distance, beacon.proximity);
        
        if(self.beaconState == EBBEACON_QUEUE_STATE && [beacon.distance floatValue] < RANGE_CLOSE_METER){
            
            UILocalNotification *notification = [UILocalNotification new];
            notification.alertBody = [NSString stringWithFormat:@"%@: distance < %f", beacon.major, RANGE_CLOSE_METER];
            
            [[UIApplication sharedApplication] presentLocalNotificationNow:notification];
            
            
            
            
            
            [self updateEndTime: beacon withBlock:^{
                
                NSLog(@"self.bgTask = %d", self.bgTask);
                
                
                [self performSelector:@selector(endBGTask) withObject:nil afterDelay:5];
                
                self.beaconState = EBBEACON_END_STATE;
            }];
            
            
            
            
            
            
            
        }
        
        
        
    }
    
//    double timeRemaining = [UIApplication sharedApplication].backgroundTimeRemaining;
//    NSLog(@"timeRemaining = %f",timeRemaining);
    
    
}

- (void) updateStartTime:(ESTBeacon*) beacon{
    
    NSString* beaconID = [self getBeaconID:beacon];
    
    self.currentBeaconID = beaconID;
    
//    NSString* queueURL = [NSString stringWithFormat:@"https://queue-app.firebaseio.com/queueSessions/%@", beaconID];
//    
//    NSLog(@"queueURL = %@", queueURL);
//    //        self.queueSessionKey
//    Firebase* queueSessionsFirebase = [[Firebase alloc] initWithUrl:queueURL];
    
    
//    NSLog(@"queueSessionsFirebase = %@", queueSessionsFirebase);
    
    
    NSNumber* startTime =  @((int)[[NSDate date] timeIntervalSince1970]);
    NSLog(@"startTime = %@", startTime);
    self.startTime = startTime;
    
    
    
    
//    Firebase* childAutoIDFirebase = [queueSessionsFirebase childByAutoId];
//    
//    NSString* autoID = childAutoIDFirebase.description;
//    NSLog(@"autoID = %@",autoID);
//    self.queueSessionKey = autoID;
//    
//    [childAutoIDFirebase setValue:@{@"start" : startTime}];
    
    
    
}

- (void) updateEndTime:(ESTBeacon*) beacon withBlock:(void (^)(void))successBlock{
    
    NSLog(@"updateEndTime");
    
    __block NSString* beaconID = [self getBeaconID:beacon];
    
    NSLog(@"1 beaconID = %@", beaconID);
    
    if(self.currentBeaconID && [beaconID isEqualToString:self.currentBeaconID]){
        
        __block NSString* uuid = [self uniqueAppInstanceIdentifier];
        
        self.beaconState = EBBEACON_QUEUE_WAITINGDATA_STATE;
        
//        NSString* queueURL = [NSString stringWithFormat:@"https://queue-app.firebaseio.com/queueSessions/%@", beaconID];
//        Firebase* queueSessionsFirebase = [[Firebase alloc] initWithUrl:queueURL];
        
        __block ESTBeacon* beaconBlock = beacon;
        
        [self.rootFirebase observeEventType:FEventTypeValue withBlock:^(FDataSnapshot *snapshot) {
            
            if(self.beaconState == EBBEACON_QUEUE_WAITINGDATA_STATE){
                NSLog(@"observeEventType");
                
                id users = snapshot.value[@"users"];
                id userUUID = users[uuid];
                
                //        NSLog(@"users = %@", users);
                //        NSLog(@"userUUID = %@", userUUID);
                
                NSString* gender = @"";
                if(userUUID){
                    gender = userUUID[@"gender"];
                }
                
                ///
                NSString* beaconID = [self getBeaconID:beaconBlock];
                
                NSLog(@"2 beaconID = %@", beaconID);
                
                NSString* queueURL = [NSString stringWithFormat:@"https://queue-app.firebaseio.com/queueSessions/%@", beaconID];
                
                Firebase* queueSessionsFirebase = [[Firebase alloc] initWithUrl:queueURL];
//
                
                Firebase* childAutoIDFirebase = [queueSessionsFirebase childByAutoId];
                
                NSLog(@"childAutoIDFirebase = %@", childAutoIDFirebase);
                
                NSNumber* endTime =  @((int)[[NSDate date] timeIntervalSince1970]);
                
                if(gender){
                    [childAutoIDFirebase setValue:@{@"start":self.startTime, @"end":endTime, @"gender": gender}];
                }else{
                    [childAutoIDFirebase setValue:@{@"start":self.startTime, @"end":endTime}];
                }
                
                successBlock();
            }
            
        } withCancelBlock:^(NSError *error) {
            NSLog(@"error %@", error.description);
        }];
    }
    
    
    
    
}

- (NSString*) getBeaconID:(ESTBeacon*) beacon{
    return [NSString stringWithFormat:@"%d-%d", [beacon.major intValue], [beacon.minor intValue]];
}




@end
