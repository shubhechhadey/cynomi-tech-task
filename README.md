# Sleep Tracker App

This is the Sleep Tracker application.

### Requirements

Before jumping into the installation instructions, make use you have all the tools installed on your local machine.

- [node.js][node] 
- [docker][docker]
- [docker-compose][docker-compose]

[node]: https://nodejs.org/en/download/
[docker]: https://docs.docker.com/install/
[docker-compose]: https://docs.docker.com/compose/install/


## Installation

### Server

- Navigate to server application `cd /server` in terminal
- Install dependencies by running `npm i` in terminal
- Start the DB (Postgresql) container with `docker compose up`
- Create .env file and put the following definition for DB url
  ```js
  DATABASE_URL = "postgresql://root:root@localhost:5432/sleeper";
  ```
- Finally start the server with `npm run dev`

This will run the backend on [http://localhost:5002](http://localhost:5002/).

When making changes use `docker-compose up --build` to refresh.

### Client

- Navigate to client application folder `cd /client`
- Install dependencies by running `npm i`
- Run `npm run dev` in terminal


This will run the frontend on [http://localhost:5173](http://localhost:5173/)

You will need to have both client and server running in order to properly access the functionality.

In order to stop the docker service, run:

```sh
docker-compose down
```

## Improvements you would implement if you had more time.

### Client
- Refactor the component code where I would move the utility functions like formarDate to separate utility file, extract the api calls to a separate API service file and extract the table and chart into separate components and also ensure proper typing throughout the code
- Add unit test cases using jest and react testing library to the application covering both happy,unhappy path and edge case scenarios
- Add end to end test cases following BDD style uing cypress
- Add accessibility test cases
- Add Dockerfile for frontend
- Add code coverage using jacoco report 
- Add more commands in package.json
- Ensure no code vulnerabilites are there in the application
- Add code documentation


### Server
- Use enum for gender 
- Add unit test cases using jest to the application covering both happy,unhappy path and edge case scenarios
- Add integration test cases
- Implement a global error handler for consitent error handling
- Implement logging library for structured logging and ensure the logs are written to any centralized logging system
- Use helmet for setting various headers
- Use express-rate-limit to limit repeated requests.
- Add swagger documentation for API routes
- Add code documentation

### General

- We can also dockerize the entire application

### Screenshots
![alt text](image.png)
![alt text](image-1.png)
![alt text](image-2.png)
![alt text](image-5.png)
![alt text](image-6.png)






