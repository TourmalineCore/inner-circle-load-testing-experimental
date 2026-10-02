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
  const payload = JSON.stringify({ "title": "test", "taskId": "1", "description": `${Math.random()}`, "projectId": 4, "startTime": "2026-09-18T11:15:00", "endTime": "2026-09-18T11:30:00" })
  
  const response = http.post("http://localhost:30090/api/time/tracking/task-entries", payload, jsonHeaders)

  http.get("http://localhost:30090/api/time/tracking/entries?startDate=2026-09-14&endDate=2026-09-20", jsonHeaders)

  http.del(`http://localhost:30090/api/time/tracking/entries/${JSON.parse(response.body).newTaskEntryId}/hard-delete`, null, jsonHeaders)

}