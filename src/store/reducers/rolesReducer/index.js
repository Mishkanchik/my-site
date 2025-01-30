import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  roles: JSON.parse(localStorage.getItem("roles")) || [],
};

const rolesSlice = createSlice({
  name: "roles",
  initialState,
  reducers: {
    addRole: (state, action) => {
      if (!state.roles.includes(action.payload)) {
        state.roles.push(action.payload);
        localStorage.setItem("roles", JSON.stringify(state.roles));
      }
    },
    removeRole: (state, action) => {
      state.roles = state.roles.filter((role) => role !== action.payload);
      localStorage.setItem("roles", JSON.stringify(state.roles));
    },
  },
});

export const { addRole, removeRole } = rolesSlice.actions;
export default rolesSlice.reducer;
