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
      rate: 1,
      timeUnit: '1s',
      duration: '5m',
      preAllocatedVUs: 3
    },
  }
};


export default function () {
  const payload = JSON.stringify({ "compensations": [{ "id": 0, "typeId": 5, "quantity": 1, "amount": 1, "comment": "" }], "compensationRequestedForYearAndMonth": "2026-09-11T05:46:12.503Z" })
  
  const response = http.post("http://localhost:30090/api/compensations/create", payload, jsonHeaders)

  http.put("http://localhost:30090/api/compensations/mark-as-paid", response.body, jsonHeaders)
  
  http.del(`http://localhost:30090/api/compensations/${(JSON.parse(response.body)[0])}/hard-delete`, null, jsonHeaders)
}