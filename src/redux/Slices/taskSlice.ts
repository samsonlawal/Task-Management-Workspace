import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define proper types for your task state
type taskState = {
  task: Array<any> | null;
};

const initialState: taskState = {
  task: [],
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTasks: (state, action: PayloadAction<Array<any> | null>) => {
      state.task = action.payload;
    },
  },
});

export const { setTasks } = taskSlice.actions;
export default taskSlice.reducer;
