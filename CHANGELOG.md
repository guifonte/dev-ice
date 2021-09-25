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
