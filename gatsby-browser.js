import React from "react";
import { Provider } from "react-redux";
import initStore from "./src/methods/initStore";
import { I18nextProvider } from "react-i18next";
import i18n from "./src/methods/i18n";
import { AppContextProvider } from "./src/components/AppContext"

const store = initStore();

export const wrapRootElement = ({ element }) => (
  <AppContextProvider>
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>{element}</I18nextProvider>
    </Provider>
  </AppContextProvider>
);
