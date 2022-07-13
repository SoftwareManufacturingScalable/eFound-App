import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { FormData } from "../auth/pages";

import { AppDispatch } from "../store";
import { AuthState } from "../store/auth";
import { FirebaseAuth } from "./config";

export interface IUser extends AuthState {
  ok?: boolean;
  password?: string;
}
const googleProvider = new GoogleAuthProvider();

export const sigInWithGoogle = async (): Promise<IUser> => {
  try {
    const result = await signInWithPopup(FirebaseAuth, googleProvider);
    // const credentials = GoogleAuthProvider.credentialFromResult(result);
    const { displayName, email, photoURL, uid } = result.user;
    return {
      ok: true,
      displayName,
      email,
      photoURL,
      uid,
    };
  } catch (error: any) {
    console.log(error);
    const errorCode = error.code;
    const errorMessage = error.message;
    return {
      ok: false,
      errorMessage,
      uid: null,
      displayName: null,
      email: null,
      photoURL: null,
    };
  }
};

export const registerUserEmailPassword = async (
  name: string,
  email: string,
  password: string
): Promise<IUser> => {
  try {
    const res = await createUserWithEmailAndPassword(
      FirebaseAuth,
      email,
      password
    );
    const { uid, photoURL } = res.user;
    //actualizar el nombre de usuario
    await updateProfile(FirebaseAuth.currentUser!, { displayName: name });
    // console.log(res);
    return { ok: true, uid, photoURL, email, displayName: name };
  } catch (error: any) {
    console.log(error);
    return {
      ok: false,
      errorMessage: error.message,
      uid: null,
      displayName: null,
      email: null,
      photoURL: null,
    };
  }
};

export const signInWithEmailPassword = async (
  email: string,
  password: string
): Promise<IUser> => {
  try {
    const res = await signInWithEmailAndPassword(FirebaseAuth, email, password);
    const { displayName, uid, photoURL } = res.user;
    return {
      ok: true,
      displayName,
      uid,
      email,
      photoURL,
    };
  } catch (error: any) {
    console.log(error);
    return {
      ok: false,
      errorMessage: error.message,
      uid: null,
      displayName: null,
      email: null,
      photoURL: null,
    };
  }
};

export const logoutFirebase = async (): Promise<void> => {
  return await FirebaseAuth.signOut();
};
