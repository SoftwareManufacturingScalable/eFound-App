import { collection, getDocs } from "firebase/firestore/lite";
import { FirebaseDB } from "../firebase/config";
import { INote } from "../store/journal";

export const loadNotes = async (uid = "") => {
  if (!uid) throw new Error("el UID del usuario no existe");
  const collectionReference = collection(FirebaseDB, `${uid}/journal/notes`);
  const docs = await getDocs(collectionReference);

  const notes: INote[] = [];
  docs.forEach((doc) => {
    const { id } = doc;
    // console.log({ id, ...doc.data() });
    notes.push({ id, ...doc.data() } as INote);
  });

  return notes;
};
