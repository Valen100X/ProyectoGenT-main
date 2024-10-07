# Levantar la base de datos

docker pull postgres

docker run --name my-postgres -e POSTGRES_USER=myuser -e POSTGRES_PASSWORD=mypassword -e POSTGRES_DB=mydatabase -p 5432:5432 -d postgres

docker exec -it my-postgres psql -U myuser -d mydatabase

docker stop my-postgres
docker rm my-postgres
