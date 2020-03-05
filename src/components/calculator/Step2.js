import React from "react";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import YesNoState from "../clauses/YesNoState";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
export const Step2 = ({ appCtx }) => (<>
    <YesNoState questionText="Did you move in before March 15th, 2019?" stateName="moveInBefore15Mar2019" callback={({ answer }) => {
        if (answer === false) {
            appCtx.updateContext({ tenancyStartDate: new Date(2019, 2, 15) });
        }
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
                variant="outlined"
                value={appCtx.appCtx.moveInBefore15Mar2019 ? appCtx.appCtx.rentOn20190315 : appCtx.appCtx.initialRent}
                label={appCtx.appCtx.moveInBefore15Mar2019 ? "March 15th 2019 Rent" : "Starting Rent"}
                InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }}
                onChange={(e) => {
                    // TODO validation
                    if (appCtx.appCtx.moveInBefore15Mar2019) {
                        appCtx.updateContext({ rentOn20190315: e.target.value });
                    }
                    else {
                        appCtx.updateContext({ initialRent: e.target.value });
                    }
                }} />
            <br />
            {!appCtx.appCtx.moveInBefore15Mar2019 ? // if moved in after March 15 show move in date picker
                <>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <DatePicker views={["month", "year"]} label="Move in month" varient="outlined" onChange={(d) => {
                            console.log("got date", d);
                            appCtx.updateContext({ tenancyStartDate: d });
                        }} value={appCtx.appCtx.tenancyStartDate} />
                    </MuiPickersUtilsProvider>
                </>
                : <></>}
        </div>) : (<div />)}
</>);
