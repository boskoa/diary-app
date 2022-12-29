import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";

const ENTRIES_URL = "http://localhost:3003/api/entries";

const entriesAdapter = createEntityAdapter({
  sortComparer: (a, b) => a.id - b.id,
});

const initialState = entriesAdapter.getInitialState({
  loading: false,
  error: null,
});

export const getAllEntries = createAsyncThunk(
  "entries/getAllEntries",
  async (token) => {
    const config = {
      headers: {
        Authorization: `bearer ${token}`,
      },
    };

    const response = await axios.get(ENTRIES_URL, config);
    return response.data;
  }
);

export const addNewEntry = createAsyncThunk(
  "entries/addNewEntry",
  async (data) => {
    const { token, entryData } = data;

    const config = {
      headers: {
        Authorization: `bearer ${token}`,
      },
    };

    const response = await axios.post(ENTRIES_URL, entryData, config);
    return response.data;
  }
);

export const updateEntry = createAsyncThunk(
  "entries/updateEntry",
  async (data) => {
    const { token, newData, id } = data;

    const config = {
      headers: {
        Authorization: `bearer ${token}`,
      },
    };

    const response = await axios.put(`${ENTRIES_URL}/${id}`, newData, config);
    return response.data;
  }
);

export const deleteEntry = createAsyncThunk(
  "entries/deleteEntry",
  async (data) => {
    const { token, id } = data;

    const config = {
      headers: {
        Authorization: `bearer ${token}`,
      },
    };

    const response = await axios.delete(`${ENTRIES_URL}/${id}`, config);
    return response.data;
  }
);

const entriesSlice = createSlice({
  name: "entries",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllEntries.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllEntries.fulfilled, (state, action) => {
        state.loading = false;
        entriesAdapter.upsertMany(state, action.payload);
      })
      .addCase(getAllEntries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addNewEntry.pending, (state) => {
        state.loading = true;
      })
      .addCase(addNewEntry.fulfilled, (state, action) => {
        state.loading = false;
        entriesAdapter.addOne(state, action.payload);
      })
      .addCase(addNewEntry.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateEntry.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateEntry.fulfilled, (state, action) => {
        state.loading = false;
        entriesAdapter.upsertOne(state, action.payload);
      })
      .addCase(updateEntry.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteEntry.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteEntry.fulfilled, (state, action) => {
        state.loading = false;
        entriesAdapter.removeOne(state, action.payload.id);
      })
      .addCase(deleteEntry.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {
  selectAll: selectAllEntries,
  selectById: selectEntryById,
  selectIds: selectEntryIds,
} = entriesAdapter.getSelectors((state) => state.entries);

export function selectEntriesLoading(state) {
  return state.entries.loading;
}

export function selectEntriesError(state) {
  return state.entries.error;
}

export default entriesSlice.reducer;
