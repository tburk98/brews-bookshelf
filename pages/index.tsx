import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Grid, Divider } from "@material-ui/core";
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
    marginTop: -85,
    paddingTop: 105,
    overflowY: "auto",
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

const StyledDivider = withStyles({
  root: {
    width: "calc(100% + 16px)",
    marginLeft: "-16px",
    height: 1.5,
    marginTop: 95,
    position: "relative",
    zIndex: 10,
  },
})(Divider);

const Home = () => {
  const classes = useStyles();

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid item container xs={12} justify="center" className={classes.root}>
        <Grid item container justify="space-around" spacing={6} lg={11} xl={10}>
          <Grid item container lg={9} xl={10} alignContent="flex-start">
            <Grid item xs={12}>
              <ShelfHeader />
              <StyledDivider />
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
