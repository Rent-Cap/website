import { connect } from "react-redux";

const mapStateToProps = state => {
  // TODO: just return state?
  return {
    zip: state.zip,
    refund: state.refund
  };
};
const mapDispatchToProps = dispatch => {
  return {
    changeZip: zip => dispatch({ type: "CHANGE_ZIP", zip }),
    changeRefund: refund => dispatch({ type: "CHANGE_REFUND", refund })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
