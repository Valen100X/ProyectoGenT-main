# Use the official PostgreSQL image as the base image
FROM postgres:15-alpine

# Set the working directory inside the container
WORKDIR /docker-entrypoint-initdb.d

# Copy the schema.sql file to the init directory of PostgreSQL
COPY schema.sql /docker-entrypoint-initdb.d/

# Expose the default PostgreSQL port
EXPOSE 5432

# Start PostgreSQL server
CMD ["postgres"]
