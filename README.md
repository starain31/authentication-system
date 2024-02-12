# authentication-system
Authentication Rest API service

## Setup and run the project
1. Clone the repository.

2. Set the following environment variables in `docker-compose.yaml` file.
    1. PORT
    2. MONGODB_URL

3. Run the following command in shell
   `docker compose -f "docker-compose.yaml" up -d --build`

4. Go to `http://localhost:3000/` to check the project is up and running.

## Use of the project
1. Register a user by the following request 
`POST {{BASE_URL}}/register`
BODY: 
```
{
   username: {{STRING}},
   password: {{STRING}},
   email: {{STRING}}
}
```