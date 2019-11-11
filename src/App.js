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
      <footer>
        music taste and coding by{' '}
        <a target="_blank" rel="noopener noreferrer" href="https://cedmax.com">
          cedmax
        </a>
        .<br />
        music selection based on{' '}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://last.fm/user/cedmax"
        >
          last.fm
        </a>{' '}
        charts.
        <br />
        background by{' '}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="http://backgroundlabs.com/item/christmas-polka-dots/"
        >
          backgroundlabs
        </a>
        .
      </footer>
    </div>
  );
}

export default App;
