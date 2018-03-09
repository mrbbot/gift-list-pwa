import fetch from 'unfetch';
import { requestToken } from "../../firebase";

function request(route, options) {
  return new Promise((resolve, reject) => {
    requestToken().then(token => {
      options.headers['Authorization'] = token;

      let response;
      // noinspection JSUnresolvedVariable
      fetch(process.env.API_URL + route, options)
        .then(r => {
          response = r;
          return r.json();
        })
        .then(r => resolve({
          ok: response.ok,
          status: response.status,
          body: r
        }))
        .catch(e => { console.error(e); reject(); });
    });
  });
}

export function get(route) {
  return request(route, {
    headers: {}
  });
}

export function post(route, data) {
  return request(route, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
}

export function remove(route) {
  return request(route, {
    method: 'DELETE',
    headers: {},
  });
}
