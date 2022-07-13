import { FC } from "react";

import { Box, Grid, Toolbar } from "@mui/material";
import { NavBar, SideBar } from "../components/";

interface Props {
  children?: JSX.Element | JSX.Element[];
  title?: string;
}
export const JournalLayout: FC<Props> = ({ children, title }) => {
  const drawerWidth = 270;
  return (
    <Box
      sx={{ display: "flex" }}
      className="animate__animated animate__fadeIn animate__faster"
    >
      <NavBar drawerWidth={drawerWidth} />

      <SideBar drawerWidth={drawerWidth} />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />

        {children}
      </Box>
    </Box>
  );
};
