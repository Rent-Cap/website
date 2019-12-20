import React from "react";
import { PrimaryButton } from "../components/Buttons";
import AppContext from "../components/AppContext";

const City = () => {
  return (
    <AppContext.Consumer>
      {({ appCtx, updateContext }) => (
        <div>
          <p>
            Parece que usted vive en {appCtx.town} en el condado de{" "}
            {appCtx.county}.
          </p>

          <p>
            Dado que {appCtx.town} tiene protecciones de renta y desalojo,
            queremos determinar si usted es elegible para esos. Si esos no lo
            cubren, entonces las protecciones estatales de AB 1482 aún pueden
            aplicarse, y también lo ayudaremos a resolverlo.
          </p>

          <p>
            Puede comunicarse con estos recursos útiles en {appCtx.town} para
            determinar si es elegible.
          </p>
          <PrimaryButton to="/es/resources">
            Obtenga ayuda de un grupo adecuado de inquilinos locales.
          </PrimaryButton>

          <p>
            <br />
            ¿Cree que no esta cubierto por las disposiciones de control de
            renta en {appCtx.town}?
          </p>
          <PrimaryButton to="/es/eligibility/state/">
            Verifique su situación en todo el estado de California.
          </PrimaryButton>
        </div>
      )}
    </AppContext.Consumer>
  );
};

export default City;
