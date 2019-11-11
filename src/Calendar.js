import React, { useCallback } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import './Calendar.scss';
export default ({ year, data, setVideo }) => {
  const select = useCallback(
    e => {
      const video = e.currentTarget.getAttribute('data-url');
      setVideo(video);
    },
    [setVideo]
  );

  let filler = [];
  if (data.length < 24) {
    filler = new Array(24 - data.length).fill(null);
  }

  return (
    <div className="grid-container">
      <header className="title">
        <h1>
          <strong>24</strong> songs
          <small>{year}</small>
        </h1>
      </header>
      {data.map((item, i) => (
        <button key={item.artist} data-url={item.video} onClick={select}>
          <LazyLoadImage
            alt={item.artist + ' ' + item.title}
            src={`/images/${item.img}`}
            threshold={500}
          />
          <span className="song-info">
            {item.title} <br />
            <small>by</small> {item.artist}
          </span>
        </button>
      ))}
      {filler.map((n, i) => (
        <div key={i} className="filler" />
      ))}
    </div>
  );
};
