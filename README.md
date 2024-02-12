# authentication-system
Authentication Rest API service

## Setup and run the project
1. Clone the repository.

2. Set the following environment variables in `docker-compose.yaml` file.
    1. PORT
    2. MONGODB_URI
    3. AUTH_TOKEN_LENGHT
    4. PASSWORD_HASH_SECRET

3. Run the following command in shell
   `docker compose -f "docker-compose.yaml" up -d --build`

4. Go to `http://localhost:3000/` to check the project is up and running.

## Use of the project
1. Register a user
   ENDPOINT: POST /api/register
   BODY:
   ```
   {
    "username": {{USER_NAME}},
    "password": {{PASSWORD}},
    "email": {{EMAIL}}
   }
   ```
2. Login
   ENDPOINT: POST /api/login
   BODY:
   ```
   {
    "username":"sakib",
    "password": "123"
   }
   ```
3. Use the `auth_toke` returned form `api/login` to authenticat 
    
