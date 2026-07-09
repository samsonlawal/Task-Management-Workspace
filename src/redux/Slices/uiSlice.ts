import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UIState = {
  currentUI:     "tasks" | "dashboard" | "team" | "settings" | "notifications" | "chat" | "integrations" | ""
  isSidebarOpen: boolean;
};

const initialState: UIState = {
  currentUI: "tasks",
  isSidebarOpen: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setCurrentUI: (
      state,
      action: PayloadAction<    "tasks" | "dashboard" | "team" | "settings" | "notifications" | "chat" | "integrations" | "">,
    ) => {
      state.currentUI = action.payload;
    },
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    setSidebar: (state, action: PayloadAction<boolean>) => {
      state.isSidebarOpen = action.payload;
    },
  },
});

export const { setCurrentUI, toggleSidebar, setSidebar } = uiSlice.actions;
export default uiSlice.reducer;
