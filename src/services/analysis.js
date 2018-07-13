import request from '../utils/request';

export function fetchVersionPlan(params) {
  return request('/searchVersionPlan/', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json;charset=UTF-8',
    },
    body: JSON.stringify(params),
  });
}
