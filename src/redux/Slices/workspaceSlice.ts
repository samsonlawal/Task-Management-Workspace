import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { saveToLocalStorage } from "@/utils/localStorage/AsyncStorage";

// Define proper types for your workspace state
type WorkspaceState = {
  workspace: Record<string, any> | null;
  members: Array<any> | null;
};

const initialState: WorkspaceState = {
  workspace: null,
  members: null,
};

const workspaceSlice = createSlice({
  name: "workspace",
  initialState,
  reducers: {
    setWorkspace: (
      state,
      action: PayloadAction<Record<string, any> | null>,
    ) => {
      state.workspace = action.payload;
      saveToLocalStorage({
        key: "WorkspaceData",
        value: action.payload,
      });
    },
    // setMembers: (state, action: PayloadAction<Array<any> | null>) => {
    //   state.members = action.payload; // This was incorrect in your original code
    //   saveToLocalStorage({
    //     key: "WorkspaceMembers", // Change key to be more specific
    //     value: action.payload,
    //   });
    // },
    // clearWorkspace: (state) => {
    //   state.workspace = null;
    //   state.members = null;
    //   // You might want to clear from localStorage too
    // },
  },
});

export const { setWorkspace } = workspaceSlice.actions;
export default workspaceSlice.reducer;
