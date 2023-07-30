## TODO
Maybe remove all this shit

Interesting package.json command in case I go with localstack

```json
"aws_local": "docker-compose -f ./aws-local/docker-compose.yml",
"aws_local:up": "pnpm aws_local up",
"aws_local_cli": "aws --endpoint-url=http://localhost:4566",
"aws_local:provision": "pnpm aws_local_cli cloudformation deploy --stack-name aws_localstack --template-file \"./aws-local/cloudformation.yml\"",
"aws_local:provision_events": "pnpm aws_local_cli cloudformation describe-stack-events --stack-name aws_localstack",
"aws_local:services": "curl http://0.0.0.0:4566/health | jq",
"aws_local:services:all": "pnpm aws_local:services '.services'",
"aws_local:services:running": "pnpm aws_local:services '.services | with_entries(select(.value == \"running\"))'"

```


## What is this?
We use some parts of AWS like `S3` buckets for images or `Lambda` for image
resizing. The [production image resizing serveless](https://aws.amazon.com/solutions/implementations/serverless-image-handler/) was installed from the AWS web console.

But for development we use [localstack](https://github.com/localstack/localstack) which makes easier to simulate a production environment without incurring in any cost in development or CI.

## Run
To run local AWS with localstack start the Docker. This will build the
image for localstack
```
pnpm aws_local:up
```

## Setup services in localstack

## What services (stacks) we use from AWS?
To have the services we need in development we need to provision those services
in localstack. The services we use are:
1. S3 bucket for images (Provisioned in production with CDK (Typescript) in this
   repo)
2. [Image resizing serveless](https://aws.amazon.com/solutions/implementations/serverless-image-handler/)

Under the hood Image resizing serveless use CDK. We could bring all that code to
this repo but I think the maintainers of that repo do a much better job than me
keeping the stacks there updated. So what we do is to use the CloudFormation
template they generate to setup it in our localstack. As expresed above in
production this stacks are already running in our AWS account.

### Resources
[Docker, Localstack, and CloudFormation](https://mmarcosab.medium.com/docker-localstack-and-cloudformation-4f4922f472f1)
[How to Create a Localstack Stack from a CloudFormation File with Existing Resources](https://saturncloud.io/blog/how-to-create-a-localstack-stack-from-a-cloudformation-file-with-existing-resources/)
