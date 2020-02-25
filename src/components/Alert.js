import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import AppContext from "./AppContext";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2)
    }
  }
}));

var dict = {
    en: {
        thankYou: "Thank you for submitting!",
    },
    es: {
        thankYou: "Gracias por enviar!",
    }
};

export default function ActionAlerts() {
  const classes = useStyles();

  return (
    <AppContext.Consumer>
      {({ appCtx }) => (
        <div className={classes.root}>
          <Alert>{dict[appCtx.lang].thankYou}</Alert>
        </div>
      )}
    </AppContext.Consumer>
  );
}
