import React from "react";
import { makeStyles } from "@material-ui/core/styles";

type ArrowLinkProps = {
  title: string;
  URL: string;
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    height: "100%",
  },
  link: {
    textDecoration: "none",
    color: theme.palette.primary.main,
    fontWeight: 700,
    marginRight: 8,
    fontSize: "0.78rem",
  },
}));

const ArrowLink = ({ title, URL }: ArrowLinkProps) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <a className={classes.link} href={URL} target="_blank">
        {title}
      </a>
      <span>
        <img src="/link-arrow.svg" alt="tiny arrow" />
      </span>
    </div>
  );
};

export default ArrowLink;
