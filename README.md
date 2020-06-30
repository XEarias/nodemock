NodeJs erbium Express based API rest. 	:rocket:

### Docs

The project comes with a complete endpoints doc:
* swagger.yml file ([open api v3](https://github.com/OAI/OpenAPI-Specification)) 
* postman.json file ([postman](https://github.com/postmanlabs/postman-docs))

### Auth

For mock porpuses, all users share same password. You can choose the Authentication/authorization mechanism. Currently support [Basic Auth](https://www.npmjs.com/package/express-basic-auth) and [Bearer Token](https://www.npmjs.com/package/express-jwt)

### Environment Variables

| Name                  | Accepted                              |  Default
| :-----------          | :------------------------------------ | :---------           
| **API_PORT**          | Any Int Number                        | ```8080```
| **LOG_LEVEL**         | Syslog Levels                         | ```info```
| **AUTH_TYPE**         | ```jwt / basic / none```              | ``none``
| **DUMMY_PASSWORD**    | any                                   | ````dummyPassword````

### Tests :beetle:

You can run test using npm scripts:

```
$ npm ci 
$ npm run test --coverage
```
Tests with [Jest](https://jestjs.io/)

### Docker :whale:

You can build a Docker image with the dockerfile's project:
```
$ docker build -t nodemock .

$ docker run p 80:8080 nodemock:latest
```

### TODO:

* Http cache with Redis
* Kong Gateway spec file
* Kubernetes/Openshift/Rancher spec file
* Logs with ElasticSearch