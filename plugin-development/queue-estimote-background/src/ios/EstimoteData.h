//
//  EstimoteData.h
//  queue-estimote-background
//
//  Created by Akekarat Pattrasitidecha on 8/29/14.
//
//

#import <Foundation/Foundation.h>

@interface EstimoteData : NSObject


@property (nonatomic, strong) NSString* estimoteID;
@property (nonatomic, strong) NSNumber* startTime;
@property (nonatomic, strong) NSNumber* endTime;
@property (nonatomic, strong) NSString* gender;
@property (nonatomic) int state;
@property (nonatomic) NSTimeInterval lastTimeInQueue;


@end
