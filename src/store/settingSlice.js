import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  lang: 'en',
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setLang: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setLang  } = settingsSlice.actions;

export default settingsSlice.reducer;
