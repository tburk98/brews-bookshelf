import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Grid, Paper, Chip } from "@material-ui/core";
import { UserContext } from "./UserContext";

interface TagPickerProps {
  mobile: boolean;
}

const useStyles = makeStyles((theme) => ({
  title: {
    margin: theme.spacing(4, 0, 1),
    width: "auto",
    fontSize: "1.1rem",
    [theme.breakpoints.down("sm")]: {
      margin: 0,
      fontSize: "1.4rem",
    },
  },
  tag: {
    margin: theme.spacing(0.5),
    fontSize: "0.7rem",
    height: 32,
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.8rem",
      margin: "0 5px 8px 0",
    },
  },
  tagBox: {
    width: 300,
    display: "flex",
    justifyContent: "flex-start",
    listStyle: "none",
    flexWrap: "wrap",
    padding: theme.spacing(0.5),
    background: "transparent",
    boxShadow: "none",
    marginLeft: -8,
    marginTop: 0,
    alignSelf: "flex-start",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      margin: 0,
      padding: 0,
      paddingTop: 16,
      alignContent: "flex-start",
    },
  },
  root: {
    [theme.breakpoints.down("sm")]: {
      width: 200,
    },
  },
}));

export default function TagPicker({ mobile = false }: TagPickerProps) {
  const classes = useStyles();

  return (
    <Grid item container className={classes.root}>
      <Typography className={classes.title} variant="h5">
        Filter by Tag
      </Typography>

      <Grid item container>
        <UserContext.Consumer>
          {({ availableTags, tags, toggleTag }) => (
            <Paper component="ul" className={classes.tagBox}>
              {availableTags.map(function (tag, index) {
                return (
                  <li key={index}>
                    <Chip
                      variant={tags.has(tag) ? "default" : "outlined"}
                      color="primary"
                      label={tag}
                      className={classes.tag}
                      onClick={() => toggleTag(tag, tags)}
                    />
                  </li>
                );
              })}
            </Paper>
          )}
        </UserContext.Consumer>
      </Grid>
    </Grid>
  );
}
