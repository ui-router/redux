# 1.0.0 (2020-01-22)
1.0.0

### Bug Fixes

* **reducer:** save last transition instead ([a94d716](https://github.com/ui-router/redux/commit/a94d716))
* **webpack:** add externals and react-based bundle ([11d7cf0](https://github.com/ui-router/redux/commit/11d7cf0))
* fix typings versions mismatch to fix master build ([4c90cf2](https://github.com/ui-router/redux/commit/4c90cf2))


### Features

* export redux middleware for transitions ([8170b71](https://github.com/ui-router/redux/commit/8170b71))
* **react:** add ConnectedUIRouter utility component ([8847ce8](https://github.com/ui-router/redux/commit/8847ce8))
* Add support for react-redux 6 and onwards ([#10](https://github.com/ui-router/redux/issues/10)) ([cd9e393](https://github.com/ui-router/redux/commit/cd9e393))


### BREAKING CHANGES

* `@uirouter/redux` now only supports `react-redux` 6.x onwards, with the new React Context api.

Internally the library uses `ReactReduxContext` for consuming the redux store, which means it currently does not support custom context for Redux. Support for this might be added in the future.

* chore(*): update various dependencies
* chore(ConnectedUIRouter): better types
* feat(ConnectedUIRouter): support react-redux@^6.x
* chore(*): update deps and tests

New component implementation requires at least react@16 and the new enzyme adapter for it.
Updated the tests to use the new Redux Context api, as well as rely on public uirouter APIs instead of component internals to be more reliable.

* chore(travis): update node version
* fix: update typings to fix typescript errors
* fix: update all dependencies
* fix: update webpack config for latest webpack

Co-authored-by: Chris Thielen <christopherthielen@users.noreply.github.com>




## 0.1.1 (2017-11-05)
[Compare `@uirouter/redux` versions 0.1.0 and 0.1.1](https://github.com/ui-router/redux/compare/0.1.0...0.1.1)

- Fix missing built scripts in npm package

## 0.1.0 (2017-10-31)
0.1.0

first release