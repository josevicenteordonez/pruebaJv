## Installation

Before installing, [download and install Node.js](https://nodejs.org/en/download/)

## Run locally

You will need Node and `npm` installed locally in order to be able to run the app. First, install node dependencies

```bash
$ npm install
```

To run the app

```bash
$ node index.js
```

The Express app will now be running on port 4200 and can be accessed on http://localhost:4200. The following endpoints will be accessible:

```bash
GET http://localhost:4200/stats
POST http://localhost:4200/mutant
```
