import React, { useState, useCallback } from 'react';
import Modal from 'react-modal';
import Tuber from 'react-tuber';
import Calendar from './Calendar';
import './App.css';

function App({ data, year }) {
  const [video, setVideo] = useState(null);
  const close = useCallback(() => {
    setVideo(null);
  }, [setVideo]);
  return (
    <div className="App">
      <div className="bk" />
      <Calendar setVideo={setVideo} year={year} data={data} />
      {video && (
        <Modal onRequestClose={close} isOpen={!!video}>
          <Tuber src={video} />
        </Modal>
      )}
    </div>
  );
}

export default App;
