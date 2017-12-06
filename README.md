# Riot Chrome Extension Boilerplate
[![Build Status](https://travis-ci.org/Acesmndr/chrome-extension-boilerplate-riot.svg?branch=master)](https://travis-ci.org/Acesmndr/chrome-extension-boilerplate-riot)
[![Maintainability](https://api.codeclimate.com/v1/badges/454ecbf346f2744ccee4/maintainability)](https://codeclimate.com/github/Acesmndr/chrome-extension-boilerplate-riot/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/454ecbf346f2744ccee4/test_coverage)](https://codeclimate.com/github/Acesmndr/chrome-extension-boilerplate-riot/test_coverage)
[![license](https://img.shields.io/npm/l/express.svg)]()

A boilerplate for a single page extension/application using Riot framework as MVP and webpack as the module bundler.
It is created to solve all the problems that we face while building a chrome extension.

### Features
* Single page application with a lightweight framework
* A simple working todo app is included
* All asynchronous tasks in the UI are delegated to the background so that they aren't lost when the popup is closed
* Communication between background and popup has been simplified

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

What things you need to install the software and how to install them

```
* Node
* Yarn
```

### Installing

To get the extension built the following simple steps need to be followed

Please make sure that Node and Yarn are installed in your machine.
If yarn is not installed then install it by using the below command :

MAC

```
brew install yarn
```

Windows

1. download installer from https://yarnpkg.com/lang/en/docs/install/
2. install yarn using installer
3. restart command line if necessary

Clone this repository

```
git clone git@github.com:acesmndr/riot-chrome-extension-boilerplate.git
cd riot-chrome-extension-boilerplate
```

then install the project dependencies
```
yarn install
```

## Building the extension

To build the extension for a certain environment run the following command

MAC and LINUX

```
yarn run [development/staging/production]
```

Windows

```
yarn run [win-development/win-staging/win-production]
```

It builds the extension files in the folder for the environment you passed as well as builds the crx extension in the build folder.
In `development` and `win-development` builds webpack keeps watching over the files and rebuilds if any changes are made. 

### Loading the extension

There are two ways you can achieve this. Either you can load the unpacked extension or load the packed crx extension.

* ##### Loading unpacked Extension

    * Go to [chrome://extensions](chrome://extensions) page
    * Click load unpacked extension
    * Browse to the desired `environment[staging/stagingnxt/production]` folder

* ##### Loading crx file

    * Go to [chrome://extensions](chrome://extensions) page
    * Drag and drop the extension crx file from the `build` folder

## Maintaining changelog

A [changelog](https://github.com/cloudfactory/workstream-browser-timer/blob/master/changelog.md) has been maintained to keep track of all the changes made in the extension along with semantic versioning

### Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/cloudfactory/workstream-browser-timer/tags).

### Upgrading the extension

Run the following command to check the current version of the extension
```
yarn run version
```
Then to upgrade the version along with a changelog run the following command
```
CHANGELOG="Changes Made in the extension" VERSION="5.0.0" yarn run upgrade
```


## Built With

* [RIOT](http://riotjs.com/) - Frontend MVP Framework
* [Webpack](https://webpack.js.org/concepts/) - Module Bundler
* [Yarn](https://yarnpkg.com/en) - The package manager
* [Material Design](https://material.io/guidelines/material-design/introduction.html#introduction-goals) - Design Principles
