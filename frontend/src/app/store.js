import { configureStore } from "@reduxjs/toolkit";
import users from "../features/users/usersSlice";
import entries from "../features/entries/entriesSlice";
import login from "../features/login/loginSlice";

const store = configureStore({
  reducer: {
    users,
    entries,
    login,
  },
});

export default store;
