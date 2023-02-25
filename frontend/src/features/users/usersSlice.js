import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";

const USERS_URL = "http://localhost:3003/api/users";

const usersAdapter = createEntityAdapter({
  sortComparer: (a, b) => a.name.localeCompare(b.name),
});

const initialState = usersAdapter.getInitialState({
  loading: false,
  error: null,
  success: false, //for purpose of creating new user
});

export const getAllUsers = createAsyncThunk("users/getAllUsers", async () => {
  const response = await axios.get(USERS_URL);
  return response.data;
});

export const createNewUser = createAsyncThunk(
  "users/createNewUser",
  async (data) => {
    const response = await axios.post(USERS_URL, { ...data });
    return response.data;
  }
);

export const updateUser = createAsyncThunk("users/updateUser", async (data) => {
  const { token, newUserData, id } = data;

  const config = {
    headers: {
      Authorization: `bearer ${token}`,
    },
  };

  const response = await axios.put(`${USERS_URL}/${id}`, newUserData, config);
  return response.data;
});

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        usersAdapter.upsertMany(state, action.payload);
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        usersAdapter.upsertOne(state, action.payload);
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createNewUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(createNewUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        usersAdapter.upsertOne(state, action.payload);
      })
      .addCase(createNewUser.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.error.message;
      });
  },
});

export const {
  selectAll: selectAllUser,
  selectIds: selectUserIds,
  selectById: selectUserById,
} = usersAdapter.getSelectors((state) => state.users);

export function selectUsersLoading(state) {
  return state.users.loading;
}

export function selectUsersError(state) {
  return state.users.error;
}

export function selectUserCreated(state) {
  return state.users.success;
}

export default usersSlice.reducer;
