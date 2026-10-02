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
  const payload = JSON.stringify({ "employeeId": 3, "fullName": "Trial Trial Trial", "corporateEmail": "trial@tourmalinecore.com", "personalEmail": "trial@gmail.com", "phone": "+71111111111", "gitHub": "test", "gitLab": "test", "isBlankEmployee": true, "isCurrentEmployee": true, "specializations": [1], "birthDate": "2002-02-02", "workerTime": `${Math.random()}` })
  
  http.put("http://localhost:30090/api/employees/employees/update", payload, jsonHeaders)

  http.get("http://localhost:30090/api/employees/employees/all", jsonHeaders)
}