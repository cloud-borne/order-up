#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { OrderUpStack } from '../lib/order-up-stack';
import { DatabaseStack } from '../lib/database/database-stack';
import { VPCStack } from '../lib/networking/vpc-stack';
import { LambdaStack } from '../lib/lambda/lambda-stack';
import { APIStack } from '../lib/api-gateway/api';
import { FrontendStack } from '../lib/frontend/frontend';

const app = new cdk.App();
// new OrderUpStack(app, 'OrderUpStack', { });

const orderUpDBStack = new DatabaseStack(app, 'OrderUpDBStack', {
  tableName: 'OrderUpDB'
});

const orderUpVPCStack = new VPCStack(app, 'OrderUpVPCStack', { });

const orderUpLambdaStack = new LambdaStack(app, 'OrderUpLambdaStack', orderUpDBStack.table, { });

const orderUpAPIStack = new APIStack(app, 'OrderUpAPIStack', orderUpLambdaStack.ordersFunction, { });

const orderUpFontendStack = new FrontendStack(app, 'OrderUpFrontendStack', {
  api: orderUpAPIStack.api, 
  vpc: orderUpVPCStack.vpc,
});

orderUpLambdaStack. addDependency (orderUpDBStack) ;
orderUpAPIStack.addDependency(orderUpLambdaStack);
orderUpFontendStack.addDependency(orderUpVPCStack);
orderUpFontendStack.addDependency(orderUpAPIStack);