import { Dispatch, FC, SetStateAction, useState } from "react";

import { Button, Modal, Box, Typography, SxProps } from "@mui/material";
import { BookRating } from "./Rating";
import { Beenhere } from "@mui/icons-material";

const style: SxProps = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  height: 350,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface Props {
  isRating: boolean;
  setIsRating: Dispatch<SetStateAction<boolean>>;
  setIsCalified: Dispatch<SetStateAction<boolean>>;
}

export const RatingModal: FC<Props> = ({
  isRating,
  setIsRating,
  setIsCalified,
}) => {
  const handleClose = () => {
    setIsRating(false);
    setIsCalified(true);
  };

  return (
    <div>
      <Modal
        open={isRating}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="animate__animated animate__fadeIn"
      >
        <Box sx={style}>
          <Typography
            variant="h4"
            component="h2"
            sx={{
              fontWeight: "bold",
              display: "flex",
              justifyContent: "center",
            }}
          >
            ¿Cómo calificarías este libro?
          </Typography>
          <Box sx={{ mt: 5, height: 100 }}>
            <BookRating />
          </Box>
          <Button
            onClick={handleClose}
            startIcon={<Beenhere />}
            fullWidth
            sx={{
              backgroundColor: "primary.main",
              color: "white",
              mt: 8,
              ":hover": { backgroundColor: "primary.main", color: "white" },
            }}
          >
            Guarda y continua
          </Button>
        </Box>
      </Modal>
    </div>
  );
};
