# Meetup Event Planner

> Project #1 of the [Senior Software Nanodegree](https://www.udacity.com/course/senior-web-developer-nanodegree-by-google--nd802) by **Google** and [Udacity](https://www.udacity.com/).

## Goal

You will build a _responsive web application_ that allows the user to establish a meet-up event. The goal is to create an app that is a joy to use on both _desktop_ and _mobile_. The application must
allow someone to name their event, search for a host location (using a location API like Foursquare), set the capacity of the event, the start and end times, and input a description of the event.

The project uses NodeJS, ExpressJS, Bootstrap 4, formValidation, SASS, HandleBars, Firebase, jQuery.

This structure project is based on [Web Starter Kit](https://developers.google.com/web/tools/starter-kit/) by Google.

## Installation

1. **Clone** or **Download** the [git project](https://github.com/codesandtags/meetup).

2. [Use npm](https://docs.npmjs.com/cli/install) to install all dependencies in the _package.json_ and _bower.json_.
```sh
npm install && bower install
```

3. Once you finish to install the dependencies you can start the project using the *gulp tasks*. (please review the [gulpfile.babel.js](https://github.com/codesandtags/meetup/blob/master/gulpfile.babel.js))

## Usage

#### Run development tasks:
By default *gulp* command run the *development* task.

```
gulp
gulp serve
```

### Features

- Handling session supported in NodeJS for users
- Sign In and Sign Up form
- Create meetup event form
- i18n basic using a Json object and handlebars
- Show the latest meetups events in the main page
- Use firebase as database and authentication of the users
- Validations using formValidation library

## Notable changes from 1.0
- Setup project using [Web Starter Kit](https://developers.google.com/web/tools/starter-kit/) by Google.
- Defined the color styles using Material Design library.

## Licence
**
Apache 2.0
