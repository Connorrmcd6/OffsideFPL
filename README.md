# OffsideFPL
- OffsideFPL is an abstraction of the existing Fantasy Premier League (FPL) game, which gives users custom insights and the option to play three exciting game modes which are not available on the existing application

- The app is designed to be a persisted web app (PWA) which means it will be installable on the device without the need of an app store. The frontend is written in Angular, which is hosted on Firebase alongside a NoSQL database, and the backend is written in Golang which is hosted on AWS lambda.

- I chose to use Golang and Angular for this project due to their excellent standard libraries as I have faced issues with third-party libraries in the past when experimenting with React and React Native. 




## Environment setup

You need to have [Go](https://golang.org/),
[Node.js](https://nodejs.org/),
[Docker](https://www.docker.com/), and
[Docker Compose](https://docs.docker.com/compose/)
(comes pre-installed with Docker on Mac and Windows)
installed on your computer.

Verify the tools by running the following commands:

```sh
go version
npm --version
docker --version
docker-compose --version
```

If you are using Windows you will also need
[gcc](https://gcc.gnu.org/). It comes installed
on Mac and almost all Linux distributions.

## Start in development mode

In the project directory run the command (you might
need to prepend it with `sudo` depending on your setup):
```sh
docker-compose -f docker-compose-dev.yml up
```

This starts a local MongoDB on `localhost:27017`.
The database will be populated with test records
from the [init-db.js](init-db.js) file.

Navigate to the `server` folder and start the back end:

```sh
cd server
go run server.go
```
The back end will serve on http://localhost:8080.

Navigate to the `webapp` folder, install dependencies,
and start the front end development server by running:

```sh
cd webapp
npm install
npm start
```
The application will be available on http://localhost:3000.
 
## Start in production mode

Perform:
```sh
docker-compose up
```
This will build the application and start it together with
its database. Access the application on http://localhost:8080.
