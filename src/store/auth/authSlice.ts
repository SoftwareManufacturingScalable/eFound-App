import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  status?: "checking" | "no-authenticated" | "authenticated";
  verified?: boolean;
  uid: string | null;
  email: string | null;
  displayName: string | null;
  photoURL?: string | null;
  phoneNumber?: string | null;
  verificationCode?: string | null;
  errorMessage?: string | null;
  hasError?: boolean | "not-error";
}

const initialState: AuthState = {
  status: "checking",
  verified: true,
  uid: null,
  email: null,
  displayName: null,
  photoURL: null,
  phoneNumber: null,
  verificationCode: null,
  errorMessage: null,
  hasError: "not-error",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<AuthState>) => {
      (state.status = "authenticated"),
        (state.uid = action.payload.uid),
        (state.email = action.payload.email),
        (state.displayName = action.payload.displayName),
        (state.photoURL = action.payload.photoURL),
        (state.errorMessage = null);
    },
    logout: (state, action: PayloadAction<string | null>) => {
      (state.status = "no-authenticated"),
        (state.verified = false),
        (state.uid = null),
        (state.email = null),
        (state.displayName = null),
        (state.photoURL = null),
        (state.phoneNumber = null),
        (state.verificationCode = null),
        (state.errorMessage = action.payload),
        (state.hasError = "not-error");
    },
    checkStatus: (state) => {
      state.status = "checking";
    },
    addPhone: (state: AuthState, action: PayloadAction<string>) => {
      state.phoneNumber = action.payload;
    },
    addVerificationCode: (state: AuthState, action: PayloadAction<string>) => {
      state.verificationCode = action.payload;
    },
    verifyUser: (state) => {
      state.verified = true;
    },
    sendErrorMessage: (state: AuthState, action: PayloadAction<string>) => {
      state.errorMessage = action.payload;
    },
    cachError: (state: AuthState, action: PayloadAction<boolean>) => {
      state.hasError = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  login,
  logout,
  checkStatus,
  verifyUser,
  addPhone,
  addVerificationCode,
  sendErrorMessage,
  cachError,
} = authSlice.actions;

// export default authSlice.reducer;
