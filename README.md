# Dev-ice - A simple Web app to organize your devices...

[![codecov](https://codecov.io/gh/guifonte/dev-ice/branch/main/graph/badge.svg?token=O4XOAEGSNT)](https://codecov.io/gh/guifonte/dev-ice)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

<p style="text-align: center;"><img src="docs/device-logo.svg" width="450"></p>

## Requirements

This app requires a MySQL database for testing, commiting and pushing. You use a mysql server locally with after creating a user "tester" with password "test" and a database "test", and grant it permission.

Other alternative is to run it with Docker using the command `docker run --name device-mysql -p 3306:3306 -e MYSQL_ROOT_PASSWORD=my-secret-pw -e MYSQL_DATABASE=test -e MYSQL_USER=tester -e MYSQL_PASSWORD=test -d mysql:latest`

You can then stop the container if you want with `docker stop device-mysql` and remove with `docker rm device-mysql`. The container port is mapped to default port of mysql (3306). So, if you want to use it, you need to stop the mysql server service before. In linux, the command is `service mysql stop`.

You can also run it in interative mode by changing the tag `-d` by `-it`.

> More infos in the [MySQL official image](https://hub.docker.com/_/mysql) in the DockerHub.

This project was generated using [Nx](https://nx.dev).
