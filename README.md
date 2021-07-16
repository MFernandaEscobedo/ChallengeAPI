## ChallengeAPI

## Installation

Use the package manager npm to install dependecies

```bash
npm install
```

## Run

To run the project

```bash
npm run start
```

## Usage

In both endpoints can be tested from a browser or postman

```
// receives in query year
// returns a json object with the best options array by year 
http://localhost:3000/api/bestOptionsPerYear/:year

// receives in params {brand, year, hasAC}
// returns a json object with the cheapest options array by brand, year 
http://localhost:3000/api/quoteCar
```
