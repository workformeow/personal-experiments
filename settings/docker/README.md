# Local Dev Databases

Docker Compose for PostgreSQL, MySQL, MongoDB, Redis and MinIO. Start only the services a project needs.

## Usage

Run from this folder (or add `-f <path>/docker-compose.yml`):

```bash
docker compose up -d postgres redis   # start
docker compose stop postgres          # stop, keep the container
docker compose down                   # remove containers, keep data
```

Data lives in volumes named `db_<service>-data`. To reset one: `docker compose down` then `docker volume rm db_postgres-data`.

## Services

| Service    | Port        | User / Password                            | Default DB |
| ---------- | ----------- | ------------------------------------------ | ---------- |
| `postgres` | 5432        | `user_postgres` / `pass_postgres`          | `dev_db`   |
| `mysql`    | 3306        | `user_mysql` / `pass_mysql` (root: `root`) | `dev_db`   |
| `mongo`    | 27017       | `user_mongo` / `pass_mongo`                | —          |
| `redis`    | 6379        | —                                          | —          |
| `minio`    | 9000 / 9001 | `user_minio` / `pass_minio`                | —          |

## Connection strings

```bash
# PostgreSQL (Prisma: add ?schema=public)
DATABASE_URL="postgresql://user_postgres:pass_postgres@localhost:5432/dev_db"

# MySQL
DATABASE_URL="mysql://user_mysql:pass_mysql@localhost:3306/dev_db"

# MongoDB: authSource=admin is required, the user lives in the admin DB
MONGODB_URI="mongodb://user_mongo:pass_mongo@localhost:27017/dev_db?authSource=admin"

# Redis
REDIS_URL="redis://localhost:6379"

# MinIO (S3-compatible, useSSL: false). Console: http://localhost:9001
S3_ENDPOINT="http://localhost:9000"
S3_ACCESS_KEY="user_minio"
S3_SECRET_KEY="pass_minio"
```

## Notes

- `dev_db` is created only on first start with an empty volume. Need another DB? Create it with the tool you use (Prisma migrate, a client, `CREATE DATABASE`); MongoDB creates one on first insert.
- Redis has no volume: data is lost when the container is removed.
- Port already in use? Stop the local install or change the left side of `ports` (e.g. `'5433:5432'`).
