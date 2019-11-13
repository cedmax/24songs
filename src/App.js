import React from "react";
import Footer from "./Footer";
import Frame from "./Frame";
import Body from "./Body";
import "./App.css";

function App({ data, year }) {
  return (
    <Frame>
      <Body data={data} year={year} />
      <Footer />
    </Frame>
  );
}

export default App;
