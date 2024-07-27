# Code challenge Shipix Tech

## Recommendations

Node version: 18.20.4

## Installation

```bash
git clone https://github.com/adrieellucas/code-challenge-shipix-tech.git
```

```bash
cd code-challenge-shipix-tech
$ npm install
```

Create .env file with the environment variables:
* LOAD_ORDERS: API to load orders from integration
* CONNECTION_STRING: connection string from mongodb (you can see MongoDB session for more details).
* PORT: port of your choice
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

## MongoDB

Install and configure MongoDB for windows:
* Install docker
* Mongodb image
* Create Mongodb container
* Start or stop mongo container

Try to use docker compose:

```bash
docker compose up -d
```

OR - if docker compose doesn't work

```bash
#get mongo image
docker pull mongo

#create mongo container with user and password
docker run -v ~/docker --name mongodbccst -d -p 1500:27017 -e MONGO_INITDB_ROOT_USERNAME=unccst -e MONGO_INITDB_ROOT_PASSWORD=PAunSSccWOstRD mongo

#start container
docker container start mongodbccst

#stop container
docker container stop mongodbccst
```

In the example above the connenction string is: `mongodb://unccst:PAunSSccWOstRD@localhost:1500/admin`

## Comments

Difference between taskForLoadFromIntegration and loadFromIntegration:
* loadFromIntegration just save in database
* taskForLoadFromIntegration save if not exists or update (can be use from job, bullmq, etc...)

## Features

* we can create an authentication with JWT
* we can improve the tests