import React from "react";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import YesNoState from "../clauses/YesNoState";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    noInputBorder: {
        border: "none"
    }
}));

export const Step2 = ({ appCtx, updateStepValidation }) => {
    const [initialRentErr, setInitialRentErr] = React.useState({ error: false, helperText: "" });
    return (<>
        <YesNoState questionText="Did you move in before March 15th, 2019?" stateName="moveInBefore15Mar2019" callback={({ answer }) => {
            if (answer === false) {
                appCtx.updateContext({ tenancyStartDate: new Date(2019, 2, 15) });
            }
            // TODO (@sh1mmer) there is an edge case where changing this invalidates step 3's data
        }} />
        <br />
        {appCtx.appCtx.moveInBefore15Mar2019 !== undefined ? ( // only show rent questions after move in date
            <div>
                <p>What was your rent {appCtx.appCtx.moveInBefore15Mar2019 ? "on March 15th, 2019?" : "when you started renting?"}</p>
                <TextField
                    required
                    name="initialRent"
                    id="initialRent"
                    type="number"
                    className="noInputBorder"
                    variant="outlined"
                    error={initialRentErr.error}
                    helperText={initialRentErr.helperText}
                    value={appCtx.appCtx.moveInBefore15Mar2019 ? appCtx.appCtx.rentOn20190315 : appCtx.appCtx.initialRent}
                    label={appCtx.appCtx.moveInBefore15Mar2019 ? "March 15th 2019 Rent" : "Starting Rent"}
                    InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }}
                    onChange={(e) => {
                        // TODO validation
                        let newCtx = (appCtx.appCtx.moveInBefore15Mar2019) ?
                            { rentOn20190315: e.target.value, initialRent: null } :
                            { initialRent: e.target.value, rentOn20190315: null };

                        if (parseInt(e.target.value) > 0) {
                            appCtx.updateContext(newCtx, () => {
                                updateStepValidation(1, true);
                                setInitialRentErr({ error: false, helperText: "" });
                            });
                        } else {
                            appCtx.updateContext(newCtx, () => {
                                updateStepValidation(1, false);
                                setInitialRentErr({ error: true, helperText: "Rent must be greater than 0" });
                            });
                        }
                    }}
                />
                <br />
                {!appCtx.appCtx.moveInBefore15Mar2019 ? // if moved in after March 15 show move in date picker
                    <>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <DatePicker
                                views={["month", "year"]}
                                label="Move in month"
                                varient="outlined"
                                onChange={(d) => {
                                    appCtx.updateContext({ tenancyStartDate: d });
                                }}
                                value={appCtx.appCtx.tenancyStartDate}
                                minDate={new Date(2019, 2, 15)} // dates should be after Mar 15, 2019
                                disableFuture // no future dates
                            />
                        </MuiPickersUtilsProvider>
                    </>
                    : <></>}
            </div>) : (<div />)}
    </>);
};