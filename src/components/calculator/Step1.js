import React from "react";
import Zip from "../Zip";
export const Step1 = ({ handleNext, zip, updateStepValidation }) => {
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
    </form>
  );
};
