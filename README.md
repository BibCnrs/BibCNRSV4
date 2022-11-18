<h1 align="center">Welcome to BibCNRS v4 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-0.0.1-blue.svg?cacheSeconds=2592000" />
  <a href="http://localhost:3200/" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
</p>

> BibCNRS v4

---

## INSTALL

The project is made up of 2 main bricks :

- **REST API** (using `Nest.js` + `Prisma`)
- **Front** (using `Remix`)

```sh
make install
```

---

## START THE PROJECT

/!\ Before starting the project you need to setup the `.env` file. You can see the `.env.example` for helping you.

| ENV               | Description                                      |
| ----------------- | ------------------------------------------------ |
| DATABASE_NAME     | Name of the database use to create Database      |
| DATABASE_PASSWORD | Password of the database use to create Database  |
| DATABASE_USER     | Name of the user database use to create Database |
| DATABASE_URL      | Direct URL for database connection use by Prisma |
| COOKIE_SECRET     | Password use for Cookie                          |
| JWT_SECRET        | Password use for JWT                             |
| VITE_API_URL      | URL location of API use by front                 |
| EBSCO_API_URL     | URL location of EBSCO API use by bibAPI          |
| INSHS_USER_ID     | user use for INSHS search                        |
| INSHS_PASSWORD    | password use for INSHS search                    |
| INSHS_PROFILE     | INSHS use for INSHS search                       |

Now you can launch

```sh
make start && make logs
make stop
```

---

## FRONT

The front is written in `Remix`. \
To follow the best practices please read this [documentation](https://remix.run/docs/en/v1).

---

## REST API

The API is written in [Nest.js](https://nestjs.com/).

To understand the migrations we encourage you to look at this [documentation](https://www.prisma.io/docs/concepts/components/prisma-migrate)

A make command is available for run migrations inside docker

```sh
make migration-api
```

### Import data

To import data you need to put your backup file in `./api/backups` and run

```sh
make restore-db-dev `name of your backup file`
```

---

## Author

👤 **Marmelab**
