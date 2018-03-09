export function immutablePush(arr, newEntry) {
  return [...arr, newEntry];
}

export function immutableDelete(arr, index) {
  return arr.slice(0, index).concat(arr.slice(index + 1));
}
