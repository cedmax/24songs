import React, { memo } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

const style = {
  overlay: {
    zIndex: 1000,
    background: "transparent",
    pointerEvents: "none"
  },
  content: {
    pointerEvents: "all",
    width: 340,
    background: "none",
    border: 0,
    padding: 0,
    right: 20,
    top: "auto",
    left: "auto",
    bottom: 20,
    overflow: "visible"
  }
};

export default memo(({ children, close, isOpen }) => (
  <Modal style={style} onRequestClose={close} isOpen={isOpen}>
    <button onClick={close} className="close">
      <span>close</span>
    </button>
    {children}
  </Modal>
));
