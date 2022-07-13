import { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  LogoutOutlined,
  MenuOutlined,
  BookmarkAdded,
  Notifications,
} from "@mui/icons-material/";
import {
  AppBar,
  Badge,
  Grid,
  IconButton,
  Toolbar,
  Tooltip,
  Link,
  Typography,
  Popover,
  Box,
} from "@mui/material";

import { logout, startLogout } from "../../store/auth";
import { RootState } from "../../store";
import { Link as RouterLink } from "react-router-dom";
import { clearNoteLogout } from "../../store/journal";
import { Notification } from "./Notification";

export interface IDrawer {
  drawerWidth: number;
}
export const NavBar: FC<IDrawer> = ({ drawerWidth = 270 }) => {
  const dispath = useDispatch() as any;
  const [isOpenNotify, setIsOpenNotify] = useState<boolean>(false);
  const { notes } = useSelector((state: RootState) => state.journal);

  const onLogoutUser = (): boolean => {
    dispath(logout(null));
    dispath(clearNoteLogout());
    dispath(startLogout());
    return true;
  };

  const onStartNotify = () => {
    setIsOpenNotify(!isOpenNotify);
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100vw - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          edge="start"
          sx={{ display: { sm: "none" }, mr: 2 }}
        >
          <MenuOutlined />
        </IconButton>

        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ ml: 1 }}
        >
          <Grid
            item
            display="flex"
            className="animate__animated animate__bounce"
          >
            <Typography
              variant="h5"
              noWrap
              component="div"
              sx={{
                transform: `rotate(-30deg)`,
                fontWeight: "bold",
                fontSize: 25,
                backgorundColor: "red",
                position: "absolute",
                bottom: 3,
              }}
            >
              e
            </Typography>
            <Link component={RouterLink} color="#000" to="/">
              <Typography
                variant="h4"
                noWrap
                component="div"
                sx={{ fontWeight: "bold", color: "yellow", ml: 1.5 }}
              >
                Found
              </Typography>
            </Link>
          </Grid>

          <Grid item>
            <Tooltip title="Notificaciones" arrow>
              <IconButton
                onClick={onStartNotify}
                sx={{ color: "white", mr: 2 }}
              >
                <Badge badgeContent={notes.length} color="error">
                  <Notifications />
                </Badge>
              </IconButton>
            </Tooltip>
            {isOpenNotify && (
              <Grid
                item
                sx={{
                  position: "absolute",
                  top: 45,
                  right: 100,
                  width: "30vw",
                }}
              >
                <Notification />
              </Grid>
            )}

            <Tooltip title="Salir de la cuenta" arrow>
              <IconButton onClick={onLogoutUser} sx={{ color: "white" }}>
                <LogoutOutlined />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};
