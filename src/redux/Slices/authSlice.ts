import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  accessToken: "",
  //   refreshToken: "",
  //   expiresIn: undefined,
  user: undefined,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: INITIAL_STATE,
  reducers: {
    setAuthState: (state, action: PayloadAction<any>) => {
      return { ...state, ...action.payload };
    },
    clearAuthState: () => INITIAL_STATE,
  },
});

export const { setAuthState, clearAuthState } = authSlice.actions;
export default authSlice.reducer;
