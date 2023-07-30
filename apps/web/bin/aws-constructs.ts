#!/usr/bin/env node
import 'source-map-support/register'
import * as cdk from 'aws-cdk-lib'
import { AwsStack, StackStage } from '../src/lib/aws/cdk-stack'

const app = new cdk.App()
const APP_STACK_ID = 'AwsS3Stack'
new AwsStack(
  app,
  {
    id: APP_STACK_ID,
    stage: StackStage.production
  }
)

app.synth()
