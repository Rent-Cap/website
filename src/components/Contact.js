import React from "react";
import AppContext from "./AppContext";
import { navigate } from "gatsby";
import { Message } from "semantic-ui-react";
import Alert from "../components/Alert";
import { StyledPrimaryButton } from "../components/Buttons";
import "../styles/contact.scss";

const encode = (data) => {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
};

var contactDict = {
  en: {
    nameLegend: "Name",
    firstName: "First",
    lastName: "Last",
    contactLegend: "Contact Information",
    email: "Email",
    cell: "Cell",
    includeDetails: "Share my tenancy information with ",
    subscribe: "Subscribe to newsletters from Housing Now!",
    disclaimer:
      "Any information you share is kept confidential and is only used to assist you with your case.",
    submitText: "Submit",
  },
  es: {
    nameLegend: "Nombre",
    firstName: "Primer",
    lastName: "Apellido",
    contactLegend: "Información del contacto",
    email: "Correo Electrónico",
    cell: "Celular",
    includeDetails: "¡Comparta mi información de arrendamiento con ",
    subscribe: "Suscribirse a boletines de Housing Now!",
    disclaimer:
      "Cualquier información que comparta se mantiene confidencial y solo se utiliza para ayudarlo con su caso.",
    submitText: "Enviar",
  },
};

class QuickContactForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      autohide: props.autohide,
      submitDestination: props.submitDestination,
      firstName: "",
      lastName: "",
      cell: "",
      email: "",
      includeDetails: true,
      subscribe: false,
      submitText: props.submitText,
      dict: contactDict,
      hasSubmitted: false,
    };
  }

  handleSubmit = (e, updateContext) => {
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({ "form-name": "quickContact", ...this.state }),
    })
      .then(() => {
        const quickFormSubmit = true;
        const {
          includeDetails,
          subscribe,
          firstName,
          lastName,
          email,
          cell,
        } = this.state;
        updateContext({
          quickFormSubmit,
          includeDetails,
          subscribe,
          firstName,
          lastName,
          email,
          cell,
        });

        if (this.state.submitDestination) {
          navigate(this.state.submitDestination);
        }
        this.setState({
          hasSubmitted: true,
        });
      })
      .catch((error) => console.log(error));

    e.preventDefault();
  };

  checkBoxes = { includeDetails: true, subscribe: true };

  handleChange = (e) => {
    var value = e.target.value;
    if (this.checkBoxes[e.target.name]) {
      value = !this.state[e.target.name];
    }
    this.setState({ [e.target.name]: value });
  };

  render() {
    const {
      firstName,
      lastName,
      cell,
      email,
      includeDetails,
      subscribe,
      submitText,
      dict,
      autohide,
    } = this.state;
    return (
      <AppContext.Consumer>
        {({ appCtx, updateContext }) =>
          !appCtx.quickFormSubmit || !autohide ? (
            <div>
              <form
                onSubmit={(e) => {
                  this.handleSubmit(e, updateContext);
                }}
                success={this.state.hasSubmitted.toString()}
                name="quickContact"
                data-netlify="true"
                data-netlify-honeypot="bot-field"
              >
                <input type="hidden" name="form-name" value="quickContact" />
                <fieldset>
                  <legend>{dict[appCtx.lang].nameLegend}</legend>
                  <input
                    className="form-control"
                    type="text"
                    name="firstName"
                    value={firstName}
                    onChange={this.handleChange}
                    placeholder={dict[appCtx.lang].firstName}
                  />
                  <input
                    className="form-control"
                    type="text"
                    name="lastName"
                    value={lastName}
                    onChange={this.handleChange}
                    placeholder={dict[appCtx.lang].lastName}
                  />
                </fieldset>
                <fieldset>
                  <legend>{dict[appCtx.lang].contactLegend}</legend>
                  <input
                    className="form-control"
                    type="tel"
                    name="cell"
                    value={cell}
                    onChange={this.handleChange}
                    placeholder={dict[appCtx.lang].cell}
                  />
                  <input
                    className="form-control"
                    type="email"
                    name="email"
                    value={email}
                    onChange={this.handleChange}
                    placeholder={dict[appCtx.lang].email}
                  />
                </fieldset>
                <fieldset>
                  <label className="checkboxes">
                    <input
                      type="checkbox"
                      name="includeDetails"
                      checked={includeDetails}
                      onChange={this.handleChange}
                    />{" "}
                    {dict[appCtx.lang].includeDetails}{" "}
                    <a href="https://www.housingnowca.org/about">
                      Housing Now!
                    </a>
                  </label>
                  <br />
                  <label className="checkboxes">
                    <input
                      type="checkbox"
                      name="subscribe"
                      checked={subscribe}
                      onChange={this.handleChange}
                    />{" "}
                    {dict[appCtx.lang].subscribe}
                  </label>
                </fieldset>
                <p className="disclaimer">{dict[appCtx.lang].disclaimer}</p>
                <p className="center-layout">
                  <StyledPrimaryButton type="submit">
                    {submitText ? submitText : dict[appCtx.lang].submitText}
                  </StyledPrimaryButton>
                </p>
              </form>
            </div>
          ) : (
            <div>
              <Alert />
              <br />
            </div>
          )
        }
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
      share1482Answers: true,
      shareRentCalc: true,
      contactCall: true,
      contactTxt: true,
      contactEmail: true,
      firstName: "",
      lastName: "",
      cell: "",
      email: "",
      rentIncrease: false,
      eviction: false,
      landlordOther: false,
      understandRights: false,
      fightForRights: false,
      submitText: props.submitText,
      dict: contactDict,
    };
  }

  /* Here’s the juicy bit for posting the form submission */

  handleSubmit = (e) => {
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({ "form-name": "testFullContact", ...this.state }),
    })
      .then(() => alert("Success!"))
      .catch((error) => alert(error));

    e.preventDefault();
  };

  checkBoxes = {
    rentIncrease: true,
    eviction: true,
    landlordOther: true,
    understandRights: true,
    fightForRights: true,
    contactCall: true,
    contactEmail: true,
    contactTxt: true,
  };

  handleChange = (e) => {
    var value = e.target.value;
    if (this.checkBoxes[e.target.name]) {
      value = !this.state[e.target.name];
    }
    this.setState({ [e.target.name]: value });
  };

  render() {
    const {
      firstName,
      lastName,
      cell,
      email,
      rentIncrease,
      eviction,
      landlordOther,
      understandRights,
      fightForRights,
      share1482Answers,
      shareRentCalc,
      contactEmail,
      contactTxt,
      contactCall,
      submitText,
      dict,
    } = this.state;
    return (
      <AppContext.Consumer>
        {({ appCtx }) => (
          <form
            onSubmit={this.handleSubmit}
            name="testFullContact"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
          >
            <input type="hidden" name="form-name" value="testFullContact" />
            <fieldset>
              <legend>Name</legend>
              <input
                type="text"
                name="firstName"
                value={firstName}
                onChange={this.handleChange}
                placeholder="First"
              />
              &nbsp;
              <input
                type="text"
                name="lastName"
                value={lastName}
                onChange={this.handleChange}
                placeholder="Last"
              />
            </fieldset>
            <fieldset>
              <legend>Contact</legend>
              <input
                type="tel"
                name="cell"
                value={cell}
                onChange={this.handleChange}
                placeholder="Cell"
              />
              &nbsp;
              <input
                type="email"
                name="email"
                value={email}
                onChange={this.handleChange}
                placeholder="Email"
              />
            </fieldset>
            {appCtx.eligibiltyAnswers ? (
              <div>
                <p>
                  <label>
                    <input
                      type="checkbox"
                      name="share1482Answers"
                      checked={share1482Answers}
                      onChange={this.handleChange}
                    />{" "}
                    Can we share your answers about your housing situation and
                    Tentant Protection Act status with ACCE?
                  </label>
                </p>
              </div>
            ) : (
              <div>
                <input type="hidden" name="share1482Answers" />
              </div>
            )}
            {appCtx.rentCalc ? (
              <div>
                <p>
                  <label>
                    <input
                      type="checkbox"
                      name="shareRentCalc"
                      checked={shareRentCalc}
                      onChange={this.handleChange}
                    />{" "}
                    Can we share your rent calculation answers with ACCE?
                  </label>
                </p>
              </div>
            ) : (
              <div>
                <input type="hidden" name="shareRentCalc" />
              </div>
            )}
            <fieldset>
              <legend>What do you want to connect with ACCE about?</legend>
              <p>
                <label>
                  <input
                    type="checkbox"
                    name="rentIncrease"
                    checked={rentIncrease}
                    onChange={this.handleChange}
                  />{" "}
                  My landlord wants to (or did) raise my rent
                </label>
              </p>
              <p>
                <label>
                  <input
                    type="checkbox"
                    name="eviction"
                    checked={eviction}
                    onChange={this.handleChange}
                  />{" "}
                  My landlord told me I'm going to be evicted
                </label>
              </p>
              <p>
                <label>
                  <input
                    type="checkbox"
                    name="landlordOther"
                    checked={landlordOther}
                    onChange={this.handleChange}
                  />{" "}
                  Another issue with my landlord
                </label>
              </p>
              <p>
                <label>
                  <input
                    type="checkbox"
                    name="understandRights"
                    checked={understandRights}
                    onChange={this.handleChange}
                  />{" "}
                  I want to better understand my rights as a tenant
                </label>
              </p>
              <p>
                <label>
                  <input
                    type="checkbox"
                    name="fightForRights"
                    checked={fightForRights}
                    onChange={this.handleChange}
                  />{" "}
                  I want to help fight for tenant rights
                </label>
              </p>
            </fieldset>
            {this.state.email || this.state.cell ? (
              <fieldset>
                <legend>How would you prefer to be contacted?</legend>
                {this.state.cell ? (
                  <div>
                    <p>
                      <label>
                        <input
                          type="checkbox"
                          name="contactCall"
                          checked={contactCall}
                          onChange={this.handleChange}
                        />{" "}
                        Contact me by phone
                      </label>
                    </p>
                    <p>
                      <label>
                        <input
                          type="checkbox"
                          name="contactTxt"
                          checked={contactTxt}
                          onChange={this.handleChange}
                        />{" "}
                        Contact me by SMS (text)
                      </label>
                    </p>
                  </div>
                ) : (
                  <div>
                    <input
                      type="hidden"
                      name="contactCall"
                      value={contactCall}
                    />
                    <input type="hidden" name="contactTxt" value={contactTxt} />
                  </div>
                )}
                {this.state.email ? (
                  <p>
                    <label>
                      <input
                        type="checkbox"
                        name="contactEmail"
                        checked={contactEmail}
                        onChange={this.handleChange}
                      />{" "}
                      Contact me by email
                    </label>
                  </p>
                ) : (
                  <div>
                    <input
                      type="hidden"
                      name="contactEmail"
                      value={contactEmail}
                    />
                  </div>
                )}
              </fieldset>
            ) : (
              <div>
                <input type="hidden" name="contactCall" value={contactCall} />
                <input type="hidden" name="contactTxt" value={contactTxt} />
                <input type="hidden" name="contactEmail" value={contactEmail} />
              </div>
            )}
            <p>
              <button type="submit">
                {submitText ? submitText : dict[appCtx.lang].submitText}
              </button>
            </p>
          </form>
        )}
      </AppContext.Consumer>
    );
  }
}

export default QuickContactForm;
export { QuickContactForm, FullContactForm };
