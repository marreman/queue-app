//
//  EstimoteBackground.m
//  queue-estimote-background
//
//  Created by Akekarat Pattrasitidecha on 8/25/14.
//
//

#import "EstimoteBackground.h"

#import <Firebase/Firebase.h>
#import "EstimoteData.h"

#define RANGE_CLOSE_METER (1.0f)
#define TIME_WAIT_UNTIL_NEXT_QUEUE (60*60*12)
#define ROOT_FIREBASE_URL @"https://queue-app.firebaseio.com"
#define ESTIMOTE_UUID @"B9407F30-F5F8-466E-AFF9-25556B57FE6D"

typedef enum : NSUInteger {
    EBBEACON_START_STATE,
    EBBEACON_QUEUE_STATE,
    EBBEACON_QUEUE_WAITINGDATA_STATE,
    EBBEACON_END_STATE
} EBBeaconState;

@interface EstimoteBackground () <ESTBeaconManagerDelegate, CLLocationManagerDelegate>

@property (readwrite) UIBackgroundTaskIdentifier bgTask;

@property (nonatomic, strong) Firebase* rootFirebase;

//@property (readwrite) EBBeaconState beaconState;

@property (nonatomic, strong) NSString* queueSessionKey;

//@property (nonatomic, strong) NSString* currentBeaconID;
//@property (nonatomic, strong) NSNumber* startTime;

@property (nonatomic, strong) NSString* notificationText;

//@property (readwrite) NSTimeInterval lastTimeInQueue;


@property (nonatomic) NSMutableDictionary* beaconDataDict;

@end

@implementation EstimoteBackground


- (void) cordovaInitEstimote:(CDVInvokedUrlCommand *)command {
    
    NSLog(@"cordovaInitEstimote");
    
    self.beaconDataDict = [NSMutableDictionary new];
    
    self.notificationText = @"";
    
    
    
    
    self.rootFirebase = [[Firebase alloc] initWithUrl:ROOT_FIREBASE_URL];
    
    Firebase* firebaseDeviceID = [self.rootFirebase childByAutoId];
    
    NSLog(@"firebaseDeviceID = %@", firebaseDeviceID);
    
    
//    {// for debugging without add gender in the web
//        [self createUUIDWithGender];
//    }
    
    [self getNotificationText];
    
    
    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(didEnterBackground) name:UIApplicationDidEnterBackgroundNotification object:nil];
    
    
    
    NSUUID *proximityUUID = [[NSUUID alloc] initWithUUIDString:ESTIMOTE_UUID];
    self.currentRegion = [[ESTBeaconRegion alloc] initWithProximityUUID:proximityUUID
                                                            identifier:@"QueueAppEstimoteBAckgroundRegion"];

    
    self.currentRegion.notifyEntryStateOnDisplay = YES;
    
    // start discovery
//    [self.beaconManager startEstimoteBeaconsDiscoveryForRegion:self.currentRegion];
//    [self.beaconManager startMonitoringForRegion:self.currentRegion];
    [self.beaconManager startRangingBeaconsInRegion:self.currentRegion];
//    [self.beaconManager requestStateForRegion:self.currentRegion];
    
    
    
    
    [self performSelector:@selector(endBGTask) withObject:nil afterDelay:3600];
    
    
    
}

- (void) endBGTask{
    if(self.bgTask){
        [[UIApplication sharedApplication] endBackgroundTask:self.bgTask];
    }
}


- (void) didEnterBackground{
    
    NSLog(@"didEnterBackground");
    
    
    
    for(NSString* key in self.beaconDataDict.allKeys){
        
        EstimoteData* estimoteData = self.beaconDataDict[key];
        
        if(estimoteData
           && (estimoteData.state == EBBEACON_QUEUE_STATE || estimoteData.state == EBBEACON_START_STATE)){
            
            self.bgTask = [[UIApplication sharedApplication] beginBackgroundTaskWithExpirationHandler:^{
                
                [[UIApplication sharedApplication] endBackgroundTask:self.bgTask];
            }];
            
            break;
        }
        
    }
    
}

- (void) createUUIDWithGender{
    
    [self.rootFirebase observeEventType:FEventTypeValue withBlock:^(FDataSnapshot *snapshot) {
        
        NSString* uuid = [self uniqueAppInstanceIdentifier];
        
        NSLog(@"%@", snapshot.value);
        NSLog(@"%@", snapshot.value[@"users"]);
        NSLog(@"%@", snapshot.value[@"users"][uuid]);
        
        {// add gender
            
            Firebase* userFirebase = [[Firebase alloc] initWithUrl:[NSString stringWithFormat:@"%@/users", ROOT_FIREBASE_URL]];
            
            Firebase* uuidFirebase = [userFirebase childByAppendingPath:uuid];
            
            [uuidFirebase setValue:@{@"gender":@"male"}];
        }
        
    } withCancelBlock:^(NSError *error) {
        NSLog(@"error %@", error.description);
    }];
    
}

