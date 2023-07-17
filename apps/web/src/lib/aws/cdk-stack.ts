import * as cdk from 'aws-cdk-lib'
import { Construct } from 'constructs'
import { s3Bucket } from './stacks'
export const AWS_STACK_PREFIX = 'aibooknotes'

// TODO: Move all the AWS infra to `apps/infra` so it's clear is
// only infra.
// Maybe also provision in that repo
// 1. A Clouldfront distribution
// 2. An Amazon gataway for lambda
// 3. A Lambda for a image resize handler
//
// Pick those 3 pieces from here:
// https://github.com/aws-solutions/serverless-image-handler
export enum StackStage {
  production = 'production'
}

export interface CustomStackProps extends cdk.StackProps {
  id: string
  stage: StackStage
}

export class AwsStack extends cdk.Stack {
  constructor(scope: Construct, props: CustomStackProps) {
    super(scope, props.id, props)

    // These are stacks, I guess.
    s3Bucket(this, props)
  }
}
