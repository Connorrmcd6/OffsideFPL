package handlers

import (
	"encoding/json"

	"github.com/aws/aws-lambda-go/events"
)

func apiResponse(statusCode int, body interface{}) (*events.APIGatewayProxyResponse, error) {

	response := events.APIGatewayProxyResponse{
		Headers: map[string]string{
			"Content-Type":                "application/json",
			"Access-Control-Allow-Origin": "*", // adjust this to match your actual requirements
		},
	}
	response.StatusCode = statusCode

	stringBody, _ := json.Marshal(body)
	response.Body = string(stringBody)
	return &response, nil

}
