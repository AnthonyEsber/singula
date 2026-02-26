const KEY = 'singula_ui';

export function loadUiState() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) ?? undefined;
  } catch {
    return undefined;
  }
}

export function saveUiState(state) {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    throw new Error('Failed.');
  }
}
