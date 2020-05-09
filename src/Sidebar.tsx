import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Container, Grid, Button } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import Sun from "@material-ui/icons/WbSunny";
import Moon from "@material-ui/icons/Brightness3";
import { UserContext } from "./UserContext";
import ArrowLink from "./ArrowLink";
import MonthPicker from "./MonthPicker";
import TagPicker from "./TagPicker";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    margin: theme.spacing(5, 0, 3),
    height: "100vh",
    // maxWidth: "315px",
    // minWidth: "290px",
    // width: "18vw",
    width: "100%",
    zIndex: 12,
    // marginLeft: 10,
  },
  button: {
    marginLeft: -12,
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  buttonRow: {
    marginTop: 20,
    display: "flex",
    width: "100%",
  },
  brewsBookshelf: {
    fontFamily: "Literata",
    fontSize: "2.3rem",
    lineHeight: "2.6rem",
  },
  desc: {
    maxWidth: 200,
    marginTop: 8,
  },
}));

export default function Sidebar() {
  const classes = useStyles();
  return (
    <Grid item container className={classes.root}>
      <Grid container direction="column" spacing={1}>
        <Grid item>
          <Typography variant="h4" className={classes.brewsBookshelf}>
            Brew's
            <br />
            Bookshelf
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="body2" className={classes.desc}>
            Brew staff's top recommended books, published every month.
          </Typography>
        </Grid>
        <Grid item container>
          <div className={classes.buttonRow}>
            <Grid item xs={3}>
              <UserContext.Consumer>
                {({ darkMode, toggleTheme }) => (
                  <label htmlFor="icon-button-file">
                    <IconButton
                      color="primary"
                      aria-label="toggle dark mode"
                      component="span"
                      onClick={toggleTheme}
                      className={classes.button}
                    >
                      {darkMode ? (
                        <Moon style={{ transform: "rotate(150deg)" }} />
                      ) : (
                        <Sun />
                      )}
                    </IconButton>
                  </label>
                )}
              </UserContext.Consumer>
            </Grid>
            <Grid item container xs={8}>
              <ArrowLink
                title="Morning Brew"
                URL="https://www.morningbrew.com/daily/stories"
              />
            </Grid>
          </div>
        </Grid>
        <Grid item container>
          <MonthPicker />
        </Grid>
        <Grid item container>
          <TagPicker />
        </Grid>
      </Grid>
    </Grid>
  );
}
