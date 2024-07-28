# Code challenge Shipix Tech

## Recommendations

* Node version: 18.20.4
* Docker
* Git Bash

## Installation

```bash
# open Git Bash and use setup.sh for automatic installation
$ ./setup.sh
```
###### OR

```bash
# clone and install manually
$ git clone https://github.com/adrieellucas/code-challenge-shipix-tech.git
$ cd code-challenge-shipix-tech
$ npm install
```

```bash
# configure and start mongodb using docker
$ docker-compose up -d
```

Check environment variables in .env file:
* LOAD_ORDERS: API to load orders from integration
* CONNECTION_STRING: connection string from mongodb (you can see MongoDB session for more details).
* PORT: port of your choice

Default `.env` file:
```
LOAD_ORDERS=https://stoplight.io/mocks/quicargolog/logistic-tech/11450134/api/orders
CONNECTION_STRING=mongodb://unccst:PAunSSccWOstRD@localhost:1500/admin
PORT=2500
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

After started you can open the swagger:
* Swagger `http://localhost:2500/swagger`

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Comments

Difference between `taskForLoadFromIntegration` and `loadFromIntegration`:
* `loadFromIntegration`: just save in database
* `taskForLoadFromIntegration`: save if not exists the id or update if exists the id (can be use from job, bullmq, etc...)

## Features

* Improve the tests
* Use @nestjs/bullmq to call taskForLoadFromIntegration 
* Create a JWT authentication

## MongoDB

Install and configure MongoDB for windows:
1. Install docker
2. Mongodb image
3. Create Mongodb container
4. Start or stop mongo container

```bash
#get mongo image
$ docker pull mongo

#create mongo container with user and password
$ docker run -v ~/docker --name mongodbccst -d -p 1500:27017 -e MONGO_INITDB_ROOT_USERNAME=unccst -e MONGO_INITDB_ROOT_PASSWORD=PAunSSccWOstRD mongo

#start container
$ docker container start mongodbccst

#stop container
$ docker container stop mongodbccst
```

In the example above the connenction string is: `mongodb://unccst:PAunSSccWOstRD@localhost:1500/admin`

##