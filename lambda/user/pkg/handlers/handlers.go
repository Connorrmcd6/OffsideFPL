package handlers

import (
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
