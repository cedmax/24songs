import React from "react";

const Ribbon = ({ view, toggleView }) => (
  <button onClick={toggleView} className="ribbon">
    <span>
      show <br />
      {view}
    </span>
  </button>
);

export default Ribbon;
