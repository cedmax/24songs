import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import getYears from "./getYears";
import * as serviceWorker from "./serviceWorker";
import { setup } from "./CSSCustomProperties";
import "./index.css";

setup();

const [years, data] = getYears();

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App year={years} data={data} />);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
