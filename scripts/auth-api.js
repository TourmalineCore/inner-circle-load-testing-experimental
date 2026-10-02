import http from 'k6/http';

const jsonHeaders = {
  headers: {
    'Authorization': `Bearer ${__ENV.BEARER_TOKEN}`,
    'Content-Type': 'application/json',
  },
};

export const options = {
  scenarios: {
    load_test: {
      executor: 'constant-arrival-rate',
      rate: 3,
      timeUnit: '1s',
      duration: '5m',
      preAllocatedVUs: 3
    },
  }
};

export default function () {
  const payload = JSON.stringify({"login":"ceo@tourmalinecore.com","password":"cEoPa$$wo1d"})
  
  http.post("http://localhost:30090/api/auth/login", payload, jsonHeaders)
}

