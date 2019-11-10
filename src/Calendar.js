import React, { useCallback } from 'react';
import './Calendar.scss';
export default ({ year, data, setVideo }) => {
  const select = useCallback(
    e => {
      const video = e.currentTarget.getAttribute('data-url');
      setVideo(video);
    },
    [setVideo]
  );

  return (
    <div className="grid-container">
      <header className="title">
        <h1>
          <strong>24</strong> songs
          <small>{year}</small>
        </h1>
      </header>
      {data.map(item => (
        <button key={item.artist} data-url={item.video} onClick={select}>
          <img
            alt={item.artist + ' ' + item.title}
            src={`/images/${year}/${item.img}`}
          />
          <span>
            {item.title} <br />
            <small>by</small> {item.artist}
          </span>
        </button>
      ))}
    </div>
  );
};
