import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    // uid,
    // email,
    // photoURL,
    // estimates,
  },
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: state => {
      state.user = null;
    },
    updateEstimates: (state, action) => {
      state.user.estimates = action.payload
    }
  },
});

export const userActions = userSlice.actions;

export const selectUser = state => state.user.user;


export default userSlice.reducer;
