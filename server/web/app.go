package web

import (
	"OffsideFPL/fpl"
	"encoding/json"
	"log"
	"net/http"
)

type App struct {
	// db        nil
	handlers map[string]http.HandlerFunc
}

func NewApp(cors bool) App { //originally took a db as a parameter but removed since we dont use mongo
	app := App{
		// d:        d,
		handlers: make(map[string]http.HandlerFunc),
	}

	testHandler := app.TestEndpoint
	userInfoHandler := app.GetUserInfo
	if !cors {
		testHandler = disableCors(testHandler)
		userInfoHandler = disableCors(userInfoHandler)
	}

	app.handlers["/api/test"] = testHandler
	app.handlers["/api/user"] = userInfoHandler
	app.handlers["/"] = http.FileServer(http.Dir("/webapp")).ServeHTTP
	return app
}

func (a *App) TestEndpoint(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{"message": "Hello, Frontend!"})
}

func (a *App) Serve() error {
	for path, handler := range a.handlers {
		http.Handle(path, handler)
	}
	log.Println("Web server is available on port 8080")
	return http.ListenAndServe(":8080", nil)
}

func (a *App) GetUserInfo(w http.ResponseWriter, r *http.Request) {
	queryParams := r.URL.Query()
	paramValue := queryParams.Get("teamID")
	if paramValue == "" {
		sendErr(w, http.StatusBadRequest, "Missing query parameter: param")
		return
	}

	data, err := fpl.GetProfileInfo(paramValue) // Pass the query parameter to the function
	if err != nil {
		sendErr(w, http.StatusInternalServerError, err.Error())
		return
	}

	if err := json.NewEncoder(w).Encode(data); err != nil {
		sendErr(w, http.StatusInternalServerError, err.Error())
	}
}

func sendErr(w http.ResponseWriter, code int, message string) {
	resp, _ := json.Marshal(map[string]string{"error": message})
	http.Error(w, string(resp), code)
}

// Needed in order to disable CORS for local development
func disableCors(h http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "*")
		w.Header().Set("Access-Control-Allow-Headers", "*")
		h(w, r)
	}

}
