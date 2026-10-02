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
  http.get("http://localhost:30090/api/invoices/invoices/projects", jsonHeaders)
  
  http.get("http://localhost:30090/api/invoices/invoices/employees-tracked-task-hours?month=9&year=2026&projectId=9", jsonHeaders)
  
  http.get("http://localhost:30090/api/invoices/invoices/employees-tracked-task-hours?month=9&year=2026&projectId=15", jsonHeaders)
  
}