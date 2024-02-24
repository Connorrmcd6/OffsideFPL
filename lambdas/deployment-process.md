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

3. Move the `bootstrap` executable to the `builds` directory:

    ```bash
    mv bootstrap ../builds
    ```

4. Navigate to the `builds` directory and create a zip file containing the `bootstrap` executable:

    ```bash
    cd ../builds
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

3. After creating the API, you can create methods that will be linked to different Lambda functions.

4. Click `Create method` and select `ANY` for the method type. This allows the handler function in `main.go` to handle different types of requests:
    - Enable `Lambda Proxy Integration`.
    - Select the Lambda function that you want to assign to this method.
    - Enable `Default Timeout`.

5. Deploy the API and name the stage according to the method name.

6. Use the provided Invoke URL to activate the function.