## Installation

Before installing, [download and install Node.js](https://nodejs.org/en/download/)

## Requirement
- node
- npm
- mongoDB


## Instructions
- Clone the repository
- Globally install mocha and istanbul `npm install mocha istanbul -g`

## Run locally

You will need Node and `npm` installed locally in order to be able to run the app. First, install node dependencies

```bash
$ npm install
```

To run the app

```bash
$ npm start
```

To run the test

```bash
$ npm test
```

The Express app will now be running on port 4200 and can be accessed on http://localhost:4200. The following endpoints will be accessible:

```bash
GET http://localhost:4200/stats
POST http://localhost:4200/mutant
```
