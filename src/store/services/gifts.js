import { post, remove } from './api';

export function createGift(listId, name, description, url, imageUrl) {
  return post(`/list/${listId}/gift`, {
    name: name,
    description: description,
    url: url,
    imageUrl: imageUrl
  });
}

export function editGift(listId, giftId, name, description, url, imageUrl) {
  return post(`/list/${listId}/gift/${giftId}`, {
    name: name,
    description: description,
    url: url,
    imageUrl: imageUrl
  });
}

export function claimGift(listId, giftId, state) {
  return post(`/list/${listId}/gift/${giftId}/claim`, {
    state: state
  });
}

export function removeGift(listId, giftId) {
  return remove(`/list/${listId}/gift/${giftId}`);
}
