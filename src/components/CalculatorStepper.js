import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Zip from "../components/Zip";
import YesNoState from "./clauses/YesNoState";

const useStyles = makeStyles(theme => ({
  root: {
    minWidth: "100%"
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
    "Set zip",
    "Select initial rent",
    "List rent increases",
    "Calculate my rent history"
  ];
}

const StepAtIndex = ({ index, appCtx, handleNext }) => {
  if (index === 1) {
    return <Step2 appCtx={appCtx} />;
  }
  if (index === 2) {
    return <Step3 appCtx={appCtx} />;
  }
  if (index === 3) {
    return <Step4 />;
  }
  return <Step1 handleNext={handleNext} zip={appCtx.zip} />;
};

const Step1 = ({ handleNext, zip }) => {
  useEffect(() => {
    if (zip?.length === 5) {
      console.trace("handlenext");
      handleNext();
    }
  }, [zip, handleNext]);
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

const Step2 = ({ moveInAfter15Mar2019, appCtx }) => (
  <>
    <YesNoState
      yes="/calc#calculator"
      no="/calc#calculator"
      questionText="Did you move in after March 15th, 2019?"
      stateName="moveInAfter15Mar2019"
    />
    {appCtx.moveInAfter15Mar2019 !== undefined ? ( // only show rent after move in date
      <div>
        {appCtx.moveInAfter15Mar2019 ? ( // ask about the correct date
          <label for="initialRent">
            What was your initial rent when you first rented your current unit?
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
  </>
);
const Step3 = () => <></>;
const Step4 = () => <></>;

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
    <div className={classes.root}>
      <Stepper activeStep={activeStep} orientation="vertical">
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
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? "Finish" : "Next"}
                  </Button>
                </div>
              </div>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} className={classes.resetContainer}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} className={classes.button}>
            Reset
          </Button>
        </Paper>
      )}
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
