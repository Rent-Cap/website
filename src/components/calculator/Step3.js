import React from "react";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import YesNoState from "../clauses/YesNoState";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import shortid from "shortid";
import * as CalcCore from "../../methods/rentCalculator";

export const Step3 = ({ appCtx, updateStepValidation }) => {
    const validateRentChanges = (rentChanges) => {
        let validStep = true;
        // sort rent changes by months and sub sort by rent
        rentChanges = rentChanges.sort((a, b) => {
            return (a.month > b.month) ? 1 : // if month A is greater
                (a.month === b.month && a.rent > b.rent) ? 1 :  // if months are equal but rent A is greater
                    -1; // otherwise B is greater
        });

        // TOOD (@sh1mmer) fix i18n here and switch to day.js
        let months_en = "January_February_March_April_May_June_July_August_September_October_November_December";
        // let months_es = "Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre";
        for (let i = 0; i < rentChanges.length; i++) {
            let validItem = true;
            if (i === 0) {
                // TODO (@sh1mmer) special cases for comparing with starting conditions
                // e.g. tenancy start or march 15 rent
                let startDate, startRent;
                if (appCtx.appCtx.moveInBefore15Mar2019) {
                    startDate = new Date(2019, 2, 15);
                    startRent = appCtx.appCtx.rentOn20190315;
                } else {
                    startDate = appCtx.appCtx.tenancyStartDate;
                    startRent = appCtx.appCtx.initialRent;
                }

                if (rentChanges[i].month.getMonth() === startDate.getMonth() &&
                    rentChanges[i].month.getFullYear() === startDate.getFullYear()) {
                    validItem = false;
                    rentChanges[i].dateError = true;
                    rentChanges[i].dateHelperText = (appCtx.appCtx.moveInBefore15Mar2019) ? "First rent change cannot be in same month as March 2019" : "First rent change cannot be in the same month as the move-in month";
                } else if (rentChanges[i].month <= startDate) {
                    validItem = false;
                    rentChanges[i].dateError = true;
                    rentChanges[i].dateHelperText = (appCtx.appCtx.moveInBefore15Mar2019) ? "First rent change cannot earlier than April 2019" : "First rent change must be after the move-in month";
                } else {
                    rentChanges[i].dateError = false;
                    rentChanges[i].dateHelperText = "";
                }

                if (rentChanges[i].rent === startRent) {
                    validItem = false;
                    rentChanges[i].rentError = true;
                    rentChanges[i].rentHelperText = (appCtx.appCtx.moveInBefore15Mar2019) ? "Rent must be different from rent in March 2019" : "Rent must be different from your move-in rent";
                } else if (rentChanges[i].rent < 1) {
                    validItem = false;
                    rentChanges[i].rentError = true;
                    rentChanges[i].rentHelperText = "Rent must be greater than 0";
                } else {
                    rentChanges[i].rentError = false;
                    rentChanges[i].rentHelperText = "";
                }

            } else {
                let lastChange = months_en.split("_")[rentChanges[i - 1].month.getMonth()] + " " + rentChanges[i - 1].month.getFullYear();
                if (rentChanges[i].month.getMonth() === rentChanges[i - 1].month.getMonth() &&
                    rentChanges[i].month.getFullYear() === rentChanges[i - 1].month.getFullYear()
                ) {
                    validItem = false;
                    rentChanges[i].dateError = true;
                    // TODO (@sh1mmer) better error message
                    rentChanges[i].dateHelperText = "There is already a rent change for " + lastChange;
                } else {
                    rentChanges[i].dateError = false;
                    rentChanges[i].dateHelperText = "";
                }

                if (rentChanges[i].rent === rentChanges[i - 1].rent) {
                    validItem = false;
                    rentChanges[i].rentError = true;
                    rentChanges[i].rentHelperText = "Rent must be different from rent in " + lastChange;
                } else if (rentChanges[i].rent < 1) {
                    validItem = false;
                    rentChanges[i].rentError = true;
                    rentChanges[i].rentHelperText = "Rent must be greater than 0";
                } else {
                    rentChanges[i].rentError = false;
                    rentChanges[i].rentHelperText = "";
                }
            }

            if (!validItem) {
                // if we have at least one invalid item the step is invalid
                validStep = false;
            }
        }

        appCtx.updateContext({ rentChanges });

        return validStep;
    };
    return (
        <>
            <FormControl>
                <YesNoState
                    questionText={appCtx.appCtx.moveInBefore15Mar2019 ? "Have you recieved a change in rent since March 15th 2019?" : "Have you recieved a change in rent since you moved in?"}
                    stateName="rentChange"
                    callback={({ answer }) => {
                        let rentChanges = [];
                        /* we always create an empty array and update state when the user's first answers or changes the answer to this question
                        *  
                        *  YES - we make an array with the first rent change to power the UI for the user to edit
                        *  Case 1: No answer => Yes : bootstrap to first entry
                        *  Case 2: No => Yes : the user changed their mind and we need to re-bootstrap
                        *  NO - We don't have rent changes but we just want the empty array as an iterator
                        *  Case 1: No answer => No : bootstrap to empty iterator
                        *  Case 2: Yes => No : we need to replace any previous answers with an empty iterator
                        */

                        if (answer) {
                            // if they answered yes add the first rent change for them
                            let nextRentMonth;
                            if (appCtx.appCtx.moveInBefore15Mar2019) {
                                nextRentMonth = new Date(2019, 3, 15); // if we are starting at March 2019 use April 2019
                            }
                            else {
                                let tenancyStart = appCtx.appCtx.tenancyStartDate;
                                nextRentMonth = new Date(tenancyStart.getFullYear(), tenancyStart.getMonth() + 1, 15);
                            }
                            rentChanges.push({ month: nextRentMonth, rent: null, key: shortid.generate() });

                            // we always set step validation to false for YES because the user needs to edit the first rent change 
                            updateStepValidation(2, false);
                        } else {
                            // we always set step validation to true for NO because the user doesn't need to do anything else
                            updateStepValidation(2, true);
                            // TODO (@sh1mmer) maybe we should automatically go to the next step here (but we need to make sure we update context still)
                        }
                        appCtx.updateContext({ rentChanges });

                    }} />
                <br />
                {appCtx.appCtx.rentChange && appCtx.appCtx.rentChanges ?
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
                                        error={change.rentError} // TODO (@sh1mmer) figure out how to not polute appctx with UI stuff
                                        helperText={change.rentHelperText} // maybe we should use an effect handler to push back upstream
                                        onChange={(v) => {
                                            let rent = parseInt(v.target.value); // make these numbers
                                            let rentChanges = appCtx.appCtx.rentChanges;
                                            for (let i = 0; i < rentChanges.length; i++) {
                                                if (change.key === rentChanges[i].key) {
                                                    rentChanges[i].rent = rent;
                                                }

                                            }
                                            rentChanges = rentChanges.sort((a, b) => (a.month > b.month ? 1 : -1));
                                            appCtx.updateContext({ rentChanges }, () => {
                                                updateStepValidation(2, validateRentChanges(rentChanges));
                                            });

                                        }} />
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <DatePicker
                                            required
                                            views={["month", "year"]}
                                            varient="outlined"
                                            label="Change date"
                                            error={change.dateError}
                                            helperText={change.dateHelperText}
                                            minDate={
                                                // min date for changes is april for people who rented before Marc 15 2019
                                                // or the start date of the tenancy for people who started renting after 
                                                appCtx.appCtx.moveInBefore15Mar2019 ?
                                                    new Date(2019, 3, 1) :
                                                    (new Date(
                                                        new Date(appCtx.appCtx.tenancyStartDate))
                                                        .setMonth(appCtx.appCtx.tenancyStartDate.getMonth() + 1) // chain returns a timestamp *le sigh*
                                                    )
                                            }
                                            disableFuture // no future dates
                                            onChange={(d) => {
                                                // TODO (@sh1mmer) unkludge timezones
                                                let rentChanges = appCtx.appCtx.rentChanges;
                                                for (let i = 0; i < rentChanges.length; i++) {
                                                    if (change.key === rentChanges[i].key) {
                                                        rentChanges[i].month = d;
                                                    }
                                                }
                                                appCtx.updateContext({ rentChanges });
                                                // TOOD (@sh1mmer) validation there are no dupe months
                                                updateStepValidation(validateRentChanges(rentChanges));
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
                            let nextRentMonth = new Date(appCtx.appCtx.rentChanges[appCtx.appCtx.rentChanges.length - 1].month);
                            nextRentMonth.setMonth(nextRentMonth.getMonth() + 1);
                            let rentChanges = appCtx.appCtx.rentChanges;
                            rentChanges.push({ month: nextRentMonth, rent: null, key: shortid.generate() });
                            appCtx.updateContext({ rentChanges });
                            updateStepValidation(2, false); // if we add a new rent change it needs to be updated before we are valid again
                        }}>Add another increase</Button>
                    </>
                    :
                    <></>}
            </FormControl>
        </>
    );
};
