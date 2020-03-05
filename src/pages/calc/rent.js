import React from 'react';
import { QuickContactForm } from '../../components/Contact';
import Zip from "../../components/Zip"
import AppContext from '../../components/AppContext';
import YesNoState from "../../components/clauses/YesNoState";


function fn() {
    return (
<div>
    <AppContext.Consumer>
        {({ appCtx, updateContext }) => (
            <div>
                <h1>Rent Calculator</h1>
                <p id="intro">Renters eligible for protection under the Tenant Protection Act are protected against rent increases that exceed 10% in a one year period or the cost of living + 5%, whichever is lower. If you have received a rent increase you can use our calculator
to help you determine what the allowable increase is under the law, and if your rent increase exceeds the limit. Eligible renters who got a rent increase anytime on or after March 15, 2019 should use the rent calculator, as increases in 2019 may be rolled back resulting in a rent reduction.</p>
                <div id="disclaimers">
                    {(appCtx.ab1482RentCapEligible !== undefined) ? // if they haven't checked include a link to the eligibility calculator
                        <div class="disclaimer">
                            <p>This calculator assumes you are eligible for the Tenant Protection Act. If you aren't sure if you are eligible you can use our <a href="">eligibility checker</a>. If you aren't eligible this calculator may over or underestimate the maximum rent increase your landlord could ask for depending on your local laws.</p>
                        </div>
                        : appCtx.ab1482RentCapEligible === false ? // if they have checked but aren't eligible display a warning and reminder
                            <div class="disclaimer">
                                <p>This calculator assumes you are eligible for the Tenant Protection Act. Your answers to our eligibility checker indicated that you aren't eligiblity for a rent cap under the Tenant Protection Act. Based on your answers this calculator may over or underestimate the maximum rent increase your landlord could ask for depending on your local laws.</p>
                            </div>
                            :
                            <div />
                    }
                </div>

                <div id="quickContact">
                    {!appCtx.quickFormSubmit ?
                        <div className="card">

                            <div className="card-body">
                                <h5>Psst... before you calculate your rent</h5>
                                <p>If you share your contact details with us we can follow up later to support you with your housing situation</p>
                                <QuickContactForm autohide={true} />
                            </div>
                        </div>
                        :
                        <div />
                    }
                </div>


                <div id="calculator">
                    <form>
                        <Zip />
                        {appCtx.moveInAfter15Mar2019 ?
                            <label for="initialRent">What was your initial rent when you first rented your current unit?</label>
                            :
                            <label for="initialRent">What was your rent on March 15th, 2019?</label>
                        }
                        <input name="initialRent" id="initialRent" type="text" />
                    </form>
                </div>

                {appCtx.moveInAfter15Mar2019 ?
                    <YesNoState
                        yes="/calc/rentIncreases"
                        no="/calc/calculate"
                        questionText="Did you get any rent increases after you moved in?"
                        stateName="moveInAfter15Mar2019"
                    />
                    :
                    <YesNoState
                        yes="/calc/rentIncreases"
                        no="/calc/calculate"
                        questionText="Did you get any rent increases after March 15th, 2019?"
                        stateName="moveInAfter15Mar2019"
                    />
                }

            </div>
        )}
    </AppContext.Consumer>
</div>
    );
            }

            export default fn;