import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { ChangeEvent } from "react";
import { FirebaseDB } from "../../firebase/config";
import { loadNotes } from "../../helpers";
import { AppDispatch, RootState } from "../store";
import { fileUpload } from "../../helpers/fileUpload";

import {
  addNewEmphtyNote,
  deleteNote,
  INote,
  setActiveNote,
  setImageToActiveNote,
  setNotes,
  setSaving,
  updatedNote,
} from "./jornalSlice";

export const startNewNote = () => {
  return async (dispath: AppDispatch, getState: () => RootState) => {
    console.log("starting new note");

    // el id de la nota no los crea firebase automatico
    const newNote: INote = {
      title: "",
      body: "",
      date: new Date().getTime(),
    };
    const { uid } = getState().auth;
    // aqui vamos a apuntar a la ruta que hicimos en nuestro cloudfirestore
    const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`));
    // const docRes = await setDoc(newDoc, newNote);
    const docRes = await setDoc(newDoc, newNote);
    //insertamos ahora el id automatico de la nota que retorno firebase
    newNote.id = newDoc.id;
    // console.log({ docRes, newDoc });
    dispath(addNewEmphtyNote(newNote));
    dispath(setActiveNote(newNote));
  };
};

export const startLoadingNote = () => {
  return async (dispath: AppDispatch, getState: () => RootState) => {
    const { uid } = getState().auth;
    if (!uid) throw new Error("el UID del usuario no esta establecido");
    const notes = await loadNotes(uid);

    dispath(setNotes(notes));
    return notes;
  };
};

export const startSavingNote = () => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    const { uid } = getState().auth;
    const { active: note } = getState().journal;
    dispatch(setSaving());
    const noteToFirestore = { ...note };
    delete noteToFirestore.id;
    // creamois l ruta con la referencia de la nota
    const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note?.id}`);
    //aqui actualizamos la nota
    //el merge en true es para que una los nuevos campos a introducir con los otros campos que ya estaban en el modelo de las nota en caso de que mandemos nuevos campos
    await setDoc(docRef, noteToFirestore, { merge: true });
    dispatch(updatedNote(note!));
  };
};

export const starUploadingFields = ({
  target,
}: ChangeEvent<HTMLInputElement>) => {
  return async (dispatch: AppDispatch) => {
    dispatch(setSaving());
    if (!target.files) throw new Error("Error al cargar el archivo");
    //vamos a cargar los archivos de manera simultanea en este caso
    const fileUploadPromises = [];
    for (const file of target.files) {
      fileUploadPromises.push(fileUpload(file));
    }
    const imagesUrls = await Promise.all(fileUploadPromises);
    dispatch(setImageToActiveNote(imagesUrls));
    // console.log(imagesUrls);
  };
};

export const starDeletingNote = () => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    const { uid } = getState().auth;
    const { active: note } = getState().journal;

    const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note?.id}`);
    const res = await deleteDoc(docRef);
    console.log(res);
    dispatch(deleteNote(note?.id));
  };
};
