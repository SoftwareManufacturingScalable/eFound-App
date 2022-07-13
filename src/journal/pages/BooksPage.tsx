import { Grid } from "@mui/material";
import { listBooks } from "../../data";
import { BookCard } from "../components/BookCard";
import { JournalLayout } from "../layout/JournalLayout";

export const BooksPage = () => {

//
  return (
    <JournalLayout>
      <Grid
        container
        spacing={1}
        direction="row"
        className="animate__animated animate__fadeIn"
      >
        {listBooks.map((article) => (
          <Grid item sm={6} key={article.title}>
            <BookCard key={article.title} article={article} />
          </Grid>
        ))}
      </Grid>
    </JournalLayout>
  );
};
