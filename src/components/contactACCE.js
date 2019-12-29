import React from "react";
import AppContext from "./AppContext"

const encode = (data) => {
    return Object.keys(data)
        .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
        .join("&");
};

var contactDict = {
    en: { submitText: "Connect with ACCE" },
    es: { submitText: "Contactar ACCE" }
};


class QuickContactForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            cell: "",
            email: "",
            submitText: props.submitText,
            dict: contactDict,
        };
    }

    /* Here’s the juicy bit for posting the form submission */

    handleSubmit = (e, updateContext) => {
        fetch("/", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: encode({ "form-name": "testQuickContact", ...this.state })
        })
            .then(() => {
                const quickFormSubmit = true;
                updateContext({ quickFormSubmit });
            })
            .catch(error => alert(error));

        e.preventDefault();


    };

    handleChange = e => this.setState({ [e.target.name]: e.target.value });

    render() {
        const { firstName, lastName, cell, email, submitText, dict } = this.state;
        return (
            <AppContext.Consumer>
                {({ appCtx, updateContext }) => (
                    !appCtx.quickFormSubmit ?
                        <div>
                            <form onSubmit={(e) => { this.handleSubmit(e, updateContext) }} name="testQuickContact" data-netlify="true" data-netlify-honeypot="bot-field">
                                <input type="hidden" name="form-name" value="testQuickContact" />
                                <p>
                                    <label>
                                        First name: <input type="text" name="givenName" value={firstName} onChange={this.handleChange} />&nbsp;
                    </label>
                                    <label>
                                        Last name: <input type="text" name="familyName" value={lastName} onChange={this.handleChange} />
                                    </label>
                                </p>
                                <p>
                                    <label>
                                        Cell: <input type="tel" name="cell" value={cell} onChange={this.handleChange} />
                                    </label>
                                    <label>
                                        Email: <input type="email" name="email" value={email} onChange={this.handleChange} />
                                    </label>
                                </p>
                                <p>
                                    <button type="submit">{submitText ? submitText : dict[appCtx.lang].submitText}</button>
                                </p>
                            </form>
                        </div>
                        :
                        <div />
                )}
            </AppContext.Consumer>
        );
    }
}

class FullContactForm extends React.Component {
    constructor(props) {
        super(props);
        if (props.to === undefined || props.to === null || props.to === "") {
            this.setState({ hasError: true });
        }
        this.state = {
            to: "",
            share1482Answers: true, shareRentCalc: true,
            contactCall: true, contactTxt: true, contactEmail: true,
            firstName: "", lastName: "", cell: "", email: "",
            rentIncrease: false, eviction: false, landlordOther: false, understandRights: false, fightForRights: false,
            submitText: props.submitText,
            dict: contactDict,
        };
    }

    /* Here’s the juicy bit for posting the form submission */

    handleSubmit = e => {
        fetch("/", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: encode({ "form-name": "testFullContact", ...this.state })
        })
            .then(() => alert("Success!"))
            .catch(error => alert(error));

