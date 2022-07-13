import { FC } from "react";

import { Box, Grid, Toolbar, Typography } from "@mui/material";

import { StepperJournal } from "../../components";
import { NavBar } from "../components";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

export const InitialPage: FC = () => {
  const { displayName, photoURL } = useSelector(
    (state: RootState) => state.auth
  );
  return (
    <Box sx={{ display: "flex" }}>
      <NavBar drawerWidth={0} />

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Grid
          container
          display="flex"
          justifyContent="center"
          direction="column"
          alignItems="center"
          spacing={0}
          sx={{ mb: 3 }}
        >
          <Grid item>
            <Box>
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
          </Grid>
          <Grid item>
            <Typography component="h3">Hola, {displayName}</Typography>
          </Grid>
          <Typography component="h3" sx={{ color: "#000" }}>
            Completa los siguientes pasos para confirmar tu cuenta
          </Typography>
        </Grid>
        <StepperJournal />
      </Box>
    </Box>
  );
};
