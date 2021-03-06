# SOON FM Frontend

[![CircleCI][circleci-badge]][circleci]
[![Coverage Status][coveralls-badge]][coveralls]
[![Commitizen friendly][commitizen-badge]][commitizen]
[![code style: prettier][prettier-badge]][prettier-badge-url]

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.3.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma][karma].

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor][protractor].
Before running the tests make sure you are serving the app via `ng serve`.

## Running examples server

Run `npm run examples` to run a webpack dev server that will serve the examples folder with styles from `src/scss` injected into every page.

## Making Commits

This repo uses [Commitizen CLI][commitizen] and [Conventional Changelog][conventional-changelog] to create commits and generate changelogs. Instead of running `git commit` run `git cz` and follow the prompts. Changelogs will then be generated when creating new releases by running `npm run release`.

## Making Releases

Run `npm run release` to create a new release. This will use [Standard Version][standard-version] to create a new release. [Standard Version][standard-version] will generate / update the changelog based on commits generated using [Commitizen CLI][commitizen], update the version number following semantic versioning rules and then commit and tag the commit for the release. Simply run `git push --follow-tags origin master`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README][angular-cli-readme].

[commitizen]: http://commitizen.github.io/cz-cli/
[commitizen-badge]: https://img.shields.io/badge/commitizen-friendly-brightgreen.svg
[conventional-changelog]: https://github.com/conventional-changelog/conventional-changelog
[standard-version]: https://github.com/conventional-changelog/standard-version
[circleci]: https://circleci.com/gh/thisissoon-fm/frontend
[circleci-badge]: https://circleci.com/gh/thisissoon-fm/frontend.svg?style=shield
[coveralls]: https://coveralls.io/github/thisissoon-fm/frontend?branch=master
[coveralls-badge]: https://coveralls.io/repos/github/thisissoon-fm/frontend/badge.svg?branch=master
[prettier-badge]: https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=shield
[prettier-badge-url]: https://github.com/prettier/prettier
[karma]: https://karma-runner.github.io
[protractor]: http://www.protractortest.org/
[angular-cli]: https://github.com/angular/angular-cli
[angular-cli-readme]: https://github.com/angular/angular-cli/blob/master/README.md
