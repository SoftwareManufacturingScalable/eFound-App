import { FC, useState } from "react";
import { useSelector } from "react-redux";

import {
  Box,
  Divider,
  Drawer,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { IDrawer } from "./NavBar";
import {
  AccountCircleOutlined,
  ImportContacts,
  SpeakerNotes,
  TurnedInNot,
} from "@mui/icons-material";
import { RootState } from "../../store";
import { Notes } from "./Notes";
import { useNavigate, useRoutes } from "react-router-dom";

export const SideBar = ({ drawerWidth = 270 }: IDrawer) => {
  const [viewNote, setViewNote] = useState(false);
  const { displayName, photoURL } = useSelector(
    (state: RootState) => state.auth
  );

  const navigate = useNavigate();

  const navigateTo = () => {
    return navigate("/books");
  };

  return (
    <Box
      component="nav"
      sx={{
        width: { sm: drawerWidth },
        flexShrink: { sm: 0 },
        display: { xs: "block" },
      }}
    >
      <Drawer
        variant="persistent"
        open
        sx={{
          display: { xs: "block" },
          "& .MuiDrawer paper": { boxSizing: "border-box", width: drawerWidth },
          backgroundColor: "primary.main",
        }}
        // onClose={} //we can see how many properties it has
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
            alignItems: "center",
            width: drawerWidth,
          }}
        >
          <Typography variant="h6" noWrap component="div">
            {displayName}
          </Typography>
          <Box sx={{ ml: 1 }}>
            <img
              src={
                photoURL
                  ? photoURL
                  : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
              }
              alt="profile"
              referrerPolicy="no-referrer"
              style={{ width: "40px", height: "40px", borderRadius: "100%" }}
            />
          </Box>
        </Toolbar>
        <Divider />

        <Tooltip title="Ver libros" arrow>
          <ListItem button onClick={navigateTo}>
            <ListItemIcon>
              <ImportContacts />
            </ListItemIcon>
            <ListItemText primary={"Books"} />
          </ListItem>
        </Tooltip>

        <Tooltip title="Ver notas" arrow>
          <ListItem button onClick={() => setViewNote(!viewNote)}>
            <ListItemIcon>
              <SpeakerNotes />
            </ListItemIcon>
            <ListItemText primary={"Notes"} />
          </ListItem>
        </Tooltip>
        {viewNote ? <Notes /> : null}
      </Drawer>
    </Box>
  );
};
