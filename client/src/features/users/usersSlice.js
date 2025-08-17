import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchUsersAPI,
  createUserAPI,
  editUserAPI,
  deleteUserAPI,
} from "../../services/userService";

export const fetchUsers = createAsyncThunk(
  "users/fetch",
  async ({ page = 1, limit = 6 }, { getState, rejectWithValue }) => {
    const { users } = getState();
    if (users.pages[page]) {
      return { cached: true, page };
    }

    try {
      const response = await fetchUsersAPI(page, limit);
      return { ...response, page };
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch users");
    }
  }
);

export const createUser = createAsyncThunk("users/create", createUserAPI);
export const editUser = createAsyncThunk("users/edit", editUserAPI);
export const deleteUser = createAsyncThunk("users/delete", deleteUserAPI);

const usersSlice = createSlice({
  name: "users",
  initialState: {
    pages: {},
    currentPage: 1,
    totalPages: 0,
    totalCount: 0,
    loading: false,
    error: null,
  },
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        const { cached, page, data, total_pages, total } = action.payload;

        if (!cached) {
          state.pages[page] = data;
          state.totalPages = total_pages;
          state.totalCount = total;
        }

        state.currentPage = page;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(createUser.fulfilled, (state, action) => {
        const newUser = action.payload;
        const page = state.currentPage;
        if (state.pages[page]) {
          state.pages[page] = [newUser, ...state.pages[page]];
        }
        state.totalCount += 1;
      })

      .addCase(editUser.fulfilled, (state, action) => {
        const updated = action.payload;
        Object.keys(state.pages).forEach((page) => {
          const index = state.pages[page].findIndex((u) => u.id === updated.id);
          if (index !== -1) {
            state.pages[page][index] = {
              ...state.pages[page][index],
              ...updated,
            };
          }
        });
      })

      .addCase(deleteUser.fulfilled, (state, action) => {
        const deletedId = action.payload.id;
        Object.keys(state.pages).forEach((page) => {
          state.pages[page] = state.pages[page].filter(
            (u) => u.id !== deletedId
          );
        });
        state.totalCount -= 1;
      });
  },
});

export const { setCurrentPage } = usersSlice.actions;
export default usersSlice.reducer;
