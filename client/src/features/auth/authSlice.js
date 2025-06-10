import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';

// Safely get user from localStorage
let user = null;
try {
  const storedUser = localStorage.getItem('user');
  if (storedUser && storedUser !== 'undefined') {
    user = JSON.parse(storedUser);
  }
} catch (error) {
  user = null;
}

const initialState = {
  user: user,
  isError: false,
  isSuccess: false,
  isLoading: false,
  isLoggedOut: !user,
  message: ""
};

// Signup user
export const signup = createAsyncThunk('auth/signup', async (user, thunkAPI) => {
  try {
    return await authService.signup(user);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});

// Signin user
export const signin = createAsyncThunk('auth/signin', async (user, thunkAPI) => {
  try {
    return await authService.signin(user);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});

// Activate email
export const activateEmail = createAsyncThunk('auth/activate', async (token, thunkAPI) => {
  try {
    return await authService.activateEmail(token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});

// Get user info
export const getUserInfo = createAsyncThunk('auth/userInfo', async (_, thunkAPI) => {
  try {
    return await authService.getUserInfo();
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.user = null;
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
      state.isLoggedOut = true;
    },
    logout: (state) => {
      localStorage.removeItem('user');
      state.user = null;
      state.isLoggedOut = true;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
      })
      .addCase(signup.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(signin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload.user;
        state.isLoggedOut = false;
        state.message = action.payload.message;
      })
      .addCase(signin.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
        state.isLoggedOut = true;
      })
      .addCase(activateEmail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(activateEmail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
      })
      .addCase(activateEmail.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getUserInfo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(getUserInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  }
});

export const { reset, logout } = authSlice.actions;
export default authSlice.reducer;
