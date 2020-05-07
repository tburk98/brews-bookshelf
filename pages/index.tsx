import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Grid, Container } from "@material-ui/core";
import ShelfHeader from "../src/ShelfHeader";
import Sidebar from "../src/Sidebar";
import BookGrid from "../src/BookGrid";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";

const useStyles = makeStyles({
  root: {
    overflow: "hidden",
    height: "100vh",
  },
  bookGrid: {
    overflowY: "auto",
    paddingTop: 40,
    scrollbarWidth: "none",
    "&::-webkit-scrollbar": {
      width: 0,
      display: "none",
      background: "transparent",
    },
    "&::-webkit-scrollbar-thumb": {
      width: 0,
      background: "transparent",
      display: "none",
    },
  },
});

const Home = () => {
  const classes = useStyles();

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid item container xs={12} justify="center" className={classes.root}>
        <Grid item container justify="space-around" spacing={6} lg={11} xl={10}>
          <Grid item container lg={9} xl={10} alignContent="flex-start">
            <Grid item xs={12}>
              <ShelfHeader />
            </Grid>
            <Grid item xs={12} className={classes.bookGrid}>
              <BookGrid />
            </Grid>
          </Grid>
          <Grid item container lg={3} xl={2}>
            <Sidebar />
          </Grid>
        </Grid>
      </Grid>
    </MuiPickersUtilsProvider>
  );
};

export default Home;
