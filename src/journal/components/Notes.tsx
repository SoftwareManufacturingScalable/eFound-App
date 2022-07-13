import { TurnedInNot } from "@mui/icons-material";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Grid,
  ListItemText,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { INote, setActiveNote } from "../../store/journal";

export const Notes = () => {
  const { notes } = useSelector((state: RootState) => state.journal);
  const dispatch = useDispatch();

  const startActiveNote = (note: INote) => {
    dispatch(setActiveNote(note));
  };

  return (
    <List className="animate__animated animate__fadeIn">
      {notes.map((note) => (
        <ListItem key={note.id} disablePadding>
          <ListItemButton onClick={() => startActiveNote(note)}>
            <ListItemIcon>
              <TurnedInNot />
            </ListItemIcon>
            <Grid container direction="column">
              <ListItemText primary={note.title.substring(0, 20) + "..."} />
              <ListItemText secondary={note.body.substring(0, 20) + "..."} />
            </Grid>
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};
