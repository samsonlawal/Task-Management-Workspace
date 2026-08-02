import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { saveToLocalStorage } from "@/utils/localStorage/AsyncStorage";

// Define proper types for your workspace state
type WorkspaceState = {
  workspace: Record<string, any> | null;
  members: Array<any> | null;
  name: string;
};

// const initialState: WorkspaceState = {
//   workspace: null,
//   members: null,
//   name: "",
// };

const getBootWorkspaceData = () => {
  if (typeof window === "undefined") return null;
  try {
    const item = localStorage.getItem("WorkspaceData");
    return item ? JSON.parse(item) : null;
  } catch {
    return null;
  }
};



const workspaceSlice = createSlice({
  name: "workspace",
  initialState: {
    workspace: getBootWorkspaceData(),
    // members: null,
    // name: "",
  },
  reducers: {
    setWorkspace: (
      state,
      action: PayloadAction<Record<string, any> | null>,
    ) => {
      state.workspace = action.payload;
    },
  },
});

export const { setWorkspace } = workspaceSlice.actions;
export default workspaceSlice.reducer;
