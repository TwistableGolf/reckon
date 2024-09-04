#!/bin/bash

# PostgreSQL connection details
DB_HOST="localhost"
DB_PORT="5737"
DB_USER="postgres"
DB_PASSWORD="admin"
DB_NAME="postgresdb"

# Maximum number of retries
MAX_RETRIES=10

# Delay between retries (in seconds)
RETRY_DELAY=5

# Function to check if PostgreSQL is available
is_postgres_available() {
    psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$DB_NAME" -c "SELECT 1" >/dev/null 2>&1
}

# Wait for PostgreSQL to be available
retry_count=0
until is_postgres_available || [ $retry_count -eq $MAX_RETRIES ]; do
    sleep $RETRY_DELAY
    ((retry_count++))
done

if is_postgres_available; then
    echo "PostgreSQL is available!"
    cd "./api"
    npx prisma db push --accept-data-loss
    exit 0 # Success
else
    echo "Unable to connect to PostgreSQL after $MAX_RETRIES retries."
    exit 1 # Failure
fi