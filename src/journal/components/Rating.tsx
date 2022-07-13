import { useState } from "react";

import { Star } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { Rating } from "@mui/material";

const labels: { [index: string]: string } = {
  0.5: "Muy malo",
  1: "Decepcionante+",
  1.5: "Malo",
  2: "Estuvo bien+",
  2.5: "Bueno",
  3: "Puede mejorar+",
  3.5: "Muy bueno",
  4: "Cumplio mis expectativas+",
  4.5: "Excelente",
  5: "Excelente, por encima de mis espectativas+",
};

function getLabelText(value: number) {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
}

export const BookRating = () => {
  const [value, setValue] = useState<number | null>(0);
  const [hover, setHover] = useState<number>(-1);

  return (
    <Box
      sx={{
        width: 500,
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      {value !== null && (
        <Typography variant="h5" sx={{ ml: 2, mb: 4, fontWeight: "bold" }}>
          {labels[hover !== -1 ? hover : value]}
        </Typography>
      )}
      <Rating
        className="animate__animated animate__fadeIn"
        value={value}
        precision={0.5}
        sx={{ fontSize: "70px", ":hover": {} }}
        getLabelText={getLabelText}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
          console.log(newHover);
        }}
        emptyIcon={
          <Star
            sx={{
              opacity: 0.55,
              fontSize: "70px",
              marginRight: "5px",
            }}
            fontSize="inherit"
          />
        }
      />
    </Box>
  );
};
