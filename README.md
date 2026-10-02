# inner-circle-load-testing-experimental

## Prerequirements

Deployed [inner-circle-local-env](https://github.com/TourmalineCore/inner-circle-local-env)
  
## Getting started

This repository allows to perform load testing on the following services:

- accounts-api
- auth-api
- books-api
- compensations-api
- employees-api
- invoices-api
- items-api
- time-api

### Configuration of the test

```js
export const options = {
  scenarios: {
    load_test: {
      executor: 'constant-arrival-rate',
      rate: 1,
      timeUnit: '1s',
      duration: '5m',
      preAllocatedVUs: 3
    },
  }
};
```
In K6, testing is performed iteratively. One iteration is one run of a test script. If a script consists of three requests and we perform one iteration per second, that amounts to three requests per second.
- rate - count of iterations per timeUnit
- timeUnit - interval between iterations
- duration - test duration
- preAllocatedVUs - Virtual Users created in advance so k6 can start iterations immediately
- executor: 'constant-arrival-rate' - keeps a constant rate of starting iterations, regardless of how long each iteration takes

Execute the following command to get all available commands:
```bash
make help
```
