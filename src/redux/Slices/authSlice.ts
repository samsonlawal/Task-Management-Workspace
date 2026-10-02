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
    const storedUser = localStorage.getItem("STACKTASK_USER"); 
    if (storedUser) { 
      try { 
         return {
          accessToken: "",
          user: JSON.parse(storedUser), 
          sessionId: "",
        };
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
