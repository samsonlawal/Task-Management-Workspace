import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "@/redux/Slices/uiSlice";
import authReducer from "@/redux/Slices/authSlice";
import currentWorkspaceReducer from "@/redux/Slices/currentWorkspaceSlice";
import WorkspaceDataReducer from "@/redux/Slices/workspaceSlice";
import TasksReducer from "@/redux/Slices/taskSlice";
import MembersReducer from "@/redux/Slices/memberSlice";

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    auth: authReducer,
    currentWorkspace: currentWorkspaceReducer,
    WorkspaceData: WorkspaceDataReducer,
    TasksData: TasksReducer,
    MemberData: MembersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
