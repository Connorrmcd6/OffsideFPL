package handlers

import (
	"lambda-test/pkg/hello"
	"net/http"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-sdk-go/aws"
)

func HelloLambda(request events.APIGatewayProxyRequest) (*events.APIGatewayProxyResponse, error) {
	name := request.QueryStringParameters["name"]

	result, err := hello.SayHelloLambda(name)
	if err != nil {
		return apiResponse(http.StatusBadRequest, ErrorBody{Error: aws.String(err.Error())})
	}
	return apiResponse(http.StatusOK, result)

}

var ErrorMethodNotAllowed = "this method is not permitted"

type ErrorBody struct {
	Error *string `json:"error,omitempty"`
}

func UnhandledMethod() (*events.APIGatewayProxyResponse, error) {
	return apiResponse(http.StatusMethodNotAllowed, ErrorMethodNotAllowed)
}
