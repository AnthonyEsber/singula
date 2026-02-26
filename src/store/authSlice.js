import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { supabase } from '../lib/supabase';

export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return rejectWithValue(error.message);
    return data.user;
  }
);

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async ({ email, password, fullName }, { rejectWithValue }) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName } },
    });
    if (error) return rejectWithValue(error.message);
    return data;
  }
);

export const logoutUser = createAsyncThunk('auth/logoutUser', async (_, { rejectWithValue }) => {
  const { error } = await supabase.auth.signOut();
  if (error) return rejectWithValue(error.message);
});

export const fetchProfile = createAsyncThunk(
  'auth/fetchProfile',
  async (userId, { rejectWithValue }) => {
    const { data, error } = await supabase.from('profiles').select('*').eq('id', userId).single();
    if (error) return rejectWithValue(error.message);
    return data;
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    profile: null,
    status: 'loading',
    error: null,
  },
  reducers: {
    setSession(state, action) {
      state.user = action.payload;
      if (!action.payload) {
        state.profile = null;
        state.status = 'idle';
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginUser.fullfilled, (state, action) => {
        state.user = action.payload;
        state.status = 'idle';
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.payload;
      })
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(registerUser.fullfilled, (state, action) => {
        ((state.user = action.payload), (state.status = 'idle'));
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.payload;
      })
      .addCase(logoutUser.fullfilled, (state) => {
        state.user = null;
        state.profile = null;
        state.status = 'idle';
      })
      .addCase(fetchProfile.fullfilled, (state, action) => {
        state.profile = action.payload;
        state.status = 'idle';
      })
      .addCase(fetchProfile.rejected, (state) => {
        state.status = 'idle';
      });
  },
});

export const { setSession } = authSlice.actions;
export default authSlice.reducer;
