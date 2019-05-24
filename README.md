# The MedicSoft (Mongo DB Microservice)
This microservice is one of the critical part of this application and, is used by other microservices under The MedicSoft domain. This microservice follows REST architectural style and, exposes API endpoints to interact.

**The sole purpose of this microservice is to hold business logic for database operations.**

## Installation
#### npm i

## Run Project
**Preview Mode**
* npm start

**Development Mode**
* npm run dev

## Run Project using Swagger
* npm i -g swagger
* npm run dev
* swagger project edit

## API Endpoints
### Clients
* **[GET] Get all clients:** */api/v1/clients* 
    ##### Returns all the clients in JSON format
* **[GET] Get client by email:** */api/v1/clients/:email*
    ##### Returns the client based on email address in JSON format
* **[POST] Creates new client:** */api/v1/clients*
    ##### Consumes JSON and, inserts a new client in database. This endpoint follows strict schema handled at route level using [fastify](https://www.fastify.io/) route schema definitons
* **[PUT] Updates client by email:** */api/v1/clients/:email*
    ##### Updates an existing client based on email
* **[DELETE] Deletes client by email:** */api/v1/clients/:email*
    ##### Deletes an existing client based on email (soft delete)

### Doctors
* **[GET] Get all Doctors:** */api/v1/doctors* 
    ##### Returns all the doctors in JSON format
* **[GET] Get doctor by email:** */api/v1/doctors/:email*
    ##### Returns the doctor based on email address in JSON format.
* **[POST] Creates new doctor:** */api/v1/doctors*
    ##### Consumes JSON and, inserts a new doctor in database. This endpoint follows strict schema handled at route level using [fastify](https://www.fastify.io/) route schema definitons.
* **[PUT] Updates doctor by email:** */api/v1/doctors/:email*
    ##### Updates an existing doctor based on email
* **[DELETE] Deletes doctor by email:** */api/v1/doctors/:email*
    ##### Deletes an existing doctor based on email (soft delete)
