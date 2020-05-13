import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import {
  Grid,
  Divider,
  Hidden,
  InputAdornment,
  IconButton,
  Popover,
  Box,
} from "@material-ui/core";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import ShelfHeader from "../src/ShelfHeader";
import Sidebar from "../src/Sidebar";
import MobileHeader from "../src/MobileHeader";
import BookGrid from "../src/BookGrid";
import TagPicker from "../src/TagPicker";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import { UserContext } from "../src/UserContext";
import ExpandIcon from "@material-ui/icons/ExpandMore";
import FilterListIcon from "@material-ui/icons/FilterList";

const useStyles = makeStyles((theme) => ({
  root: {
    overflow: "hidden",
    height: "100vh",
    [theme.breakpoints.down("sm")]: {
      height: "auto",
      overflow: "visible",
    },
  },
  bookGrid: {
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
    [theme.breakpoints.up("md")]: {
      marginTop: -85,
      paddingTop: 105,
    },
    [theme.breakpoints.down("sm")]: {
      overflow: "visible",
      height: "auto",
    },
  },
  dateTextField: {
    fontWeight: 700,
    fontSize: "1.5rem",
    marginTop: 28,
    paddingLeft: 28,
  },
  stickyHeader: {
    position: "sticky",
    top: 0,
    backgroundColor: theme.palette.background.default,
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

const StyledDividerMobile = withStyles({
  root: {
    width: "calc(100% - 24px)",
    marginLeft: "12px",
    height: 1.5,
    zIndex: 10,
  },
})(Divider);

const Home = () => {
  const classes = useStyles();

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid item container xs={12} justify="center" className={classes.root}>
        {/* Desktop Only */}
        <Hidden smDown>
          <Grid
            item
            container
            justify="space-around"
            spacing={5}
            lg={11}
            xl={10}
          >
            <Grid
              item
              container
              md={8}
              xl={10}
              alignContent="flex-start"
              justify="center"
            >
              <Grid item xs={10} md={10} lg={12}>
                <ShelfHeader />
                <StyledDivider />
              </Grid>

              <Grid item xs={10} md={10} lg={12} className={classes.bookGrid}>
                <UserContext.Consumer>
                  {({ currentBooks, tags }) => (
                    <BookGrid books={currentBooks} tags={tags} />
                  )}
                </UserContext.Consumer>
              </Grid>
            </Grid>

            <Grid item container md={3} xl={2}>
              <Sidebar />
            </Grid>
          </Grid>
        </Hidden>
        {/* Mobile Only */}
        <Hidden mdUp>
          <MobileHeader />
          <Grid
            container
            item
            xs={12}
            className={classes.stickyHeader}
            alignItems="flex-end"
            justify="space-between"
          >
            <Grid item xs={9}>
              <UserContext.Consumer>
                {({ currentDate, maxDate, minDate, updateBooks }) => (
                  <DatePicker
                    variant="inline"
                    openTo="month"
                    views={["year", "month"]}
                    value={currentDate}
                    onChange={(e) => updateBooks(e)}
                    autoOk
                    minDate={minDate}
                    maxDate={maxDate}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      disableUnderline: true,
                      fullWidth: false,
                      multiline: true,
                      classes: { root: classes.dateTextField },
                      endAdornment: (
                        <InputAdornment position="end">
                          <ExpandIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              </UserContext.Consumer>
            </Grid>
            <Grid container item xs={3} alignItems="flex-end" justify="center">
              <PopupState variant="popover">
                {(popupState) => (
                  <div>
                    <IconButton {...bindTrigger(popupState)}>
                      <FilterListIcon />
                    </IconButton>
                    <Popover
                      {...bindPopover(popupState)}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "center",
                      }}
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "center",
                      }}
                    >
                      <Box p={2}>
                        <TagPicker mobile />
                      </Box>
                    </Popover>
                  </div>
                )}
              </PopupState>
            </Grid>
            <Grid item xs={12}>
              <StyledDividerMobile />
            </Grid>
          </Grid>
          <Grid item xs={10} md={10} lg={12} className={classes.bookGrid}>
            <UserContext.Consumer>
              {({ currentBooks, tags }) => (
                <BookGrid books={currentBooks} tags={tags} />
              )}
            </UserContext.Consumer>
          </Grid>
        </Hidden>
      </Grid>
    </MuiPickersUtilsProvider>
  );
};

export default Home;
