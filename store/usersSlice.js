import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await axios.get('/api/users');
  return response.data.users;
});

export const addUser = createAsyncThunk('users/addUser', async (name) => {
  const response = await axios.post('/api/users', { user: name });
  return response.data;
});

export const editUser = createAsyncThunk('users/editUser', async ({ id, name }) => {
  const response = await axios.post(`/api/users/${id}`, { user: name });
  return response.data;
});

export const deleteUser = createAsyncThunk('users/deleteUser', async (id) => {
  await axios.delete(`/api/users/${id}`);
  return id;
});

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(editUser.fulfilled, (state, action) => {
        const { id, name } = action.payload;
        const existingUser = state.items.find((user) => user.id === parseInt(id));
        if (existingUser) {
          existingUser.name = name;
        }
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        const id = action.payload;
        state.items = state.items.filter((user) => user.id !== id);
      });
  },
});

export default usersSlice.reducer;
