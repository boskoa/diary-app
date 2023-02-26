import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";

const ENTRIES_URL = "http://localhost:3003/api/entries";

const entriesAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.id - a.id,
});

const initialState = entriesAdapter.getInitialState({
  loading: false,
  error: null,
  filter: [],
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
  reducers: {
    emptyEntries: () => initialState,
    changeFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
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
      .addCase(addNewEntry.fulfilled, (state, action) => {
        entriesAdapter.addOne(state, action.payload);
      })
      .addCase(addNewEntry.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(updateEntry.fulfilled, (state, action) => {
        entriesAdapter.upsertOne(state, action.payload);
      })
      .addCase(updateEntry.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(deleteEntry.fulfilled, (state, action) => {
        entriesAdapter.removeOne(state, action.payload.id);
      })
      .addCase(deleteEntry.rejected, (state, action) => {
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

export const selectFilteredEntries = createSelector(
  [selectAllEntries, (state) => state.entries.filter],
  (entries, filter) => {
    if (!filter.length) {
      return entries;
    } else {
      return entries.filter((e) => {
        if (filter[1] === "none") {
          return new Date(e.createdAt).getFullYear() === filter[0];
        } else {
          return (
            new Date(e.createdAt).getFullYear() === filter[0] &&
            new Date(e.createdAt).getMonth() === filter[1]
          );
        }
      });
    }
  }
);

export const { emptyEntries, changeFilter } = entriesSlice.actions;

export default entriesSlice.reducer;
