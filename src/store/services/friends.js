import { get, post, remove } from './api';

export function getFriends() {
  return get('/friends');
}

export function addFriend(email) {
  return post('/friend', {
    email: email
  });
}

export function acceptFriend(id) {
  return post(`/friend/accept/${id}`);
}

export function rejectFriend(id) {
  return post(`/friend/reject/${id}`);
}

export function removeFriend(id) {
  return remove(`/friend/${id}`)
}
