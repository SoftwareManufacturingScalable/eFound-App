import {
  PhoneAuthProvider,
  RecaptchaVerifier,
  updatePhoneNumber,
  updateProfile,
  User,
} from "firebase/auth";
import { FormData } from "../../auth/pages";
import { FirebaseAuth } from "../../firebase/config";
import {
  logoutFirebase,
  registerUserEmailPassword,
  sigInWithGoogle,
  signInWithEmailPassword,
} from "../../firebase/providers";
import { startSendCode } from "../../helpers";

import { AppDispatch, RootState } from "../store";
import {
  cachError,
  checkStatus,
  login,
  logout,
  sendErrorMessage,
} from "./authSlice";

//recuerda que los thunks en donde vamos a crear las funciones que sean asincronas este es un patron que necesitamnos hacer al usar redux-toolkit
export const checkingAuthentication = () => {
  return async (dispath: AppDispatch) => {
    dispath(checkStatus());
  };
};
export const startGoogleSignIn = () => {
  return async (dispath: AppDispatch) => {
    dispath(checkStatus());

    const result = await sigInWithGoogle();
    if (!result.ok) return dispath(logout(result.errorMessage!));
    //  const { email, displayName, photoURL, uid} = result;
    delete result.ok;
    return dispath(login(result));
  };
};

export const startRegisterUserEmailPassword = (
  name: string,
  email: string,
  password: string
) => {
  return async (dispath: AppDispatch) => {
    dispath(checkStatus());

    const { ok, uid, photoURL, errorMessage } = await registerUserEmailPassword(
      name,
      email,
      password
    );

    if (!ok) return dispath(logout(errorMessage!));
    return dispath(login({ uid, displayName: name, email, photoURL }));
  };
};

export const startLoginEmailPassword = (email: string, password: string) => {
  return async (dispath: AppDispatch) => {
    const { ok, uid, photoURL, displayName, errorMessage } =
      await signInWithEmailPassword(email, password);
    if (!ok) return dispath(logout(errorMessage!));
    // here upate verifified state to true
    // TODO: PRUEBA CON ESTA FUNCION ABAJO PARA ACTUALIZAR EL ESTADO DE VERIFIED A TRU VERIFIED= EMAILVERIFIED siendo true

    return dispath(login({ uid, displayName, email, photoURL }));
  };
};

export const startLogout = () => {
  return async (dispath: AppDispatch) => {
    await logoutFirebase();
  };
};

export const startUpdatePhoneNumber = () => {
  return async (
    dispatch: AppDispatch,
    getState: () => RootState
  ): Promise<{ payload: boolean; type: string } | null> => {
    // Obtain the verificationCode from the user.
    const { verificationCode, phoneNumber } = getState().auth;

    const { verificationId, errorMessage } = await startSendCode(phoneNumber!);
    if (errorMessage.length > 0) {
      dispatch(sendErrorMessage(errorMessage));
    }

    if (!verificationCode || !verificationId) return null;
    //aqui comparamos el codigo que nos genero el phoneAuthProvider y lo comparamnos con el codigo de verificacion que le llega al user
    const phoneCredential = PhoneAuthProvider.credential(
      verificationId,
      verificationCode
    );
    console.log("credentials phone", phoneCredential);
    try {
      const data = await updatePhoneNumber(
        FirebaseAuth.currentUser!,
        phoneCredential
      );
      console.log("nuevos datos del usuario final", data);
      return dispatch(cachError(false));
    } catch (error: any) {
      console.log(error.message);
      dispatch(sendErrorMessage(error.message));
      return dispatch(cachError(true));
    }
  };
};
