import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { supabase } from '../lib/supabase';

export const fetchResumes = createAsyncThunk(
  'resumes/fetchResumes',
  async (_, { getState, rejectWithValue }) => {
    const { user } = getState().auth;
    const { data, error } = await supabase
      .from('resumes')
      .select('*')
      .eq('owner_id', user.id)
      .order('updated_at', { ascending: false });
    if (error) return rejectWithValue(error.message);
    return data;
  }
);

export const fetchResumeById = createAsyncThunk(
  'resumes/fetchResumeById',
  async (id, { rejectWithValue }) => {
    const { data, error } = await supabase.from('resumes').select('*').eq('id', id).single();
    if (error) return rejectWithValue(error.message);
    return data;
  }
);

export const createResume = createAsyncThunk(
  'resumes/createResume',
  async (_, { getState, rejectWithValue }) => {
    const { profile, user } = getState().auth;
    const { list } = getState().resumes;

    if (profile?.tier === 'free' && list.length >= 1) {
      return rejectWithValue(
        'Free plan is limited to 1 resume. Upgrade to Pro for unlimited resumes.'
      );
    }

    const { data, error } = await supabase
      .from('resumes')
      .insert({ item_name: 'Untitled Resume', content: {}, owner_id: user.id })
      .select()
      .single();
    if (error) return rejectWithValue(error.message);
    return data;
  }
);

export const saveResume = createAsyncThunk(
  'resumes/saveResume',
  async ({ id, content, itemName }, { rejectWithValue }) => {
    const { data, error } = await supabase
      .from('resumes')
      .update({ content, item_name: itemName })
      .eq('id', id)
      .select()
      .single();
    if (error) return rejectWithValue(error.message);
    return data;
  }
);

export const deleteResume = createAsyncThunk(
  'resumes/deleteResume',
  async (id, { rejectWithValue }) => {
    const { error } = await supabase.from('resumes').delete().eq('id', id);
    if (error) return rejectWithValue(error.message);
    return id;
  }
);

export const renameResume = createAsyncThunk(
  'resumes/renameResume',
  async ({ id, itemName }, { rejectWithValue }) => {
    const { data, error } = await supabase
      .from('resumes')
      .update({ item_name: itemName })
      .eq('id', id)
      .select()
      .single();
    if (error) return rejectWithValue(error.message);
    return data;
  }
);

export const toggleShareResume = createAsyncThunk(
  'resumes/toggleShareResume',
  async ({ id, isPublic }, { rejectWithValue }) => {
    const { data, error } = await supabase
      .from('resumes')
      .update({ is_public: isPublic })
      .eq('id', id)
      .select()
      .single();
    if (error) return rejectWithValue(error.message);
    return data;
  }
);

const resumesSlice = createSlice({
  name: 'resumes',
  initialState: {
    list: [],
    currentResume: null,
    status: 'idle',
    saveStatus: 'idle',
    error: null,
  },
  reducers: {
    clearCurrentResume(state) {
      state.currentResume = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchResumes.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchResumes.fulfilled, (state, action) => {
        state.list = action.payload;
        state.status = 'idle';
      })
      .addCase(fetchResumes.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.payload;
      })
      .addCase(fetchResumeById.pending, (state) => {
        state.status = 'loading';
        state.currentResume = null;
        state.error = null;
      })
      .addCase(fetchResumeById.fulfilled, (state, action) => {
        state.currentResume = action.payload;
        state.status = 'idle';
      })
      .addCase(fetchResumeById.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.payload;
      })
      .addCase(createResume.fulfilled, (state, action) => {
        state.list.unshift(action.payload);
      })
      .addCase(createResume.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(saveResume.pending, (state) => {
        state.saveStatus = 'saving';
      })
      .addCase(saveResume.fulfilled, (state, action) => {
        state.saveStatus = 'saved';
        state.currentResume = action.payload;
        const idx = state.list.findIndex((r) => r.id === action.payload.id);
        if (idx !== -1) state.list[idx] = action.payload;
      })
      .addCase(saveResume.rejected, (state, action) => {
        state.saveStatus = 'idle';
        state.error = action.payload;
      })
      .addCase(deleteResume.fulfilled, (state, action) => {
        state.list = state.list.filter((r) => r.id !== action.payload);
      })
      .addCase(renameResume.fulfilled, (state, action) => {
        state.currentResume = action.payload;
        const idx = state.list.findIndex((r) => r.id === action.payload.id);
        if (idx !== -1) state.list[idx] = action.payload;
      })
      .addCase(toggleShareResume.fulfilled, (state, action) => {
        state.currentResume = action.payload;
        const idx = state.list.findIndex((r) => r.id === action.payload.id);
        if (idx !== -1) state.list[idx] = action.payload;
      });
  },
});

export const { clearCurrentResume } = resumesSlice.actions;
export default resumesSlice.reducer;
