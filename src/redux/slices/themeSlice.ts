import { createSlice } from "@reduxjs/toolkit";

type ThemeState = {
  theme: "light" | "dark" | null;
};

const initialState: ThemeState = {
  theme: null,
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme(state, action: { payload: "light" | "dark" }) {
      state.theme = action.payload;
    },
    toggleTheme(state) {
      state.theme = state.theme === "light" ? "dark" : "light";
    },
  },
});

export const { setTheme, toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
