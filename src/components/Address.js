import React, { useEffect, useState } from "react";
import Autocomplete from "react-google-autocomplete";
import Helmet from "react-helmet";

const API_KEY = "";

const Address = () => {
  const [shouldRender, setShouldRender] = useState();
  const [isGoogleReady, setIsGoogleReady] = useState();

  useEffect(() => {
    setShouldRender(true);
  }, [shouldRender]);

  useEffect(() => {
    window.initGoogleMapsApi = () => {
      setIsGoogleReady(true);
    }
  }, [isGoogleReady]);
  return (
    <>
    {shouldRender ? (
      <>
        <Helmet>
          <script
            type="text/javascript"
            src={`https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places&callback=initGoogleMapsApi`}
            async defer
          ></script>
        </Helmet>
        {isGoogleReady ? (
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
    ) : null }
    </>
  );
};

export default Address;
