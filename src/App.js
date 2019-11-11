import React, { useState, useCallback } from 'react';
import Calendar from './Calendar';
import Embed from './Embed';
import Modal from './Modal';
import './App.css';

function App({ data, year }) {
  const [video, setVideo] = useState(null);
  const close = useCallback(() => setVideo(null), [setVideo]);

  return (
    <div className="App">
      <div className="bk" />
      {data.map((d, i) => (
        <Calendar key={year[i]} setVideo={setVideo} year={year[i]} data={d} />
      ))}
      <Modal close={close} isOpen={!!video}>
        <Embed video={video} />
      </Modal>
    </div>
  );
}

export default App;
