import React from "react";
import FormControl from '@material-ui/core/FormControl';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import YesNoState from "../clauses/YesNoState";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import shortid from "shortid";
import * as CalcCore from "../../methods/rentCalculator"

export const Step3 = ({ appCtx }) => (<>
  <FormControl>
    <YesNoState questionText={appCtx.appCtx.moveInAfter15Mar2019 ?
      "Have you recieved a change in rent since you moved in?" :
      "Have you recieved a change in rent since March 15th 2019?"} stateName="rentChange" callback={({ answer }) => {
        if (!appCtx.appCtx.rentChanges || appCtx.appCtx.rentChanges.length === 0) {
          // create/update the rent changes array if it doesn't exist or if the user changed their mind after it was created
          let rentChanges = [];
          if (answer) {
            // if they answer yes add the first element for them
            let nextRentMonth;
            if (appCtx.appCtx.moveInAfter15Mar2019) {
              const tenancyStart = appCtx.appCtx.tenancyStartDate;
              nextRentMonth = new Date(tenancyStart.getFullYear(), tenancyStart.getMonth() +1, 15);
            }
            else {
              nextRentMonth = new Date(2019, 3, 15); // if we are starting at March 2019 use April 2019
            }
            rentChanges.push({ month: nextRentMonth, rent: null, key: shortid.generate() });
          }
          appCtx.updateContext({ rentChanges });
        }
      }} />
    <br />
    {appCtx.appCtx.rentChange && appCtx.appCtx.rentChanges ?
      <>
        {
          // sort the rent changes and then map them out into UI
          appCtx.appCtx.rentChanges.map((change) => <div key={change.key}>
            <TextField required label="New rent" name="increase" type="number" varient="outlined" value={change.rent} onChange={(v) => {
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
            }} />
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DatePicker required views={["month", "year"]} varient="outlined" label="Change date" onChange={(d) => {
                console.log(d);
                let rentChanges = appCtx.appCtx.rentChanges;
                for (let i = 0; i < rentChanges.length; i++) {
                  if (change.key === rentChanges[i].key) {
                    rentChanges[i].month = d;
                  }
                }
                appCtx.updateContext({ rentChanges });
              }} value={change.month} />
            </MuiPickersUtilsProvider>
            <IconButton disabled={appCtx.appCtx.rentChanges.length < 2} aria-label="delete" onClick={() => {
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
            }}>
              <DeleteIcon />
            </IconButton>
          </div>)}
        <Button onClick={() => {
          let lastMonth = appCtx.appCtx.rentChanges[appCtx.appCtx.rentChanges.length - 1].month;
          let nextRentMonth = CalcCore.addISOMonths(lastMonth, 1);
          console.log('lastMonth', lastMonth, 'nexRentMonth', nextRentMonth);
          let rentChanges = appCtx.appCtx.rentChanges;
          rentChanges.push({ month: nextRentMonth, rent: null, key: shortid.generate() });
          appCtx.updateContext({ rentChanges });
        }}>Add another increase</Button>
        {console.log(appCtx.appCtx)}
      </>
      :
      <></>}
  </FormControl>
</>);
