import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UIState = {
  currentUI: "tasks" | "dashboard";
};

const initialState: UIState = {
  currentUI: "tasks",
};

const wsSlice = createSlice({
  name: "workspace",
  initialState,
  reducers: {
    setCurrentUI: (state, action: PayloadAction<"tasks" | "dashboard">) => {
      state.currentUI = action.payload;
    },
  },
});

export const { setCurrentUI } = wsSlice.actions;
export default wsSlice.reducer;
