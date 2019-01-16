const storage = window.localStorage;
export function loadState() {
  const state = storage.getItem('todo');
  if(!state) return false;
  return JSON.parse(state);
}

export function saveState(state) {
  storage.setItem('todo', JSON.stringify(state));
}
