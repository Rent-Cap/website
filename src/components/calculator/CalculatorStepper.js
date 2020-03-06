import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Box from "@material-ui/core/Box";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import FormGroup from "@material-ui/core/FormGroup";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import { Step1 } from "./Step1";
import { Step2 } from "./Step2";
import { Step3 } from "./Step3";
import { Step4 } from "./Step4";
import { useState } from "react";

const useStyles = makeStyles(theme => ({
  root: {
    minWidth: "100%"
  },
  noPad: {
    padding: "0"
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

const StepAtIndex = ({ index, appCtx, handleNext, updateStepValidation }) => {
  if (index === 1) {
    return <Step2
      appCtx={appCtx}
      updateStepValidation={updateStepValidation}
    />;
  }
  if (index === 2) {
    return (
      <Step3 appCtx={appCtx} updateStepValidation={updateStepValidation} />
    );
  }
  if (index === 3) {
    return (
      <Step4 appCtx={appCtx} updateStepValidation={updateStepValidation} />
    );
  }
  return (
    <Step1
      handleNext={handleNext}
      zip={appCtx.appCtx.zip}
      town={appCtx.appCtx.town}
      county={appCtx.appCtx.county}
      updateStepValidation={updateStepValidation}
    />
  );
};

export default function CalculatorStepper({ appCtx }) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [stepValidation, setStepValidation] = useState({
    0: false,
    1: false,
    2: false,
    3: false
  });

  const updateStepValidation = (step, state) => {
    const newValidation = { ...stepValidation };
    newValidation[step] = state;
    setStepValidation(newValidation);
  };

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
        <Stepper
          activeStep={activeStep}
          orientation="vertical"
          className={classes.noPad}
        >
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
              <StepContent>
                <StepAtIndex
                  index={index}
                  appCtx={appCtx}
                  handleNext={handleNext}
                  updateStepValidation={updateStepValidation}
                />
                <div className={classes.actionsContainer}>
                  <div>
                    <Button
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      className={classes.button}
                    >
                      {activeStep < steps.length - 1
                        ? "Back"
                        : "Edit my answers"}
                    </Button>
                    {activeStep < steps.length - 1 ? ( // Don't show a finish button
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleNext}
                        className={classes.button}
                        disabled={!stepValidation[activeStep]}
                      >
                        {activeStep === steps.length - 2 ? "Calculate" : "Next"}
                      </Button>
                    ) : (
                        <></>
                      )}
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
