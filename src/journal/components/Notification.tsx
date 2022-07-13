import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  Divider,
} from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

export const Notification = () => {
  const { displayName } = useSelector((state: RootState) => state.auth);
  const { notes, active } = useSelector((state: RootState) => state.journal);
  return (
    <List
      sx={{
        width: "100%",
        maxWidth: 500,
        bgcolor: "background.paper",
        overflow: "scroll",
      }}
      className="animate__animated animate__fadeIn"
    >
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar
            alt="eFound Team"
            src="/static/images/avatar/1.jpg"
            style={{ backgroundColor: "#000" }}
          />
        </ListItemAvatar>
        <ListItemText
          primary="eFound Team"
          secondary={
            <>
              {notes.length === 0 ? (
                <>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {`Hola ${displayName}`}
                  </Typography>
                  <Typography>No tienes notificaciones todavia.</Typography>
                </>
              ) : (
                <>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {`Hola ${displayName}`}
                  </Typography>
                  <Typography>
                    {`Tienes ${notes.length} ${
                      notes.length > 1 ? " notas" : " nota"
                    } en tu lista`}
                  </Typography>
                </>
              )}
            </>
          }
        />
      </ListItem>
    </List>
  );
};
