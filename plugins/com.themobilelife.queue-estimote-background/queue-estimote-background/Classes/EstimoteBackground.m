//
//  EstimoteBackground.m
//  queue-estimote-background
//
//  Created by Akekarat Pattrasitidecha on 8/25/14.
//
//

#import "EstimoteBackground.h"

@interface EstimoteBackground () <ESTBeaconManagerDelegate, CLLocationManagerDelegate>


//@property (nonatomic, strong) ESTBeacon         *beacon;
//@property (nonatomic, strong) ESTBeaconManager  *beaconManager;
//@property (nonatomic, strong) ESTBeaconRegion   *beaconRegion;


//@property (nonatomic, strong) CLLocationManager* locationManager;

@property (readwrite) UIBackgroundTaskIdentifier bgTask;

@end

@implementation EstimoteBackground


- (void) cordovaInitEstimote:(CDVInvokedUrlCommand *)command {
    
    NSLog(@"cordovaInitEstimote");
    
    
    
    NSUUID *proximityUUID = [[NSUUID alloc] initWithUUIDString:@"B9407F30-F5F8-466E-AFF9-25556B57FE6D"];
    self.currentRegion = [[ESTBeaconRegion alloc] initWithProximityUUID:proximityUUID
                                                            identifier:@"RegionIdentifier"];

    
    self.currentRegion.notifyEntryStateOnDisplay = YES;
    
    
    NSLog(@"self.currentRegion = %@", self.currentRegion);
//    NSLog(@"self.beacon.proximityUUID = %@", self.beacon.proximityUUID);
    
    // start discovery
    [self.beaconManager startEstimoteBeaconsDiscoveryForRegion:self.currentRegion];
    
    NSLog(@"self.beacons = %@", self.beacons);
    [self.beaconManager startMonitoringForRegion:self.currentRegion];
    [self.beaconManager startRangingBeaconsInRegion:self.currentRegion];
    [self.beaconManager requestStateForRegion:self.currentRegion];
    
    
    
    self.bgTask = [[UIApplication sharedApplication] beginBackgroundTaskWithExpirationHandler:^{
        
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


#pragma mark - CLLocationManager delegate

- (void)locationManager:(CLLocationManager *)manager didDetermineState:(CLRegionState)state forRegion:(CLRegion *)region
{
    if(state == CLRegionStateInside) {
        NSLog(@"locationManager didDetermineState INSIDE for %@", region.identifier);
    }
    else if(state == CLRegionStateOutside) {
        NSLog(@"locationManager didDetermineState OUTSIDE for %@", region.identifier);
    }
    else {
        NSLog(@"locationManager didDetermineState OTHER for %@", region.identifier);
    }
}

- (void)locationManager:(CLLocationManager *)manager didRangeBeacons:(NSArray *)beacons inRegion:(CLBeaconRegion *)region
{
    // I commented out the line below because otherwise you see this every second in the logs
    NSLog(@"locationManager didRangeBeacons");
}



#pragma mark - ESTBeaconManager delegate

- (void)beaconManager:(ESTBeaconManager *)manager didEnterRegion:(ESTBeaconRegion *)region
{
    NSLog(@"didEnterRegion ");
    UILocalNotification *notification = [UILocalNotification new];
    notification.alertBody = @"Enter region notification";
    
    [[UIApplication sharedApplication] presentLocalNotificationNow:notification];
}

- (void)beaconManager:(ESTBeaconManager *)manager didExitRegion:(ESTBeaconRegion *)region
{
    NSLog(@"didExitRegion ");
    UILocalNotification *notification = [UILocalNotification new];
    notification.alertBody = @"Exit region notification";
    
    [[UIApplication sharedApplication] presentLocalNotificationNow:notification];
}

- (void)beaconManager:(ESTBeaconManager *)manager didRangeBeacons:(NSArray *)beacons inRegion:(ESTBeaconRegion *)region
{
    ESTBeacon *firstBeacon = [beacons firstObject];
    
    
    for(ESTBeacon* beacon in beacons){
        
        NSLog(@"major: %@, distance: %@, proximity: %d", beacon.major, beacon.distance, beacon.proximity);
        
        if([beacon.distance floatValue] < 0.3f){
            
            UILocalNotification *notification = [UILocalNotification new];
            notification.alertBody = [NSString stringWithFormat:@"%@: distance < 0.3", beacon.major];
            
            [[UIApplication sharedApplication] presentLocalNotificationNow:notification];
        }
    }
    
//    [self updateDotPositionForDistance:[firstBeacon.distance floatValue]];
}








#pragma mark - FileWriter



- (void) cordovaGetFileContents:(CDVInvokedUrlCommand *)command {
    
    // Retrieve the date String from the file via a utility method
    NSString *dateStr = [self getFileContents];
    
    // Create an object that will be serialized into a JSON object.
    // This object contains the date String contents and a success property.
    NSDictionary *jsonObj = [ [NSDictionary alloc]
                             initWithObjectsAndKeys :
                             dateStr, @"dateStr",
                             @"true", @"success",
                             nil
                             ];
    
    // Create an instance of CDVPluginResult, with an OK status code.
    // Set the return message as the Dictionary object (jsonObj)...
    // ... to be serialized as JSON in the browser
    CDVPluginResult *pluginResult = [ CDVPluginResult
                                     resultWithStatus    : CDVCommandStatus_OK
                                     messageAsDictionary : jsonObj
                                     ];
    
    // Execute sendPluginResult on this plugin's commandDelegate, passing in the ...
    // ... instance of CDVPluginResult
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void) cordovaSetFileContents:(CDVInvokedUrlCommand *)command {
    // Retrieve the JavaScript-created date String from the CDVInvokedUrlCommand instance.
    // When we implement the JavaScript caller to this function, we'll see how we'll
    // pass an array (command.arguments), which will contain a single String.
    NSString *dateStr = [command.arguments objectAtIndex:0];
    
    // We call our setFileContents utility method, passing in the date String
    // retrieved from the command.arguments array.
    [self setFileContents: dateStr];
    
    // Create an object with a simple success property.
    NSDictionary *jsonObj = [ [NSDictionary alloc]
                             initWithObjectsAndKeys :
                             @"true", @"success",
                             nil
                             ];
    
    CDVPluginResult *pluginResult = [ CDVPluginResult
                                     resultWithStatus    : CDVCommandStatus_OK
                                     messageAsDictionary : jsonObj
                                     ];
    
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

#pragma mark - Util_Methods
// Dives into the file system and writes the file contents.
// Notice fileContents as the first argument, which is of type NSString
- (void) setFileContents:(NSString *)fileContents {
    
    // Create an array of directory Paths, to allow us to get the documents directory
    NSArray *paths = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES);
    
    // The documents directory is the first item
    NSString *documentsDirectory = [paths objectAtIndex:0];
    
    // Create a string that prepends the documents directory path to a text file name
    // using NSString's stringWithFormat method.
    NSString *fileName = [NSString stringWithFormat:@"%@/myTextFile.txt", documentsDirectory];
    
    // Here we save contents to disk by executing the writeToFile method of
    // the fileContents String, which is the first argument to this function.
    [fileContents writeToFile : fileName
                  atomically  : NO
                  encoding    : NSStringEncodingConversionAllowLossy
                  error       : nil];
}

//Dives into the file system and returns contents of the file
- (NSString *) getFileContents{
    
    // These next three lines should be familiar to you.
    NSArray *paths = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES);
    
    NSString *documentsDirectory = [paths objectAtIndex:0];
    
    NSString *fileName = [NSString stringWithFormat:@"%@/myTextFile.txt", documentsDirectory];
    
    // Allocate a string and initialize it with the contents of the file via
    // the initWithContentsOfFile instance method.
    NSString *fileContents = [[NSString alloc]
                              initWithContentsOfFile : fileName
                              usedEncoding           : nil
                              error                  : nil
                              ];
    
    // Return the file contents String to the caller (cordovaGetFileContents)
    return fileContents;
}



@end
