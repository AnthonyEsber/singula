import { createSlice } from '@reduxjs/toolkit';

const defaultState = {
  theme: 'system',
  resumeFilters: { searchText: '', sortBy: 'date', sortDir: 'desc', showPublicOnly: false },
  lastViewedPage: '/dashboard',
  contactDraft: { fullName: '', email: '', message: '' },
};

const uiSlice = createSlice({
  name: 'ui',
  initialState: defaultState,
  reducers: {
    setTheme(state, action) {
      state.theme = action.payload;
    },
    setSearchText(state, action) {
      state.resumeFilters.sortBy = action.payload;
    },
    setSortBy(state, action) {
      state.resumeFilters.sortBy = action.payload;
    },
    setSortDir(state, action) {
      state.resumeFilters.sortDir = action.payload;
    },
    setShowPublicOnly(state, action) {
      state.resumeFilters.showPublicOnly = action.payload;
    },
    setLastViewedPage(state, action) {
      state.lastViewedPage = action.payload;
    },
    setContactDraft(state, action) {
      state.contactDraft = { ...state.contactDraft, ...action.payload };
    },
    clearContactDraft(state) {
      state.contactDraft = { fullName: '', email: '', message: '' };
    },
  },
});

export const {
  setTheme,
  setSearchText,
  setSortBy,
  setSortDir,
  setShowPublicOnly,
  setLastViewedPage,
  setContactDraft,
  clearContactDraft,
} = uiSlice.actions;

export default uiSlice.reducer;
