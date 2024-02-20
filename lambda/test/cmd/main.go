package main

import (
	"lambda-test/pkg/handlers"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
)

func main() {
	lambda.Start(handler)
}

func handler(request events.APIGatewayProxyRequest) (*events.APIGatewayProxyResponse, error) {

	switch request.HTTPMethod {
	case "GET":
		return handlers.HelloLambda(request)
	default:
		return handlers.UnhandledMethod()
	}
}
