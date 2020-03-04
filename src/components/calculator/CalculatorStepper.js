import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Box from '@material-ui/core/Box';
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import DeleteIcon from '@material-ui/icons/Delete';
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Zip from "../Zip";
import YesNoState from "../clauses/YesNoState";
import DateFnsUtils from "@date-io/date-fns"; // datelib for matieral-ui pickers
import {
  MuiPickersUtilsProvider,
  DatePicker,
} from '@material-ui/pickers';
import * as CalcCore from "../../methods/rentCalculator"
import shortid from "shortid"

const useStyles = makeStyles(theme => ({
  root: {
    minWidth: "100%",
  },
  noPad: {
    padding: "0",
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  actionsContainer: {
    marginBottom: theme.spacing(2)
  },
  resetContainer: {
    padding: theme.spacing(3)
  }

}));

function getSteps() {
  return [
    "Where you live",
    "Your rent",
    "Rent Increases",
    "Your Rent Protection"
  ];
}

const StepAtIndex = ({ index, appCtx, handleNext }) => {
  if (index === 1) {
    return <Step2 appCtx={appCtx} moveInAfter15Mar2019={appCtx.moveInAfter15Mar2019} />;
  }
  if (index === 2) {
    return <Step3 appCtx={appCtx} />;
  }
  if (index === 3) {
    return <Step4 appCtx={appCtx} />;
  }
  return <Step1 handleNext={handleNext} zip={appCtx.appCtx.zip} />;
};

const Step1 = ({ handleNext, zip }) => {
  /*useEffect(() => {
    if (zip?.length === 5) {
      console.trace("handlenext");
      handleNext();
    }
  }, [zip, handleNext]);
  */
  return (
    <form
      onSubmit={event => {
        event.preventDefault();
        handleNext();
      }}
    >
      <label for="zip">What is your zip code?&nbsp;</label>
      <Zip />
    </form>
  );
};

const Step2 = ({ appCtx }) => (
  <>
    <YesNoState
      questionText="Did you move in after March 15th, 2019?"
      stateName="moveInAfter15Mar2019"
      callback={({ answer }) => {
        if (answer) {
          appCtx.updateContext({ tenancyStartDate: new Date(2019, 3) });
        }
      }}
    />
    <br />
    {appCtx.appCtx.moveInAfter15Mar2019 !== undefined ? ( // only show rent after move in date
      <div>
        <p>What was your rent {appCtx.appCtx.moveInAfter15Mar2019 ? "when you started renting?" : "on March 15th, 2019?"}</p>
        <TextField
          required
          name="initialRent"
          id="initialRent"
          type="number"
          variant="outlined"
          value={appCtx.appCtx.moveInAfter15Mar2019 ? appCtx.appCtx.initialRent : appCtx.appCtx.rentOn20190315}
          label={appCtx.appCtx.moveInAfter15Mar2019 ?
            "Starting Rent" :
            "March 15th 2019 Rent"}
          InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }}
          onChange={(e) => {
            // TODO validation
            if (appCtx.appCtx.moveInAfter15Mar2019) {
              appCtx.updateContext({ initialRent: e.target.value });
            } else {
              appCtx.updateContext({ rentOn20190315: e.target.value });
            }
          }} />
        <br />
        {appCtx.appCtx.moveInAfter15Mar2019 ?
          <>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DatePicker
                views={["month", "year"]}
                label="Move in month"
                varient="outlined"
                onChange={
                  (d) => {
                    appCtx.updateContext({ tenancyStartDate: d });
                  }
                }
                value={appCtx.appCtx.tenancyStartDate}
              />
            </MuiPickersUtilsProvider>
          </>
          : <></>
        }
      </div>
    ) : (
        <div />
      )}
  </>
);
const Step3 = ({ appCtx }) => (
  <>
    <FormControl>
      <YesNoState
        questionText={appCtx.appCtx.moveInAfter15Mar2019 ?
          "Have you recieved a change in rent since you moved in?" :
          "Have you recieved a change in rent since March 15th 2019?"}
        stateName="rentChange"
        callback={({ answer }) => {
          if (!appCtx.appCtx.rentChanges || appCtx.appCtx.rentChanges.length === 0) {
            // create/update the rent changes array if it doesn't exist or if the user changed their mind after it was created
            let rentChanges = [];

            if (answer) {
              // if they answer yes add the first element for them
              let nextRentMonth;
              if (appCtx.appCtx.moveInAfter15Mar2019) {
                nextRentMonth = CalcCore.addISOMonths(appCtx.appCtx.tenancyStartDate, 1);
              } else {
                nextRentMonth = CalcCore.addISOMonths("2019-03", 1); // if we are starting at March 2019
              }

              rentChanges.push({ month: nextRentMonth, rent: null, key: shortid.generate() });
            }

            appCtx.updateContext({ rentChanges });
          }
        } 
        }
      />
      <br />
      { // we need to make sure the rentChanges array is available before trying to render
        appCtx.appCtx.rentChange && appCtx.appCtx.rentChanges ?
          <>
            {
              // sort the rent changes and then map them out into UI
              appCtx.appCtx.rentChanges.map((change) =>
                <div key={change.key}>
                  <TextField
                    required
                    label="New rent"
                    name="increase"
                    type="number"
                    varient="outlined"
                    value={change.rent}
                    onChange={
                      (v) => {
                        let rent = v.target.value;
                        console.log('input value', rent);
                        let rentChanges = appCtx.appCtx.rentChanges;
                        for (let i = 0; i < rentChanges.length; i++) {
                          if (change.key === rentChanges[i].key) {
                            rentChanges[i].rent = rent;
                          }
                        }
                        rentChanges = rentChanges.sort((a, b) => (a.month > b.month ? 1 : -1));
                        console.log('rentChanges', rentChanges);
                        appCtx.updateContext({ rentChanges });
                      }
                    } />
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DatePicker
                      required
                      views={["month", "year"]}
                      varient="outlined"
                      label="Change date"
                      onChange={
                        (d) => {
                          console.log(d);
                          let rentChanges = appCtx.appCtx.rentChanges;
                          for (let i = 0; i < rentChanges.length; i++) {
                            if (change.key === rentChanges[i].key) {
                              rentChanges[i].month = d;
                            }
                          }
                          appCtx.updateContext({ rentChanges });
                        }
                      }
                      value={change.month}
                    />
                  </MuiPickersUtilsProvider>
                  <IconButton
                    disabled={appCtx.appCtx.rentChanges.length < 2}
                    aria-label="delete"
                    onClick={() => {
                      let rentChanges = appCtx.appCtx.rentChanges;
                      let delId;
                      for (let i = 0; i < rentChanges.length; i++) {
                        if (change.key === rentChanges[i].key) {
                          delId = i;
                          break;
                        }
                      }
                      if (delId !== undefined) {
                        rentChanges.splice(delId, 1);
                      }
                      appCtx.updateContext({ rentChanges });
                    }
                    }
                  >
                    <DeleteIcon />
                  </IconButton>
                </div>
              )
            }
            <Button onClick={
              () => {
                let lastMonth = appCtx.appCtx.rentChanges[appCtx.appCtx.rentChanges.length - 1].month;
                let nextRentMonth = CalcCore.addISOMonths(lastMonth, 1);
                console.log('lastMonth', lastMonth, 'nexRentMonth', nextRentMonth);
                let rentChanges = appCtx.appCtx.rentChanges;
                rentChanges.push({ month: nextRentMonth, rent: null, key: shortid.generate() });
                appCtx.updateContext({ rentChanges });
              }
            }>Add another increase</Button>
            {console.log(appCtx.appCtx)}
          </>
          :
          <></>
      }
    </FormControl>
  </>
)

