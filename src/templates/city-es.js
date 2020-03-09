import React from "react";
import { PrimaryButton } from "../components/Buttons";
import AppContext from "../components/AppContext";

const City = () => {
  return (
    <AppContext.Consumer>
      {({ appCtx, updateContext }) => (
        <div className="center-layout">
          <p>
            <h1> ¡Espere! ¡Parece que usted vive en {appCtx.town} en el condado de {appCtx.county}, que tiene sus propias protecciones de renta y desalojo! </h1>
            Antes de verificar su elegibilidad en todo el estado, primero debe determinar si las protecciones de {appCtx.town} lo cubren. Si no lo cubren,
            entonces las protecciones estatales de la Ley de Protección del Inquilino aún pueden aplicarse.
          </p>

          <p>
            Debe consultar el sitio web de la ciudad de {appCtx.town} para averiguar si está protegido por sus protecciones de alquiler y desalojo.
          </p>
          <PrimaryButton to="/es/resources">
            ¡Revise nuestra página de recursos!
          </PrimaryButton>

          <p>
            <br />
            <b>¿Cree que es posible que no esté cubierto por las protecciones de alquiler y desalojo de {appCtx.town}?</b>
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
