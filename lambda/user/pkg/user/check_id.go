package user

import (
	"encoding/json"
	"net/http"
)

type ProfileInfo struct {
	TeamID          int64  `json:"id"`
	PlayerFirstName string `json:"player_first_name"`
	PlayerLastName  string `json:"player_last_name"`
	PlayerName      string `json:"player_name"`
	TeamName        string `json:"name"`
	PlayerRegion    string `json:"player_region_name"`
}

func CheckID(teamID string) (ProfileInfo, error) {
	resp, err := http.Get("https://fantasy.premierleague.com/api/entry/" + teamID + "/")
	if err != nil {
		return ProfileInfo{}, err
	}
	defer resp.Body.Close()

	var data map[string]interface{}
	err = json.NewDecoder(resp.Body).Decode(&data)
	if err != nil {
		return ProfileInfo{}, err
	}

	profileInfo := ProfileInfo{
		TeamID:          int64(data["id"].(float64)),
		PlayerFirstName: data["player_first_name"].(string),
		PlayerLastName:  data["player_last_name"].(string),
		PlayerName:      data["player_first_name"].(string) + " " + data["player_last_name"].(string),
		TeamName:        data["name"].(string),
		PlayerRegion:    data["player_region_name"].(string),
	}

	return profileInfo, nil
}
