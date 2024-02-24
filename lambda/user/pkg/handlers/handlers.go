package handlers

import (
	"lambda-user/pkg/user"
	"net/http"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-sdk-go/aws"
)

func GetUserProfile(request events.APIGatewayProxyRequest) (*events.APIGatewayProxyResponse, error) {
	team_id := request.QueryStringParameters["team_id"]

	result, err := user.CheckID(team_id)

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
