export ENV ?= development

UID = $(shell id -u)
GID = $(shell id -g)

export UID
export GID

help:
	@grep -P '^[a-zA-Z0-9_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

# If the first argument is one of the supported commands...
SUPPORTED_COMMANDS := restore-db-dev _restore_db_dev
SUPPORTS_MAKE_ARGS := $(findstring $(firstword $(MAKECMDGOALS)), $(SUPPORTED_COMMANDS))
ifneq "$(SUPPORTS_MAKE_ARGS)" ""
    # use the rest as arguments for the command
    COMMAND_ARGS := $(wordlist 2,$(words $(MAKECMDGOALS)),$(MAKECMDGOALS))
    # ...and turn them into do-nothing targets
    $(eval $(COMMAND_ARGS):;@:)
endif

#### STARTING PROJECT ###

DOCKER_COMPOSE = docker-compose -p bibcnrs -f docker-compose.yaml
DOCKER_COMPOSE_INSTALL = docker-compose -p bibcnrs -f docker-compose.install.yaml
DOCKER_COMPOSE_TEST = docker-compose -p bibcnrs -f docker-compose.test.yaml
DOCKER_COMPOSE_E2E = docker-compose -p bibcnrs-e2e -f docker-compose.e2e.yaml


install: ## Install all dependencies.
	$(DOCKER_COMPOSE_INSTALL) run --rm --no-deps install

start: ## Start the project with docker.
	$(DOCKER_COMPOSE) up --force-recreate -d

remix: ## Start remix local.
	cd front && yarn run dev

logs: ## Display logs
	$(DOCKER_COMPOSE) logs -f

stop: ## Stop the project with docker.
	$(DOCKER_COMPOSE) down

unit-test: ## Start tests
	$(DOCKER_COMPOSE_TEST) run --rm --no-deps test yarn workspaces run test

unit-test-front: ## Start tests for front
	$(DOCKER_COMPOSE_TEST) run --rm --no-deps test /bin/bash -c "cd front; yarn run test" 

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
	$(DOCKER_COMPOSE) run --rm api yarn run migration:run:prod

migration-api-dev: ## Migration api
	$(DOCKER_COMPOSE) run --rm api yarn run migration:run

restore-db-dev:  ## restore a given dump to the postgres database list all dump if none specified
ifdef COMMAND_ARGS
	@make _restore_db_dev $(COMMAND_ARGS)
else
	echo 'please specify backup to restore':
	@ls -h ./api/backups
endif

_restore_db_dev: 
	docker exec bibcnrs_db_1 bash -c 'PGPASSWORD=$$POSTGRES_PASSWORD dropdb --username $$POSTGRES_USER $$POSTGRES_DB'
	docker exec bibcnrs_db_1 bash -c 'PGPASSWORD=$$POSTGRES_PASSWORD createdb --username $$POSTGRES_USER $$POSTGRES_DB' || true
	docker exec bibcnrs_db_1 bash -c 'ls && psql -f /backups/$(COMMAND_ARGS) postgres://$$POSTGRES_USER:$$POSTGRES_PASSWORD@$$POSTGRES_HOST:5432/$$POSTGRES_DB'
