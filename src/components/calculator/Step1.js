import React from "react";
import Zip from "../Zip";
export const Step1 = ({ handleNext, zip }) => {
  /*useEffect(() => {
    if (zip?.length === 5) {
      console.trace("handlenext");
      handleNext();
    }
  }, [zip, handleNext]);
  */
  return (<form onSubmit={event => {
    event.preventDefault();
    handleNext();
  }}>
    <label for="zip">What is your zip code?&nbsp;</label>
    <Zip />
  </form>);
};
