# directory config
1. create a new directory in the `lambda` directory with a general name for the functions that will be found in it eg. `user` for all user related functions

2. Navigate to the new directory and run the following to create a go module for the lambda function:
    ```bash
    cd new_dir
    go mod init lambda-{new_dir}
    ```

3. create the `build`, `cmd` and `pkg` directories
    - `build` will be where we store the exe and zip files
    - `cmd` will be for `main.go`
    - `pkg` will be for our function logic
        - in `pkg` create a `handlers` directory and then subsequent directories for any specific functions that the handlers need to execute

4. the `main.go` file will be structured as follows
    ```bash

    package main

    import (
        "lambda-{module name}/pkg/handlers"

        "github.com/aws/aws-lambda-go/events"
        "github.com/aws/aws-lambda-go/lambda"
    )

    func main() {
        lambda.Start(handler)
    }

    func handler(request events.APIGatewayProxyRequest) (*events.APIGatewayProxyResponse, error) {

        // note you do not need a method for each request type, just include what you need

        switch request.HTTPMethod {
        case "GET":
            return handlers.getMethod(request)

        case "POST":
            return handlers.postMethod(request)

        case "PUT":
            return handlers.putMethod(request)
        
        case "DELETE":
            return handlers.deleteMethod(request)
        default:
            return handlers.UnhandledMethod()
        }
    }

    ```

.

# Build Process

Follow these steps to build your Go application for AWS Lambda:

1. Navigate to the `cmd` directory where your `main.go` file is located:

    ```bash
    cd cmd
    ```

2. Build your Go application for the Linux OS and ARM64 architecture:

    ```bash
    GOOS=linux GOARCH=arm64 go build -o bootstrap main.go
    ```

    - `GOOS` specifies the target operating system. AWS Lambda functions run on Linux, hence we target the Linux OS.
    - `GOARCH` specifies the target architecture. AWS Lambda supports both `x86_64` and `arm64` architectures. However, `arm64` is more efficient and is the default for M1 chips. If you need to target `x86_64`, update the architecture on AWS Lambda and modify the build command accordingly.

3. Move the `bootstrap` executable to the `build` directory:

    ```bash
    mv bootstrap ../build
    ```

4. Navigate to the `build` directory and create a zip file containing the `bootstrap` executable:

    ```bash
    cd ../build
    zip bootstrap.zip bootstrap
    ```

# AWS Lambda Configuration

Follow these steps to configure your AWS Lambda function:

1. Open the AWS console and create a new Lambda function:
    - Name the function in the format `{application}-{purpose}-endpoint`. For example, `offsidefpl-test-endpoint` or `offsidefpl-profile-info-endpoint`.
    - Use the "Amazon Linux 2023" runtime, which is a generic Linux runtime for languages like C++, Rust, and Go.
    - Select the `arm64` architecture.

2. Click `Create function`.

3. In the `Code source` tab, upload your `bootstrap.zip` file.
    - Update the handler in the runtime settings to `main`, which is the entry point of your Go application.

4. Test your function. If there are any errors, check the following:
    - Ensure that you built your application for Linux.
    - Verify that the architecture in the build command matches the one for the Lambda function (`arm64` or `x86_64`).
    - Confirm that the entry point in your source code matches the handler in the Lambda runtime settings.

# API Gateway Configuration

Follow these steps to configure your API Gateway:

1. Open the API Gateway in the AWS Console. Click `Create API` or use an existing one.

2. If creating a new API, select the `REST API` option:
    - Name your API.
    - Select `Regional` for the endpoint type.

3. After creating the API, you can create resources that will be linked to different url paths. Each path can be linked to a different lambda function.

4. Click create resource and provide a name, the path will be auto generated after this.

5. Make sure your new resource is selected and click `Create method` and select `ANY` for the method type. This allows the handler function in `main.go` to handle different types of requests:
    - Enable `Lambda Proxy Integration`.
    - Select the Lambda function that you want to assign to this method.
    - Enable `Default Timeout`.

6. Deploy the API.

7. Use the provided Invoke URL to activate the function.


