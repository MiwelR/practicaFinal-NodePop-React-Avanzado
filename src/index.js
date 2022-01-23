import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";

import App from "./App";
import reportWebVitals from "./reportWebVitals";
import storage from "./utils/Storage";
import { configureClient } from "./api/client";
import configureStore from "./store";
import Root from "./components/Root";

import "semantic-ui-css/semantic.min.css";
import "./index.scss";

const accessToken = storage.get("auth");
configureClient({ accessToken });
const history = createBrowserHistory();

const store = configureStore({ auth: !!accessToken }, { history });

ReactDOM.render(
  // <React.StrictMode>
  <Root store={store} history={history}>
    <App />
  </Root>,
  // </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
