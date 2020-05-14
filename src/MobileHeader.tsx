import React from "react";
import { useEffect, useRef, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, Container } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import Sun from "@material-ui/icons/WbSunny";
import Moon from "@material-ui/icons/Brightness3";
import ArrowLink from "./ArrowLink";
import { UserContext } from "./UserContext";

const useStyles = makeStyles((theme) => ({
  brewsBookshelf: {
    fontFamily: "Literata",
    fontSize: "2.4rem",
    height: "100px",
    marginBottom: 8,
    // marginTop: 20,
  },
  dateTextField: {
    fontWeight: 600,
    fontSize: "1.5rem",
    marginTop: 28,
  },
  divider: {
    width: "100%",
    marginLeft: 8,
    height: 0,
    marginTop: 4,
    color: theme.palette.text.primary,
  },
  hero: {
    height: 300,
    width: "100vw",
  },
  linkContainer: {
    height: 95,
  },
  link: {},
  desc: {
    maxWidth: 240,
  },
  button: {
    marginLeft: -12,
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
}));

export default function MobileHeader() {
  const classes = useStyles();
  const { currentDate } = useContext(UserContext);
  const gridRefMobile = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const nodeMobile = gridRefMobile.current;
    if (nodeMobile) {
      nodeMobile.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [currentDate]);

  return (
    <Container>
      <Grid
        item
        container
        xs={12}
        className={classes.hero}
        justify="center"
        alignContent="flex-start"
      >
        <Grid
          container
          item
          xs={11}
          justify="space-between"
          alignItems="center"
          className={classes.linkContainer}
        >
          <div className={classes.link}>
            <ArrowLink
              title="Morning Brew"
              URL="https://www.morningbrew.com/daily/stories"
            />
          </div>
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

        <Grid item xs={11}>
          <Typography variant="h4" className={classes.brewsBookshelf}>
            Brew's
            <br /> Bookshelf
          </Typography>
          <Typography
            variant="body2"
            className={classes.desc}
            ref={gridRefMobile}
          >
            Brew staff's top recommended books, published every month.
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
}
