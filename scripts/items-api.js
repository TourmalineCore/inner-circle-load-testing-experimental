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
  const payload = JSON.stringify({ "name": `${Math.random()}` })
  
  const response = http.post("http://localhost:30090/api/items/item-types", payload, jsonHeaders)

  http.get("http://localhost:30090/api/items/item-types", jsonHeaders)

  http.del(`http://localhost:30090/api/items/item-types/${JSON.parse(response.body).newItemTypeId}/hard-delete`, null, jsonHeaders)

}