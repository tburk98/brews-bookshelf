import React from "react";
import { useEffect, useContext, useRef } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Grid, Divider, Hidden } from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import ShelfHeader from "../src/ShelfHeader";
import Sidebar from "../src/Sidebar";
import MobileHeader from "../src/MobileHeader";
import BookGrid from "../src/BookGrid";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { UserContext } from "../src/UserContext";

const useStyles = makeStyles((theme) => ({
  root: {
    overflow: "hidden",
    height: "100vh",
  },
  bookGrid: {
    [theme.breakpoints.up("md")]: {
      marginTop: -85,
      paddingTop: 105,
    },
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
}));

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
  const { currentBooks, tags } = useContext(UserContext);
  const gridRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = gridRef.current;
    if (node) {
      node.scrollTo(0, 0);
    }
  }, [currentBooks, tags]);

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid item container xs={12} justify="center" className={classes.root}>
        <Grid item container justify="space-around" spacing={5} lg={11} xl={10}>
          <Grid
            item
            container
            md={8}
            xl={10}
            alignContent="flex-start"
            justify="center"
          >
            <Grid item xs={10} md={10} lg={12}>
              <Hidden mdUp>
                <MobileHeader />
              </Hidden>
              <Hidden smDown>
                <ShelfHeader />
                <StyledDivider />
              </Hidden>
            </Grid>

            <Grid
              item
              xs={10}
              md={10}
              lg={12}
              className={classes.bookGrid}
              ref={gridRef}
            >
              <UserContext.Consumer>
                {({ currentBooks, tags }) => (
                  <BookGrid books={currentBooks} tags={tags} />
                )}
              </UserContext.Consumer>
            </Grid>
          </Grid>
          <Hidden smDown>
            <Grid item container md={3} xl={2}>
              <Sidebar />
            </Grid>
          </Hidden>
        </Grid>
      </Grid>
    </MuiPickersUtilsProvider>
  );
};

export default Home;
