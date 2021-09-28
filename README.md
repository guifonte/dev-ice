# Dev-ice - A simple Web app to organize your devices...

[![codecov](https://codecov.io/gh/guifonte/dev-ice/branch/main/graph/badge.svg?token=O4XOAEGSNT)](https://codecov.io/gh/guifonte/dev-ice)
![Test-Build](https://github.com/guifonte/dev-ice/actions/workflows/test-and-build.yml/badge.svg?branch=main)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

<p style="text-align: left;"><img src="docs/device-logo.svg" width="450"></p>

## Overview

This project was for a code challange of Eldorado Institute.
The idea is to make a simple app to save and delete devices and its categories.

## Tecnologies

- Nest.js
- Angular
- MySQL
- TypeORM
- Nx
- PrimeNg/Primeflex
- AWS RDS
- AWS Elastic Beanstalk
- AWS S3
- Docker
- Github Actions
- Codecov
- Jest
- Semantic-release
- Commitizen
- lint-staged
- Husky
- git-commit-msg-linter
- swagger

## Figma

[The draft of the design](https://www.figma.com/file/d3sxMLD2WdYIjqQmLfopTx/Dev-Ice) is accessible through the Figma Web App. It was used the Design Library [PrimeOne](https://www.figma.com/community/file/890589747170608208) from Primefaces, the base of PrimeNg, the library used in this project.

## Development Requirements

This app requires a MySQL database for testing, commiting and pushing. You use a mysql server locally with after creating a user "tester" with password "test" and a database "test", and grant it permission.

Other alternative is to run it with Docker using the command `docker run --name device-mysql -p 3306:3306 -e MYSQL_ROOT_PASSWORD=my-secret-pw -e MYSQL_DATABASE=test -e MYSQL_USER=tester -e MYSQL_PASSWORD=test -d mysql:latest`

You can then stop the container if you want with `docker stop device-mysql` and remove with `docker rm device-mysql`. The container port is mapped to default port of mysql (3306). So, if you want to use it, you need to stop the mysql server service before. In linux, the command is `service mysql stop`.

You can also run it in interative mode by changing the tag `-d` by `-it`.

> More infos in the [MySQL official image](https://hub.docker.com/_/mysql) in the DockerHub.

[Nx](https://nx.dev)
