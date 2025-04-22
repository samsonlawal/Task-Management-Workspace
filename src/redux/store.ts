import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "@/redux/Slices/uiSlice";
import authReducer from "@/redux/Slices/authSlice";

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
