import { configureStore } from '@reduxjs/toolkit';
import { loadUiState, saveUiState } from '../lib/storage';

export const store = configureStore({
  reducer: {},

  preloadedState: {
    ui: loadUiState(),
  },
});

let debounceTimer;
store.subscribe(() => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    saveUiState(store.getState().ui);
  }, 300);
});
