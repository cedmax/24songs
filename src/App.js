import React from "react";
import Footer from "./Footer";
import Body from "./Body";
import "./App.css";

function App({ data, year }) {
  return (
    <>
      <Body data={data} year={year} />
      <Footer />
    </>
  );
}

export default App;
