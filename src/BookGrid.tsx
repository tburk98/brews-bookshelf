import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Container } from "@material-ui/core";
import { UserContext } from "./UserContext";
import BookCell from "./BookCell";
import { IBook } from "../@types/index";

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
  },
  fillerCell: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
}));

export default function BookGrid() {
  const classes = useStyles();

  return (
    <Container className={classes.root} maxWidth="xl">
      <UserContext.Consumer>
        {({ currentBooks, tags }) => (
          <Grid container className={classes.gridList} wrap="wrap" spacing={4}>
            {currentBooks.map(function (book: IBook) {
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
            })}
            <Grid item xs={6} xl={4} />
            <Grid item xs={6} xl={4} />
            <Grid item xs={6} xl={4} />
            <Grid item xs={6} xl={4} />
          </Grid>
        )}
      </UserContext.Consumer>
    </Container>
  );
}
