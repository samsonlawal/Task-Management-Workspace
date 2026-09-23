import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// type User = {
//   id: string;
//   email: string;
//   username: string;
//   fullname: string;
//   profileImage: string;
// };

type AuthState = {
accessToken: string;
user: any;
sessionId: string
}

const getInitialState = (): AuthState => { 
  if (typeof window !== "undefined") { 
    const stored = localStorage.getItem("STACKTASK_PERSISTOR"); 
    if (stored) { 
      try { 
        return JSON.parse(stored); 
      } catch (e) {} 
    } 
  } 
  return { 
    accessToken: "", 
    user: undefined, 
    sessionId: "", 
  }; 
}; 

export const authSlice = createSlice({
  name: "auth",
  initialState: getInitialState(),
  reducers: {
    setAuthState: (state, action: PayloadAction<any>) => {
      return { ...state, ...action.payload };
    },
    clearAuthState: () => (
      { 
      accessToken: "", 
      user: undefined, 
      sessionId: "", 
    }
    ),
  },
});

export const { setAuthState, clearAuthState } = authSlice.actions;
export default authSlice.reducer;
