import { useSelector } from "react-redux";

import { PhoneAuthProvider, RecaptchaVerifier } from "firebase/auth";
import { FirebaseAuth } from "../firebase/config";

import { RootState } from "../store";

export const startSendCode = async (
  phoneNumber: string
): Promise<{ verificationId: string; errorMessage: string }> => {
  // await updateProfile(FirebaseAuth.currentUser!, { });
  // 'recaptcha-container' is the ID of an element in the DOM.

  const capchat = document.getElementById("recaptcha-container");
  if (capchat) {
    capchat.remove();
  }
  let newCapchat = document.createElement("div");
  newCapchat.setAttribute("id", "recaptcha-container");
  // newCapchat.setAttribute("width", "300");
  // newCapchat.setAttribute("height", "100");
  document.getElementById("container")?.appendChild(newCapchat);

  const applicationVerifier = new RecaptchaVerifier(
    "recaptcha-container",
    {
      size: "invisible",
      callback: () => console.log("recaptchat resuelto"),
    },
    FirebaseAuth
  );
  //con este verify significa que automaticamoente  resolvemos el recapchat despues de 1 segundo sin necesidad de darle click
  const result = await applicationVerifier.verify();
  console.log(result);

  const provider = new PhoneAuthProvider(FirebaseAuth);
  try {
    const verificationId = await provider.verifyPhoneNumber(
      phoneNumber,
      applicationVerifier
    );
    console.log("verification id", verificationId);
    applicationVerifier.clear();
    return { verificationId: verificationId, errorMessage: "" };
  } catch (error: any) {
    console.log(error.message);
    return { verificationId: "", errorMessage: error.message };
  }
};
