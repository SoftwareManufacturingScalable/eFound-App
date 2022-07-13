import { FC, useState } from "react";

import {
  IconButtonProps,
  IconButton,
  Card,
  CardHeader,
  Avatar,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Collapse,
  Box,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from "@mui/material";
import { red } from "@mui/material/colors";
import { CloudDownload, MoreVert, Star } from "@mui/icons-material";

import { BookRating } from "./Rating";
import { RatingModal } from "./RatingModal";
import { IBook } from "../../data";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}
interface Props {
  article: IBook;
}
export const BookCard: FC<Props> = ({ article }) => {
  const [expanded, setExpanded] = useState(false);
  const [isRating, setIsRating] = useState<boolean>(false);
  const [isCalified, setIsCalified] = useState<boolean>(false);

  const startDownloadFile = () => {
    let file_path = `/articles/${article.name_path}`;
    let a = document.createElement("a");
    a.href = file_path;
    a.download = file_path.substring(file_path.lastIndexOf("/") + 1);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };
  return (
    <Card
      sx={{ maxWidth: 345, mt: 1 }}
      className="animate__animated animate__fadeIn"
    >
      <RatingModal
        isRating={isRating}
        setIsRating={setIsRating}
        setIsCalified={setIsCalified}
      />
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVert />
          </IconButton>
        }
        title={article.title}
        subheader={article.date}
      />
      <CardMedia
        component="img"
        height="350"
        sx={{ zoom: "140%" }}
        image={article.imageUrl}
        alt={article.title}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {article.description.substring(0, 250) + "..."}
        </Typography>
      </CardContent>

      <CardActions
        disableSpacing
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {" "}
        <Tooltip
          title={
            isCalified
              ? "Has calificado este articulo"
              : "Dejar una calificacion"
          }
          arrow
        >
          <ListItem button onClick={() => setIsRating(true)}>
            <ListItemIcon>
              <Star color={isCalified ? "secondary" : "disabled"} />
            </ListItemIcon>
            <ListItemText
              primary={
                isCalified
                  ? "Calificaste este articulo"
                  : "Deja una calificacion"
              }
            />
          </ListItem>
        </Tooltip>
        <Tooltip title="Descargar" arrow>
          <IconButton aria-label="share" onClick={startDownloadFile}>
            <CloudDownload sx={{ fontSize: 30 }} />
          </IconButton>
        </Tooltip>
      </CardActions>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Method:</Typography>
          <Typography paragraph>
            Heat 1/2 cup of the broth in a pot until simmering, add saffron and
            set aside for 10 minutes.
          </Typography>
          <Typography paragraph>
            Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet
            over medium-high heat. Add chicken, shrimp and chorizo, and cook,
            stirring occasionally until lightly browned, 6 to 8 minutes.
            Transfer shrimp to a large plate and set aside, leaving chicken and
            chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes,
            onion, salt and pepper, and cook, stirring often until thickened and
            fragrant, about 10 minutes. Add saffron broth and remaining 4 1/2
            cups chicken broth; bring to a boil.
          </Typography>
          <Typography paragraph>
            Add rice and stir very gently to distribute. Top with artichokes and
            peppers, and cook without stirring, until most of the liquid is
            absorbed, 15 to 18 minutes. Reduce heat to medium-low, add reserved
            shrimp and mussels, tucking them down into the rice, and cook again
            without stirring, until mussels have opened and rice is just tender,
            5 to 7 minutes more. (Discard any mussels that don&apos;t open.)
          </Typography>
          <Typography>
            Set aside off of the heat to let rest for 10 minutes, and then
            serve.
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};
