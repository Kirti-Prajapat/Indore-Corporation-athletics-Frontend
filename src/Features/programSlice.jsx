import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  programs: [],
};

const programSlice = createSlice({
  name: "program",
  initialState,
  reducers: {
    setPrograms: (state, action) => {
      state.programs = action.payload;
    },
  },
});

export const { setPrograms } = programSlice.actions;
export default programSlice.reducer;
