import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Container } from "@material-ui/core";
import BookCell from "./BookCell";
import { IBook } from "../@types/index";

interface BookGridProps {
  books: IBook[];
  tags: Set<any>;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    padding: 0,
  },
  gridList: {
    display: "flex",
    justifyContent: "space-between",
    alignContent: "flex-start",
    flexWrap: "wrap",
    maxWidth: "100%",
    height: "calc(100vh - 94px)",
    paddingBottom: 50,
    [theme.breakpoints.down("sm")]: {
      height: "auto",
      paddingBottom: 0,
    },
  },
}));

export default function BookGrid(props: BookGridProps) {
  const classes = useStyles();
  const { books, tags } = props;

  return (
    <Container className={classes.root} maxWidth="xl">
      <Grid
        container
        className={classes.gridList}
        wrap="wrap"
        spacing={4}
        id={"book-grid"}
      >
        {books.map(function (book: IBook) {
          let commonTags = book.tags.filter((x) => tags.has(x));
          if (commonTags.length > 0 || tags.size == 0) {
            return (
              <BookCell
                imageURL={book.thumbnailUrl}
                authors={book.authors}
                title={book.title}
                desc={book.shortDescription}
                purchaseLink=""
                key={book.isbn}
              />
            );
          }
        })}
        <Grid item xs={6} xl={4} />
        <Grid item xs={6} xl={4} />
        <Grid item xs={6} xl={4} />
        <Grid item xs={6} xl={4} style={{ height: 100 }} />
      </Grid>
    </Container>
  );
}
