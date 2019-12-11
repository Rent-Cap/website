import React from "react";
import { DateRangePicker } from "react-dates";
import moment from "moment";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import SEO from "../components/Seo";
import Disclaimer from "../components/Disclaimer";
import {
  StyledPrimaryButton,
  SecondaryButton,
  SuccessButton,
  DangerButton
} from "../components/Buttons";
import { withTranslation } from "react-i18next";
import {
  handleInput,
  calculateTotalAmountOwedToTenant,
  calculateMaxRent
} from "../methods/helpers";
// import GenerateLetter from "../components/GenerateLetter";
import withRedux from "../methods/withRedux";
import "../styles/calculator.scss";

const emptyRentRange1 = {
  rent: 0,
  startDate: moment([2019, 2, 15]),
  endDate: moment([2019, 2, 15]),
  focusedInput: null,
  id: 0
};
const emptyRentRange2 = {
  rent: 0,
  startDate: moment([2020, 0, 1]),
  endDate: moment([2020, 1, 1]),
  focusedInput: null,
  id: 1
};

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pastRent: 0,
      currentRent: 0,
      cpi: 0.033,
      showSection: false,
      showRentIncrease: false,
      showLetter: false,
      showCpiDropdown: false,
      cpiSelection: "Where do you live",
      rentRanges: [emptyRentRange1, emptyRentRange2]
    };
    this.handleInput = handleInput.bind(this);
    this.addRentRange = this.addRentRange.bind(this);
    this.removeRentRange = this.removeRentRange.bind(this);
    this.calculateRentIncreasePercentage = this.calculateRentIncreasePercentage.bind(
      this
    );
    this.handleRentRangeValueChange = this.handleRentRangeValueChange.bind(
      this
    );
    this.handleRentRangeDateChange = this.handleRentRangeDateChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleFocusChange = this.handleFocusChange.bind(this);
  }
  addRentRange(e) {
    const t = this.state.rentRanges.slice(0);
    const r = Object.assign({}, emptyRentRange2);
    r.startDate = moment(t[t.length - 1].endDate);
    r.endDate = moment(t[t.length - 1].endDate).add(1, "months", true);
    r.id = +new Date();
    t.push(r);
    r.rent = 0;
    this.setState({ rentRanges: t });
  }
  handleRentRangeDateChange(e, idx) {
    const t = this.state.rentRanges.slice(0);
    t[idx].startDate = e.startDate || t[idx].startDate;
    t[idx].endDate = e.endDate || t[idx].endDate;
    // const janFirst2020 = moment([2020, 0, 1])
    // const diff = t[idx].endDate.diff(janFirst2020, 'months', true)
    // t[idx].totalMonthsPaidAfterJan2020 = diff > 0 ? diff : 0
    this.setState({ rentRanges: t });
  }
  handleRentRangeValueChange(e, idx) {
    const t = this.state.rentRanges.slice(0);
    t[idx].rent = e.target.value;
    this.setState({ rentRanges: t });
  }
  removeRentRange(idx) {
    const t = this.state.rentRanges.slice(0);
    if (t.length < 2) return;
    t.splice(idx, 1);
    this.setState({ rentRanges: t });
  }
  calculateRentIncreasePercentage() {
    return parseFloat(
      ((this.state.currentRent - this.state.pastRent) / this.state.pastRent) *
        100
    ).toFixed(0);
  }
  handleDateChange({ startDate, endDate }, idx) {
    this.setState({ startDate, endDate });
  }
  handleFocusChange(focusedInput, idx) {
    const t = this.state.rentRanges.slice(0);
    t[idx].focusedInput = focusedInput;
    this.setState({ rentRanges: t });
  }

  render() {
    const { t, refund, changeRefund } = this.props;
    const maxRent = calculateMaxRent(this.state.pastRent, this.state.cpi);
    const rentIncreasePercentage = this.calculateRentIncreasePercentage();

    const updateRefund = () => {
      const t = calculateTotalAmountOwedToTenant(
        this.state.rentRanges,
        this.state.cpi
      );
      changeRefund(t);
    };
    // TODO: This is not a performant solution because it will update every render.
    // Instead, put all vars the refund relies on (currentRent, maxRent, any rent increases, etc)
    // and have the refund as a calculated value from those other values.
    updateRefund();
    const rentRanges = this.state.rentRanges;
    const that = this;
    const rentRangeList = rentRanges.map((rent, idx) => {
      return (
        <li key={rent.id}>
          {idx > 1 && (
            <DangerButton
              className="remove"
              onClick={() => that.removeRentRange(idx)}
            >
              &times;
            </DangerButton>
          )}
          <div>
            Rent: $
            <input
              type="number"
              onChange={e => this.handleRentRangeValueChange(e, idx)}
            ></input>
            <DateRangePicker
              endDate={rentRanges[idx].endDate}
              endDateId="endDate"
              focusedInput={rentRanges[idx].focusedInput}
              isOutsideRange={() => null}
              onDatesChange={e => this.handleRentRangeDateChange(e, idx)}
              onFocusChange={e => this.handleFocusChange(e, idx)}
              startDate={rentRanges[idx].startDate}
              startDateId="startDate"
              orientation="vertical"
            />
          </div>
        </li>
      );
    });
    return (
      <>
        <SEO title="Calculator" />
        <h1>{t("calculator-title")}</h1>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Where do you live?</h5>
            {/* <select name="cpi-picker" onChange={(e) => this.handleInput('cpi', e)}>
              <option value="0.033" label="Select your location"></option>
              <option value="0.04" label="Oakland-Hayward-San Francisco"></option>
              <option value="0.033" label="Los Angeles-Long Beach-Anaheim"></option>
              <option value="0.022" label="San Diego-Carlsbad"></option>
              <option value="0.028" label="Riverside-San Bernardino-Ontario"></option>
              <option value="0.033" label="Other"></option>
            </select> */}
            <div className="dropdown">
              <button
                onClick={() => {
                  this.setState({
                    showCpiDropdown: !this.state.showCpiDropdown
                  });
                }}
                className="btn btn-secondary dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                {this.state.cpiSelection}
              </button>
              <div
                style={{
                  display: this.state.showCpiDropdown ? "block" : "none"
                }}
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton"
              >
                <a
                  onClick={() => {
                    this.setState({
                      showCpiDropdown: !this.state.showCpiDropdown,
                      cpiSelection: "Oakland-Hayward-San Francisco",
                      cpi: 0.04
                    });
                  }}
                  className="dropdown-item"
                >
                  Oakland-Hayward-San Francisco
                </a>
                <a
                  onClick={() => {
                    this.setState({
                      showCpiDropdown: !this.state.showCpiDropdown,
                      cpiSelection: "Los Angeles-Long Beach-Anaheim",
                      cpi: 0.033
                    });
                  }}
                  className="dropdown-item"
                >
                  Los Angeles-Long Beach-Anaheim
                </a>
                <a
                  onClick={() => {
                    this.setState({
                      showCpiDropdown: !this.state.showCpiDropdown,
                      cpiSelection: "San Diego-Carlsbad",
                      cpi: 0.022
                    });
                  }}
                  className="dropdown-item"
                >
                  San Diego-Carlsbad
                </a>
                <a
                  onClick={() => {
                    this.setState({
                      showCpiDropdown: !this.state.showCpiDropdown,
                      cpiSelection: "Riverside-San Bernardino-Ontario",
                      cpi: 0.028
                    });
                  }}
                  className="dropdown-item"
                >
                  Riverside-San Bernardino-Ontario
                </a>
                <a
                  onClick={() => {
                    this.setState({
                      showCpiDropdown: !this.state.showCpiDropdown,
                      cpiSelection: "Other",
                      cpi: 0.033
                    });
                    document.querySelector("#continue").scrollIntoView();
                  }}
                  className="dropdown-item"
                >
                  Other
                </a>
              </div>
            </div>
          </div>
        </div>
        <br />
        <div className="card">
          <div className="card-body">
            <h5 className="card-title" id="continue">
              What was your rent on March 15, 2019?
            </h5>
            <input
              type="number"
              value={this.state.pastRent}
              onChange={e => this.handleInput("pastRent", e)}
            ></input>
          </div>
        </div>
        <br />
        {/* TODO: Double check this date */}
        <h4>
          Your maximum rent should be no greater than{" "}
          <strong>${maxRent} on March 15, 2020</strong>
        </h4>
        <Disclaimer />
        <br />
        <br />
        <StyledPrimaryButton
          onClick={() => this.setState({ showSection: true })}
        >
          Was I overcharged?
        </StyledPrimaryButton>
        <br />
        {this.state.showSection && (
          <section>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">What is your current rent?</h5>
                <input
                  type="number"
                  value={this.state.currentRent}
                  onChange={e => this.handleInput("currentRent", e)}
                ></input>
                <br />
                <h4>
                  Your rent increased by{" "}
                  {rentIncreasePercentage > 0 ? rentIncreasePercentage : 0}%.
                  Your maximum rent is {maxRent}. Enter your rent information
                  below to calculate a potential refund
                </h4>
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">
                  Enter your rent history from March 15, 2019 to now.
                </h5>
                <section className="rent-increases">
                  <ul>{rentRangeList}</ul>
                  <SuccessButton className="add" onClick={this.addRentRange}>
                    +
                  </SuccessButton>
                </section>
              </div>
            </div>
            <br />
            <h4>
              Based on the information provided, you may be owed ${refund}
            </h4>
            <small>
              NOTE: You are only refunded money paid in excess rent after Jan 1
              2020
            </small>
            <br />
            <Disclaimer />
            <br />
            <br />
            <StyledPrimaryButton
              onClick={() => this.setState({ showLetter: true })}
            >
              Generate a letter to your landlord
            </StyledPrimaryButton>
          </section>
        )}
        {/* TODO: Import GenerateLetter from calculator codebase */}
        {/* {this.state.showLetter && <GenerateLetter />} */}
      </>
    );
  }
}

export default withRedux(withTranslation()(Calculator));
