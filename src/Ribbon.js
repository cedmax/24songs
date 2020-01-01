import React from "react";

export default ({ view, toggleView }) => (
  <button onClick={toggleView} className="ribbon">
    <span>
      show <br />
      {view}
    </span>
  </button>
);
