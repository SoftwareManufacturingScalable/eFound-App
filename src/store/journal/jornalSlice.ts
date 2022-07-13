import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import "sweetalert2/dist/sweetalert2.css";

export type INote = {
  id?: string;
  title: string;
  body: string;
  imageUrls?: string[];
  date?: number;
};
export interface JournalState {
  isSaving: boolean;
  messageSaved: string;
  notes: INote[];
  active: INote | null;
}

const initialState: JournalState = {
  isSaving: false,
  messageSaved: "",
  notes: [],
  active: null,
};

export const journalSlice = createSlice({
  name: "journal",
  initialState,
  reducers: {
    savingNewNote: (state: JournalState) => {
      state.isSaving = true;
    },
    addNewEmphtyNote: (state: JournalState, action: PayloadAction<INote>) => {
      state.notes.push(action.payload);
      state.isSaving = false;
    },
    setActiveNote: (
      state: JournalState,
      action: PayloadAction<INote | null>
    ) => {
      state.active = action.payload;
      state.messageSaved = "";
    },
    setNotes: (state: JournalState, action: PayloadAction<INote[]>) => {
      state.notes = action.payload;
    },
    setSaving: (state: JournalState) => {
      state.isSaving = true;
      state.messageSaved = "";
    },
    updatedNote: (state: JournalState, action: PayloadAction<INote>) => {
      state.isSaving = false;
      state.notes = state.notes.map((note) => {
        if (note.id !== action.payload.id) return note;
        note = action.payload;
        return note;
      });
      state.messageSaved = `${action.payload.title} actualizado correctamente`;
    },
    setImageToActiveNote: (
      state: JournalState,
      action: PayloadAction<string[]>
    ) => {
      //Nota: cuando hagas un spread operator con un valor opcional o undefined te va  marcar error 'must have [simbo..iterator]' solo agregas la condicion como abajo lo hice ó  [...(state.active.imageUrls !== undefined ? state.active.imageUrls : [])]
      state.active!.imageUrls = [
        ...(state.active!.imageUrls || []),
        ...action.payload,
      ];
      state.isSaving = false;
    },
    clearNoteLogout: (state: JournalState) => {
      state.isSaving = false;
      state.active = null;
      state.notes = [];
      state.messageSaved = "";
    },
    deleteNote: (
      state: JournalState,
      action: PayloadAction<string | undefined>
    ) => {
      state.notes = state.notes.filter((note) => note.id !== action.payload);
      state.active = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addNewEmphtyNote,
  updatedNote,
  setActiveNote,
  setSaving,
  deleteNote,
  savingNewNote,
  setNotes,
  setImageToActiveNote,
  clearNoteLogout,
} = journalSlice.actions;

// export default journalSlice.reducer;
