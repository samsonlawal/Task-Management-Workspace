import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { saveToLocalStorage } from "@/utils/localStorage/AsyncStorage";

type currentWorkspaceIdState = {
  currentWorkspaceId: string | null;
  currentWorkspace: string | null;
};

const initialState: currentWorkspaceIdState = {
  currentWorkspaceId: null,
  currentWorkspace: null,
};

const currentWorkspaceSlice = createSlice({
  name: "currentWorkspace",
  initialState,
  reducers: {
    setCurrentWorkspace: (state, action: PayloadAction<string | null>) => {
      state.currentWorkspaceId = action.payload;
      state.currentWorkspace = action.payload;
      saveToLocalStorage({ key: "CurrentWorkspaceId", value: action.payload });
    },
    clearCurrentWorskpace: (state) => {
      state.currentWorkspaceId = null;
      state.currentWorkspace = null;
    },
  },
});

export const { setCurrentWorkspace } = currentWorkspaceSlice.actions;
export default currentWorkspaceSlice.reducer;
