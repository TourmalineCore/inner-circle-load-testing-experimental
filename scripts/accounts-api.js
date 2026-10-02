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
  const payload = JSON.stringify({"firstName":"test","lastName":"test","corporateEmail":`${Math.random()}@tourmalinecore.com`,"tenantId":"6","roleIds":[2]})
  
  const response = http.post("http://localhost:30090/api/account-management/accounts/create", payload, jsonHeaders) 

  const editPayload = JSON.stringify({id: response.body, firstName: `${Math.random()}`, middleName: null, lastName: 'test', roles: [2]});

  http.put("http://localhost:30090/api/account-management/accounts/edit", editPayload, jsonHeaders)

  http.post("http://localhost:30090/api/account-management/accounts/delete-account", JSON.stringify({"corporateEmail" : `${JSON.parse(payload).corporateEmail}`}), jsonHeaders)

}