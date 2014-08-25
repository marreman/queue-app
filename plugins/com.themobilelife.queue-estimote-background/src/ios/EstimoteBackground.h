//
//  EstimoteBackground.h
//  queue-estimote-background
//
//  Created by Akekarat Pattrasitidecha on 8/25/14.
//
//

//#import <Cordova/Cordova.h>
#import <Cordova/CDV.h>


#import "EstimoteBeacons.h"

@interface EstimoteBackground : EstimoteBeacons


- (void) cordovaInitEstimote:(CDVInvokedUrlCommand *)command ;





#pragma mark - FileWriter




// This will return the file contents in a JSON object via the getFileContents utility method
- (void) cordovaGetFileContents:(CDVInvokedUrlCommand *)command;

// This will accept a String and call setFileContents to persist the String on to disk
- (void) cordovaSetFileContents:(CDVInvokedUrlCommand *)command;

#pragma mark - Util_Methods

// Pure native code to persist data
//- (void) setFileContents;

// Native code to load data from disk and return the String.
- (NSString *) getFileContents;



@end