        e.preventDefault();
    };

    checkBoxes = { "rentIncrease": true, "eviction": true, "landlordOther": true, "understandRights": true, "fightForRights": true , "contactCall": true, "contactEmail": true, "contactTxt": true};

    handleChange = e => {
        var value = e.target.value;
        if (this.checkBoxes[e.target.name]) {
            value = !this.state[e.target.name];
        }
        this.setState({ [e.target.name]: value })
    };

    render() {
        const { firstName, lastName, cell, email, rentIncrease, eviction, landlordOther, understandRights, fightForRights, share1482Answers, sharecRentCalc, contactEmail, contactTxt, contactCall, submitText, dict } = this.state;
        return (
            <AppContext.Consumer>
                {({ appCtx, updateContext }) => (
                    <form onSubmit={this.handleSubmit} name="testFullContact" data-netlify="true" data-netlify-honeypot="bot-field">
                        <input type="hidden" name="form-name" value="testFullContact" />
                        <p>
                            <label>
                                First: <input type="text" name="firstName" value={firstName} onChange={this.handleChange} />&nbsp;
                    </label>
                            <label>
                                Last: <input type="text" name="lastName" value={lastName} onChange={this.handleChange} />
                            </label>
                        </p>

                        <p>
                            <label>
                                Cell: <input type="tel" name="cell" value={cell} onChange={this.handleChange} />
                            </label>
                            <label>
                                Email: <input type="email" name="email" value={email} onChange={this.handleChange} />
                            </label>
                        </p>
                        {(appCtx.eligibiltyAnswers) ?
                            <div>
                                <p>
                                    <label>
                                        <input type="checkbox" name="rentIncrease" checked={share1482Answers} onChange={this.handleChange} /> Can we share your answers about your housing situation and Tentant Protection Act status with ACCE?
                                </label>
                                </p>
                            </div>
                            :
                            <div></div>
                        }
                        {(appCtx.rentCalc) ?
                            <div>
                                <p>
                                    <label>
                                        <input type="checkbox" name="rentIncrease" checked={sharecRentCalc} onChange={this.handleChange} /> Can we share your rent calculation answers with ACCE?
                                </label>
                                </p>
                            </div>
                            :
                            <div></div>
                        }
                        <fieldset>
                            <legend>What do you want to connect with ACCE about?</legend>
                            <p>
                                <label>
                                    <input type="checkbox" name="rentIncrease" checked={rentIncrease} onChange={this.handleChange} /> My landlord wants to (or did) raise my rent
                                </label>
                            </p>
                            <p>
                                <label>
                                    <input type="checkbox" name="eviction" checked={eviction} onChange={this.handleChange} /> My landlord told me I'm going to be evicted
                                </label>
                            </p>
                            <p>
                                <label>
                                    <input type="checkbox" name="landlordOther" checked={landlordOther} onChange={this.handleChange} /> Another issue with my landlord
                                </label>
                            </p>
                            <p>
                                <label>
                                    <input type="checkbox" name="understandRights" checked={understandRights} onChange={this.handleChange} /> I want to better understand my rights as a tenant
                                </label>
                            </p>
                            <p>
                                <label>
                                    <input type="checkbox" name="fightForRights" checked={fightForRights} onChange={this.handleChange} /> I want to help fight for tenant rights
                                </label>
                            </p>
                        </fieldset>
                        {(this.state.email || this.state.cell) ?
                            <fieldset>
                                <legend>How would you prefer to be contacted?</legend>
                                {this.state.cell ?
                                    <div>
                                        <p>
                                            <label>
                                                <input type="checkbox" name="contactCall" checked={contactCall} onChange={this.handleChange} /> Contact me by phone
                                </label>
                                        </p>
                                        <p>
                                            <label>
                                                <input type="checkbox" name="contactTxt" checked={contactTxt} onChange={this.handleChange} /> Contact me by SMS (text)
                                </label>
                                        </p>
                                    </div>
                                    :
                                    <div>
                                        <input type="hidden" name="contactCell" value={contactCell} />
                                        <input type="hidden" name="contactTxt" value={contactTxt} />
                                    </div>
                                }
                                {this.state.email ?
                                    <p>
                                        <label>
                                            <input type="checkbox" name="contactEmail" checked={contactEmail} onChange={this.handleChange} /> Contact me by email
                                </label>
                                    </p>
                                    : <div>
                                         <input type="hidden" name="contactEmail" value={contactEmail} />
                                    </div>
                                }
                            </fieldset>
                            :
                            <div>
                                        <input type="hidden" name="contactCall" value={contactCall} />
                                        <input type="hidden" name="contactTxt" value={contactTxt} />
                                        <input type="hidden" name="contactEmail" value={contactEmail} />
                            </div>
                        }
                        <p>
                            <button type="submit">{submitText ? submitText : dict[appCtx.lang].submitText}</button>
                        </p>
                    </form>
                )}
            </AppContext.Consumer>
        );
    }
}

export default QuickContactForm;
export { QuickContactForm, FullContactForm };