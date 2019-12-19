import React from 'react';
// import { withTranslation } from 'react-i18next';
import { DateRangePicker } from 'react-dates';
import moment from 'moment';
import Disclaimer from '../components/Disclaimer';
import {
  PrimaryButton, SuccessButton, DangerButton, PrimaryButton2,
} from '../components/Buttons';
import { handleInput, calculateTotalAmountOwedToTenant, calculateMaxRent } from '../methods/helpers';
// import GenerateLetter from '../components/GenerateLetter';
import withRedux from '../methods/withRedux';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import SEO from '../components/Seo';
// import MailChimp from '../components/MailChimp'
import '../styles/calculator.css'
import zipDB from '../../data/zipDB.js'
import calendar from '../images/calendar.svg'
import 'bootstrap/dist/css/bootstrap.css';

const emptyRentRange1 = {
  rent: 0,
  startDate: moment([2019, 2, 15]),
  endDate: moment([2019, 2, 15]),
  focusedInput: null,
  id: 0,
};
const emptyRentRange2 = {
  rent: 0,
  startDate: moment([2020, 0, 1]),
  endDate: moment([2020, 1, 1]),
  focusedInput: null,
  id: 1,
};

const areaToCpi = {
  Rest_Of_California: 0.033,
  'Oakland-Hayward-San_Francisco': 0.04,
  'Los_Angeles-Long_Beach-Anaheim': 0.033,
  'San_Diego-Carlsbad': 0.022,
  'Riverside-San_Bernardino-Ontario': 0.028,

}