const Step4 = ({ appCtx }) => {
  var ctx = appCtx.appCtx;
  var now = Date();
  var monthlyRents = CalcCore.rentHistoryToMonthlyRents(ctx.rentOn20190315, ctx.initialRent, ctx.tenancyStartDate, ctx.rentChanges, now);
  var maxRents = CalcCore.calculateMaxRents(ctx.zip, monthlyRents);
  var overpayments = CalcCore.calculateOverpayments(monthlyRents, maxRents, now);
  var refund = CalcCore.calculateRefund(overpayments, now);
  var rollbackRent = CalcCore.calculateRollbackRent(monthlyRents, maxRents, now);
  return (
    <>
      <div>
        {ctx.rentChange ?
          <>
            <div>
              <h1>Legal Rent Increase{ctx.rentChanges.length > 1 ? "s" : ""}</h1>
              <h2 className="bigInfo">
                {
                  refund ? "No" : "Yes" // since everyone should be getting refunds now we use this to quickly check about illegal increases
                }
              </h2>
              <p>We {refund ? "" : "do not"} think your rent increase{ctx.rentChanges.length > 1 ? "s were" : " was"} above the legal limit.</p>
            </div>
            <div>
              <h1>Suggested Refund</h1>
              <h2 className="bigInfo">${refund}</h2>
              <p>Since you recieved a rent increase that was not legal you may be entitled to a refund from your landlord for each month you overpayed.</p>
            </div>
            <div>
              <h1>Rollback Rent</h1>
              <h2 className="bigInfo">${rollbackRent}</h2>
              <p>Since you recieved a rent increase that was not legal your rent should revert to the last legal rent you paid that was less than your current maximum legal rent.</p>
            </div>
          </>
          : <></>
        }
        <div>
          <h1>Maximum Rent</h1>
          <h2 className="bigInfo">${maxRents[CalcCore.dateToISOMonth(now)].maxRent}</h2>
          <p>We believe the maximum your landlord can ask you for in rent is ${maxRents[CalcCore.dateToISOMonth(now)].maxRent} for the next 12 months.</p>
        </div>
      </div>
    </>
  );
}