- (void) getNotificationText{
    
    
    NSString* textURL = [NSString stringWithFormat:@"%@/text", ROOT_FIREBASE_URL];
    Firebase* textFirebase = [[Firebase alloc] initWithUrl:textURL];
    
    [textFirebase observeEventType:FEventTypeValue withBlock:^(FDataSnapshot *snapshot) {
        
        id notificationTextNode = snapshot.value[@"notification"];
        
        NSLog(@"notificationTextNode = %@", notificationTextNode);
        
        self.notificationText = notificationTextNode;
        
        
    } withCancelBlock:^(NSError *error) {
        NSLog(@"error %@", error.description);
        
    }];
    
    
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
    
    __block NSTimeInterval currentTime = [[NSDate date] timeIntervalSince1970];
    
    for(ESTBeacon* beacon in beacons){
        
        __block NSString* beaconID = [self getBeaconID:beacon];
        
        EstimoteData* estimoteData = self.beaconDataDict[beaconID];
        if(!estimoteData){
            estimoteData = [EstimoteData new];
            estimoteData.estimoteID = beaconID;
            estimoteData.state = EBBEACON_START_STATE;
            
            
        }
        
        
        if(estimoteData.state == EBBEACON_START_STATE || estimoteData.state == EBBEACON_END_STATE){
            if((currentTime - estimoteData.lastTimeInQueue) > TIME_WAIT_UNTIL_NEXT_QUEUE){

                
                
                NSNumber* startTime =  @((int)[[NSDate date] timeIntervalSince1970]);
                NSLog(@"startTime = %@", startTime);
                estimoteData.startTime = startTime;
                
                
                estimoteData.state = EBBEACON_QUEUE_STATE;
                
                NSLog(@"It's over 12 hours (id:%@)", beaconID);
            }else{
                NSLog(@"It's not 12 hours yet (id:%@)", beaconID);
            }
        }
        
        
        
        NSLog(@"major: %@, distance: %@, proximity: %d", beacon.major, beacon.distance, (int)beacon.proximity);
        
        if(estimoteData.state == EBBEACON_QUEUE_STATE && [beacon.distance floatValue] < RANGE_CLOSE_METER){
            
            
            
            UILocalNotification *notification = [UILocalNotification new];
            
            notification.alertBody = self.notificationText;
            
            [[UIApplication sharedApplication] presentLocalNotificationNow:notification];
            
            
            
            [self updateEndTime: beacon withBlock:^{
                
                NSLog(@"self.bgTask = %d", (int)self.bgTask);
                
                EstimoteData* estimoteData = self.beaconDataDict[beaconID];
                estimoteData.lastTimeInQueue = currentTime;
                
                [self performSelector:@selector(endBGTask) withObject:nil afterDelay:5];
                
                estimoteData.state = EBBEACON_END_STATE;
            }];
            
        }
        
    }
    
    
}



- (void) updateEndTime:(ESTBeacon*) beacon withBlock:(void (^)(void))successBlock{
    
    NSLog(@"updateEndTime");
    
    __block NSString* beaconID = [self getBeaconID:beacon];
    
    __block EstimoteData* estimoteData = self.beaconDataDict[beaconID];
    
    if(estimoteData
       && (estimoteData.state == EBBEACON_QUEUE_STATE)){
        
        __block NSString* uuid = [self uniqueAppInstanceIdentifier];
        
        estimoteData.state = EBBEACON_QUEUE_WAITINGDATA_STATE;
        
        __block ESTBeacon* beaconBlock = beacon;
        
        [self.rootFirebase observeEventType:FEventTypeValue withBlock:^(FDataSnapshot *snapshot) {// this block is called many times
            
            if(estimoteData.state == EBBEACON_QUEUE_WAITINGDATA_STATE){
                
                id users = snapshot.value[@"users"];
                id userUUID = users[uuid];
                
                //        NSLog(@"users = %@", users);
                //        NSLog(@"userUUID = %@", userUUID);
                
                NSString* gender = nil;
                if(userUUID){
                    gender = userUUID[@"gender"];
                }
                
                ///
                NSString* beaconID = [self getBeaconID:beaconBlock];
                
                NSString* queueURL = [NSString stringWithFormat:@"%@/queueSessions/%@", ROOT_FIREBASE_URL, beaconID];
                
                Firebase* queueSessionsFirebase = [[Firebase alloc] initWithUrl:queueURL];
                
                Firebase* childAutoIDFirebase = [queueSessionsFirebase childByAutoId];
                
                NSLog(@"childAutoIDFirebase = %@", childAutoIDFirebase);
                
                NSNumber* endTime =  @((int)[[NSDate date] timeIntervalSince1970]);
                
                if(gender){
                    [childAutoIDFirebase setValue:@{@"start":estimoteData.startTime, @"end":endTime, @"gender": gender}];
                }else{
                    [childAutoIDFirebase setValue:@{@"start":estimoteData.startTime, @"end":endTime}];
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
