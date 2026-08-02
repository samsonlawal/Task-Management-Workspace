import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { saveToLocalStorage } from "@/utils/localStorage/AsyncStorage";

type currentWorkspaceIdState = {
  currentWorkspaceId: string | null;
  currentWorkspace: string | null;
};

// const initialState: currentWorkspaceIdState = {
//   currentWorkspaceId: null,
//   currentWorkspace: null,
// };

const getBootWorkspaceId = (): string | null => {
  if (typeof window !== "undefined") {
    const workspaceId = localStorage.getItem("workspaceId");
    if (workspaceId) {
      return workspaceId;
    }
  }
  return null;
}

const currentWorkspaceSlice = createSlice({
  name: "currentWorkspace",
  initialState: {
    currentWorkspaceId: getBootWorkspaceId(),
  },
  reducers: {
    setCurrentWorkspace: (state, action: PayloadAction<string | null>) => {
      state.currentWorkspaceId = action.payload;
    },
    clearCurrentWorskpace: (state) => {
      state.currentWorkspaceId = null;
    },
  },
});

export const { setCurrentWorkspace } = currentWorkspaceSlice.actions;
export default currentWorkspaceSlice.reducer;
