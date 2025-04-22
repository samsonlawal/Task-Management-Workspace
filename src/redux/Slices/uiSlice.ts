import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UIState = {
  currentUI: "tasks" | "dashboard";
};

const initialState: UIState = {
  currentUI: "tasks",
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setCurrentUI: (state, action: PayloadAction<"tasks" | "dashboard">) => {
      state.currentUI = action.payload;
    },
  },
});

export const { setCurrentUI } = uiSlice.actions;
export default uiSlice.reducer;
