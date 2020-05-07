import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Grid, TextField, Paper, Chip } from "@material-ui/core";
import { ITag } from "../@types/index";
import { UserContext } from "./UserContext";

const useStyles = makeStyles((theme) => ({
  title: {
    margin: theme.spacing(4, 0, 1),
    width: "auto",
    fontSize: "1.1rem",
  },
  tag: {
    margin: theme.spacing(0.5),
    fontSize: "0.7rem",
    height: 28,
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
  },
}));

export default function TagPicker() {
  const classes = useStyles();

  return (
    <Grid item container>
      <Typography className={classes.title} variant="h5">
        Filter by Tag
      </Typography>
      <Grid item container>
        <UserContext.Consumer>
          {({ availableTags, tags, toggleTag, currentDate }) => (
            <Paper component="ul" className={classes.tagBox}>
              {availableTags.map(function (tag, index) {
                return (
                  <li key={index}>
                    <Chip
                      variant={tags.has(tag) ? "default" : "outlined"}
                      color="primary"
                      label={tag}
                      className={classes.tag}
                      onClick={() => toggleTag(tag, currentDate)}
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
