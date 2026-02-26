import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './app/App.jsx';
import { loadUiState } from './lib/storage.js';
import { supabase } from './lib/supabase.js';
import { store } from './store/store.js';
import { fetchProfile, setSession } from './store/authSlice.js';
import { Provider } from 'react-redux';

const savedTheme = loadUiState()?.theme ?? 'system';
if (savedTheme !== 'system') {
  document.documentElement.setAttribute('data-theme', savedTheme);
}

supabase.auth.onAuthStateChange((_event, session) => {
  const user = session?.user ?? null;
  store.dispatch(setSession(user));
  if (user) {
    store.dispatch(fetchProfile(user.id));
  }
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
