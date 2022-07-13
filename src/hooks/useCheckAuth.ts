import { useEffect } from "react";

import { onAuthStateChanged } from "firebase/auth";
import { FirebaseAuth } from "../firebase/config";

import { logout, login, verifyUser, addPhone } from "../store/auth";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { startLoadingNote } from "../store/journal/thunks";

export const useCheckAuth = () => {
  const dispath = useDispatch() as any;
  const { status } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    onAuthStateChanged(FirebaseAuth, (user) => {
      if (!user) return dispath(logout(null));
      const { uid, photoURL, email, displayName, phoneNumber } = user;
      if (phoneNumber) {
        dispath(verifyUser());
        dispath(addPhone(phoneNumber));
      }
      console.log("telefono actual de este usuario", phoneNumber);
      dispath(login({ uid, photoURL, email, displayName }));
      dispath(startLoadingNote());
    });
  }, []);

  return { status };
};
