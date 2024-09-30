import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  signupApi,
  sendOtpApi,
  verifyOtpApi,
  loginApi,
  getUserData,
  logoutApi,
} from "@/services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState = {
  firstName: "",
  lastName: "",
  phone: "",
  country: "",
  gender: "",
  dob: "",
  email: "",
  password: "",
  username: "",
  referral: "",
  reference: "",
  user: null,
  wallet: null,
  token: "",
  otp: "",
  isOTPSuccessful: false,
  isLoggedIn: false,
  isSignUpComplete: false,
  login: {
    email: "",
    password: "",
  },
  signUpStatus: "",
  signUpError: null,
  loginStatus: "",
  loginError: null,
  authenticated: false,
};

// Async Thunks

export const sendOTP = createAsyncThunk(
  "auth/sendOTP",
  async (email, { rejectWithValue }) => {
    try {
      const response = await sendOtpApi(email);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const verifyOTP = createAsyncThunk(
  "auth/verifyOTP",
  async ({ code, reference }, { rejectWithValue }) => {
    try {
      // Calling verifyOtpApi with correct parameters
      const response = await verifyOtpApi(code, reference);
      return response;
    } catch (error) {
      console.error("Error verifying OTP:", error);
      return rejectWithValue(
        error.response ? error.response.data : "Something went wrong"
      );
    }
  }
);

export const signUp = createAsyncThunk(
  "auth/signUp",
  async (userData, { rejectWithValue }) => {
    try {
      const signUpResponse = await signupApi({ ...userData });
      const token = signUpResponse.data.token;

      await AsyncStorage.setItem("token", token);

      // Fetch user details using the token
      const userDataResponse = await getUserData(token);

      console.log("Sign Up Response:", signUpResponse); // Log to check what the API returns
      console.log("User Data Response:", userDataResponse); // Log to check what user data is returned

      return { ...signUpResponse, userData: userDataResponse };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const loginResponse = await loginApi(credentials);
      const token = loginResponse.data.token;
      await AsyncStorage.setItem("token", token);

      //console.log(token);

      // Fetch user details using the token
      const userDataResponse = await getUserData(token);
      console.log("User Data Response:", userDataResponse); // Log to check what user data is returned

      return { ...loginResponse, userData: userDataResponse };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// export const logout = createAsyncThunk('auth/logout', async (token, { rejectWithValue }) => {
//     try {
//       const response = await logoutApi(token);
//       return response;
//     } catch (error) {
//       return rejectWithValue(error.message || 'Logout failed');
//     }
//   });

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      // Instead of calling logoutApi, directly clear the cache
      dispatch(clearCache());
      return "Logout successful"; // You can return a message if needed
    } catch (error) {
      return rejectWithValue(error.message || "Logout failed");
    }
  }
);

const signUpSlice = createSlice({
  name: "signUp",
  initialState,
  reducers: {
    setSignUpInfo: (state, action) => {
      return { ...state, ...action.payload };
    },
    resetSignUpInfo: () => initialState,
    setLoginInfo: (state, action) => {
      return { ...state, ...action.payload };
    },
    setReturningUser: (state, action) => {
      return { ...state, ...action.payload };
    },
    loginSuccess: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      state.authenticated = false;
      state.token = "";
    },
    clearCache: (state) => {
      return {
        ...initialState,
        loginStatus: "logged out", // Maintain the login status as logged out
        isLoggedIn: false,
        authenticated: false,
        user: null,
        token: "",
        otp: "",
        isOTPSuccessful: false,
        signUpStatus: "",
        signUpError: null,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendOTP.fulfilled, (state, action) => {
        state.reference = action.payload.reference; // Assuming the reference comes from the API response
      })
      .addCase(signUp.pending, (state) => {
        state.signUpStatus = "loading";
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.signUpStatus = "succeeded";
        state.reference = action.payload.data.reference;
        state.user = action.payload.data; // Store fetched user data
        state.token = action.payload.data.token; // Store token
        state.email = action.payload.userData.email;
        state.reference = action.payload.data.reference;
        state.token = action.payload.data.token;
        console.log("Stored Reference:", state.reference);
        console.log("Stored Token:", state.token);
        console.log("Stored User:", state.user);
        state.firstName = action.payload.data.firstName;
        state.lastName = action.payload.data.lastName;
        state.wallet = action.payload.data.wallet;
        console.log(state.wallet);
        // console.log('Stored Token:', state.fullToken);
        state.authenticated = false;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.signUpStatus = "failed";
        state.signUpError = action.payload;
      })
      .addCase(verifyOTP.pending, (state) => {
        state.signUpStatus = "verifying";
      })
      .addCase(verifyOTP.fulfilled, (state, action) => {
        state.isOTPSuccessful = true;
        state.signUpStatus = "verificationSuccess";
        state.isLoggedIn = false;
        state.authenticated = false;
      })
      .addCase(verifyOTP.rejected, (state, action) => {
        state.isOTPSuccessful = false;
        state.signUpStatus = "verificationFailed";
        state.signUpError = action.payload || "OTP verification failed";
      })
      .addCase(login.pending, (state) => {
        state.loginStatus = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loginStatus = "succeeded";
        state.isLoggedIn = true;
        state.authenticated = true;
        state.user = action.payload.userData; // Store fetched user data
        state.firstName = action.payload.data.firstName;
        state.lastName = action.payload.data.lastName;
        console.log(state.user);
        state.token = action.payload.data.token; // Store token
        state.wallet = action.payload.data.wallet;
        console.log(state.wallet);
      })
      .addCase(login.rejected, (state, action) => {
        state.loginStatus = "failed";
        state.loginError = action.payload;
      })
      .addCase(logout.pending, (state) => {
        state.loginStatus = "logging out";
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoggedIn = false;
        state.authenticated = false;
        state.user = null;
        state.token = "";
        state.loginStatus = "logged out";
        state.signUpStatus = "";
        state.signUpError = null;
        state.otp = "";
        state.isOTPSuccessful = false;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loginStatus = "logout failed";
        state.logoutError = action.payload;
      });
  },
});

export const {
  setSignUpInfo,
  resetSignUpInfo,
  setLoginInfo,
  setReturningUser,
  loginSuccess,
  clearCache,
} = signUpSlice.actions;
export default signUpSlice.reducer;
