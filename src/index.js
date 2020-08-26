import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import getYears from "./getYears";
import * as serviceWorker from "./serviceWorker";
import { setup } from "./CSSCustomProperties";
import "./index.css";

setup();

const [years, data] = getYears();

ReactDOM.render(
  <App year={years} data={data} />,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
