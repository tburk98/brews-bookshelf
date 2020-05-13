import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Grid } from "@material-ui/core";
import { DatePicker } from "@material-ui/pickers";
import { UserContext } from "./UserContext";

const useStyles = makeStyles((theme) => ({
  title: {
    margin: theme.spacing(3, 0, 1),
    fontSize: "1.1rem",
    width: "100%",
  },
}));

const StyledDatePicker = withStyles({
  root: {
    maxWidth: "100%",
  },
})(DatePicker);

export default function MonthPicker() {
  const classes = useStyles();

  return (
    <Grid item container>
      <Grid item container>
        <Typography className={classes.title} variant="h5">
          Select Month
        </Typography>
        <UserContext.Consumer>
          {({ minDate, maxDate, updateBooks, currentDate }) => (
            <StyledDatePicker
              variant="inline"
              openTo="month"
              views={["year", "month"]}
              value={currentDate}
              onChange={(e) => updateBooks(e)}
              autoOk
              minDate={minDate}
              maxDate={maxDate}
            />
          )}
        </UserContext.Consumer>
      </Grid>
    </Grid>
  );
}
