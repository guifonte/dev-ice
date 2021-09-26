# [1.0.0-beta.5](https://github.com/guifonte/dev-ice/compare/v1.0.0-beta.4...v1.0.0-beta.5) (2021-09-26)

### Features

- **api:** ensure delete on /categories return 200 on success and 204 if category does not exists ([5e529c5](https://github.com/guifonte/dev-ice/commit/5e529c5d52a5c282c0d90cf36a0dede503811f06))

# [1.0.0-beta.4](https://github.com/guifonte/dev-ice/compare/v1.0.0-beta.3...v1.0.0-beta.4) (2021-09-26)

### Bug Fixes

- **api:** typo ([042e01a](https://github.com/guifonte/dev-ice/commit/042e01ac0a456fecb004de4c2a0791ecf3d68de3))

### Features

- **api:** add TypeOrmModeule configuration in CategoriesModule ([95f1eb5](https://github.com/guifonte/dev-ice/commit/95f1eb5a263980f9eb8aefa27007a5a34f705838))
- **api:** ensure CategoriesController POST returns 400 if DTO name field is only white space ([47cf794](https://github.com/guifonte/dev-ice/commit/47cf79453ed7a585c75eb77a88b9988abf99ee7e))
- **api:** ensure CategoriesController returns 400 if DTO name field is bigger than 128 char ([c5dbcad](https://github.com/guifonte/dev-ice/commit/c5dbcad3a3a6d0299c104972601924ce748795fc))
- **api:** ensure CategoriesController returns 400 if DTO name field is empty ([9c81adc](https://github.com/guifonte/dev-ice/commit/9c81adc41e074510f67db0fa9de71c7922990246))
- **api:** ensure CategoriesController returns 400 if DTO name field is not string ([54a4430](https://github.com/guifonte/dev-ice/commit/54a44306217fcbaae07f0f1f01e8e7c027a57c7f))

# [1.0.0-beta.3](https://github.com/guifonte/dev-ice/compare/v1.0.0-beta.2...v1.0.0-beta.3) (2021-09-25)

### Features

- **api:** ensure CategoriesController delete resolves correctly ([0e24e01](https://github.com/guifonte/dev-ice/commit/0e24e01ded03773058a0a5e6a5fdbb713ef94ae7))
- **api:** ensure CategoriesController findAll returns correctly values ([5e1b63a](https://github.com/guifonte/dev-ice/commit/5e1b63a3b4fdaca359d2a073624bf460e0cd3129))
- **api:** ensure CategoriesController returns a Category when the service do so ([088ed5b](https://github.com/guifonte/dev-ice/commit/088ed5bbfae08f3ca36d67dd4d5ef1dd4c1f634e))

# [1.0.0-beta.2](https://github.com/guifonte/dev-ice/compare/v1.0.0-beta.1...v1.0.0-beta.2) (2021-09-25)

### Bug Fixes

- **all:** change job name ([25e356f](https://github.com/guifonte/dev-ice/commit/25e356f680ef9eb962803c940eb8dee9b6c61dc3))
- **all:** fix run format to only one ([c0c26db](https://github.com/guifonte/dev-ice/commit/c0c26dbc89e554af4e4fd42edfd3158bca8206c7))
- **all:** remove dash before uses ([17b96f9](https://github.com/guifonte/dev-ice/commit/17b96f959ff3ec9e138176f58ef38777a35562e8))
- **api:** add istanbul ignore for coverage in many to one function of typeorm entities ([b3cbee0](https://github.com/guifonte/dev-ice/commit/b3cbee0c3c41a48b4df8a193bcd3e6d25ea8ccc7))

### Features

- **api:** generate CategoriesController and CategoriesModule ([419682f](https://github.com/guifonte/dev-ice/commit/419682f57f720e63a323c8477862558325844bdf))
- **api:** prepare categories to testing and develop ([a8d43ff](https://github.com/guifonte/dev-ice/commit/a8d43ffd98400b97d42ef5b5b7f307dc579bde15))

# 1.0.0-beta.1 (2021-09-25)

### Bug Fixes

- **all:** fix ci config from master to main ([b011ee5](https://github.com/guifonte/dev-ice/commit/b011ee5e9aaac40bba08e0d90633f27ad0306cd9))

### Features

- **api:** create category entity ([144e4dc](https://github.com/guifonte/dev-ice/commit/144e4dc4c4afa484c6fb09feda8ccc46de17e828))
- **api:** create device entity ([e01611f](https://github.com/guifonte/dev-ice/commit/e01611f769e67aa29a88848d66159eaea9fa0ce3))
- **api:** create init migration to init the database ([09a3ceb](https://github.com/guifonte/dev-ice/commit/09a3ceb45b81ec54ef08ca37f8b1a2803aab7f40))
- **api:** ensure CategoriesService creates a category with id ([60c0d08](https://github.com/guifonte/dev-ice/commit/60c0d087929af47eb00c101f7d5901c5f4e76add))
- **api:** ensure CategoriesService only delete a category if no device has it as category ([b65a8b2](https://github.com/guifonte/dev-ice/commit/b65a8b25eac4e89f5c9d7ff3ef8ed57fadeed2b4))
- **api:** ensure CategoriesServices delete works properly ([52a960a](https://github.com/guifonte/dev-ice/commit/52a960aaf6b38f7bd00fe52c85d9b1614c87e43d))
- **api:** ensure CategoriesServices findAll returns the categories correctly on success ([bc01c00](https://github.com/guifonte/dev-ice/commit/bc01c0033cee55b2709b08edcf51eaba2d474cae))
- **api:** ensure DevicesService delete correctly or throw if id not found ([d145169](https://github.com/guifonte/dev-ice/commit/d145169cad732c29aef157673e0f51abcce1999b))
- **api:** ensure DevicesService findAll retrieve correctly the devices on success ([67e727a](https://github.com/guifonte/dev-ice/commit/67e727ad798ae75a45a5234ebb6453cf6a09e22e))
- **api:** ensure DevicesService throw BAD_REQUEST by create when category does not exists ([e98148f](https://github.com/guifonte/dev-ice/commit/e98148f18e6c9b272a4768f2fc4b50335e93c835))
- **api:** ensure the DevicesService creates and return a Device ([4f9472f](https://github.com/guifonte/dev-ice/commit/4f9472f07484661395310296d046b0a937116253))
