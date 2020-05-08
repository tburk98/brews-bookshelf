import React from "react";
import { makeStyles, withStyles, fade } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import { Chip, Paper } from "@material-ui/core";
import { ITag } from "../@types/index";
import { UserContext } from "./UserContext";

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const useStyles = makeStyles((theme) => ({
  title: {
    margin: theme.spacing(6, 0, 3),
    width: "auto",
    zIndex: 11,
    marginBottom: 0,
    marginLeft: 35,
  },
  background: {
    // backgroundColor: fade(theme.palette.background.default, 0.7),
    // WebkitBackdropFilter: "blur(45px)",
    width: "100%",
    zIndex: 10,
    height: 94,
    left: 0,
  },
  container: {
    backgroundColor: fade(theme.palette.background.default, 1),
    width: "calc(100% + 35px)",
    zIndex: 12,
    position: "fixed",
    height: 105,
    marginLeft: -35,
    "@supports (-webkit-backdrop-filter: saturate(180%) blur(10px))": {
      backgroundColor: fade(theme.palette.background.default, 0.8),
      WebkitBackdropFilter: "saturate(180%) blur(15px)",
    },
  },

  tagBar: {
    height: 94,
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-end",
  },
  tagRow: {
    display: "flex",
    justifyContent: "flex-start",
    listStyle: "none",
    padding: theme.spacing(0.5),
    margin: "0 0 -6px 4px",
    background: "transparent",
    boxShadow: "none",
  },
  tag: {
    margin: theme.spacing(0.5),
    fontSize: "0.7rem",
    height: 28,
  },
}));

export default function ShelfHeader() {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.tagBar}>
        <Typography className={classes.title} variant="h5">
          <UserContext.Consumer>
            {({ currentDate, maxDate }) => {
              if (
                currentDate.getMonth() === maxDate.getMonth() &&
                currentDate.getFullYear() == maxDate.getFullYear()
              ) {
                return "Latest Recommendations";
              } else {
                return (
                  monthNames[currentDate.getMonth()] +
                  " " +
                  currentDate.getFullYear()
                );
              }
            }}
          </UserContext.Consumer>
        </Typography>
        <UserContext.Consumer>
          {({ availableTags, tags }) => (
            <Paper component="ul" className={classes.tagRow}>
              {Array.from(tags).map((title: string) => {
                return (
                  <li key={title}>
                    <Chip
                      variant="outlined"
                      color="primary"
                      label={title}
                      className={classes.tag}
                    />
                  </li>
                );
              })}
            </Paper>
          )}
        </UserContext.Consumer>
      </div>
    </div>
  );
}
