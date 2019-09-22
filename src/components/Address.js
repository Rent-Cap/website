import React, { useEffect, useState } from "react";
import Autocomplete from "react-google-autocomplete";

const API_KEY = "AIzaSyA2zJGf2oJthhaFoUXjT3365O1u7qdZQNg";

const Address = () => {
  const [google, setGoogle] = useState();
  useEffect(() => {
    if (google) return;
    if (typeof window !== `undefined` && window.google) {
      setGoogle(google);
    }
  });
  return (
    <>
      <script
        type="text/javascript"
        src={`https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places`}
      ></script>

      {google ? (
        <Autocomplete
          style={{ width: "100%" }}
          onPlaceSelected={place => {
            console.log(place);
          }}
          types={["address"]}
          componentRestrictions={{ country: "us" }}
        />
      ) : null}
    </>
  );
};

export default Address;
