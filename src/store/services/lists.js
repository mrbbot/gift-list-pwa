import { get, post, remove } from './api';

export function getLists(uid) {
  return get(`/lists/${uid}`);
}

export function createList(name, description) {
  return post('/list', {
    name: name,
    description: description
  });
}

export function editList(id, name, description) {
  return post(`/list/${id}`, {
    name: name,
    description: description
  });
}

export function removeList(id) {
  return remove(`/list/${id}`);
}