export default function CalculatorStepper({ appCtx }) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className={classes.root} id="calculator">
      <Box p={0}>
        <Stepper activeStep={activeStep} orientation="vertical" className={classes.noPad}>
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
              <StepContent>
                <StepAtIndex
                  index={index}
                  appCtx={appCtx}
                  handleNext={handleNext}
                />
                <div className={classes.actionsContainer}>
                  <div>
                    <Button
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      className={classes.button}
                    >
                      {activeStep < steps.length - 1 ? "Back" : "Edit my answers"}
                  </Button>
                    {activeStep < steps.length - 1 ? // Don't show a finish button
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleNext}
                        className={classes.button}
                      >
                        {activeStep === steps.length - 2 ? "Calculate" : "Next"}
                      </Button>
                      : <></>
                    }
                  </div>
                </div>
              </StepContent>
            </Step>
          ))}
        </Stepper>
      </Box>
    </div>
  );
}

{
  /* 
  
  <form>
<label for="zip">What is your zip code?&nbsp;</label>
<Zip />
{appCtx.moveInAfter15Mar2019 !== undefined ? ( // only show rent after move in date
    <div>
    {appCtx.moveInAfter15Mar2019 ? ( // ask about the correct date
        <label for="initialRent">
        What was your initial rent when you first rented your
        current unit?
        </label>
    ) : (
        <label for="initialRent">
        What was your rent on March 15th, 2019?
        </label>
    )}

    <input name="initialRent" id="initialRent" type="text" />
    </div>
) : (
    <div />
)}
{
    // place holder for rent increases
}
{appCtx.moveInAfter15Mar2019 !== undefined &&
appCtx.rentIncreases !== undefined ? (
    <div>
    <input type="button" value="Calculate" />
    </div>
) : (
    <div />
)}
</form>

{appCtx.moveInAfter15Mar2019 === undefined ? ( // if we haven't answered yet
<YesNoState
    yes="/calc#calculator"
    no="/calc#calculator"
    questionText="Did you move in after March 15th, 2019?"
    stateName="moveInAfter15Mar2019"
/>
) : (
<div>
    {appCtx.rentIncreases === undefined ? (
    <div>
        {appCtx.moveInAfter15Mar2019 ? ( // if we have answered
        <YesNoState
            yes="/calc#calculator"
            no="/calc#calculator"
            questionText="Did you get any rent increases after you moved in?"
            stateName="rentIncreases"
        />
        ) : (
        <YesNoState
            yes="/calc#calculator"
            no="/calc#calculator"
            questionText="Did you get any rent increases after March 15th, 2019?"
            stateName="rentIncreases"
        />
        )}
    </div>
    ) : (
    <div />
    )}
</div>
)} */
}
