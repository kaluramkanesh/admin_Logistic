

import { createSlice } from "@reduxjs/toolkit";

const apiUsersSlice = createSlice({
  name: "apiUsers",
  initialState: {
    users: [
      { id: 1, email: "user1@example.com", status: "ACTIVE" },
      { id: 2, email: "user2@example.com", status: "INACTIVE" },
    ],
    openDialog: false,
  },
  reducers: {
    toggleDialog: (state) => {
      state.openDialog = !state.openDialog;
    },

    toggleStatus: (state, action) => {
      const user = state.users.find((u) => u.id === action.payload);
      if (user) {
        user.status = user.status === "ACTIVE" ? "INACTIVE" : "ACTIVE";
      }
    },

    addUser: (state, action) => {
      const newUser = {
        id: state.users.length + 1,
        ...action.payload,
      };
      state.users.push(newUser);
    },

    updateUser: (state, action) => {
      const { id, email, status } = action.payload;
      const user = state.users.find((u) => u.id === id);
      if (user) {
        user.email = email;
        user.status = status;
      }
    },

    deleteUser: (state, action) => {
      state.users = state.users.filter((u) => u.id !== action.payload);
    },
  },
});

export const {
  toggleDialog,
  toggleStatus,
  addUser,
  updateUser,
  deleteUser,
} = apiUsersSlice.actions;

export default apiUsersSlice.reducer;
