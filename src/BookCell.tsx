import React from "react";
import { makeStyles, withStyles, fade } from "@material-ui/core/styles";
import { Grid, Typography, GridListTile } from "@material-ui/core";
import { motion } from "framer-motion";
import ArrowLink from "./ArrowLink";

interface BookCellProps {
  imageURL: string;
  authors: string[];
  title: string;
  desc: string;
  purchaseLink: string;
}

const useStyles = makeStyles((theme) => ({
  bookImage: {
    display: "block",
    width: "91%",
    maxWidth: 160,
    alignSelf: "flex-start",
    boxShadow: [
      `10px 6px 8px 0px ${
        theme.palette.type == "light"
          ? "rgba(236, 238, 240, 0.8) "
          : "rgba(4,6,9,0.15)"
      }`,
      `10px 8px 8px 0px ${
        theme.palette.type == "light"
          ? "rgba(236, 238, 240, 0.8) "
          : "rgba(4,6,9,0.15)"
      }`,
      `10px 10px 10px 0px ${
        theme.palette.type == "light"
          ? "rgba(236, 238, 240, 0.8) "
          : "rgba(4,6,9,0.15)"
      }`,
      `10px 10px 12px 0px ${
        theme.palette.type == "light"
          ? "rgba(236, 238, 240, 0.8) "
          : "rgba(4,6,9,0.15)"
      }`,
      `10px 12px 16px 0px ${
        theme.palette.type == "light"
          ? "rgba(236, 238, 240, 0.8) "
          : "rgba(4,6,9,0.15)"
      }`,
      `10px 16px 32px 0px ${
        theme.palette.type == "light"
          ? "rgba(236, 238, 240, 0.8) "
          : "rgba(4,6,9,0.15)"
      }`,
    ].join(","),
    overflow: "visible",
    marginBottom: 45,
  },
  bookTitle: {
    fontWeight: 600,
  },
  bookDesc: {
    color: theme.palette.text.secondary,
    fontSize: "0.75rem",
    minWidth: 170,
  },
  bookTile: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  root: {
    overflow: "visible",
    height: 285,
    width: "100%",
    alignItems: "center",
    marginTop: 25,
  },
}));

const StyledBookTile = withStyles({
  root: {
    overflow: "visible",
    height: 285,
    width: "100%",
    alignItems: "center",
    marginTop: 25,
  },
})(Grid);

export default function BookCell(props: BookCellProps) {
  const classes = useStyles();
  const { imageURL, desc, title, authors, purchaseLink } = props;
  return (
    <StyledBookTile className={classes.bookTile} item container md={6} xl={4}>
      <motion.div
        animate={{ opacity: [0, 1], y: [20, 0] }}
        transition={{ ease: "easeOut", duration: 0.5 }}
      >
        <Grid container spacing={2}>
          <Grid item container xs={5}>
            <motion.img
              src={imageURL}
              alt="book cover"
              className={classes.bookImage}
              whileHover={{ y: -10 }}
            />
          </Grid>
          <Grid item container xs={7} alignContent="flex-start" spacing={2}>
            <Grid item xs={12}>
              <Typography className={classes.bookTitle} variant="body1">
                {title}
              </Typography>
              <Typography variant="body2">by {authors.join(", ")}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography className={classes.bookDesc} variant="body2">
                {desc}
              </Typography>
            </Grid>
            <Grid item>
              <ArrowLink title="Buy Online" URL="" />
            </Grid>
          </Grid>
        </Grid>
      </motion.div>
    </StyledBookTile>
  );
}
