import { ChangeEvent, FC, useEffect, useMemo, useRef, useState } from "react";

import { ImageGallery } from "../components";

import {
  AutoDelete,
  CloudUpload,
  Save,
  SaveOutlined,
  UploadOutlined,
} from "@mui/icons-material";
import {
  Button,
  Grid,
  IconButton,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  INote,
  setActiveNote,
  starDeletingNote,
  startSavingNote,
  starUploadingFields,
  updatedNote,
} from "../../store/journal";
import { useForm } from "../../hooks";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import Swal from "sweetalert2";

interface Props {
  note: INote;
}
export const NoteView: FC<Props> = ({ note }) => {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [isSaving, setIsSaving] = useState<boolean>();
  const { title, body, date, imageUrls, formState, onInputChange } =
    useForm(note);

  const { messageSaved } = useSelector((state: RootState) => state.journal);
  const dispatch = useDispatch() as any;
  //este useEffect va a estar pendiente cada vez que cambiemos algo en el formulario y dispartta el nuevo active note para actualizar
  useEffect(() => {
    dispatch(setActiveNote(formState));
  }, [formState]);

  useEffect(() => {
    if (messageSaved.length > 0) {
      Swal.fire("Nota actualizada", messageSaved, "success");
    }
  }, [messageSaved]);

  const onSaveNote = () => {
    dispatch(startSavingNote());
  };
  const dateString = useMemo(() => {
    const newDate = new Date(date);
    return newDate.toUTCString();
  }, [date]);
  console.log("title de active note", title);

  const onFilesChange = (file: ChangeEvent<HTMLInputElement>) => {
    if (!file.target.files || file.target.files.length === 0) {
      return;
    }
    dispatch(starUploadingFields(file));
  };

  const onDeleteNote = () => {
    dispatch(starDeletingNote());
  };

  return (
    <Grid
      container
      justifyContent="space-between"
      direction="row"
      sx={{ mb: 1, alignItems: "center" }}
    >
      <Grid item>
        <Typography fontSize={39} fontWeight="light">
          {dateString.substring(0, 26)}
        </Typography>
      </Grid>
      <Grid item>
        <Tooltip title="Eliminar nota" arrow>
          <Button onClick={onDeleteNote}>
            <AutoDelete sx={{ fontSize: 30 }} />
          </Button>
        </Tooltip>
      </Grid>
      <Grid item>
        <input
          ref={inputFileRef}
          type="file"
          multiple
          accept="image/png, image/gif, image/jpeg, image/jpg"
          style={{ display: "none" }}
          onChange={(e) => onFilesChange(e)}
        />
        <Tooltip title="Cargar imagen" arrow>
          <IconButton
            onClick={() => inputFileRef.current?.click()}
            color="primary"
            disabled={isSaving}
          >
            <CloudUpload sx={{ fontSize: 30 }} />
          </IconButton>
        </Tooltip>
      </Grid>
      <Grid item>
        <Tooltip title="Guardar nota" arrow>
          <Button onClick={onSaveNote}>
            <Save sx={{ fontSize: 30 }} />
          </Button>
        </Tooltip>
      </Grid>

      <Grid container>
        <TextField
          type="text"
          variant="filled"
          fullWidth
          label="Title"
          placeholder="Title"
          sx={{ border: "none", mb: 1 }}
          name="title"
          value={title}
          onChange={onInputChange}
        />
        <TextField
          type="text"
          variant="filled"
          fullWidth
          multiline
          label="Description"
          placeholder="What's happening today?"
          minRows={5}
          name="body"
          value={body}
          onChange={onInputChange}
        />

        <ImageGallery images={note.imageUrls} />
      </Grid>
    </Grid>
  );
};