// const INITIAL_SELECTION = 'Enter your zip code'

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pastRent: undefined,
      currentRent: 0,
      cpi: 0.033,
      showSection: false,
      showLetter: false,
      town: undefined,
      county: undefined,
      // area: INITIAL_SELECTION,
      // showCpiDropdown: false,
      hideMailChimp: true,
      // cpiSelection: INITIAL_SELECTION,
      cpiSelection: undefined,
      rentRanges: [emptyRentRange1, emptyRentRange2],
    };
    this.handleInput = handleInput.bind(this);
    this.handlePastRentChange = this.handlePastRentChange.bind(this);
    this.removeRentRange = this.removeRentRange.bind(this);
    this.calculateRentIncreasePercentage = this.calculateRentIncreasePercentage.bind(this);
    this.handleRentRangeValueChange = this.handleRentRangeValueChange.bind(this);
    this.handleRentRangeDateChange = this.handleRentRangeDateChange.bind(this);
    this.handleFocusChange = this.handleFocusChange.bind(this);
    this.setCpiFromZip = this.setCpiFromZip.bind(this);
    this.addRentRange = this.addRentRange.bind(this);
  }

  setCpiFromZip(e) {
    const input = e.target.value
    const zip = zipDB[input]
    if (zip) {
      const cpi = areaToCpi[zip.area];
      const town = zip.town;
      const county = zip.county;
      const cpiSelection = zip.area;
      this.setState({
        cpi, cpiSelection, town, county,
      })
    }
  }

  handleRentRangeDateChange(e, idx) {
    const t = this.state.rentRanges.slice(0);
    t[idx].startDate = e.startDate || t[idx].startDate;
    t[idx].endDate = e.endDate || t[idx].endDate;
    // const janFirst2020 = moment([2020, 0, 1])
    // const diff = t[idx].endDate.diff(janFirst2020, 'months', true)
    // t[idx].totalMonthsPaidAfterJan2020 = diff > 0 ? diff : 0
    this.setState(() => ({ rentRanges: t }));
  }

  handleRentRangeValueChange(e, idx) {
    const t = this.state.rentRanges.slice(0);
    t[idx].rent = e.target.value;
    if (idx === 0) {
      this.setState({ pastRent: t[idx].rent });
    }
    this.setState({ rentRanges: t });
    const temp = calculateTotalAmountOwedToTenant(t, this.state.cpi);
    this.props.changeRefund(temp);
  }

  handlePastRentChange(e) {
    this.setState({ pastRent: e.target.value });
    this.handleRentRangeValueChange(e, 0);
  }

  removeRentRange(idx) {
    const t = this.state.rentRanges.slice(0);
    if (t.length < 2) return;
    t.splice(idx, 1);
    this.setState({ rentRanges: t });
  }

  calculateRentIncreasePercentage() {
    return parseFloat(((this.state.currentRent - this.state.pastRent) / this.state.pastRent) * 100)
      .toFixed(0);
  }

  handleFocusChange(focusedInput, idx) {
    const t = this.state.rentRanges.slice(0);
    t[idx].focusedInput = focusedInput;
    this.setState({ rentRanges: t });
  }

  addRentRange() {
    const t = this.state.rentRanges.slice(0);
    const r = { ...emptyRentRange2 };
    r.startDate = moment(t[t.length - 1].endDate);
    r.endDate = moment(t[t.length - 1].endDate).add(1, 'months', true);
    r.id = +new Date();
    t.push(r);
    r.rent = 0;
    this.setState(() => ({ rentRanges: t }));
  }

  render() {
    const { t, refund } = this.props;
    const maxRent = calculateMaxRent(this.state.pastRent, this.state.cpi);
    const { rentRanges } = this.state;
    const that = this;
    const rentRangeList = rentRanges.map((rent, idx) => (
      <li className="rent-input-row" key={rent.id}>
        {idx > 1
            && <DangerButton className="remove" onClick={() => that.removeRentRange(idx)}>&times;</DangerButton>}
        {idx === 0
          ? (
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text"><strong>Rent on March 15, 2019</strong></span>
              </div>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">$</span>
                </div>
                <input type="number" value={this.state.pastRent} className="form-control" placeholder="Rent on March 15, 2019" onChange={(e) => this.handleRentRangeValueChange(e, idx)} />
              </div>
            </div>
          ) : (
            <div className="rent-input">
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">$</span>
                </div>
                <input type="number" className="form-control" placeholder="Monthly Rent" onChange={(e) => this.handleRentRangeValueChange(e, idx)} />
              </div>
              <div className="rent-date">
                <div className="rent-date-label">
                  <small>From</small>
                  <small>To</small>
                </div>
                <div className="rent-date-picker">
                  <div className="input-group mb-3">
                    <div className="input-group-prepend date-icon">
                      <img className="input-group-text" src={calendar} alt="calendar" />
                    </div>
                    <DateRangePicker
                      endDate={rentRanges[idx].endDate}
                      endDateId="endDate"
                      focusedInput={rentRanges[idx].focusedInput}
                      isOutsideRange={() => null}
                      onDatesChange={(e) => this.handleRentRangeDateChange(e, idx)}
                      onFocusChange={(e) => this.handleFocusChange(e, idx)}
                      startDate={rentRanges[idx].startDate}
                      startDateId="startDate"
                      orientation="vertical"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
      </li>
    ));
    const refundBreakdown = rentRanges.map((range, idx) => {
      // const pastRent = rentRanges[0].rent
      const r = parseFloat(range.rent);
      const start = range.startDate;
      const end = range.endDate;
      const janFirst2020 = moment([2020, 0, 1]);
      const diff = range.endDate.diff(janFirst2020, 'months', true);
      const isAfterJan2020 = diff > 0;
      const monthsPaidAfterJan2020 = isAfterJan2020 ? parseFloat(end.diff(start, 'months', true)).toFixed(2) : 0;
      const val = (r > maxRent) ? (r - maxRent) * monthsPaidAfterJan2020 : 0;
      return (
        <li className={`calc-row${val === 0 ? ' zero' : ''}`}>
          {idx > 0
            && <small>({range.rent} - {maxRent}) * {monthsPaidAfterJan2020} Month{monthsPaidAfterJan2020 === 1 ? '' : 's'} = ${parseFloat(val).toFixed(2)}</small>}
        </li>
      )
    })
    return (
      <div className="calculator-container">
        {/* <SEO title="Calculator" /> */}
        <div className="calculator-description">
          <h1>Rent Calculator</h1>
          <p>
            Renters eligible for protection under the Tenant Protection Act are protected against
            rent increases that exceed 10% in a one year period or the cost of living + 5%,
            whichever is lower. If you have received a rent increase you can use our calculator
            to help you determine what the allowable increase is under the law, and if your rent
            increase exceeds the limit.
            Eligible renters who got a rent increase anytime on or after March 15, 2019
            should use the rent calculator, as increases in 2019 may be rolled back
            resulting in a rent reduction.
          </p>
          {/* {this.state.hideMailChimp
            ? (
              <PrimaryButton onClick={() => this.setState({ hideMailChimp: false })}>
                I am interested in signing up to learn more
              </PrimaryButton>
            ) : (
              <MailChimp />
            )} */}
        <iframe className="google-form" src="https://docs.google.com/forms/d/e/1FAIpQLScXhoVcWIEwDiToU4kcA_Mz-O5QgcTUeyBla7Op3lf3k_GZ8w/viewform?embedded=true" height="250" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe>
        </div>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">What is your zip code?</h5>
            <input className="form-control" type="text" onChange={(e) => this.setCpiFromZip(e)} placeholder="Your 5 digit zip code" />
            {this.state.town
              && (
              <small><strong>{this.state.town}</strong>{this.state.county
                && <strong>, {this.state.county} County</strong>}
              </small>
              )}
            <br />
            <br />
            <br />
            <h5>What was your rent on or since March 15, 2019?</h5>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text">$</span>
              </div>
              <input
                type="number"
                className="form-control"
                value={this.state.pastRent}
                placeholder="Monthly Rent"
                onChange={(e) => this.handlePastRentChange(e)}
              />
            </div>
          </div>
        </div>
        <br />
        <br />
        <ul className="calculator-results">
          <li>
            <h5 className="result-title">Max Increase</h5>
            {this.state.cpiSelection
              ? <h3>{parseFloat((0.05 + parseFloat(this.state.cpi)) * 100).toFixed(2)}%</h3>
              : <h3>-</h3>}
            <small>5% Base + {parseFloat(this.state.cpi * 100).toFixed(2)}% CPI</small>
            <br />
            <small><strong>{this.state.cpiSelection ? this.state.cpiSelection : ''}</strong></small>
          </li>
          <li>
            <h5 className="result-title">Allowable Rent</h5>
            {(maxRent > 0 && this.state.cpiSelection)
              ? <h3>${maxRent}</h3>
              : <h3>-</h3>}
            <small>Beginning Jan 1, 2020</small>
          </li>
        </ul>
        <Disclaimer />
        <br />
        <br />
        {/* {this.state.showSection
          ? (
            <h4>
              Enter your information below to determine how much money
              you may be owed as a rollback.
            </h4>
          ) : (
            <PrimaryButton2 style={{ width: '100%' }} onClick={() => this.setState({ showSection: true })}>
              Did your rent increase on or after January 1st, 2020?
            </PrimaryButton2>
          )} */}
        <br />
        {this.state.showSection
          && (
          <section>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Enter your rent history from January 1st, 2020 to now.</h5>
                <section className="rent-increases">
                  <ul>{rentRangeList}</ul>
                  <SuccessButton className="add" onClick={this.addRentRange}>+</SuccessButton>
                </section>
              </div>
            </div>
            <br />
            <h4 className="refund-information">
Based on the information provided, you may be owed
            </h4>
            <div className="refund-container">
              <h1>${refund}</h1>
              { refund > 0
                && (
                  <ul>
                    {refundBreakdown}
                  </ul>
                )}
            </div>
            <br />
            {/* <PrimaryButton onClick={() => this.setState({showLetter: true})}>
            Generate a letter to your landlord</PrimaryButton> */}
          </section>
          )}
        {/* {this.state.showLetter
          && <GenerateLetter />} */}
      </div>
    );
  }
}

export default withRedux(Calculator);
