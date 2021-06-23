import Dtrf_form from './dtrf_form';
import React from "react";

import { Provider } from "react-redux"
import store from "./store"

function DtrfForm(props) {
  console.log("PROPS FORM Dtrf_form", props)
  return (
    <div className="App">
      < Provider store={store}>
        <Dtrf_form {...props} ></Dtrf_form>
      </Provider>
    </div>
  );
}

export { DtrfForm };