import { configureStore } from '@reduxjs/toolkit';
import { loadUiState, saveUiState } from '../lib/storage';
import authReducer from './authSlice';
import resumeReducer from './resumeSlice';
import uiReducer from './uiSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    resumes: resumeReducer,
    ui: uiReducer,
  },

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
