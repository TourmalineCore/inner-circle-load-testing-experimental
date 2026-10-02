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

  const payload = JSON.stringify({ "title": `${Math.random()}`, "annotation": "test", "language": "ru", "authors": [{ "fullName": `${Math.random()}` }], "coverUrl": "", "knowledgeAreasIds": [1], "countOfCopies": 1 })

  const response = http.post("http://localhost:30090/api/books", payload, jsonHeaders)

  http.get("http://localhost:30090/api/books", jsonHeaders)

  http.del(`http://localhost:30090/api/books/${JSON.parse(response.body).newBookId}/hard-delete`, null, jsonHeaders)

}