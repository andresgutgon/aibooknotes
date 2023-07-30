import * as iam from 'aws-cdk-lib/aws-iam'
import * as s3 from 'aws-cdk-lib/aws-s3'
import * as cdk from 'aws-cdk-lib'
import { AWS_STACK_PREFIX, CustomStackProps, StackStage } from '../cdk-stack'

export function s3Bucket(stack: cdk.Stack, { stage }: CustomStackProps) {
  const bucket = new s3.Bucket(stack, AWS_STACK_PREFIX, {
    bucketName: `${AWS_STACK_PREFIX}-${stage}`,
    removalPolicy: cdk.RemovalPolicy.DESTROY,
    cors: [
      {
        allowedHeaders: ['*'],
        allowedOrigins: ['*'],
        allowedMethods: [
          s3.HttpMethods.GET,
          s3.HttpMethods.POST
        ],
      },
    ],
  })

  bucket.addToResourcePolicy(
    new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      principals: [new iam.ServicePrincipal('lambda.amazonaws.com')],
      actions: [
        's3:GetObject',
        's3:PutObject',
        's3:DeleteObject'
      ],
      resources: [`${bucket.bucketArn}/*`],
    })
  )

  bucket.policy?.document.addStatements(
    new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      principals: [new iam.ServicePrincipal('lambda.amazonaws.com')],
      actions: ['s3:GetBucketTagging'],
      resources: [bucket.bucketArn],
    })
  )
}

