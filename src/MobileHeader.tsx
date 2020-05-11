import React from "react";
import { makeStyles, withStyles, fade } from "@material-ui/core/styles";
import { Grid, Typography, Divider, InputAdornment } from "@material-ui/core";
import { DatePicker } from "@material-ui/pickers";
import ExpandIcon from "@material-ui/icons/ExpandMore";
import ArrowLink from "./ArrowLink";
import { ITag } from "../@types/index";
import { UserContext } from "./UserContext";

// const StyledTextField = withStyles({
//   root: {
//     fontSize: "1.5rem",
//   },
// })(TextField);

const useStyles = makeStyles((theme) => ({
  brewsBookshelf: {
    fontFamily: "Literata",
    marginTop: 20,
    fontSize: "1.5rem",
  },
  dateTextField: {
    fontWeight: 600,
    fontSize: "1.4rem",
    marginTop: 28,
  },
  root: {
    backgroundColor: theme.palette.background.default,
  },
  divider: {
    width: "calc(100% + 28px)",
    marginLeft: "-8px",
    height: 2,
    marginTop: 10,
    color: theme.palette.text.primary,
  },
}));

export default function MobileHeader() {
  const classes = useStyles();

  return (
    <Grid container item className={classes.root}>
      <Grid
        item
        container
        xs={11}
        justify="space-between"
        alignItems="flex-end"
      >
        <Grid item>
          <Typography variant="h4" className={classes.brewsBookshelf}>
            Brew's
            <br />
            Bookshelf
          </Typography>
        </Grid>
        <Grid item>
          <ArrowLink
            title="Morning Brew"
            URL="https://www.morningbrew.com/daily/stories"
          />
        </Grid>
        <Grid item container xs={12}>
          <Grid container item wrap="nowrap" alignItems="center">
            <UserContext.Consumer>
              {({ currentDate, maxDate, minDate, setDate }) => (
                <DatePicker
                  variant="inline"
                  openTo="month"
                  views={["year", "month"]}
                  value={currentDate}
                  onChange={(e) => setDate(e)}
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
        </Grid>
        <Grid item container xs={12}>
          <Divider className={classes.divider} />
        </Grid>
      </Grid>
    </Grid>
  );
}
