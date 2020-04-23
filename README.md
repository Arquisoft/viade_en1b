[![Build Status](https://travis-ci.org/Arquisoft/viade_en1b.svg?branch=master)](https://travis-ci.org/Arquisoft/viade_en1b)
[![codecov](https://codecov.io/gh/Arquisoft/viade_en1b/branch/master/graph/badge.svg)](https://codecov.io/gh/Arquisoft/viade_en1b)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/eb242ef1364d43c4b134aa6b65acd970)](https://www.codacy.com/gh/Arquisoft/viade_en1b?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=Arquisoft/viade_en1b&amp;utm_campaign=Badge_Grade)

# VIADE EN1B

This repository contains a skeleton of the VIADE project.

This project is an assignment for the [Software Architecture course](https://arquisoft.github.io/) following [these requirements](https://labra.solid.community/public/SoftwareArchitecture/AssignmentDescription/).

More information about how this project has been setup is available [in the wiki](https://github.com/Arquisoft/viade_en1b/wiki).

---

[Check it out!](https://arquisoft.github.io/viade_en1b/)

## Contributors

- [Marcos Álvarez García](https://github.com/alvarezGarciaMarcos)
- [Pelayo García Álvarez](https://github.com/garciaAlvarezPelayo)
- [Álvaro García Infante](https://github.com/alvarogarinf)
- [Íñigo Gutiérrez Fernández](https://github.com/InigoGutierrez)
- [Eduardo Lamas Suarez](https://github.com/lamasumas)
- [César García Cabeza](https://github.com/themrcesi)

## Documentation

The documentation is available [here](https://arquisoft.github.io/viade_en1b/docs).

## Development

This project was generated using [Create React App](https://create-react-app.dev/).

### Getting started
In order to run this project, you will need to follow these steps:
1. Install [Ruby](https://www.ruby-lang.org/es/)
    > We recommend to install ruby using [RubyInstaller](https://rubyinstaller.org/)

1. Install [Node](https://nodejs.org/) & [NPM](https://www.npmjs.com/)

1. Install [asciidoctor](https://asciidoctor.org/)
    1. Then, install [asciidoctor-diagram](https://asciidoctor.org/docs/asciidoctor-diagram/):
        ``` shell
        gem install asciidoctor-diagram
        ```
        > In windows issue this command using the terminal provided by RubyInstaller. In linux 'sudo' may be needed, depending on the installation.

1. Run 
    ```shell
    npm install 
    ```
    > to have all the dependencies needed.

### Generating the documentation

Execute 
```
    npm run docs
```
to generate the html documents and dependencies (all the documents will be stored in `/build/docs`).

### Development server

If you want to test the application in your local machine, you will need run a development server in your machine.

1. Run `npm start`.
2. Go to your browser and navigate to `http://localhost:3000/viade_en1b`.

### Building the application
    
If you want to build the applicatioin you need to run `npm run build` and all the files will be stored in `/build`.

### Runing unit tests

To execute the unit tests, you need to run `npm test`. 
> This tests have been created using [Jest](https://jestjs.io/).

### Running end-to-end tests

Run `npm run cucumber`. 
> This tests have been created using [Cucumber](https://cucumber.io/) and [Selenium](https://www.selenium.dev/).

### Running load tests

Run `npm run artillery`.
> This tests have been created using [Artillery](https://artillery.io/).

### Docker

TBD

---
