import { useDispatch, useSelector } from "react-redux";

import { AddOutlined, MailOutlined } from "@mui/icons-material";
import { IconButton, Typography } from "@mui/material";

import { savingNewNote, startNewNote } from "../../store/journal";

import { JournalLayout } from "../layout/JournalLayout";
import { NoteView, NothingSelectedView } from "../views";
import { RootState } from "../../store";
import { useMemo } from "react";

export const HomePage = () => {
  const dispath = useDispatch() as any;

  // const { uid } = useSelector((state: RootState) => state.auth);
  const { isSaving, active } = useSelector((state: RootState) => state.journal);

  const isSavingNow = useMemo(() => isSaving === true, [isSaving]);

  const onNewNote = () => {
    dispath(startNewNote());
    dispath(savingNewNote());
  };
  return (
    <JournalLayout>
      {active ? <NoteView note={active} /> : <NothingSelectedView />}
      <IconButton
        disabled={isSavingNow}
        onClick={onNewNote}
        size="large"
        sx={{
          backgroundColor: "secondary.main",
          color: "primary.main",
          ":hover": {
            backgroundColor: "secondary.main",
            opacity: 0.9,
          },
          position: "fixed",
          right: 50,
          bottom: 50,
        }}
      >
        <AddOutlined sx={{ fontSize: 30 }} />
      </IconButton>
    </JournalLayout>
  );
};
