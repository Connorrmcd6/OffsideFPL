package main

import (
	"lambda-user/pkg/handlers"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
)

func main() {
	lambda.Start(handler)
}

// this function will need to take another argument called context which will direct it on which funcion to call
func handler(request events.APIGatewayProxyRequest) (*events.APIGatewayProxyResponse, error) {

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
