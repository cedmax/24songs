import React, { useState, useCallback } from 'react';
import Modal from 'react-modal';
import Tuber from 'react-tuber';
import Calendar from './Calendar';
import './App.css';

const customStyles = {
  overlay: {
    zIndex: 1,
  },
  content: {
    top: '50%',
    left: '50%',
    width: '90%',
    bottom: 'auto',
    maxWidth: 500,
    padding: 0,
    right: 0,
    transform: 'translate(-50%, -50%)',
  },
};

function App({ data, year }) {
  const [video, setVideo] = useState(null);
  const close = useCallback(() => {
    setVideo(null);
  }, [setVideo]);
  return (
    <div className="App">
      <div className="bk" />
      {data.map((d, i) => (
        <Calendar key={year[i]} setVideo={setVideo} year={year[i]} data={d} />
      ))}
      {video && (
        <Modal style={customStyles} onRequestClose={close} isOpen={!!video}>
          <Tuber aspect="16:9" autoplay={true} src={video} />
        </Modal>
      )}
    </div>
  );
}

export default App;
