import React from "react";
import TextField from "@material-ui/core/TextField";
import InputAdornment from '@material-ui/core/InputAdornment';
import YesNoState from "../clauses/YesNoState";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
export const Step2 = ({ appCtx }) => (<>
  <YesNoState questionText="Did you move in after March 15th, 2019?" stateName="moveInAfter15Mar2019" callback={({ answer }) => {
    if (answer) {
      appCtx.updateContext({ tenancyStartDate: new Date(2019, 3, 15) });
    }
  }} />
  <br />
  {appCtx.appCtx.moveInAfter15Mar2019 !== undefined ? ( // only show rent after move in date
    <div>
      <p>What was your rent {appCtx.appCtx.moveInAfter15Mar2019 ? "when you started renting?" : "on March 15th, 2019?"}</p>
      <TextField required name="initialRent" id="initialRent" type="number" variant="outlined" value={appCtx.appCtx.moveInAfter15Mar2019 ? appCtx.appCtx.initialRent : appCtx.appCtx.rentOn20190315} label={appCtx.appCtx.moveInAfter15Mar2019 ?
        "Starting Rent" :
        "March 15th 2019 Rent"} InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }} onChange={(e) => {
          // TODO validation
          if (appCtx.appCtx.moveInAfter15Mar2019) {
            appCtx.updateContext({ initialRent: e.target.value });
          }
          else {
            appCtx.updateContext({ rentOn20190315: e.target.value });
          }
        }} />
      <br />
      {appCtx.appCtx.moveInAfter15Mar2019 ?
        <>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker views={["month", "year"]} label="Move in month" varient="outlined" onChange={(d) => {
              appCtx.updateContext({ tenancyStartDate: d });
            }} value={appCtx.appCtx.tenancyStartDate} />
          </MuiPickersUtilsProvider>
        </>
        : <></>}
    </div>) : (<div />)}
</>);
