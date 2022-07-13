import { FC } from "react";

import {
  ImageList,
  ImageListItem,
  ImageListItemBar,
  IconButton,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const srcset = (
  image: string,
  width: number,
  height: number,
  rows = 1,
  cols = 1
) => {
  return {
    src: `${image}?w=${width * cols}&h=${height * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${width * cols}&h=${
      height * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
};
interface Props {
  images?: string[];
}
export const ImageGallery: FC<Props> = ({ images }) => {
  if (!images) return <></>;
  return (
    <ImageList
      sx={{
        width: "100%",
        height: 450,
        // Promote the list into its own layer in Chrome. This costs memory, but helps keeping high FPS.
        transform: "translateZ(0)",
      }}
      rowHeight={200}
      gap={1}
    >
      {images.map((item) => {
        const cols = 1;
        const rows = 2;
        if (!item || item.length === 0) return;
        return (
          <ImageListItem key={item} cols={cols} rows={rows}>
            <img
              {...srcset(item, 250, 230, rows, cols)}
              alt="image title"
              loading="lazy"
            />
            <ImageListItemBar
              sx={{
                background:
                  "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, " +
                  "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
              }}
              title="image note"
              position="top"
              actionIcon={
                <IconButton sx={{ color: "white" }} aria-label={`star ${item}`}>
                  <FavoriteBorderIcon />
                </IconButton>
              }
              actionPosition="left"
            />
          </ImageListItem>
        );
      })}
    </ImageList>
  );
};
