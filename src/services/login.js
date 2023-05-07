import request from '../utils/request';

export function login(params = {}) {
  const { account } = params;
  return {
    data: {
      account: account || 'bossliu@xx.com',
      name: '刘老板',
      token: '123123123',
    },
  };
  // return request('/login', {
  //   method: 'POST',
  //   headers: {
  //     Accept: 'application/json',
  //     'Content-type': 'application/json;charset=UTF-8',
  //   },
  //   body: JSON.stringify(params),
  // });
}

export function logout() {
  return '';
}
