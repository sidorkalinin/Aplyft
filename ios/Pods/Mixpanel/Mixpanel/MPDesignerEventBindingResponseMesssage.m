//
//  MPDesignerEventBindingResponseMesssage.m
//  HelloMixpanel
//
//  Created by Amanda Canyon on 7/15/14.
//  Copyright (c) 2014 Mixpanel. All rights reserved.
//

#import "MPDesignerEventBindingMessage.h"

@implementation MPDesignerEventBindingResponseMessage

+ (instancetype)message
{
    return [(MPDesignerEventBindingResponseMessage *)[self alloc] initWithType:@"event_binding_response"];
}

- (void)setStatus:(NSString *)status
{
    [self setPayloadObject:status forKey:@"status"];
}

- (NSString *)status
{
    return [self payloadObjectForKey:@"status"];
}

@end
