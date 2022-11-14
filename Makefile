export ENV ?= development

UID = $(shell id -u)
GID = $(shell id -g)

export UID
export GID

help:
	@grep -P '^[a-zA-Z0-9_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

#### STARTING PROJECT ###

DOCKER_COMPOSE = docker-compose -p one-supply -f docker-compose.yaml
DOCKER_COMPOSE_INSTALL = docker-compose -p one-supply -f docker-compose.install.yaml
DOCKER_COMPOSE_TEST = docker-compose -p one-supply -f docker-compose.test.yaml
DOCKER_COMPOSE_E2E = docker-compose -p one-supply-e2e -f docker-compose.e2e.yaml


install: ## Install all dependencies.
	$(DOCKER_COMPOSE_INSTALL) run --rm --no-deps install

start: ## Start the project with docker.
	$(DOCKER_COMPOSE) up --force-recreate -d

logs: ## Display logs
	$(DOCKER_COMPOSE) logs -f

stop: ## Stop the project with docker.
	$(DOCKER_COMPOSE) down

unit-test: ## Start tests
	$(DOCKER_COMPOSE_TEST) run --rm --no-deps test yarn workspaces run test

unit-test-front: ## Start tests for front
	$(DOCKER_COMPOSE_TEST) run --rm --no-deps test /bin/bash -c "cd front; yarn run test" 

e2e-test-front: ## Start tests for front
	$(DOCKER_COMPOSE_E2E) down
	$(DOCKER_COMPOSE_E2E) up --force-recreate -d db
	$(DOCKER_COMPOSE_E2E) run --rm --no-deps api /bin/bash -c "yarn run migration:run; npx prisma db seed"
	$(DOCKER_COMPOSE_E2E) up --force-recreate -d front api
	$(DOCKER_COMPOSE_E2E) run --rm --no-deps e2e "npx cypress run"
	$(DOCKER_COMPOSE_E2E) down

unit-test-watch-front: ## Start tests for front
	$(DOCKER_COMPOSE_TEST) run --rm --no-deps test /bin/bash -c "cd front; yarn run test:watch" 	

unit-test-api: ## Start tests for api
	$(DOCKER_COMPOSE_TEST) run --rm --no-deps test /bin/bash -c "cd api; yarn run test" 		

unit-test-watch-api: ## Start tests for api
	$(DOCKER_COMPOSE_TEST) run --rm --no-deps test /bin/bash -c "cd api; yarn run test:watch" 		

build-api: ## Build api
	$(DOCKER_COMPOSE) run --rm --no-deps api yarn run build

build-front: ## Build front
	$(DOCKER_COMPOSE) run --rm --no-deps front yarn run build

migration-api: ## Migration api
	$(DOCKER_COMPOSE) run --rm --no-deps api yarn run migration:run:prod

migration-api-dev: ## Migration api
	$(DOCKER_COMPOSE) run --rm --no-deps api yarn run migration:run