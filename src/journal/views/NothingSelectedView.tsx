import { StarOutline } from "@mui/icons-material";
import { Grid, Typography } from "@mui/material";

export const NothingSelectedView = () => {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{
        minHeight: "calc(100vh - 80px)",
        backgroundColor: "primary.main",
        padding: 4,
        borderRadius: 3,
      }}
    >
      <Grid item>
        <StarOutline sx={{ fontSize: 50, color: "white" }} />
      </Grid>
      <Grid item>
        <Typography variant="h6" color="white">
          Seleccione o crea una nota
        </Typography>
      </Grid>
    </Grid>
  );
};
