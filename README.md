# About

[download App](https://github.com/GoerkemYalcinkaya/fitness-with-friends/releases)

## Idea

*Fitness with friends* is an app which provides daily workout challenges to help one stay fit. 


# Getting Started

## Available Scripts

In the project directory, you can run:

### `npm start`

Starts the server. \
Reads .env for PORT, if none was readable, server will open on [http://localhost:8080](http://localhost:8080)

### `npm run dev`

Starts the via nodemon. \
Reads .env for PORT, if none was readable, server will open on [http://localhost:8080](http://localhost:8080)


## Environment variables

### must use variables for the server

  * DATABASE_URL_DEVELOPMENT
  * DATABASE_URL_PRODUCTION
  * SECRET_KEY
  * SUPERUSER
  * SUPERUSER_PW

Depending on the production status either one of the DATABASE_URL's have to be set. \
The SECRET_KEY is used for token validation. \
If there aren't any Users registered a SuperUser will be created with given credentials.
