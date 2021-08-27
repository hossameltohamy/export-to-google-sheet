THIS_FILE := $(lastword $(MAKEFILE_LIST))
DOCKER_CONTAINER_LIST := $(shell docker ps -a -q)
.PHONY: help build up start down destroy stop restart logs logs-api ps login-timescale login-api db-shell
include .env
export $(shell sed 's/=.*//' .env)

ifeq ($(current), "prod")
DOCKER_COMPOSE_FILE:=docker-compose-prod.yml
else ifeq ($(current),"test")
DOCKER_COMPOSE_FILE:=docker-compose-test.yml
else #dev 
DOCKER_COMPOSE_FILE:=docker-compose.yml
endif

help:
		make -pRrq  -f $(THIS_FILE) : 2>/dev/null | awk -v RS= -F: '/^# File/,/^# Finished Make data base/ {if ($$1 !~ "^[#.]") {print $$1}}' | sort | egrep -v -e '^[^[:alnum:]]' -e '^$@$$'
build:
		docker-compose -f ${DOCKER_COMPOSE_FILE} build $(c)
		docker-compose -f ${DOCKER_COMPOSE_FILE} up -d $(c)

up:
		docker-compose -f ${DOCKER_COMPOSE_FILE} up -d $(c)

migrate-dev: 
		docker-compose -f ${DOCKER_COMPOSE_FILE}run --rm nsp_backend npx sequelize-cli db:migrate

drob-dev: 
		docker-compose -f ${DOCKER_COMPOSE_FILE}run --rm nsp_backend npx sequelize-cli db:drop 

create-test:
		docker-compose -f ${DOCKER_COMPOSE_FILE} run --rm nsp_backend npx sequelize-cli db:create  

migrate-test: 
		docker-compose -f ${DOCKER_COMPOSE_FILE} run --rm nsp_backend   sequelize-cli db:migrate

drob-test: 
		docker-compose -f ${DOCKER_COMPOSE_FILE} run --rm nsp_backend  sequelize-cli db:drop 
create-test:
		docker-compose -f ${DOCKER_COMPOSE_FILE} run --rm nsp_backend    sequelize-cli db:create  
	


postgres: 
		docker-compose -f  ${DOCKER_COMPOSE_FILE} exec nsp_db /bin/bash
		psql -U francesco postgres
		\c nps_database
		\dt

start:
		docker-compose -f ${DOCKER_COMPOSE_FILE} start $(c)

down:
		docker-compose -f ${DOCKER_COMPOSE_FILE} down $(c)


destroy:
		docker-compose -f  ${DOCKER_COMPOSE_FILE} down -v $(c)

stop:
		docker-compose -f ${DOCKER_COMPOSE_FILE} stop $(c)

restart:
		docker-compose -f  ${DOCKER_COMPOSE_FILE} stop $(c)
		docker-compose -f ${DOCKER_COMPOSE_FILE} up -d $(c)

		

logs:
		docker-compose  -f ${DOCKER_COMPOSE_FILE} logs --tail=100 -f $(c)

remove-container:
		docker rm -f $(DOCKER_CONTAINER_LIST)
remove-volumes:
		docker volume prune -f 
clean-containers: 
		@if [ -n "$(DOCKER_CONTAINER_LIST)" ]; then echo "Removing docker containers" && docker rm "$(DOCKER_CONTAINER_LIST)"; else echo "No containers found"; fi;

remove-all:
		docker rm -f "$(DOCKER_CONTAINER_LIST)"
		docker volume prune -f 

ps:
		docker-compose ${DOCKER_COMPOSE_FILE} ps


