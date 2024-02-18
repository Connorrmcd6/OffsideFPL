package api

import (
	"github.com/aws/aws-lambda-go/events"
)

// HelloLambda is a simple example of a Lambda function used to test the API
func HelloLambda(request events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	response := events.APIGatewayProxyResponse{
		Body: "Hello Lambda", StatusCode: 200,
	}

	return response, nil
}
