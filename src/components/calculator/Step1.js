import React from "react";
import Zip from "../Zip";
import {
    regulatedCities,
    regulatedCounties
  } from "../../../data/regulatedLocations";

export const Step1 = ({ handleNext, zip, town, county, updateStepValidation }) => {
    /*useEffect(() => {
      if (zip?.length === 5) {
        console.trace("handlenext");
        handleNext();
      }
    }, [zip, handleNext]);
    */
    const handleChange = event => {
        const fullLength = event?.target?.value?.length ?? 0;
        updateStepValidation(0, fullLength === 5);
    };

    return (
        <form
            onSubmit={event => {
                event.preventDefault();
                handleNext();
            }}
        >
            <label for="zip">What is your zip code?&nbsp;</label>
            <Zip handleChange={handleChange} />
            {
                (town && regulatedCities[town]) ?
                    <div>
                        <br />
                        <p><strong>DISCLAIMER</strong> Since you live in {town} and {town} has local rent control laws these calculations may not apply to you. Please check local laws are not applicable to you before using these state-wide calculations.</p>
                    </div>
                    :
                    (county && regulatedCounties[county]) ?
                        <div>
                            <br />
                            <p><strong>DISCLAIMER</strong> If you live in unincorporated {county} county since {county} county has local rent control laws these calculations may not apply to you. Please check local laws are not applicable to you before using these state-wide calculations.</p>
                        </div>
                        :
                        <div />
            }
        </form>
    );
};
